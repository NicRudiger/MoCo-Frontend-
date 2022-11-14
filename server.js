import express from 'express'

import apiRoutes from './routes/apiRoutes.js';

const app = express();

const port = process.env.PORT || 3000;
const staticFolder = 'client';

app.use(express.static(staticFolder));
app.use('/api', apiRoutes);

async function bootServer() {
  try {
    app.listen(port, async () => {
      console.log(`Listening on: http//localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

bootServer();
