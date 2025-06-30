import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products.routes';
import discountRoutes  from './routes/discount.routes';
import salesRoutes from './routes/sale.routes';
import { AppDataSource } from './database/data-source';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/discounts', discountRoutes);
app.use("/api/sales", salesRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

export default app;