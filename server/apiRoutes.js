import express from 'express';
import Pool from 'pg-pool';
const router = express.Router();

const connectStr = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectStr,
    ssl: true
});

router.get('/', (req, res) => {
    res.send('Welcome to the SSJC API');
  });

router.get('/tfrecs', async (req, res) => {
    try {
        pool.query("SELECT * FROM tf_recs", (results) => {
                res.json(results.rows);
                });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  });

  export default router;