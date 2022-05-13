import express from 'express';
import Pool from 'pg-pool';
const router = express.Router();

const connectStr = `postgres://caeltaetxhemre:fce0691b7d6c3ac33a16fd72ec7a4009ad74b3410385a6b75c488dc3ce39c157@ec2-34-194-158-176.compute-1.amazonaws.com:5432/de09islg90c56t`
const pool = new Pool({
    connectionString: connectStr,
    ssl: {
        rejectUnauthorized: false
      }
});

router.get('/', (req, res) => {
    res.send('Welcome to the SSJC API');
  });

router.get('/tfrecs', async (req, res) => {
    const tf_recs = await pool.query('SELECT * FROM tf_recs ORDER BY action_id ASC')
    res.send(tf_recs.rows)
  });

router.get('/mpaa', async (req, res) => {
  const mpaa = await pool.query('SELECT * FROM mpaa ORDER BY mpaa_id ASC')
  res.send(mpaa.rows)
});

router.get('/audit', async (req, res) => {
  const audit = await pool.query('SELECT * FROM audit ORDER BY audit_id ASC')
  res.send(audit.rows)
});

router.get('/tfrecs/:rec_id/:comment', async (req, res) => {
  const text = 'UPDATE tf_recs SET ssjc_comments = $1 WHERE action_id = $2 RETURNING *'
  const values = [req.params.comment, req.params.rec_id]
  try {
    const update = await pool.query(text, values)
    console.log(update.rows[0])
    res.send(update.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
});

router.get('/mpaa/:rec_id/:comment', async (req, res) => {
  const text = 'UPDATE mpaa SET ssjc_comments = $1 WHERE mpaa_id = $2 RETURNING *'
  const values = [req.params.comment, req.params.rec_id]
  try {
    const update = await pool.query(text, values)
    console.log(update.rows[0])
    res.send(update.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
});

router.get('/audit/:rec_id/:comment', async (req, res) => {
  const text = 'UPDATE audit SET ssjc_comments = $1 WHERE audit_id = $2 RETURNING *'
  const values = [req.params.comment, req.params.rec_id]
  try {
    const update = await pool.query(text, values)
    console.log(update.rows[0])
    res.send(update.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
});

export default router;