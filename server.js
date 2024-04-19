import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './utils/errorHandler.js';
import { productRouter } from './products/productRoutes.js';
import { userRouter } from './users/userRoutes.js';
import { commentRouter } from './comments/commentRoutes.js';
import { cartRouter } from './carts/cartRoutes.js';
import { orderRouter } from './orders/orderRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

app.use(cors());

app.use(express.static('public'));

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error?.message}`);
  });

app.use('/products', productRouter);

app.use('/users', userRouter);

app.use('/comments', commentRouter);

app.use('/cart', cartRouter);

app.use('/orders', orderRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Ruby' });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4050;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
