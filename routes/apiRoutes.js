import express from 'express';

import db from '../database/init.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello!');
});

export default router;
