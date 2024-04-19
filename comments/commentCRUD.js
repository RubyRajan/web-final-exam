import { Comment } from './commentsSchema.js';

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a comment by ID
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (comment) {
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
