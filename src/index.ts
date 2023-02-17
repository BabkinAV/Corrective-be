import express, { Express, Request, Response,  ErrorRequestHandler   } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { json } from 'body-parser';
import cors from 'cors';

import unitRoutes from './routes/unit';
import instructionRoutes from './routes/instruction';
import authRoutes from './routes/auth';

export class StatusError extends Error {
  statusCode?: number;
  data?: string;
}



dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectDB();

app.use(json());
app.use(cors());



app.use('/auth', authRoutes);

app.use('/unit', unitRoutes);
app.use('/instruction', instructionRoutes);


// serve via http://url/static/

app.use('/static', express.static(path.join(__dirname, '..', 'public')));

console.log('localhost');

const errorHandler: ErrorRequestHandler = (
  error: StatusError,
  req,
  res,
  next
) => {
  console.log(error);
  const status = error.statusCode ?? 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
};

app.use(errorHandler);




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);


});