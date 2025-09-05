const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors')
const bodyparse = require('body-parser');
const hana = require('@sap/hana-client');
const db = require('./model/db.js');
const connectRoute = require('./routes/loginRoute.js');
dotEnv.config();
const app = express();
app.use(cors());
app.use(bodyparse.json());
db.connect((err)=>{
    if(err){
        console.log('Error while connecting HANA DB',err);
    }
    else{
        console.log("Connected to HANA DB Successfully");
    }
})
app.use('/api',connectRoute);
const PORT = process.env.PORT || 1234;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})


