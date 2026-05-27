import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { createLogger } from '../utils/logger.js';
import { 
  ValidationError, 
  AuthenticationError, 
  ConflictError,
  NotFoundError 
} from '../utils/errors.js';
import { sanitizeUser } from '../utils/helpers.js';

const logger = createLogger('AuthController');

// Generate access token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      throw new ValidationError('All fields required');
    }

    if (password !== confirmPassword) {
      throw new ValidationError('Passwords do not match');
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    await user.addRefreshToken(refreshToken);

    logger.info('User registered', { userId: user._id, email: user.email });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error('Registration failed', { error: error.message });
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      throw new ValidationError('Email and password required');
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    await user.addRefreshToken(refreshToken);

    logger.info('User logged in', { userId: user._id, email: user.email });

    res.json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error('Login failed', { error: error.message });
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ValidationError('Refresh token required');
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new AuthenticationError('Invalid refresh token');
    }

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Check if refresh token exists
    if (!user.hasRefreshToken(refreshToken)) {
      throw new AuthenticationError('Refresh token not found');
    }

    // Generate new access token
    const accessToken = generateAccessToken(user._id);

    logger.info('Access token refreshed', { userId: user._id });

    res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    logger.error('Token refresh failed', { error: error.message });
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    if (refreshToken) {
      await user.removeRefreshToken(refreshToken);
    }

    logger.info('User logged out', { userId });

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    logger.error('Logout failed', { error: error.message });
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password -refreshTokens');
    if (!user) {
      throw new NotFoundError('User');
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
