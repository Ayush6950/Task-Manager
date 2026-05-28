import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/errorHandler.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { createLogger } from './utils/logger.js';

import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';

dotenv.config();

const app = express();
const logger = createLogger('App');

/* -----------------------
   TRUST PROXY
   Only enable in production
------------------------ */

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

/* -----------------------
   GLOBAL MIDDLEWARES
------------------------ */

// Debug middleware (temporary)
app.use((req, res, next) => {
  console.log('------------- REQUEST DEBUG -------------');
  console.log('req.ip:', req.ip);
  console.log('x-forwarded-for:', req.headers['x-forwarded-for']);
  console.log('socket:', req.socket?.remoteAddress);
  console.log('connection:', req.connection?.remoteAddress);
  console.log('-----------------------------------------');

  next();
});

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiter
app.use('/api', apiLimiter);

/* -----------------------
   ROUTES
------------------------ */

// Health route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server running ✓',
    timestamp: new Date().toISOString(),
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Task routes
app.use('/api/tasks', taskRoutes);

/* -----------------------
   404 HANDLER
------------------------ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

/* -----------------------
   GLOBAL ERROR HANDLER
------------------------ */

app.use(errorHandler);

/* -----------------------
   APP START LOG
------------------------ */

logger.info('App initialized successfully');

export default app; 