import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

import unitRoutes from './routes/unit';
import instructionRoutes from './routes/instruction';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server 1');
});

app.use('/unit', unitRoutes);
app.use('/instruction', instructionRoutes);


// serve via http://url/static/

app.use('/static', express.static(path.join(__dirname, '..', 'public')));

console.log('localhost')




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);


});