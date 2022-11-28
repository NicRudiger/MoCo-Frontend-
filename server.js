import bodyParser from 'body-parser';
import express from 'express';
import process from 'process';

import apiRoutes from './routes/apiRoutes.js';

const port = process.env.PORT || 3000;
const staticFolder = 'client';

const app = express();

// Use body-parser to process form data
app.use(bodyParser.urlencoded({ extended: false }));

// Import API routes
app.use('/api', apiRoutes);

// Serve static website files
app.use(express.static(staticFolder));

async function main() {
  try {
    app.listen(port, async () => {
      console.log(`Listening on: http//localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

// Start Nodejs server
main();
