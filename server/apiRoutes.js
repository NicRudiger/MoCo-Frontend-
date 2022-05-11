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