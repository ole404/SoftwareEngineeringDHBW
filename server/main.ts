import { Request, Response, } from "express";
import express from "express";

const app = express();

//load environment variables
require('dotenv').config();

const port = process.env.PORT

app.get('/', (req:Request, res: Response ) => {
  res.send('Hello World!');
})

app.listen(port, () => {console.log(`Listening on ${port}`);})
