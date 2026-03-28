// Lightweight runtime validation helpers for JSON Resume data
// These are intentionally minimal to avoid heavy validation logic.

export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

// Basic resume validator: all fields are optional; if provided, ensure top-level section types are arrays/objects as expected.
export function validateResumeObject(resume: any): boolean {
  if (resume == null) return true; // nothing to validate
  if (typeof resume !== 'object' || Array.isArray(resume)) return false;

  // Optional sections: ensure correct primitive types when present
  if (resume.basics != null && typeof resume.basics !== 'object') return false;
  if (resume.work != null && !Array.isArray(resume.work)) return false;
  if (resume.education != null && !Array.isArray(resume.education)) return false;
  if (resume.projects != null && !Array.isArray(resume.projects)) return false;
  if (resume.awards != null && !Array.isArray(resume.awards)) return false;
  if (resume.publications != null && !Array.isArray(resume.publications)) return false;
  if (resume.languages != null && !Array.isArray(resume.languages)) return false;
  if (resume.skills != null && !Array.isArray(resume.skills)) return false;
  if (resume.references != null && !Array.isArray(resume.references)) return false;
  if (resume.volunteers != null && !Array.isArray(resume.volunteers)) return false;
  if (resume.certificates != null && !Array.isArray(resume.certificates)) return false;
  if (resume.interests != null && !Array.isArray(resume.interests)) return false;

  // If interests is an array, ensure elements are strings (flexible but sane)
  if (resume.interests && resume.interests.some((i: any) => typeof i !== 'string')) return false;

  return true;
}
