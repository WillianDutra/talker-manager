const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readTalkerFile = async () => {
  const contentTalker = await fs.readFile(talkerPath);
  return JSON.parse(contentTalker);
};

const writeNewTalker = async (newTalker) => {
  const contentTalker = await readTalkerFile();
  const newTalkerId = (contentTalker.length + 1);
  const talkerWithId = { id: newTalkerId, ...newTalker };
  const newTalkerData = JSON.stringify([talkerWithId, ...contentTalker]);
  await fs.writeFile(talkerPath, newTalkerData, 'utf-8', { flag: 'wx' });
};

const getTalkerById = async (id) => {
  const contentTalker = await readTalkerFile();
  return contentTalker.find((talker) => talker.id === Number(id));
};

module.exports = { readTalkerFile, writeNewTalker, getTalkerById };
