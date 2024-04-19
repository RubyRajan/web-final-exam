import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  creditCardNumber: {
    type: String,
    required: true,
  },
  creditCardExpiry: {
    type: String,
    required: true,
  },
  creditCardCvv: {
    type: String,
    required: true,
  },
});

export const Order = mongoose.model('Order', orderSchema);
