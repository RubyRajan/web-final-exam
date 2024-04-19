import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  pricing: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
});

export const Product = mongoose.model('Product', productSchema);
