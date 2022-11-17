import express from 'express';

import db from '../database/init.js';

const router = express.Router();

// Respond with a simple hello world!
router.get('/', (req, res) => {
  res.send('Hello!');
});

// Fetch all rows from 'mcpd_audit' table
router.get('/mcpd_audit', async (req, res) => {
  try {
    const data = await db.mcpd_audit.findAll();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mcpd_audit');
  }
});

// Fetch all rows from 'mcpd_audit_history' table that have the given 'audit_id'
router.get('/mcpd_audit_history/:audit_id', async (req, res) => {
  try {
    const data = await db.mcpd_audit_history.findAll({
      where: {
        audit_id: req.params.audit_id,
      },
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mcpd_audit_history');
  }
});

// Fetch all rows from 'mpaa' table
router.get('/mpaa', async (req, res) => {
  try {
    const data = await db.mpaa.findAll();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mpaa');
  }
});

// Fetch all rows from 'tf_recs' table
router.get('/tf_recs', async (req, res) => {
  try {
    const data = await db.tf_recs.findAll();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /tf_recs');
  }
});

export default router;
