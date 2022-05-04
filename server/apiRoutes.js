import express from 'express';
import Pool from 'pg-pool';
const router = express.Router();

const connectStr = "postgres://caeltaetxhemre:fce0691b7d6c3ac33a16fd72ec7a4009ad74b3410385a6b75c488dc3ce39c157@ec2-34-194-158-176.compute-1.amazonaws.com:5432/de09islg90c56t"
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
    console.log(tf_recs.rows)
  });

router.get('/mpaa', async (req, res) => {
  const mpaa = await pool.query('SELECT * FROM mpaa')
  res.send(mpaa.rows)
  console.log(mpaa.rows)
});

router.get('/audit', async (req, res) => {
  const audit = await pool.query('SELECT * FROM audit')
  res.send(audit.rows)
  console.log(audit.rows)
});

export default router;