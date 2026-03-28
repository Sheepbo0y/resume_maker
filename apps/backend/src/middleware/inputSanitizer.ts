import { Request, Response, NextFunction } from 'express';

// Very lightweight input sanitizer: trim strings and escape basic HTML chars.
function sanitizeValue(val: any): any {
  if (typeof val === 'string') {
    // trim and minimal escaping
    return val.trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  } else if (Array.isArray(val)) {
    return val.map(sanitizeValue);
  } else if (val && typeof val === 'object') {
    const obj: any = {};
    for (const k in val) {
      obj[k] = sanitizeValue(val[k]);
    }
    return obj;
  }
  return val;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  next();
}

export default sanitizeInput;
