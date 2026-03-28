// Simple validators for input validation according to OWASP guidelines (no external deps).

export function isEmailValid(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  // Basic RFC-like check with common patterns
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isPasswordStrong(password: unknown): boolean {
  if (typeof password !== 'string') return false;
  // At least 8 chars, one lowercase, one uppercase, one digit
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
}

export function isTemplateNameValid(name: unknown): boolean {
  if (typeof name !== 'string') return false;
  // Allow alphanumeric, dash, underscore, and spaces (optional)
  const re = /^[A-Za-z0-9_-]+(\s*[A-Za-z0-9_-]+)*$/;
  return re.test(name) && name.length <= 50;
}

export function isResumeDataValid(resume: unknown): boolean {
  // Basic structural validation to avoid crashing downstream.
  if (typeof resume !== 'object' || resume === null) return false;
  // We don't depend on a strict schema; ensure it's a JSON-like object.
  return true;
}
