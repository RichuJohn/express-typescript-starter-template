import { Options } from 'express-rate-limit';
import { NodeEnv } from '../types/environment';

export const rateLimitConfig: Partial<Options> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === NodeEnv.Production ? 100 : 1000, // Stricter in production
  standardHeaders: true,
  legacyHeaders: false,
  skip: (_req) => process.env.NODE_ENV === NodeEnv.Test // Skip rate limiting in test environment
}; 