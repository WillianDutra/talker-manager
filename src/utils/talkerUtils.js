const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readTalkerFile = async () => {
  const contentFile = await fs.readFile(talkerPath);
  return JSON.parse(contentFile);
};

module.exports = { readTalkerFile };
