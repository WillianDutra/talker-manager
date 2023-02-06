const crypto = require('crypto');

// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/g;
  return regex.test(email);
};

module.exports = { tokenGenerator, validateEmail };
