import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import { router } from './routes/router';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

export { app };
