import express from 'express';
//import authRoutes from './routes/auth.routes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Endpoint GET para "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});

//app.use('/api/auth', authRoutes);

export default app;