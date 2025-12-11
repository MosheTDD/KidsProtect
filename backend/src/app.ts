import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/error-handler.js';
import stateRoutes from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', stateRoutes);

app.use(errorHandler);

export default app;
