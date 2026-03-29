import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/ApiError.js';

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  // Custom API errors
  if (err instanceof ApiError) {
    console.error('API error:', err.message, 'Details:', err.details);
    const payload: any = { ok: false, error: err.message };
    if (err.details) payload.details = err.details;
    return res.status(err.status).json(payload);
  }

  // Unknown/internal errors
  console.error('Unhandled error:', err);
  res.status(500).json({ ok: false, error: 'Internal Server Error' });
}
