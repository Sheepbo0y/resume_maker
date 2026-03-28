import type { Basics } from './types'
import type { EducationItem, WorkItem, Skill, Project } from './types'

export const isEmail = (email: string): boolean => {
  const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return rx.test(email)
}

export const isPhone = (phone: string): boolean => {
  const rx = /^[+0-9.\-\s()]{7,}$/
  return rx.test(phone)
}

export const isDateLike = (v: string): boolean => {
  const rx1 = /^\d{4}-\d{2}$/
  const rx2 = /^\d{4}-\d{2}-\d{2}$/
  const rx3 = /^\d{4}$/
  return rx1.test(v) || rx2.test(v) || rx3.test(v)
}

export type ValidationErrors<T> = Partial<Record<keyof T, string>>

export const validateBasics = (b: Basics): ValidationErrors<Basics> => {
  const errors: ValidationErrors<Basics> = {}
  if (!b.name?.trim()) errors.name = 'Name is required'
  if (b.email && !isEmail(b.email)) errors.email = 'Invalid email format'
  if (b.phone && !isPhone(b.phone)) errors.phone = 'Invalid phone number'
  return errors
}

export const validateWorkItem = (w: WorkItem): string | null => {
  if (!w.company?.trim()) return 'Company is required'
  if (w.startDate && !isDateLike(w.startDate)) return 'Start date invalid (YYYY-MM or YYYY-MM-DD)'
  if (w.endDate && !isDateLike(w.endDate)) return 'End date invalid'
  return null
}

export const validateEducationItem = (e: EducationItem): string | null => {
  if (!e.school?.trim()) return 'School is required'
  if (e.startDate && !isDateLike(e.startDate)) return 'Start date invalid'
  if (e.endDate && !isDateLike(e.endDate)) return 'End date invalid'
  return null
}

export const validateSkill = (s: Skill): string | null => {
  if (!s.name?.trim()) return 'Skill name required'
  return null
}

export const validateProject = (p: Project): string | null => {
  if (!p.name?.trim()) return 'Project name required'
  if (p.startDate && !isDateLike(p.startDate)) return 'Start date invalid'
  if (p.endDate && !isDateLike(p.endDate)) return 'End date invalid'
  return null
}
