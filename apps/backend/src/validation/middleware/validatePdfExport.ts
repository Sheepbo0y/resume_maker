import { Request, Response, NextFunction } from 'express';
import { isResumeDataValid, isTemplateNameValid } from '../validators.js';
import { ApiError } from '../../errors/ApiError.js';

export function validatePdfExport(req: Request, res: Response, next: NextFunction) {
  const { resume, template = 'default' } = req.body || {};
  const errors: string[] = [];

  if (!resume || typeof resume !== 'object') {
    errors.push('Missing or invalid resume data');
  } else if (!isResumeDataValid(resume)) {
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

export default validatePdfExport;
