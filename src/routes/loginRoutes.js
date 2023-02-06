const express = require('express');
const { tokenGenerator, validateEmail } = require('../utils/talkerLogin');

const login = express.Router();

login.post('/', (req, res) => {
 const { email, password } = req.body;
 const emailVerify = validateEmail(email);
 const token = tokenGenerator();
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailVerify) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token });
});

module.exports = login;