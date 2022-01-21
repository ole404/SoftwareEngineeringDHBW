import express from 'express';
import dotenv from 'dotenv';
import trees from './TreeRod';
import { TreeService } from './TreeService';
import bodyParser from 'body-parser';

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

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
