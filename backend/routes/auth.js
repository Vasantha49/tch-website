const express = require('express');
const fs = require('fs');
const router = express.Router();
const users = require('../db/users.json');
const jwt = require('jsonwebtoken');

const SECRET = "TCH_SECRET_KEY";

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: "member"
  };

  users.push(newUser);
  fs.writeFileSync('./db/users.json', JSON.stringify(users, null, 2));

  res.json({ message: "Signup successful" });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1d" });

  res.json({ token, user });
});

module.exports = router;