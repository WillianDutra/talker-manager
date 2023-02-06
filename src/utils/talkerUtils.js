const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readTalkerFile = async () => {
  const contentTalker = await fs.readFile(talkerPath);
  return JSON.parse(contentTalker);
};

const writeTalker = async (talker) => {
  await fs.writeFile(talkerPath, talker, 'utf-8', { flag: 'wx' });
};

const getTalkerWithoutId = async (id) => {
  const contentTalker = await readTalkerFile();
  return contentTalker.filter((talker) => talker.id !== Number(id));
};

const filterWriteTalker = async (talker, method) => {
  if (method === 'put') {
    const withoutId = await getTalkerWithoutId(talker.id);
    await writeTalker(JSON.stringify([...withoutId, talker]));
    return;
  } if (method === 'post') {
    const contentTalker = await readTalkerFile();
    const newTalkerId = (contentTalker.length + 1);
    const talkerWithId = { id: newTalkerId, ...talker };
    await writeTalker(JSON.stringify([...contentTalker, talkerWithId]));
  }
};

const getTalkerById = async (id) => {
  const contentTalker = await readTalkerFile();
  return contentTalker.find((talker) => talker.id === Number(id));
};

const deleteUser = async (id) => {
  const withoutId = await getTalkerWithoutId(id);
  const allTalkers = JSON.stringify([withoutId]);
  await writeTalker(allTalkers);
};

module.exports = {
  readTalkerFile, filterWriteTalker, getTalkerById, getTalkerWithoutId, writeTalker, deleteUser,
};
