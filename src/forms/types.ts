export interface Basics {
  name: string
  label?: string
  email?: string
  phone?: string
  website?: string
  location?: string
  summary?: string
}

export interface WorkItem {
  company: string
  position?: string
  location?: string
  startDate?: string
  endDate?: string
  description?: string
  highlights?: string[]
}

export interface EducationItem {
  school: string
  area?: string
  degree?: string
  location?: string
  startDate?: string
  endDate?: string
  gpa?: string
  courses?: string[]
}

export interface Skill {
  name: string
  level?: string
  keywords?: string[]
}

export interface Project {
  name: string
  description?: string
  url?: string
  startDate?: string
  endDate?: string
  technologies?: string[]
}

export interface ResumeData {
  basics: Basics
  work: WorkItem[]
  education: EducationItem[]
  skills: Skill[]
  projects: Project[]
}
