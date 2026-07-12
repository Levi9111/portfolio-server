export interface ISocialLink {
  href: string;
  label: string;
  icon: string;
  accent: string;
}

export interface IStatItem {
  value: string;
  label: string;
}

export interface IStoryItem {
  accent: string;
  bold: string;
  text: string;
}

export interface ISkill {
  category: string;
  icon: string;
  items: string[];
  accent: string;
  glow: string;
}

export interface IAchievement {
  number: string;
  label: string;
  icon: string;
  accent: string;
}

export interface IService {
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
  accent: string;
  glow: string;
}

export interface IPrinciple {
  title: string;
  description: string;
  icon: string;
  accent: string;
}

export interface IProfile {
  name: string;
  titles: string[];
  description: string;
  socialLinks: ISocialLink[];
  stats: IStatItem[];
  aboutStory: IStoryItem[];
  skills: ISkill[];
  achievements: IAchievement[];
  services: IService[];
  principles: IPrinciple[];
  vscodeCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
