import QueryBuilder from '../../utils/QueryBuilder';
import { IProject } from './project.interface';
import { ProjectModel } from './project.model';

const DEFAULT_PROJECTS: IProject[] = [
  {
    title: 'UIX Design Lab',
    subtitle: 'uixdesignlab.com',
    description:
      'A comprehensive agency portal — a client-facing web app, an admin ERP for managing portfolios and analytics, and a REST API backend powering both.',
    liveUrl: 'https://www.uixdesignlab.com/',
    links: [
      {
        label: 'Client Repo',
        href: 'https://github.com/levi9111/UIX-Design-Lab',
        type: 'client',
      },
      {
        label: 'Server Repo',
        href: 'https://github.com/levi9111/server-uix-design-lab',
        type: 'server',
      },
    ],
    technologies: [
      'Next.js 15',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Tailwind CSS',
    ],
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.15)',
    statusLabel: 'Agency',
    icon: 'Building2',
    role: 'Co-Founder & Developer',
    category: 'agency',
  },
  {
    title: 'Subaashghor',
    subtitle: 'subaashghor.com',
    description:
      'A luxury e-commerce ecosystem — web storefront, REST API backend, admin ERP, and a native mobile application, all sharing one product and order pipeline.',
    liveUrl: 'https://subaashghor.com',
    links: [
      {
        label: 'Web Client',
        href: 'https://github.com/Levi9111/project-subaashghor-client',
        type: 'client',
      },
      {
        label: 'Server',
        href: 'https://github.com/Levi9111/project-subasshghor-server',
        type: 'server',
      },
      {
        label: 'Admin Dashboard',
        href: 'https://github.com/Levi9111/project-subashghor-dashboard',
        type: 'admin',
      },
      {
        label: 'Mobile App',
        href: 'https://github.com/Levi9111/Subaashghor-mobile-',
        type: 'mobile',
      },
    ],
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Framer Motion',
      'React Native',
    ],
    accent: '#f472b6',
    glow: 'rgba(244,114,182,0.15)',
    statusLabel: 'Live',
    icon: 'ShoppingBag',
    role: 'Full-Stack Developer',
    category: 'ecommerce',
  },
  {
    title: 'create-express-modular',
    subtitle: 'npm i -g create-express-modular',
    description:
      'An open-source CLI that scaffolds production-ready Express + TypeScript backends — database abstraction (Mongoose, Prisma, Drizzle), validation engines (Zod, Joi), and modular error handling, automated.',
    npmPackage: 'create-express-modular',
    links: [
      {
        label: 'GitHub Repo',
        href: 'https://github.com/levi9111/npm-create-express-modular',
        type: 'github',
      },
    ],
    technologies: [
      'TypeScript',
      'Node.js',
      'Commander.js',
      'Mongoose',
      'Prisma',
      'Zod',
    ],
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    statusLabel: 'Open Source',
    icon: 'TerminalSquare',
    role: 'Author & Maintainer',
    category: 'cli',
  },
  {
    title: 'TaskFlow',
    subtitle: 'Experimental task management ecosystem',
    description:
      'A REST + WebSocket API on NestJS 11 with real-time event distribution and secure auth, paired with a React 19 SPA — Redux Toolkit, React Query, and GSAP animations.',
    links: [
      {
        label: 'Backend API',
        href: 'https://github.com/Levi9111/task-master-api',
        type: 'server',
      },
      {
        label: 'Web Client',
        href: 'https://github.com/Levi9111/task-master',
        type: 'client',
      },
    ],
    technologies: [
      'NestJS 11',
      'React 19',
      'Redux Toolkit',
      'React Query',
      'WebSocket',
      'GSAP',
    ],
    accent: '#60a5fa',
    glow: 'rgba(96,165,250,0.15)',
    statusLabel: 'In Progress',
    icon: 'ListChecks',
    role: 'Full-Stack Developer',
    category: 'taskflow',
  },
];

const createProject = async (payload: IProject) => {
  const result = await ProjectModel.create(payload);
  return result;
};

const getAllProjects = async (query: Record<string, unknown>) => {
  // Check if projects list is empty, and seed if necessary
  const count = await ProjectModel.countDocuments();
  if (count === 0) {
    await ProjectModel.insertMany(DEFAULT_PROJECTS);
  }

  const searchableFields = ['title', 'subtitle', 'description', 'technologies'];
  const projectQuery = new QueryBuilder(ProjectModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await projectQuery.modelQuery;
  const meta = await projectQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProject = async (id: string) => {
  const result = await ProjectModel.findById(id);
  return result;
};

const updateProject = async (id: string, payload: Partial<IProject>) => {
  const result = await ProjectModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProject = async (id: string) => {
  const result = await ProjectModel.findByIdAndDelete(id);
  return result;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
