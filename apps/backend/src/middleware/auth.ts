import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Simple JWT-based authentication middleware.
// If JWT_SECRET is not provided, middleware will allow requests for development convenience.
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET || '';
  const authHeader = req.headers['authorization'];
  if (!secret) {
    // Development: skip auth if no secret configured
    return next();
  }
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.substring(7);
  try {
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

export default authMiddleware;
