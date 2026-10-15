export interface NavItem {
  id: string;
  number: string;
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  handle: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  honors?: string;
  focusAreas: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  period: string;
  credentialId: string;
  credentialUrl?: string;
  description: string;
  skills: string[];
  status?: "VERIFIED" | "ACTIVE";
}

export type SkillCategory =
  | "all"
  | "dev-cloud"
  | "os"
  | "design"
  | "shell"
  | "networking";

export interface SkillItem {
  name: string;
  category: SkillCategory;
  icon: string;
  description: string;
  proficiency?: string;
  tags?: string[];
}

export interface SkillCategoryDef {
  id: SkillCategory;
  label: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  author: string;
  role: string;
  title: string;
  description: string;
  location: string;
  navigation: NavItem[];
  socials: SocialLink[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  marqueeTech: string[];
  metrics?: {
    label: string;
    value: string;
    detail: string;
  }[];
}
