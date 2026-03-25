import type {
  PersonalInfo,
  NavLink,
  Stat,
  SkillCategory,
  Project,
  Experience,
  Education,
  ContactData,
} from '../types/portfolio.types';

// ─── Personal ────────────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: 'Prabhu Teja Malli',
  firstName: 'Prabhu',
  title: 'Frontend Developer',
  tagline: 'Building responsive, high-performance web apps with React.js & TypeScript.',
  bio: [
    'Frontend Developer with 6+ years of experience designing and building responsive, high-performance web applications using React.js, Next.js, Redux, JavaScript, and TypeScript.',
    'Skilled in UI/UX optimization, reusable component design, and state management. Proven track record of mentoring developers, collaborating with cross-functional teams, and delivering scalable solutions aligned with business goals in Agile environments.',
  ],
  email: 'prabhutejamalli@gmail.com',
  github: 'https://github.com/prabhutejamalli',
  linkedin: 'https://www.linkedin.com/in/prabhu-teja-malli-207a3b276',
  location: 'Hyderabad, India',
  resumeUrl: '/resume.pdf', // TODO: drop your resume PDF into the /public folder
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
  { value: '6+',  label: 'Years Experience'    },
  { value: '3+',  label: 'Enterprise Projects'  },
  { value: '9',   label: 'Trainees Mentored'    },
  { value: '2',   label: 'Performance Wins'     },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend Development',
    icon: '⚛️',
    skills: [
      { name: 'React.js'          },
      { name: 'Next.js'           },
      { name: 'TypeScript'        },
      { name: 'JavaScript (ES6+)' },
      { name: 'HTML5'             },
      { name: 'CSS3'              },
    ],
  },
  {
    id: 'styling',
    label: 'UI/UX & Styling',
    icon: '🎨',
    skills: [
      { name: 'Tailwind CSS'   },
      { name: 'Material UI'    },
      { name: 'Bootstrap'      },
      { name: 'Responsive Design' },
      { name: 'Pixel-perfect UI'  },
    ],
  },
  {
    id: 'state',
    label: 'State & Data',
    icon: '🔄',
    skills: [
      { name: 'Redux'         },
      { name: 'Redux Thunk'   },
      { name: 'Redux Saga'    },
      { name: 'Context API'   },
      { name: 'RESTful APIs'  },
      { name: 'Axios'         },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Testing',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub'           },
      { name: 'Jest'                   },
      { name: 'React Testing Library'  },
      { name: 'Vite / Webpack'         },
      { name: 'Chrome DevTools'        },
      { name: 'Agile / Scrum'          },
    ],
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: 'exp-nationsbenfits',
    company: 'NationsBenefits India Pvt Ltd',
    role: 'Software Engineer — Frontend Developer',
    period: '2019 Dec — Present',
    location: 'Hyderabad (via Asics Technologies Pvt Ltd)',
    current: true,
    description: [
      'Developed responsive UI features using React.js (Next.js) + TypeScript for healthcare benefit workflows.',
      'Integrated REST APIs to manage user benefits, services, and healthcare data.',
      'Improved application performance through optimised state management using Redux.',
      'Collaborated with cross-functional teams to deliver scalable, user-friendly solutions.',
    ],
  },
  {
    id: 'exp-fertis',
    company: 'Fertis India Pvt Ltd (formerly Farmgate Technologies)',
    role: 'Software Engineer — Frontend Developer',
    period: '2019 Dec — Present',
    location: 'Hyderabad (via Asics Technologies Pvt Ltd)',
    current: false,
    description: [
      'Built React.js (Next.js) + TypeScript frontend modules for ENAM — a Govt. of India agricultural trading platform.',
      'Improved UI responsiveness by integrating Redux for state management and Material UI components.',
      'Worked closely with backend teams to integrate RESTful APIs, ensuring smooth data flow.',
      'Mentored junior developers in debugging and coding best practices through code reviews.',
    ],
  },
  {
    id: 'exp-quixy',
    company: 'Vivid Minds Technologies Pvt Ltd (Quixy)',
    role: 'Software Engineer — Frontend Developer',
    period: '2019 Dec — Present',
    location: 'Hyderabad (via Asics Technologies Pvt Ltd)',
    current: false,
    description: [
      'Built React.js + Redux interfaces for IDP — an Intelligent Document Processing automation platform.',
      'Developed reusable TypeScript components, reducing repetitive code and improving maintainability.',
      'Collaborated with UX designers to refine front-end workflows and improve user experience.',
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [

  // ── Real Projects ──────────────────────────────────────────────────────── //
  {
    id: 'real-nationsbenfits',
    title: 'Healthcare & Benefits Management Platform',
    description:
      'A large-scale healthcare benefits platform built for NationsBenefits India, helping users manage medical benefits, track services, and improve accessibility to healthcare resources across India.',
    techStack: ['React.js', 'Next.js', 'TypeScript', 'Redux', 'REST APIs', 'CSS3'],
    type: 'real',
    links: {
      github: undefined,
      live: undefined,
    },
    featured: true,
    highlights: [
      'Developed responsive UI for complex healthcare benefit workflows',
      'Integrated REST APIs for real-time benefits and services data',
      'Optimised Redux state management for improved app performance',
      'Delivered in a large cross-functional Agile team',
    ],
  },
  {
    id: 'real-enam',
    title: 'ENAM — Electronic National Agricultural Market',
    description:
      'A Govt. of India initiative connecting farmers and traders nationwide to buy and sell agricultural products efficiently. Worked on frontend modules that improved user navigation and platform performance.',
    techStack: ['React.js', 'Next.js', 'TypeScript', 'Redux', 'Material UI', 'REST APIs'],
    type: 'real',
    links: {
      github: undefined,
      live: undefined,
    },
    featured: true,
    highlights: [
      'Built Next.js + TypeScript frontend modules for a national govt. platform',
      'Integrated Material UI for faster, cleaner agricultural trading workflows',
      'Reduced rendering issues through clean RESTful API integration',
      'Mentored junior developers via code reviews and best practices',
    ],
  },
  {
    id: 'real-idp',
    title: 'IDP — Intelligent Document Processing',
    description:
      'A document automation platform at Quixy that extracts and processes data from unstructured documents like invoices, bills, and PDFs. Built the React frontend interfaces for the automation workflows.',
    techStack: ['React.js', 'TypeScript', 'Redux', 'JavaScript', 'HTML5', 'CSS3'],
    type: 'real',
    links: {
      github: undefined,
      live: undefined,
    },
    featured: true,
    highlights: [
      'Built React.js + Redux interfaces for document automation features',
      'Developed reusable TypeScript components reducing code repetition',
      'Collaborated with UX designers to refine user-facing workflows',
    ],
  },

  // ── Demo Projects ──────────────────────────────────────────────────────── //
  {
    id: 'demo-analytics',
    title: 'Analytics Dashboard',
    description:
      'A complete business analytics dashboard with real SVG charts (smooth bezier line chart & animated bar chart), live KPI cards with trend indicators, a transactions table, and top-products ranking — built entirely without any chart library.',
    techStack: ['React', 'TypeScript', 'SVG Charts', 'CSS Modules'],
    type: 'demo',
    demoId: 'analytics',
    links: { github: 'https://github.com/prabhutejamalli/Prabhu-Teja-Malli' },
    featured: true,
    highlights: [
      'Pure SVG line chart with smooth bezier curves & gradient fill',
      'Animated bar chart — no third-party chart library used',
      'KPI cards with live data toggle across Week / Month / Year',
      'Transactions table with colour-coded status badges',
    ],
  },
  {
    id: 'demo-kanban',
    title: 'Kanban Project Board',
    description:
      'A Trello-inspired project management board with native HTML5 drag-and-drop (zero external libraries). Cards move fluidly between five columns, can be created inline, deleted on hover, and filtered instantly by search.',
    techStack: ['React', 'TypeScript', 'HTML5 DnD API', 'CSS Modules'],
    type: 'demo',
    demoId: 'kanban',
    links: { github: 'https://github.com/prabhutejamalli/Prabhu-Teja-Malli' },
    featured: true,
    highlights: [
      'Native HTML5 drag-and-drop — no library needed',
      'Visual drop-zone glow highlight on drag-over',
      'Inline card creation with priority per column',
      'Progress bar tracks completion across all columns',
    ],
  },
  {
    id: 'demo-invoice',
    title: 'Invoice Generator',
    description:
      'A professional invoice generator with a split-panel design — dark form on the left, live styled invoice preview on the right that updates as you type. Auto-calculates 18% GST and generates a print-ready PDF via the browser Print API.',
    techStack: ['React', 'TypeScript', 'CSS Modules', 'Print API'],
    type: 'demo',
    demoId: 'invoice',
    links: { github: 'https://github.com/prabhutejamalli/Prabhu-Teja-Malli' },
    featured: true,
    highlights: [
      'Live invoice preview updates on every keystroke',
      'Dynamic line items — add / remove rows instantly',
      'Auto-calculates subtotal, 18% GST, and total',
      'Print-to-PDF via browser Print API with clean print CSS',
    ],
  },
  {
    id: 'demo-property',
    title: 'Property Listing App',
    description:
      'A real estate discovery app for Hyderabad properties — featuring a Buy / Rent toggle, real-time multi-filter search (type, price, beds), gradient property cards, save-to-favourites, and a full property detail modal with an enquiry CTA.',
    techStack: ['React', 'TypeScript', 'useMemo', 'CSS Modules'],
    type: 'demo',
    demoId: 'property',
    links: { github: 'https://github.com/prabhutejamalli/Prabhu-Teja-Malli' },
    featured: true,
    highlights: [
      'Buy / Rent toggle with context-aware price filters',
      'Multi-filter: property type + max price + min bedrooms',
      'Heart toggle saves properties with instant UI feedback',
      'Animated detail modal with enquiry confirmation toast',
    ],
  },
  {
    id: 'demo-ecommerce',
    title: 'E-Commerce Store',
    description:
      'A fully functional shopping app with product search, category filters, cart management, quantity controls, and order checkout — all built with React hooks and useReducer.',
    techStack: ['React', 'TypeScript', 'useReducer', 'CSS Modules'],
    type: 'demo',
    demoId: 'ecommerce',
    links: { github: 'https://github.com/prabhutejamalli/Prabhu-Teja-Malli' },
    featured: true,
    highlights: [
      'Real-time product search & category filters',
      'Cart with add / remove / quantity controls',
      'Animated cart drawer with order total',
      'useReducer for scalable cart state management',
    ],
  },
  {
    id: 'demo-taskmanager',
    title: 'Task Manager',
    description:
      'A productivity app to create, prioritise, and track tasks. Supports High / Medium / Low priorities, filter tabs, progress tracking, and clear completed — built entirely with React useState.',
    techStack: ['React', 'TypeScript', 'useState', 'CSS Modules'],
    type: 'demo',
    demoId: 'taskmanager',
    links: { github: 'https://github.com/prabhutejamalli/Prabhu-Teja-Malli' },
    featured: true,
    highlights: [
      'Add tasks with priority levels (High / Medium / Low)',
      'Filter: All / Active / Completed tabs',
      'Visual progress bar with completion percentage',
      'Clear completed tasks in one click',
    ],
  },
  {
    id: 'demo-canvas',
    title: 'Canvas Editor',
    description:
      'A feature-rich drag-and-drop canvas editor built from scratch with React and TypeScript. Supports text, shapes, layers, undo/redo history, and automatic local-storage persistence.',
    techStack: ['React', 'TypeScript', 'CSS Modules', 'Vercel'],
    type: 'demo',
    links: {
      github: 'https://github.com/prabhutejamalli/Prabhu-Teja-Malli',
      live:   'https://newproject-14azxl69s-prabhu-teja-mallis-projects.vercel.app',
    },
    featured: true,
    highlights: [
      'Drag & resize elements with 8 directional handles',
      'Full undo / redo history system',
      'Layer management panel',
      'Auto-saves to localStorage',
    ],
  },
  {
    id: 'demo-portfolio',
    title: 'Portfolio Website',
    description:
      "This very portfolio — built with React, TypeScript, and CSS Modules following SOLID principles. Zero external UI libraries; all animations and layouts are hand-crafted CSS.",
    techStack: ['React', 'TypeScript', 'CSS Modules', 'Vercel'],
    type: 'demo',
    links: {
      github: 'https://github.com/prabhutejamalli/Prabhu-Teja-Malli',
      live:   '#',
    },
    featured: true,
    highlights: [
      'SOLID architecture with clean separation of concerns',
      'Single data file — update content without touching components',
      'Scroll-spy navigation & CSS reveal animations',
      'Auto-deployed on every GitHub push via Vercel',
    ],
  },
];

// ─── Education ───────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    id: 'edu-ece',
    degree: 'B.Tech — Electronics & Communication Engineering',
    institution: 'University College of Engineering (Autonomous), JNTU-Kakinada',
    year: '2019',
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contactData: ContactData = {
  email:        personalInfo.email,
  github:       personalInfo.github,
  linkedin:     personalInfo.linkedin,
  location:     personalInfo.location,
  availability: 'Open to freelance & full-time opportunities',
};
