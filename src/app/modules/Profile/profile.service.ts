import { IProfile } from './profile.interface';
import { ProfileModel } from './profile.model';
import { fetchGithubCommits } from '../../utils/github';

const DEFAULT_PROFILE: IProfile = {
  name: 'Shanjid Ahmad',
  titles: [
    'Full-Stack Developer',
    'MERN Stack Engineer',
    'Next.js Specialist',
    'UI/UX Craftsman',
  ],
  description:
    'I architect and ship full-stack web products — from API design to pixel-perfect interfaces. Five years of turning ideas into production-grade reality with the MERN stack, Next.js, and TypeScript.',
  socialLinks: [
    {
      href: 'https://github.com/levi9111',
      label: 'GitHub',
      icon: 'Github',
      accent: '#e2e8f0',
    },
    {
      href: 'https://www.linkedin.com/in/shanjid-ahmad-b77b5427b',
      label: 'LinkedIn',
      icon: 'Linkedin',
      accent: '#60a5fa',
    },
    {
      href: 'mailto:shanjidahmad502@gmail.com',
      label: 'Email',
      icon: 'Mail',
      accent: '#a78bfa',
    },
  ],
  stats: [
    { value: '5+', label: 'Years' },
    { value: '30+', label: 'Projects' },
    { value: 'MERN', label: 'Stack' },
    { value: '∞', label: 'Curiosity' },
  ],
  aboutStory: [
    {
      accent: '#a78bfa',
      bold: '5 years of full-stack mastery',
      text: "building production-grade web applications. From small startups to scaling platforms, I've led end-to-end development using the MERN stack — architecting systems that handle real users and real data.",
    },
    {
      accent: '#60a5fa',
      bold: 'performance-first engineering',
      text: "is at the core of everything I write. I care deeply about clean architecture, type safety, and code that the next developer will actually thank you for. TDD, code reviews, and documentation aren't afterthoughts — they're the baseline.",
    },
    {
      accent: '#34d399',
      bold: 'shipping at speed without breaking things',
      text: 'is the real skill. CI/CD pipelines, Docker containers, cloud deployments on AWS and Vercel — I own the full lifecycle from local dev to production, and I keep iteration cycles tight.',
    },
  ],
  skills: [
    {
      category: 'Frontend',
      icon: 'Code2',
      items: [
        'React',
        'TypeScript',
        'Next.js',
        'Tailwind CSS',
        'HTML5',
        'CSS3',
      ],
      accent: '#60a5fa',
      glow: 'rgba(96,165,250,0.15)',
    },
    {
      category: 'Backend',
      icon: 'Zap',
      items: [
        'Node.js',
        'Express.js',
        'MongoDB',
        'Mongoose',
        'REST APIs',
        'Nest.js',
      ],
      accent: '#34d399',
      glow: 'rgba(52,211,153,0.15)',
    },
    {
      category: 'Tools & DevOps',
      icon: 'Rocket',
      items: ['Git', 'Vercel', 'Jest', 'Webpack', 'Docker', 'AWS'],
      accent: '#a78bfa',
      glow: 'rgba(167,139,250,0.15)',
    },
    {
      category: 'Design & UX',
      icon: 'Heart',
      items: ['Figma', 'Responsive Design', 'Accessibility', 'User Research'],
      accent: '#f472b6',
      glow: 'rgba(244,114,182,0.15)',
    },
  ],
  achievements: [
    {
      number: '5+',
      label: 'Years Experience',
      icon: 'Trophy',
      accent: '#a78bfa',
    },
    {
      number: '30+',
      label: 'Projects Shipped',
      icon: 'Target',
      accent: '#60a5fa',
    },
    {
      number: '99%',
      label: 'Client Satisfaction',
      icon: 'Sparkles',
      accent: '#34d399',
    },
  ],
  services: [
    {
      title: 'Full-Stack Web Applications',
      description:
        'End-to-end products built on React, Next.js, and the MERN stack — from architecture and data modeling to pixel-level UI and animation.',
      deliverables: [
        'React / Next.js frontends',
        'Type-safe APIs (Node.js, NestJS)',
        'Auth, payments, and data layers',
      ],
      icon: 'Layers',
      accent: '#a78bfa',
      glow: 'rgba(167,139,250,0.15)',
    },
    {
      title: 'API Architecture & Backend Systems',
      description:
        'REST and WebSocket APIs designed for real production load — modular error handling, validation, and clean separation of concerns from day one.',
      deliverables: [
        'Express / NestJS backends',
        'MongoDB & Mongoose modeling',
        'Zod/Joi validation, JWT auth',
      ],
      icon: 'Server',
      accent: '#34d399',
      glow: 'rgba(52,211,153,0.15)',
    },
    {
      title: 'E-commerce Platforms',
      description:
        'Multi-app commerce ecosystems — storefront, admin ERP, and backend working off one shared product and order pipeline.',
      deliverables: [
        'Storefront + checkout flows',
        'Admin dashboards & inventory',
        'Order/payment sync across apps',
      ],
      icon: 'ShoppingCart',
      accent: '#f472b6',
      glow: 'rgba(244,114,182,0.15)',
    },
    {
      title: 'Open-Source Tooling',
      description:
        'Developer-facing tools that remove setup friction — CLIs, scaffolding generators, and internal packages built for real teams to depend on.',
      deliverables: [
        'CLI tools (npm-published)',
        'Project scaffolding & generators',
        'Documentation & CI/CD publishing',
      ],
      icon: 'PackageOpen',
      accent: '#60a5fa',
      glow: 'rgba(96,165,250,0.15)',
    },
  ],
  principles: [
    {
      title: 'Type Safety, End to End',
      description:
        "Strict TypeScript across the stack, with Zod schemas validating every request boundary — errors get caught at compile time and the API's edge, not in production.",
      icon: 'ShieldCheck',
      accent: '#a78bfa',
    },
    {
      title: 'Consistent Error Handling',
      description:
        'Every backend follows the same contract — a catchAsync wrapper, a custom AppError class, and a single sendResponse shape — so failures are predictable across modules and projects.',
      icon: 'Layers3',
      accent: '#34d399',
    },
    {
      title: 'Modular by Default',
      description:
        "Features live in self-contained modules with their own routes, controllers, and schemas. Scaffolding tools like create-express-modular exist because I don't want to rebuild this structure by hand every time.",
      icon: 'GitBranch',
      accent: '#60a5fa',
    },
    {
      title: 'Motion With Intent',
      description:
        "Animation is driven by orchestrated variants and staggerChildren, never manual delays. Every transition respects useReducedMotion and stays on GPU-safe transforms — polish shouldn't cost performance or accessibility.",
      icon: 'Gauge',
      accent: '#f472b6',
    },
    {
      title: 'Tests and Docs, Not Afterthoughts',
      description:
        'Code reviews, documentation, and test coverage are part of shipping — not cleanup done later. A README rewrite or a missing test case is treated as unfinished work.',
      icon: 'TestTube2',
      accent: '#fbbf24',
    },
  ],
  vscodeCode: `export const createUser = catchAsync(
  async (req, res) => {
    const data = userSchema.parse(req.body);

    const user = await User.create(data);
    if (!user) {
      throw new AppError(400, 'Creation failed');
    }

    sendResponse(res, {
      statusCode: 201,
      message: 'User created',
      data: user,
    });
  }
);`,
};

const createProfile = async (payload: IProfile) => {
  const result = await ProfileModel.create(payload);
  return result;
};

const getAllProfiles = async () => {
  const result = await ProfileModel.find();
  return result;
};

const getSingleProfile = async () => {
  let result = await ProfileModel.findOne();
  if (!result) {
    result = await ProfileModel.create(DEFAULT_PROFILE);
  }
  return result;
};

const updateProfile = async (payload: Partial<IProfile>) => {
  let profile = await ProfileModel.findOne();
  if (!profile) {
    profile = await ProfileModel.create(DEFAULT_PROFILE);
  }
  const result = await ProfileModel.findByIdAndUpdate(profile._id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProfile = async (id: string) => {
  const result = await ProfileModel.findByIdAndDelete(id);
  return result;
};

const getGithubCommits = async () => {
  const result = await fetchGithubCommits('Levi9111', 10);
  return result;
};

export const ProfileService = {
  createProfile,
  getAllProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
  getGithubCommits,
};
