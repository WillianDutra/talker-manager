const express = require('express');
const {
  readTalkerFile, getTalkerById, filterWriteTalker, deleteUser,
} = require('../utils/talkerUtils');

const {
  checkToken, checkUser, checkAge, checkTalk, checkRate,
} = require('../middlewares/validateTalker');

const talker = express.Router();

talker.get('/', async (_req, res) => {
  try {
    const talkerList = await readTalkerFile();
    return res.status(200).json(talkerList);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

talker.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkerById = await getTalkerById(id);
    if (!talkerById) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerById);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

talker.post('/', checkToken, checkUser, checkAge, checkTalk, checkRate, async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    await filterWriteTalker({ name, age, talk }, 'post');
    const contentTalker = await readTalkerFile();
    const newTalker = { id: (contentTalker.length), name, age, talk };
    return res.status(201).json(newTalker);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

talker.put('/:id', checkToken, checkUser, checkAge, checkTalk, checkRate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    await filterWriteTalker({ name, age, talk, id: Number(id) }, 'put');
    res.status(200).json({ id: Number(id), name, age, talk });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

talker.delete('/:id', checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(Number(id));
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = talker;
