import express from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from './orderCRUD.js';

export const orderRouter = express.Router();

orderRouter.route('/').post(createOrder).get(getAllOrders);

orderRouter
  .route('/:id')
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);
