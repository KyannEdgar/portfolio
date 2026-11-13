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

export interface EducationPillar {
  name: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  category: "ACADEMIC" | "UPSKILL";
  categoryBadge: string;
  program: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  metricBadge?: string;
  affiliation?: string;
  cohort?: string;
  sponsors?: string[];
  credentialTarget?: string;
  pillars: EducationPillar[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  period: string;
  credentialId?: string;
  credentialUrl?: string;
  downloadUrl?: string;
  description: string;
  skills: string[];
  status: "VERIFIED" | "IN_PROGRESS" | "ACTIVE";
  certificateNo?: string;
}

export interface InProgressCertification {
  id: string;
  title: string;
  issuer: string;
  period: string;
  description: string;
  skills: string[];
  status: "IN_PROGRESS";
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
  tierDefinition?: string;
}

export interface SkillCategoryDef {
  id: SkillCategory;
  label: string;
  description: string;
}

export type MarqueeItemType = "technology" | "concept";

export interface MarqueeItem {
  id: string;
  label: string;
  name?: string;
  type: MarqueeItemType;
  icon?: string;
  category?: SkillCategory;
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
  inProgressCertifications?: InProgressCertification[];
  documents?: {
    resume?: string;
    [key: string]: string | undefined;
  };
  marqueeTech: string[];
  marqueeItems?: MarqueeItem[];
  metrics?: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export interface PipelineStep {
  id: string;
  stepNumber: string;
  title: string;
  service: string;
  description: string;
  detailCode?: string;
  securityControl?: string;
  runtimeLogic?: string;
}

export interface SystemPipeline {
  id: string;
  name: string;
  trigger: string;
  objective: string;
  steps: PipelineStep[];
}

export interface TopologyLayer {
  layer: string;
  devices: string;
  protocols: string;
  details: string;
  configSnippet?: string;
}

export interface ProjectSystem {
  id: string;
  title: string;
  subtitle: string;
  category: "cloud-ai" | "cisco-networking";
  categoryLabel: string;
  role: string;
  status: "PRODUCTION" | "LAB_TOPOLOGY";
  stack: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  architectureHighlights: string[];
  githubUrl?: string;
  discordUrl?: string;
  keyHighlights?: string[];
  pipelines?: SystemPipeline[];
  topologyLayers?: TopologyLayer[];
}
