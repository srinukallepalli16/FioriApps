import cds from '@sap/cds';
import { GoogleGenAI, Type } from '@google/genai';
import axios from 'axios';
import https from 'https';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import dotenv from 'dotenv';

dotenv.config();

// Agent to accept the BAS local proxy certificate
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// Dual-mode SAP caller: uses BAS proxy locally, switches to BTP destination in Cloud Foundry
async function callSapBackend(path) {
    if (process.env.VCAP_APPLICATION) {
        console.log(`[AI Copilot] [PROD - CF] Calling via Destination A4H: ${path}`);
        const response = await executeHttpRequest(
            { destinationName: 'A4H' },
            { method: 'GET', url: path }
        );
        return response.data;
    } else {
        console.log(`[AI Copilot] [DEV - BAS] Calling via BAS proxy: https://A4H.dest${path}`);
        const response = await axios.get(`https://A4H.dest${path}`, { httpsAgent });
        return response.data;
    }
}

export default (srv) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Helper: retry on transient Google 503 spikes with exponential backoff
    const callWithRetry = async (fn, maxRetries = 4, delayMs = 2000) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await fn();
            } catch (err) {
                const is503 = err.status === 503 || err.message?.includes('503') || err.message?.includes('UNAVAILABLE');
                if (is503 && attempt < maxRetries) {
                    console.log(`[AI Copilot] Gemini 503 spike detected. Retrying in ${delayMs / 1000}s (attempt ${attempt} of ${maxRetries})...`);
                    await new Promise(r => setTimeout(r, delayMs));
                    delayMs *= 1.5;
                } else {
                    throw err;
                }
            }
        }
    };

    // Tool 1: General Employee Overview / Creation list from CDS View
    const getEmployeesDeclaration = {
        name: 'getEmployees',
        description: 'Retrieves general employee creation list (PERNR, names, creation dates, org units) from SAP S/4HANA backend system A4H.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                top: {
                    type: Type.INTEGER,
                    description: 'Number of records to fetch, default is 10.'
                }
            }
        }
    };

    // Tool 2: Generic Dynamic Infotype Reader (Single employee or list by Infotype)
    const getEmployeeInfotypeDeclaration = {
        name: 'getEmployeeInfotype',
        description: 'Fetches specific SAP HCM infotype data. If pernr is provided, retrieves full infotype records for that employee. If pernr is omitted, lists all employee personnel numbers that possess active records for the requested infotype.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                pernr: {
                    type: Type.STRING,
                    description: 'Optional 8-digit SAP Personnel Number (e.g., "00000012", "00000002"). Omit this to list which employees have this infotype.'
                },
                infty: {
                    type: Type.STRING,
                    description: 'The 4-digit SAP HCM Infotype number (e.g., "0006" for addresses, "0008" for basic pay, "0002" for personal data, "0105" for communication).'
                },
                subty: {
                    type: Type.STRING,
                    description: 'Optional subtype (e.g., "1" for permanent address, "0010" for email).'
                }
            },
            required: ['infty']
        }
    };

    srv.on('askCopilot', async (req) => {
        try {
            const { prompt } = req.data;
            if (!prompt) return req.reject(400, 'Prompt cannot be empty.');

            console.log(`[AI Copilot] User prompt: "${prompt}"`);

            // 1. Initial call with both tools registered
            const response = await callWithRetry(() => ai.models.generateContent({
                model: 'gemini-3.5-flash-lite',
                contents: prompt,
                config: {
                    tools: [{ functionDeclarations: [getEmployeesDeclaration, getEmployeeInfotypeDeclaration] }],
                    systemInstruction: 'You are an SAP S/4HANA & HCM AI Copilot. When asked for employee listings or counts, use getEmployees. When asked for specific infotypes, detailed records (such as 0006 addresses, 0008 pay, 0002 personal, 0105 communication), or which employees have a specific infotype, use getEmployeeInfotype. Always extract 4-digit infotype numbers padded with zeros (e.g., 6 -> "0006", 8 -> "0008").'
                }
            }));

            // 2. Process tool calls
            const functionCalls = response.functionCalls;
            if (functionCalls && functionCalls.length > 0) {
                const call = functionCalls[0];
                console.log(`[AI Copilot] Gemini decided to call tool: ${call.name} with args:`, call.args);

                let sapRecords = [];

                if (call.name === 'getEmployees') {
                    const topCount = call.args?.top || 10;
                    const path = `/sap/opu/odata/sap/Z_I_EMP_CREATED_CDS/Z_I_EMP_CREATED?$top=${topCount}&$format=json`;
                    const data = await callSapBackend(path);
                    sapRecords = data?.d?.results || [];

                } else if (call.name === 'getEmployeeInfotype') {
                    const inftyFormatted = String(call.args.infty).padStart(4, '0');
                    const pernrParam = call.args.pernr ? `pernr=${String(call.args.pernr).padStart(8, '0')}&` : '';
                    const subtyParam = call.args.subty ? `&subty=${encodeURIComponent(call.args.subty)}` : '';

                    const path = `/sap/bc/zhr_read?${pernrParam}infty=${inftyFormatted}${subtyParam}`;
                    const data = await callSapBackend(path);
                    sapRecords = Array.isArray(data) ? data : (data ? [data] : []);
                }

                console.log(`[AI Copilot] Successfully fetched ${sapRecords.length} records from SAP S/4HANA.`);

                // 3. Build tool response part
                const functionResponsePart = {
                    functionResponse: {
                        name: call.name,
                        response: { records: sapRecords }
                    }
                };
                if (call.id) {
                    functionResponsePart.functionResponse.id = call.id;
                }

                // 4. Synthesize final response (mode: 'NONE' locks output to text)
                const finalResponse = await callWithRetry(() => ai.models.generateContent({
                    model: 'gemini-3.5-flash-lite',
                    contents: [
                        { role: 'user', parts: [{ text: prompt }] },
                        response.candidates[0].content,
                        {
                            role: 'user',
                            parts: [functionResponsePart]
                        }
                    ],
                    config: {
                        tools: [{ functionDeclarations: [getEmployeesDeclaration, getEmployeeInfotypeDeclaration] }],
                        toolConfig: {
                            functionCallingConfig: {
                                mode: 'NONE'
                            }
                        },
                        systemInstruction: 'You are an SAP S/4HANA AI Copilot. Synthesize the returned SAP records into a clean, professional markdown response with tables. For address data (Infotype 0006), format fields like Street (STRAS), City (ORT01), Postal Code (PSTLZ), Country (LAND1), and validity dates (BEGDA/ENDDA). For basic pay (Infotype 0008), format Pay Scale, Wage Types, Amounts, and Currency. Never trigger extra function calls in turn 2.'
                    }
                }));

                // Safe fallback text extraction
                let answerText = finalResponse.text;
                if (!answerText) {
                    const textParts = finalResponse.candidates?.[0]?.content?.parts
                        ?.filter(p => p.text)
                        ?.map(p => p.text)
                        ?.join('\n');
                    answerText = textParts || `Retrieved ${sapRecords.length} records from SAP S/4HANA backend system A4H.`;
                }

                return {
                    answer: answerText,
                    rawRecords: JSON.stringify(sapRecords)
                };
            }

            // Fallback for general questions
            return {
                answer: response.text || 'I could not process that request.',
                rawRecords: null
            };

        } catch (error) {
            console.error('[AI Copilot] Error:', error);
            return req.reject(500, `Execution Error: ${error.message}`);
        }
    });
};