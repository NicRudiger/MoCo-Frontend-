import express from 'express';

import db from '../database/init.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello!');
});

router.get('/mcpd_audit', async (req, res) => {
  try {
    const data = await db.mcpd_audit.findAll();
    res.json(data)
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mcpd_audit')
  }
});

export default router;
