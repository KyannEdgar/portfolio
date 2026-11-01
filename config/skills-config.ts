import { SkillCategory, SkillCategoryDef, SkillItem, MarqueeItem } from "@/types";

export const SKILL_CATEGORIES: SkillCategoryDef[] = [
  {
    id: "all",
    label: "ALL TOOLS",
    description: "Complete technical toolchain & platform proficiencies",
  },
  {
    id: "dev-cloud",
    label: "DEVELOPMENT & CLOUD",
    description: "Cloud infrastructure, PaaS platforms, databases & version control",
  },
  {
    id: "os",
    label: "OPERATING SYSTEMS",
    description: "Enterprise operating systems & kernel environments",
  },
  {
    id: "design",
    label: "UI/UX & DESIGN",
    description: "Visual design, layout systems & interface prototyping",
  },
  {
    id: "shell",
    label: "SHELL & CLI",
    description: "Automation scripting, command-line interfaces & shell runtimes",
  },
  {
    id: "networking",
    label: "NETWORKING TOOLS",
    description: "Packet capture, network reconnaissance & topology simulation",
  },
];

export const SKILLS_DATA: SkillItem[] = [
  // Development & Cloud
  {
    name: "AWS",
    category: "dev-cloud",
    icon: "aws",
    description: "Multi-region cloud infrastructure, VPC peering, IAM, and high-availability solutions.",
    proficiency: "Intermediate",
    tags: ["Cloud", "IaC", "Compute"],
  },
  {
    name: "Google Cloud",
    category: "dev-cloud",
    icon: "gcp",
    description: "Enterprise GKE clusters, VPC Service Controls, and global Anycast infrastructure.",
    proficiency: "Intermediate",
    tags: ["Cloud", "Containers", "Networking"],
  },
  {
    name: "GitHub",
    category: "dev-cloud",
    icon: "github",
    description: "GitOps automation pipelines, distributed version control, and CI/CD workflows.",
    proficiency: "Intermediate",
    tags: ["Version Control", "CI/CD", "DevOps"],
  },
  {
    name: "Vercel",
    category: "dev-cloud",
    icon: "vercel",
    description: "Edge network compute, Next.js deployment orchestration, and global CDN delivery.",
    proficiency: "Basic",
    tags: ["Edge", "Hosting", "Next.js"],
  },
  {
    name: "Supabase",
    category: "dev-cloud",
    icon: "supabase",
    description: "PostgreSQL relational databases, row-level security policies, and realtime subscriptions.",
    proficiency: "Basic",
    tags: ["PostgreSQL", "BaaS", "SQL"],
  },
  {
    name: "Firebase",
    category: "dev-cloud",
    icon: "firebase",
    description: "NoSQL document storage, serverless functions, and real-time state synchronization.",
    proficiency: "Advanced",
    tags: ["NoSQL", "Serverless", "BaaS"],
  },

  // Operating Systems
  {
    name: "Linux",
    category: "os",
    icon: "linux",
    description: "Kernel tuning, namespaces, cgroups, systemd services, and production server administration.",
    proficiency: "Proficient",
    tags: ["Kernel", "POSIX", "SysAdmin"],
  },
  {
    name: "Windows",
    category: "os",
    icon: "windows",
    description: "Enterprise administration, WSL2 Linux integration, Hyper-V, and system policies.",
    proficiency: "Advanced",
    tags: ["Enterprise", "WSL2", "Virtualization"],
  },

  // UI/UX & Design
  {
    name: "Figma",
    category: "design",
    icon: "figma",
    description: "High-fidelity component design systems, autolayout wireframing, and interactive prototyping.",
    proficiency: "Proficient",
    tags: ["Design System", "Prototyping", "UI/UX"],
  },
  {
    name: "Adobe Photoshop",
    category: "design",
    icon: "photoshop",
    description: "Raster asset manipulation, visual compositing, and web graphic optimization.",
    proficiency: "Advanced",
    tags: ["Raster", "Graphics", "Creative"],
  },
  {
    name: "Adobe Illustrator",
    category: "design",
    icon: "illustrator",
    description: "Scalable vector graphics synthesis, technical icon design, and identity assets.",
    proficiency: "Advanced",
    tags: ["Vector", "SVG", "Iconography"],
  },

  // Shell & CLI
  {
    name: "PowerShell",
    category: "shell",
    icon: "powershell",
    description: "Object-oriented scripting pipelines, Windows system management, and cloud automation.",
    proficiency: "Intermediate",
    tags: ["CLI", "Automation", "Scripting"],
  },
  {
    name: "Bash",
    category: "shell",
    icon: "bash",
    description: "POSIX shell automation, environment bootstrapping, process plumbing, and Unix tooling.",
    proficiency: "Intermediate",
    tags: ["Linux", "CLI", "Automation"],
  },

  // Networking Tools
  {
    name: "Wireshark",
    category: "networking",
    icon: "wireshark",
    description: "Deep packet inspection, TCP stream dissection, TLS analysis, and latency troubleshooting.",
    proficiency: "Intermediate",
    tags: ["Packet Analysis", "Protocols", "Security"],
  },
  {
    name: "Nmap",
    category: "networking",
    icon: "nmap",
    description: "Network host discovery, port vulnerability scanning, and service version enumeration.",
    proficiency: "Basic",
    tags: ["Reconnaissance", "Security", "Auditing"],
  },
  {
    name: "Cisco Packet Tracer",
    category: "networking",
    icon: "cisco",
    description: "VLAN segmentation, dynamic routing protocol (OSPF/BGP) simulation, and topology modeling.",
    proficiency: "Advanced",
    tags: ["Routing", "Switching", "Simulation"],
  },
];

