const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readTalkerFile = async () => {
  const contentTalker = await fs.readFile(talkerPath);
  return JSON.parse(contentTalker);
};

// const writeNewTalker = async () => {
//   const contentTalker = 
// };

const getTalkerById = async (id) => {
  const contentTalker = await readTalkerFile();
  return contentTalker.find((talker) => talker.id === Number(id));
};

module.exports = { readTalkerFile, getTalkerById };
