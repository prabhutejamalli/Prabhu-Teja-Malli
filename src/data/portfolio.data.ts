import type {
  PersonalInfo,
  NavLink,
  Stat,
  SkillCategory,
  Project,
  Experience,
  ContactData,
} from '../types/portfolio.types';

// ─── Personal ────────────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: 'Prabhu Teja Malli',
  firstName: 'Prabhu',
  title: 'Full Stack Developer',
  tagline: 'I build fast, clean & user-friendly web applications.',
  bio: [
    "Hi! I'm Prabhu Teja Malli, a passionate Full Stack Developer with a focus on React and TypeScript. I love turning complex problems into simple, beautiful, and intuitive web experiences.",
    'I care deeply about code quality, clean architecture, and delivering real business value. Whether it\'s a sleek landing page or a complex web app, I bring the same attention to detail to every project.',
  ],
  email: 'prabhutejamalli@gmail.com', // TODO: update if different
  github: 'https://github.com/prabhutejamalli',
  linkedin: 'https://linkedin.com/in/prabhutejamalli', // TODO: update with real LinkedIn URL
  location: 'India',
  resumeUrl: '#', // TODO: upload resume PDF to /public and link it here, e.g. '/resume.pdf'
  available: true,
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { id: 'about',    label: 'About',    href: '#about'    },
  { id: 'skills',   label: 'Skills',   href: '#skills'   },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact',  label: 'Contact',  href: '#contact'  },
];

// ─── Stats ───────────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  { value: '10+',  label: 'Projects Built'  },
  { value: '15+',  label: 'Technologies'    },
  { value: '20+',  label: 'GitHub Repos'    },
  { value: '100%', label: 'Client Focused'  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React'        },
      { name: 'TypeScript'   },
      { name: 'JavaScript'   },
      { name: 'HTML5'        },
      { name: 'CSS3'         },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js'    },
      { name: 'Express.js' },
      { name: 'REST APIs'  },
      { name: 'GraphQL'    },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB'    },
      { name: 'PostgreSQL' },
      { name: 'Firebase'   },
      { name: 'Redis'      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git'    },
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'Vercel' },
      { name: 'Figma'  },
    ],
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Freelance',                       // TODO: replace with actual company
    role: 'Full Stack Developer',
    period: '2024 — Present',
    location: 'Remote',
    current: true,
    description: [
      'Building full-stack web applications using React, TypeScript, and Node.js.',
      'Developing responsive, performance-optimised UIs and REST APIs.',
      'Collaborating with clients to understand requirements and deliver on time.',
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────
// type: 'real'  → shows under "Real Projects" tab
// type: 'demo'  → shows under "Demo Projects" tab

export const projects: Project[] = [

  // ── Real Projects ──────────────────────────────────────────────────────── //
  // TODO: Replace the placeholder below with your actual project details.
  {
    id: 'real-1',
    title: 'Your Project Title',
    description:
      'Describe your real project here — what problem it solves, who uses it, and the business impact it had. This is what clients will read first.',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    type: 'real',
    links: {
      github: 'https://github.com/prabhutejamalli', // TODO: add direct project repo link
      live:   '#',                                  // TODO: add live URL
    },
    featured: true,
    highlights: [
      'Key feature or achievement #1',
      'Key feature or achievement #2',
      'Key feature or achievement #3',
    ],
  },

  // ── Demo Projects ──────────────────────────────────────────────────────── //
  {
    id: 'demo-1',
    title: 'Canvas Editor',
    description:
      'A feature-rich drag-and-drop canvas editor built from scratch with React and TypeScript. Supports text, shapes, layers, undo/redo history, and automatic local-storage persistence.',
    techStack: ['React', 'TypeScript', 'CSS Modules', 'Vercel'],
    type: 'demo',
    links: {
      github: 'https://github.com/prabhutejamalli/newproject',
      live:   'https://newproject-r46xlqo8j-prabhu-teja-mallis-projects.vercel.app',
    },
    featured: true,
    highlights: [
      'Drag & resize elements with 8 handles',
      'Full undo / redo system',
      'Layer management panel',
      'Auto-saves to localStorage',
    ],
  },
  {
    id: 'demo-2',
    title: 'Portfolio Website',
    description:
      "This very portfolio, built with React, TypeScript, and CSS Modules following SOLID principles. Zero external UI libraries — all animations and layouts are hand-crafted CSS.",
    techStack: ['React', 'TypeScript', 'CSS Modules', 'Vercel'],
    type: 'demo',
    links: {
      github: 'https://github.com/prabhutejamalli/newproject',
      live:   '#',
    },
    featured: true,
    highlights: [
      'SOLID architecture with clean separation of concerns',
      'Data-driven — update content in one file',
      'Scroll-spy navigation & reveal animations',
      'Auto-deployed on every GitHub push',
    ],
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contactData: ContactData = {
  email:        personalInfo.email,
  github:       personalInfo.github,
  linkedin:     personalInfo.linkedin,
  location:     personalInfo.location,
  availability: 'Available for freelance & full-time opportunities',
};
