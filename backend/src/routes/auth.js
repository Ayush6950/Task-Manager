import express from 'express';
import { 
  register, 
  login, 
  refreshAccessToken, 
  logout, 
   getMe,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { 
  validateRegister, 
  validateLogin, 
  handleValidationErrors 
} from '../middlewares/validation.js';

const router = express.Router();

router.post(
  '/register', 
  authLimiter,
  validateRegister,
  handleValidationErrors,
  register
);

router.post(
  '/login', 
  authLimiter,
  validateLogin,
  handleValidationErrors,
  login
);

router.post('/refresh-token', refreshAccessToken);

router.post('/logout', authenticate, logout);

router.get('/me', authenticate, getMe);

export default router;