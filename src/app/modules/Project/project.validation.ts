import { z } from 'zod';

const projectLinkSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  href: z.string().min(1, 'Href is required'),
  type: z.enum(['client', 'server', 'admin', 'mobile', 'github', 'npm']),
});

const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().min(1, 'Subtitle is required'),
    description: z.string().min(1, 'Description is required'),
    liveUrl: z.string().optional(),
    npmPackage: z.string().optional(),
    links: z.array(projectLinkSchema).default([]),
    technologies: z.array(z.string()).default([]),
    accent: z.string().min(1, 'Accent color is required'),
    glow: z.string().min(1, 'Glow style is required'),
    statusLabel: z.string().min(1, 'Status label is required'),
    icon: z.string().min(1, 'Icon name is required'),
    role: z.string().min(1, 'Role is required'),
    category: z.enum(['agency', 'ecommerce', 'cli', 'taskflow']),
  }),
});

const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    subtitle: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    liveUrl: z.string().optional(),
    npmPackage: z.string().optional(),
    links: z.array(projectLinkSchema).optional(),
    technologies: z.array(z.string()).optional(),
    accent: z.string().min(1).optional(),
    glow: z.string().min(1).optional(),
    statusLabel: z.string().min(1).optional(),
    icon: z.string().min(1).optional(),
    role: z.string().min(1).optional(),
    category: z.enum(['agency', 'ecommerce', 'cli', 'taskflow']).optional(),
  }),
});

export const ProjectValidation = {
  createProjectSchema,
  updateProjectSchema,
};
