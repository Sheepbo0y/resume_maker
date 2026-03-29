import { Request, Response, NextFunction } from 'express';
import { isEmailValid, isPasswordStrong } from '../validators.js';
import { ApiError } from '../../errors/ApiError.js';

// Validation middleware for user registration
export function validateRegistration(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body || {};
  const errors: string[] = [];

  if (!isEmailValid(email)) {
    errors.push('Invalid email format');
  }
  if (!isPasswordStrong(password)) {
    errors.push('Password must be at least 8 characters, include uppercase, lowercase and a digit');
  }

  if (errors.length > 0) {
    return next(new ApiError('Validation failed', 400, { errors }));
  }
  next();
}

export default validateRegistration;
