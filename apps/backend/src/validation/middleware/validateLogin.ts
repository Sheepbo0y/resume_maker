import { Request, Response, NextFunction } from 'express';
import { isEmailValid } from '../validators';
import { ApiError } from '../../errors/ApiError';

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body || {};
  const errors: string[] = [];

  if (!isEmailValid(email)) {
    errors.push('Invalid email format');
  }
  if (typeof password !== 'string' || password.length < 1) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return next(new ApiError('Validation failed', 400, { errors }));
  }
  next();
}

export default validateLogin;
