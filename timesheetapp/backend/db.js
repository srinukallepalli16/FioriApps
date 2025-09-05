const dotEnv = require('dotenv');
const hana = require('@sap/hana-client');


dotEnv.config();

const connection = hana.createConnection({
    serverNode:`${process.env.HANA_HOST}:${process.env.HANA_PORT}`,
    uid:`${process.env.HANA_USER}`,
    pwd:`${process.env.HANA_PASSWORD}`
})
module.exports = connection;