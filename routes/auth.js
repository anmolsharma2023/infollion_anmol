const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const SECRET_KEY = 'your_secret_key';
const users = [];


router.post('/register', async (req, res) => {
    const { username, password ,role } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Store new user
    users.push({ username, password: hashedPassword ,role});
    res.status(201).send('User registered');
});

router.post('/login', async (req, res) => {
    const { username, password,role } = req.body;

  // Find user
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // Check password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;

