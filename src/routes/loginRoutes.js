const express = require('express');
const { tokenGenerator, validateEmail } = require('../utils/talkerLogin');

const login = express.Router();
login.use(express.json());

login.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const emailVerify = validateEmail(email);
  if (!emailVerify) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = tokenGenerator();
  return res.status(200).json({ token });
});

module.exports = login;