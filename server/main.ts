import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';

const app = express();

//load environment variables
dotenv.config();

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
