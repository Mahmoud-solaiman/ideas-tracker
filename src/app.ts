import express from 'express';
import ideaRoutes from './routes/idea.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import cors  from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use(errorHandler);
app.use('/ideas', ideaRoutes);
app.use('/auth', authRoutes);

export default app;