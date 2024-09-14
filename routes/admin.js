const express = require('express');
const router = express.Router();
const SECRET_KEY = 'your_secret_key';

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};


router.get('/', authenticateToken, (req, res) => {
    console.log(req.user.role);
    if (req.user.role !== "admin") {
      return res.status(403).send('Access denied');
    }
    res.send('Admin Page: Accessible by admin only');
});

module.exports = router;