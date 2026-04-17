import express from 'express';
import ideaRoutes from './routes/idea.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());

app.use('/ideas', ideaRoutes);
app.use('/auth', authRoutes);

export default app;