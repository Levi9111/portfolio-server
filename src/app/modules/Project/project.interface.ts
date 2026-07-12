export type LinkType =
  'client' | 'server' | 'admin' | 'mobile' | 'github' | 'npm';

export interface ProjectLink {
  label: string;
  href: string;
  type: LinkType;
}

export type ProjectCategory = 'agency' | 'ecommerce' | 'cli' | 'taskflow';

export interface IProject {
  title: string;
  subtitle: string;
  description: string;
  liveUrl?: string;
  npmPackage?: string;
  links: ProjectLink[];
  technologies: string[];
  accent: string;
  glow: string;
  statusLabel: string;
  icon: string; // Lucide icon name as a string (e.g. "Building2", "ShoppingBag", "TerminalSquare", "ListChecks")
  role: string;
  category: ProjectCategory;
  createdAt?: Date;
  updatedAt?: Date;
}
