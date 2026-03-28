// JSON Resume (v1.0.0) TypeScript typings
// This file defines a strict-but-optional shape that aligns with the JSON Resume schema.
// All fields are optional to stay compatible with the standard where fields may be omitted.

// Top-level resume root
export interface Resume {
  // Optional schema reference per JSON Resume spec
  $schema?: string;
  // Core sections (all optional as per the standard)
  basics?: Basics;
  work?: Work[];
  volunteer?: Volunteers[]; // singular form in spec, kept for compatibility
  volunteers?: Volunteers[]; // alternative plural form
  education?: Education[];
  awards?: Awards[];
  publications?: Publications[];
  projects?: Projects[];
  languages?: Languages[];
  skills?: Skills[];
  references?: References[];
  interests?: string[];
  certificates?: Certificates[];
  // Optional metadata can be attached if needed by the app
  metadata?: Record<string, any>;
}

// Basic information block
export interface Basics {
  name?: string;
  label?: string; // professional title
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
}

export interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  countryCode?: string;
}

export interface Profile {
  network?: string; // e.g., "LinkedIn", "GitHub"
  username?: string;
  url?: string;
}

// Work experience
export interface Work {
  company?: string;
  position?: string;
  location?: string;
  startDate?: string; // ISO-8601 or YYYY-MM format
  endDate?: string; // ISO-8601 or YYYY-MM format
  summary?: string;
  highlights?: string[];
  website?: string;
}

// Education background
export interface Education {
  institution?: string;
  area?: string;
  studyType?: string; // e.g., "Bachelor", "MSc"
  location?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  courses?: string[];
}

// Projects
export interface Projects {
  name?: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  type?: string;
}

// Skills
export interface Skills {
  name?: string;
  level?: string;
  keywords?: string[];
}

// Languages
export interface Languages {
  language?: string;
  fluency?: string; // e.g., " native", " fluent", "conversational"
}

// References
export interface References {
  name?: string;
  reference?: string;
  contact?: {
    email?: string;
    phone?: string;
    url?: string;
  };
}

// Interests
// Represent interests as a list of simple entries (name). This keeps a strict interface per the requirement.
export interface Interests {
  name?: string;
}

// Awards
export interface Awards {
  title?: string;
  date?: string;
  awarder?: string;
  summary?: string;
}

// Publications
export interface Publications {
  name?: string;
  publisher?: string;
  releaseDate?: string;
  url?: string;
  authors?: string;
  summary?: string;
}

// Volunteers
export interface Volunteers {
  organization?: string;
  position?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
  website?: string;
}

// Certificates
export interface Certificates {
  name?: string;
  date?: string;
  issuer?: string;
  url?: string;
}

// Backward-compat simple alias to keep existing code working if only PersonalInfo existed before
export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface ResumeSection {
  title: string;
  content: string;
}
