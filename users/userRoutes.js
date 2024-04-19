import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  signIn,
  signUp,
} from './userCRUD.js';

export const userRouter = express.Router();

userRouter.route('/signup').post(signUp);

userRouter.route('/signin').post(signIn);

userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

userRouter.route('/').post(createUser).get(getAllUsers);
