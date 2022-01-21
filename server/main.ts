import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import trees from './TreeRod';

const app = express();

//load environment variables
dotenv.config();

const port = process.env.PORT;

app.use('/trees', trees);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
