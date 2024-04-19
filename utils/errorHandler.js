// utils/errorHandler.js
export default function errorHandler(err, req, res, next) {
  console.error(err);

  // Handle specific error types if needed
  // For example, you might want to handle Mongoose validation errors or custom application errors differently

  // Default error response
  res.status(500).json({ error: 'Internal Server Error' });
}
