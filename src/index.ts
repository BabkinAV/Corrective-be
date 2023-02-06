import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

import unitRoutes from './routes/unit';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server 1');
});

app.use('/unit', unitRoutes);




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});