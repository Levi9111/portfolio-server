import { Schema, model } from 'mongoose';
import {
  IProfile,
  ISocialLink,
  IStatItem,
  IStoryItem,
  ISkill,
  IAchievement,
  IService,
  IPrinciple,
} from './profile.interface';

const socialLinkSchema = new Schema<ISocialLink>(
  {
    href: { type: String, required: true },
    label: { type: String, required: true },
    icon: { type: String, required: true },
    accent: { type: String, required: true },
  },
  { _id: false },
);

const statItemSchema = new Schema<IStatItem>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

const storyItemSchema = new Schema<IStoryItem>(
  {
    accent: { type: String, required: true },
    bold: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false },
);

const skillSchema = new Schema<ISkill>(
  {
    category: { type: String, required: true },
    icon: { type: String, required: true },
    items: { type: [String], default: [] },
    accent: { type: String, required: true },
    glow: { type: String, required: true },
  },
  { _id: false },
);

const achievementSchema = new Schema<IAchievement>(
  {
    number: { type: String, required: true },
    label: { type: String, required: true },
    icon: { type: String, required: true },
    accent: { type: String, required: true },
  },
  { _id: false },
);

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deliverables: { type: [String], default: [] },
    icon: { type: String, required: true },
    accent: { type: String, required: true },
    glow: { type: String, required: true },
  },
  { _id: false },
);

const principleSchema = new Schema<IPrinciple>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    accent: { type: String, required: true },
  },
  { _id: false },
);

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, trim: true },
    titles: { type: [String], default: [] },
    description: { type: String, required: true },
    socialLinks: { type: [socialLinkSchema], default: [] },
    stats: { type: [statItemSchema], default: [] },
    aboutStory: { type: [storyItemSchema], default: [] },
    skills: { type: [skillSchema], default: [] },
    achievements: { type: [achievementSchema], default: [] },
    services: { type: [serviceSchema], default: [] },
    principles: { type: [principleSchema], default: [] },
    vscodeCode: { type: String },
  },
  {
    timestamps: true,
  },
);

export const ProfileModel = model<IProfile>('Profile', profileSchema);
