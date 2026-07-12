import { z } from 'zod';

const socialLinkSchema = z.object({
  href: z.string().min(1, 'Link URL is required'),
  label: z.string().min(1, 'Label is required'),
  icon: z.string().min(1, 'Icon is required'),
  accent: z.string().min(1, 'Accent is required'),
});

const statItemSchema = z.object({
  value: z.string().min(1, 'Value is required'),
  label: z.string().min(1, 'Label is required'),
});

const storyItemSchema = z.object({
  accent: z.string().min(1, 'Accent is required'),
  bold: z.string().min(1, 'Bold text is required'),
  text: z.string().min(1, 'Text is required'),
});

const skillSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  icon: z.string().min(1, 'Icon is required'),
  items: z.array(z.string()).default([]),
  accent: z.string().min(1, 'Accent is required'),
  glow: z.string().min(1, 'Glow is required'),
});

const achievementSchema = z.object({
  number: z.string().min(1, 'Number is required'),
  label: z.string().min(1, 'Label is required'),
  icon: z.string().min(1, 'Icon is required'),
  accent: z.string().min(1, 'Accent is required'),
});

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  deliverables: z.array(z.string()).default([]),
  icon: z.string().min(1, 'Icon is required'),
  accent: z.string().min(1, 'Accent is required'),
  glow: z.string().min(1, 'Glow is required'),
});

const principleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  accent: z.string().min(1, 'Accent is required'),
});

const createProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    titles: z.array(z.string()).default([]),
    description: z.string().min(1, 'Description is required'),
    socialLinks: z.array(socialLinkSchema).default([]),
    stats: z.array(statItemSchema).default([]),
    aboutStory: z.array(storyItemSchema).default([]),
    skills: z.array(skillSchema).default([]),
    achievements: z.array(achievementSchema).default([]),
    services: z.array(serviceSchema).default([]),
    principles: z.array(principleSchema).default([]),
    vscodeCode: z.string().optional(),
  }),
});

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    titles: z.array(z.string()).optional(),
    description: z.string().min(1).optional(),
    socialLinks: z.array(socialLinkSchema).optional(),
    stats: z.array(statItemSchema).optional(),
    aboutStory: z.array(storyItemSchema).optional(),
    skills: z.array(skillSchema).optional(),
    achievements: z.array(achievementSchema).optional(),
    services: z.array(serviceSchema).optional(),
    principles: z.array(principleSchema).optional(),
    vscodeCode: z.string().optional(),
  }),
});

export const ProfileValidation = {
  createProfileSchema,
  updateProfileSchema,
};
