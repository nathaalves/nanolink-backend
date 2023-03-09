import cors from 'cors';
import express from 'express';
import { router } from './routes/router';

const app = express();

app.use(cors());
app.use(express.json());

export { app };
