import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { securityHeaders } from './middleware/securityHeaders.js';
import rateLimiter from './middleware/rateLimiter.js';
import { sanitizeInput } from './middleware/inputSanitizer.js';

const app = express();

// Security and performance defaults
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(securityHeaders);
app.use(rateLimiter);
app.use(sanitizeInput);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
  } else {
    next();
  }
});

app.use('/api', routes);
app.use(errorMiddleware);

export default app;
