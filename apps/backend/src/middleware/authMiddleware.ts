import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';

// Simple Bearer token authentication middleware
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
      return res.status(401).json({ ok: false, message: 'Unauthorized' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ ok: false, message: 'Unauthorized' });
    }

    const token = parts[1];
    const authService = new AuthService();
    const payload = await authService.verifyToken(token);
    // Attach user info to request for downstream handlers
    (req as any).user = payload;
    next();
  } catch (err) {
    res.status(401).json({ ok: false, message: 'Unauthorized' });
  }
}

export default authMiddleware;
