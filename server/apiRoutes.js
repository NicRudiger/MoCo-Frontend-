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

router.get('/tfrecs/:rec_id/:comment', async (req, res) => {
  const updateRecs = async (comment, rec_id) => {
    const query = `UPDATE "tf_recs" 
                   SET "ssjc_comments" = $1
                   WHERE "action" = $2`;
    try {
        await pool.query(query, [comment, rec_id]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }
  updateRecs(req.params.comment, req.params.rec_id).then(result => {  // userName, userRole, userId
    if (result) {
        console.log(result);
    }
});
});

export default router;