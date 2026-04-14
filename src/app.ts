import express from 'express';
import ideaRoutes from './routes/idea.routes';

const app = express();

app.use(express.json());

app.use('/ideas', ideaRoutes);

export default app;