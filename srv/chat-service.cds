service ChatService @(path: '/api/chat') {
    action askCopilot(prompt: String, sessionId: String) returns {
        answer: String;
        rawRecords: String;
    };
}