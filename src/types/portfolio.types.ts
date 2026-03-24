export interface PersonalInfo {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  bio: string[];
  email: string;
  github: string;
  linkedin: string;
  location: string;
  resumeUrl: string;
  available: boolean;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

export type ProjectType = 'real' | 'demo';

export interface ProjectLink {
  github?: string;
  live?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  type: ProjectType;
  links: ProjectLink;
  demoId?: string;     // if set, an "Open Demo" button renders on the card
  featured: boolean;
  highlights: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Tab {
  id: string;
  label: string;
}

export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
  location: string;
  availability: string;
}
