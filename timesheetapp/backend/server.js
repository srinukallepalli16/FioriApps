const express = require('express');
const dotEnv = require('dotenv');
const hana = require('@sap/hana-client');
const db = require('./db.js');
const cors = require('cors');
const useRoute = require('./routes/userRoute.js');

const app = express();
app.use(cors());
dotEnv.config();

db.connect((err)=>{
    if(err){
        console.log('Error while connecting HANA DB',err);
    }
    else{
        console.log('HANA DB connected Succesfully ');
    }
})
app.use('/api',useRoute);

const PORT = process.env.PORT| 1234;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})
