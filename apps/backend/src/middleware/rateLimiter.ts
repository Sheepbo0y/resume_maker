import { Request, Response, NextFunction } from 'express';

// Very simple in-memory rate limiter: limit number of requests per IP per window
type Entry = { count: number; reset: number };
const windowMs = 15 * 60 * 1000; // 15 minutes
const maxRequests = 100; // per IP per window
const map = new Map<string, Entry>();

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress || '0.0.0.0';
  const now = Date.now();
  const entry = map.get(ip);
  if (!entry) {
    map.set(ip, { count: 1, reset: now + windowMs });
    return next();
  }
  if (now > entry.reset) {
    // window reset
    map.set(ip, { count: 1, reset: now + windowMs });
    return next();
  }
  if (entry.count >= maxRequests) {
    res.status(429).json({ ok: false, error: 'Too many requests' });
  } else {
    entry.count += 1;
    next();
  }
}

export default rateLimiter;
