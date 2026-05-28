import rateLimit from 'express-rate-limit';

// Safe IP extractor
const getClientIp = (req) => {
  try {
    // x-forwarded-for
    const forwarded = req.headers['x-forwarded-for'];

    if (
      forwarded &&
      typeof forwarded === 'string' &&
      forwarded !== 'undefined'
    ) {
      const ip = forwarded.split(',')[0].trim();

      if (ip) {
        return ip;
      }
    }

    // Express IP
    if (req.ip && req.ip !== 'undefined') {
      return req.ip;
    }

    // Socket IP
    if (
      req.socket &&
      req.socket.remoteAddress &&
      req.socket.remoteAddress !== 'undefined'
    ) {
      return req.socket.remoteAddress;
    }

    // Connection IP
    if (
      req.connection &&
      req.connection.remoteAddress &&
      req.connection.remoteAddress !== 'undefined'
    ) {
      return req.connection.remoteAddress;
    }

    // Final fallback
    return '127.0.0.1';
  } catch (error) {
    console.error('IP Parse Error:', error);

    return '127.0.0.1';
  }
};

// Shared config
const commonConfig = {
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => {
    const ip = getClientIp(req);

    console.log('RateLimit IP:', ip);

    return ip;
  },
};

// General API limiter
export const apiLimiter = rateLimit({
  ...commonConfig,

  windowMs: 15 * 60 * 1000,
  max: 100,

  message: {
    success: false,
    message:
      'Too many requests from this IP, please try again later.',
  },
});

// Auth limiter
export const authLimiter = rateLimit({
  ...commonConfig,

  windowMs: 15 * 60 * 1000,
  max: 5,

  skipSuccessfulRequests: true,

  message: {
    success: false,
    message:
      'Too many authentication attempts, please try again later.',
  },
});

// Task limiter
export const createTaskLimiter = rateLimit({
  ...commonConfig,

  windowMs: 60 * 1000,
  max: 10,

  message: {
    success: false,
    message: 'Too many tasks created, please slow down.',
  },
});