import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import trees from './TreeRod';
import { TreeService } from './TreeService';
import bodyParser from 'body-parser';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
console.log(`Production Mode: ${isProd}`);

// create express app
const app = express();

//load environment variables
dotenv.config();

// extend maximum body limit
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ limit: '16mb' }));
//use body-parser middleware
app.use(bodyParser.json());

if (!isProd) app.use(cors());

const port = process.env.PORT;

TreeService.initInstance(process.env.DB_URI as string);

app.use('/trees', trees);

const staticContent = path.join(
  __dirname,
  isProd ? './www' : '../../client/www'
);
app.use(express.static(staticContent));
app.get('*', (req, res) => {
  res.sendFile(path.join(staticContent, '/index.html'));
});
console.log(`Serve static content from ${staticContent}`);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
