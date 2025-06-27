import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Endpoint GET para "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/auth', authRoutes);

export default app;