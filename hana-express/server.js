const express = require('express');
const dotEnv = require('dotenv');
const hana = require('@sap/hana-client');
const cors = require('cors');


const app = express();
app.use(cors()); 
app.use(express.json());
dotEnv.config();
const connParam = hana.createConnection({
    serverNode:`${process.env.HANA_HOST}:${process.env.HANA_PORT}`,
    uid:process.env.HANA_USER,
    pwd:process.env.HANA_PASSWORD
})
connParam.connect((err)=>{
  if(err){
    console.log("Error while connecting to HANA DB",err);
  }
  else{
    console.log("Connected to HANA DB");
  }
})
app.get('/employee',(req,res)=>{
   const sql = `SELECT * from employee`;
   connParam.exec(sql,(err,data)=>{
    if(err){
      return res.status(500).send('error fetching the employee',err.message);
    }
    res.json(data);
   })
})
app.get('/home',(req,res)=>{
  res.send("Hi Srinivas");
  res.end();
})
app.get('/about',(req,res)=>{
    res.send("This is the About Page Srinivas");
    res.end();
})
app.listen(1234,()=>{
    console.log("Server started");
})
/*
const hanaConn = hana.createConnection({
    serverNode:process.env.HANA_NAME,
    uui:process.env.HANA_USER,
    pwd:process.env.HANA_PASSWORD
});
const connParams ={
    serverNode:process.env.HOST_NAME,
    uui:process.env.HANA_USER,
    pwd:process.env.HANA_PASSWORD
}
hanaConn.connect((error1)=>{
    try{
      if(error1){
        console.log("Error while connecting HANA DB");
      }
      else{
        console.log("COnnected to HANA DB");
      }
    }
   catch(err){
    console.log(err);
   }
})
   */

//============================================================
/*
// require('dotenv').config();
const dotEnv = require('dotenv');
const express = require('express');
const hana = require('@sap/hana-client');

dotEnv.config();
const app = express();
// app.use(express.json());

const conn = hana.createConnection();
conn.connect({
    serverNode: `${process.env.HANA_HOST}:${process.env.HANA_PORT}`,
    uid: process.env.HANA_USER,
    pwd: process.env.HANA_PASSWORD
}, (err) => {
    if (err) {
        console.error('Error connecting to HANA:', err);
    } else {
        console.log('Connected to SAP HANA Cloud');
    }
});
app.listen(3000, () => console.log('Server running on port 3000'));
*/


/*




const express = require('express');
const dotEnv = require('dotenv');
const hana = require('@sap/hana-client');

const app = express();
dotEnv.config();

const conn = hana.createConnection(); // Create the connection object

// Connect to HANA DB
conn.connect({
    serverNode: `${process.env.HANA_HOST}:${process.env.HANA_PORT}`,
    uid: process.env.HANA_USER,
    pwd: process.env.HANA_PASSWORD
}, (err) => {
    if (err) {
        console.error("Error while connecting to HANA DB", err);
    } else {
        console.log("Connected to HANA DB");
    }
});

// Employee route
app.get('/employee', (req, res) => {
    const sql = 'SELECT * from employee';
    conn.exec(sql, (err, data) => {
        if (err) {
            return res.status(500).send('Error fetching employee data: ' + err.message);
        }
        res.json(data);
    });
});

// Server listener
app.listen(1234, () => {
    console.log("Server started on port 1234");
});
*/