import { Schema, model } from 'mongoose';
import { IProject, ProjectLink } from './project.interface';

const projectLinkSchema = new Schema<ProjectLink>(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    type: {
      type: String,
      enum: ['client', 'server', 'admin', 'mobile', 'github', 'npm'],
      required: true,
    },
  },
  { _id: false },
);

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    liveUrl: { type: String },
    npmPackage: { type: String },
    links: { type: [projectLinkSchema], default: [] },
    technologies: { type: [String], default: [] },
    accent: { type: String, required: true },
    glow: { type: String, required: true },
    statusLabel: { type: String, required: true },
    icon: { type: String, required: true },
    role: { type: String, required: true },
    category: {
      type: String,
      enum: ['agency', 'ecommerce', 'cli', 'taskflow'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProjectModel = model<IProject>('Project', projectSchema);
