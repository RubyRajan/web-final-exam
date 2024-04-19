import express from 'express';
import {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} from './cartCRUD.js';

export const cartRouter = express.Router();

cartRouter.route('/').post(createCartItem).get(getAllCartItems);

cartRouter
  .route('/:id')
  .get(getCartItemById)
  .put(updateCartItem)
  .delete(deleteCartItem);
