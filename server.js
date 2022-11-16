import express from 'express';
import process from 'process';

import apiRoutes from './routes/apiRoutes.js';

const app = express();

const port = process.env.PORT || 3000;
const staticFolder = 'client';

// Serve static website files
app.use(express.static(staticFolder));

// Import API routes
app.use('/api', apiRoutes);

// Define function which starts Nodejs server
async function bootServer() {
  try {
    app.listen(port, async () => {
      console.log(`Listening on: http//localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

// Start Nodejs server
bootServer();
