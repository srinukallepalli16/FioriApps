const express = require('express');
const router = express.Router();
const userList = require('../controllers/userController.js')

router.get('/userlist',userList.getUserList);
module.exports = router;

