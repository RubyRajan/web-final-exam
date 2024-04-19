import express from 'express';
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from './commentCRUD.js';

// Create a router
export const commentRouter = express.Router();

// Define the routes

commentRouter.route('/').get(getAllComments).post(createComment);

commentRouter
  .route('/:id')
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment);
