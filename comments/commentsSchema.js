import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  images: [{ type: String }],
  text: { type: String, required: true },
});

export const Comment = mongoose.model('Comment', commentSchema);
