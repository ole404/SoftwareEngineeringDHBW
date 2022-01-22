import express from 'express';
import dotenv from 'dotenv';
import trees from './TreeRod';
import { TreeService } from './TreeService';
import bodyParser from 'body-parser';
import path from 'path';

// create express app
const app = express();

//load environment variables
dotenv.config();

// extend maximum body limit
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ limit: '16mb' }));
//use body-parser middleware
app.use(bodyParser.json());

const port = process.env.PORT;

TreeService.initInstance(process.env.DB_URI as string);

app.use('/trees', trees);

const isProd = process.env.NODE_ENV === 'production';
console.log(`Production Mode: ${isProd}`);
const staticContent = path.join(__dirname, isProd ? './www' : '../client/www');
console.log(`Serve static content from ${staticContent}`);
app.use(express.static(staticContent));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticContent, '/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
