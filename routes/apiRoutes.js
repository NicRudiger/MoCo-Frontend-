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

// Fetch all rows from 'mpaa_history' table that have the given 'mpaa_id'
router.get('/mpaa_history/:mpaa_id', async (req, res) => {
  try {
    const data = await db.mpaa_history.findAll({
      where: {
        mpaa_id: req.params.mpaa_id,
      },
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mpaa_history');
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

// Fetch all rows from 'tf_recs_history' table that have the given 'tf_recs_id'
router.get('/tf_recs_history/:tf_recs_id', async (req, res) => {
  try {
    const data = await db.tf_recs_history.findAll({
      where: {
        tf_recs_id: req.params.tf_recs_id,
      },
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /tf_recs_history');
  }
});

// Insert new comment into one of the comments tables
router.post('/comment', async (req, res) => {
  try {
    console.log(req.body);
    const table = req.body.table;
    const id = req.body.id;
    const name = req.body.name;
    const body = req.body.body;

    if (table == 'mcpd_audit') {
      await db.mcpd_audit_comments.create({
        audit_id: id,
        name: name,
        body: body,
      });
    }

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.send('Error in POST /comment');
  }
});

export default router;
