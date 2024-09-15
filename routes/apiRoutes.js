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

// Fetch all rows from 'mcpd_audit_history' table that have the given 'fid'
router.get('/mcpd_audit_history/:fid', async (req, res) => {
  try {
    const data = await db.mcpd_audit_history.findAll({
      where: {
        fid: req.params.fid,
      },
      order: [['history_date', 'DESC']],
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mcpd_audit_history');
  }
});

// Fetch all rows from 'mcpd_audit_comments' that have the given 'fid'
router.get('/mcpd_audit_comments/:fid', async (req, res) => {
  try {
    const data = await db.mcpd_audit_comments.findAll({
      where: {
        fid: req.params.fid,
      },
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mcpd_audit_comments');
  }
});

router.post('/mcpd_audit_new_comment', async (req, res) => {
  try {
    await db.mcpd_audit_comments
      .create({
        fid: req.body.fid,
        name: req.body.name,
        body: req.body.body,
      })
      .then((entry) => {
        if (entry) {
          res.send(entry);
        } else {
          res.status(400).send('Error inserting new row');
        }
      });
  } catch (e) {
    console.error(e);
    res.send('Error in POST /mcpd_audit_new_comment');
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

// Fetch all rows from 'mpaa_history' table that have the given 'fid'
router.get('/mpaa_history/:fid', async (req, res) => {
  try {
    const data = await db.mpaa_history.findAll({
      where: {
        fid: req.params.fid,
      },
      order: [['history_date', 'DESC']],
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mpaa_history');
  }
});

// Fetch all rows from 'mpaa_comments' that have the given 'fid'
router.get('/mpaa_comments/:fid', async (req, res) => {
  try {
    const data = await db.mpaa_comments.findAll({
      where: {
        fid: req.params.fid,
      },
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /mpaa_comments');
  }
});

router.post('/mpaa_new_comment', async (req, res) => {
  try {
    await db.mpaa_comments
      .create({
        fid: req.body.fid,
        name: req.body.name,
        body: req.body.body,
      })
      .then((entry) => {
        if (entry) {
          res.send(entry);
        } else {
          res.status(400).send('Error inserting new row');
        }
      });
  } catch (e) {
    console.error(e);
    res.send('Error in POST /mpaa_new_comment');
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

// Fetch all rows from 'tf_recs_history' table that have the given 'fid'
router.get('/tf_recs_history/:fid', async (req, res) => {
  try {
    const data = await db.tf_recs_history.findAll({
      where: {
        fid: req.params.fid,
      },
      order: [['history_date', 'DESC']],
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /tf_recs_history');
  }
});

// Fetch all rows from 'tf_recs_comments' that have the given 'fid'
router.get('/tf_recs_comments/:fid', async (req, res) => {
  try {
    const data = await db.tf_recs_comments.findAll({
      where: {
        fid: req.params.fid,
      },
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.send('Error in GET /tf_recs_comments');
  }
});

router.post('/tf_recs_new_comment', async (req, res) => {
  try {
    await db.tf_recs_comments
      .create({
        fid: req.body.fid,
        name: req.body.name,
        body: req.body.body,
      })
      .then((entry) => {
        if (entry) {
          res.send(entry);
        } else {
          res.status(400).send('Error inserting new row');
        }
      });
  } catch (e) {
    console.error(e);
    res.send('Error in POST /tf_recs_new_comment');
  }
});

export default router;
