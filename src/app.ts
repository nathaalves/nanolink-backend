import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { router } from './routes/router';
import { errorHandler } from './middlewares/errorHandler';
import { options } from './config/cors';
import { validateOrigin } from './middlewares/validateOrigin';

const app = express();

app.use(validateOrigin);

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(errorHandler);

export { app };
