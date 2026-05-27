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
   GLOBAL MIDDLEWARES
------------------------ */

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
app.use('/api/', apiLimiter);

/* -----------------------
   ROUTES
------------------------ */

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

/* -----------------------
   HEALTH CHECK
------------------------ */

app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server running ✓',
    timestamp: new Date().toISOString(),
  });
});

/* -----------------------
   404 HANDLER (FIXED)
   ❌ DO NOT use app.use('*')
------------------------ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

/* -----------------------
   ERROR HANDLER
------------------------ */

app.use(errorHandler);

logger.info('App initialized');

export default app;