import { Request, Response, NextFunction } from 'express';
import { NodeEnv } from '../types/environment';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === NodeEnv.Production ? 'Something went wrong!' : err.message
  });
}; 