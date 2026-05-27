import jwt from 'jsonwebtoken';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('Auth');

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    logger.warn('Authentication failed', { error: error.message });
    if (error instanceof AuthenticationError) {
      return next(error);
    }
    next(new AuthenticationError(error.message));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AuthorizationError('Insufficient permissions');
    }
    next();
  };
};

export const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
    }
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};