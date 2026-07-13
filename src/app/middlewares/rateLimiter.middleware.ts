import rateLimit from 'express-rate-limit';
import config from '../config';
import { sendNotification } from '../utils/sendNotification';

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
  skipSuccessfulRequests: true,
});

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: config.NODE_ENV === 'development' ? 100 : 5,
  statusCode: 429,
  message: {
    error:
      'Too many requests. Please wait a moment before using the AI assistant again.',
  },
  handler: (req, res, next, options) => {
    const ip =
      req.ip ||
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      'unknown';
    const timestamp = new Date().toISOString();
    console.log(`[Rate Limit Exceeded] IP: ${ip} at ${timestamp}`);

    sendNotification({
      name: 'Security System',
      email: 'system@portfolio.com',
      subject: 'AI Rate Limit Exceeded',
      message: `User at IP address ${ip} has exceeded the AI Assist rate limit and was blocked at ${timestamp}.`,
    }).catch((err) =>
      console.error('Failed to send rate limit notification:', err),
    );

    res.status(options.statusCode).json(options.message);
  },
});
