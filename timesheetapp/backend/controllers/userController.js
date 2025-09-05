const db = require('../db.js');

const getUserList = async (req,res)=>{
   const userlist = `select * from loginTable`;
   db.exec(userlist,(err,data)=>{
    if(err){
        return res.status(500).send('Error Fetching table',error.message);
    }
    else{
        res.json(data)
    }
   })
};
module.exports= {getUserList};



