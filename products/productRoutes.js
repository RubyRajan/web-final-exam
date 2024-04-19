import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from './productCRUD.js';

export const productRouter = express.Router();

productRouter.route('/').get(getAllProducts).post(createProduct);

productRouter
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