export interface GetSkillsMarqueeItemsOptions {
  includeTechnologies?: boolean;
  includeConcepts?: boolean;
  category?: SkillCategory;
  deduplicateConcepts?: boolean;
}

/**
 * Dynamically generates marquee items comprising technologies and concepts from SKILLS_DATA.
 */
export function getSkillsMarqueeItems(
  options: GetSkillsMarqueeItemsOptions = {}
): MarqueeItem[] {
  const {
    includeTechnologies = true,
    includeConcepts = true,
    category,
    deduplicateConcepts = false,
  } = options;

  const targetSkills =
    category && category !== "all"
      ? SKILLS_DATA.filter((s) => s.category === category)
      : SKILLS_DATA;

  const items: MarqueeItem[] = [];
  const seenConcepts = new Set<string>();

  targetSkills.forEach((skill) => {
    // 1. Add technology
    if (includeTechnologies) {
      items.push({
        id: `tech-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        label: skill.name,
        name: skill.name,
        type: "technology",
        icon: skill.icon,
        category: skill.category,
      });
    }

    // 2. Add concepts from tags
    if (includeConcepts && skill.tags && skill.tags.length > 0) {
      skill.tags.forEach((tag) => {
        if (deduplicateConcepts) {
          const normalized = tag.toLowerCase();
          if (seenConcepts.has(normalized)) return;
          seenConcepts.add(normalized);
        }

        items.push({
          id: `concept-${skill.name}-${tag}`.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          label: tag,
          name: tag,
          type: "concept",
          category: skill.category,
        });
      });
    }
  });

  return items;
}

/**
 * Dynamically extracts all technologies with metadata from SKILLS_DATA.
 */
export function getSkillsTechnologies(): {
  name: string;
  icon: string;
  category: SkillCategory;
}[] {
  return SKILLS_DATA.map((skill) => ({
    name: skill.name,
    icon: skill.icon,
    category: skill.category,
  }));
}

/**
 * Dynamically extracts all unique concepts (tags) across all skills in SKILLS_DATA.
 */
export function getSkillsConcepts(): string[] {
  const conceptsSet = new Set<string>();
  SKILLS_DATA.forEach((skill) => {
    skill.tags?.forEach((tag) => conceptsSet.add(tag));
  });
  return Array.from(conceptsSet);
}

/**
 * Default precomputed marquee items dynamically combining all technologies and concepts.
 */
export const SKILLS_MARQUEE_ITEMS: MarqueeItem[] = getSkillsMarqueeItems();
export const SKILLS_TECHNOLOGIES = getSkillsTechnologies();
export const SKILLS_CONCEPTS = getSkillsConcepts();
