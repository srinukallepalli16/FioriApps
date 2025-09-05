const connection = require('../model/db.js');

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM loginTable WHERE user_name = ? AND password = ?`;

    connection.exec(sql, [username, password], (err, rows) => {
        if (err) return res.status(500).send({ message: err.message });
        if (!rows || rows.length === 0) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const user = rows[0];
        res.send({
            message: 'Login Successful',
            role: user.role,
            name: user.user_name
        });
    });
};

/*
const jwt = require('jsonwebtoken');
const { connection } = require('../model/db'); // FIX path
exports.login = (req, res) => {
   const { username, password } = req.body;
   if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
   }
   const sql = `SELECT * FROM LOGINTABLE WHERE USER_NAME = ? AND PASSWORD = ?`;
   connection.exec(sql, [username, password], (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      if (rows.length === 0) return res.status(401).json({ message: 'Invalid username or password' });
      const user = rows[0];
      const token = jwt.sign(
         { id: user.ID, role: user.ROLE, name: user.USER_NAME },
         process.env.JWT_SECRET,
         { expiresIn: '1h' }
      );
      res.json({
         message: 'Login Successful',
         token,
         role: user.ROLE,
         name: user.USER_NAME
      });
   });
};
*/