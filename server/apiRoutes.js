import express from 'express';
import Pool from 'pg-pool';
const router = express.Router();

const connectStr = process.env.DATABASE_URL
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
    const tf_recs = await pool.query('SELECT * FROM tf_recs')
    res.send(tf_recs.rows)
  });

router.get('/mpaa', async (req, res) => {
  const mpaa = await pool.query('SELECT * FROM mpaa')
  res.send(mpaa.rows)
});

router.get('/audit', async (req, res) => {
  const audit = await pool.query('SELECT * FROM audit')
  res.send(audit.rows)
});

export default router;