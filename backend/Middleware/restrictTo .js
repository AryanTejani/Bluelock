// In your middleware/authMiddleware.js file

import ApiError from '../Utils/ApiError.js';

/**
 * Middleware to restrict access to routes based on user roles
 * @param {...String} roles - The roles allowed to access the route
 * @returns {Function} Express middleware function
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if user exists and has a role property
    if (!req.user || !req.user.role) {
      return next(new ApiError('User not found or role not defined', 403));
    }
    
    // Check if user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You do not have permission to perform this action', 403)
      );
    }
    
    // If the user has the required role, proceed to the next middleware
    next();
  };
};

/**
 * Example of how to use both middleware functions together in routes:
 * 
 * router.get('/protected-route', protect, restrictTo('admin', 'agent'), (req, res) => {
 *   // Only admins and agents can access this route
 *   res.status(200).json({ success: true });
 * });
 */
