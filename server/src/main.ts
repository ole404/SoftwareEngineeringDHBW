import express, { Express } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import treesRouter from './api/treeRod';
import { TreeStorage } from './services/treeStorage';
import path from 'path';

//load environment variables
dotenv.config();

const dbUrl = process.env.DB_URI as string;
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';
console.log(`Production Mode: ${isProd}`);

/**
 * Function for serving static assets
 * Allows in theory serving static without beeing in production mode.
 * However this should just be used for local testing of the serving function.
 * @param app Express app
 */
function serveStatic(app: Express) {
  // In production mode the static content should live inside a local './www' directory.
  // In development mode the static content is builded manually from the client
  // - that means it lives inside the client directory (again under 'www' directory) and can be empty!
  const staticContent = path.join(
    __dirname,
    isProd ? './www' : '../../client/www'
  );
  app.use(express.static(staticContent));
  app.get('*', (req, res) =>
    res.sendFile(path.join(staticContent, '/index.html'))
  );
  console.log(`Serve static content from ${staticContent}`);
}

async function main() {
  // wait until connected to the database
  await TreeStorage.connectDb(dbUrl).then(() => {
    console.log(`Connected to database at: ${dbUrl}`); // potentially unsafe expose of dbUrl in logs
  });

  // create express app
  const app = express();

  // enable cors in development mode since the client is run interactivly on seperate port -> cross reference
  if (!isProd) app.use(cors());

  // extend maximum body limit
  app.use(express.json({ limit: '16mb' }));

  // use router for api on '/trees'
  app.use('/trees', treesRouter);

  // serve static files from 'client' in production mode
  if (isProd) serveStatic(app);

  // run app as http-server and listen on specified port
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}

main();
