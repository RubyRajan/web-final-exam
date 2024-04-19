import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = new Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  user: { type: String, required: true },
});

export const Cart = model('Cart', cartSchema);
