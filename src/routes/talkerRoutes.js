const express = require('express');
const { readTalkerFile } = require('../utils/talkerUtils');

const talker = express.Router();

talker.get('/', async (_req, res) => {
  try {
    const talkerList = await readTalkerFile();
    res.status(200).json(talkerList);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = talker;
