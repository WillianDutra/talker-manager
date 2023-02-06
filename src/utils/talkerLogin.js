const fs = require('fs').promises;
const crypto = require('crypto');
const path = require('path');

const talkerLoginPath = path.resolve(__dirname, '../talkerLogin.json');

const readLoginFile = async () => {
  const contentLogin = await fs.readFile(talkerLoginPath);
  return JSON.parse(contentLogin);
};

const writeNewLogin = async (newLogin) => {
  const contentLogin = await readLoginFile();
  const newLoginData = JSON.stringify([newLogin, ...contentLogin]);
 await fs.writeFile(talkerLoginPath, newLoginData, 'utf-8', { flag: 'wx' });
};

// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/g;
  return regex.test(email);
};

module.exports = { readLoginFile, writeNewLogin, tokenGenerator, validateEmail };
