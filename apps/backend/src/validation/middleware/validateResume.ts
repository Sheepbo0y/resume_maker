import { Request, Response, NextFunction } from 'express';
import { isResumeDataValid, isTemplateNameValid } from '../validators.js';
import { ApiError } from '../../errors/ApiError.js';

export function validateResume(req: Request, res: Response, next: NextFunction) {
  const data = req.body?.resume || req.body;
  const template = (req.body?.template ?? 'default') as string;
  const errors: string[] = [];

  if (!isResumeDataValid(data)) {
    errors.push('Invalid resume data');
  }
  if (!isTemplateNameValid(template)) {
    errors.push('Invalid template name');
  }

  if (errors.length > 0) {
    return next(new ApiError('Validation failed', 400, { errors }));
  }
  next();
}

export default validateResume;
