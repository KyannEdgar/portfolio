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
  // ==========================================
  // Development & Cloud (dev-cloud)
  // ==========================================
  {
    name: "AWS",
    category: "dev-cloud",
    icon: "aws",
    description:
      "Architected a serverless, event-driven cloud application. Utilized AWS Lambda and EventBridge to automate data pipelines for predictive generation and grading. Integrated Amazon Bedrock for generative AI reasoning, DynamoDB for central storage, and AWS IAM to enforce least-privilege security.",
    proficiency: "Advanced",
    tags: ["Serverless", "EventDriven", "GenAI"],
    tierDefinition:
      "Capable of designing, securing, and deploying zero-maintenance serverless backends.",
  },
  {
    name: "Google Cloud",
    category: "dev-cloud",
    icon: "gcp",
    description:
      "Integrated multiple Google Maps APIs (including routing, geocoding, and places) used for location-based features for a full-stack capstone project. Managed project environments, API credential security, and usage quotas within the GCP Console.",
    proficiency: "Intermediate",
    tags: ["GoogleMapsAPI", "APIIntegration", "CloudConsole"],
    tierDefinition:
      "Comfortable with common tasks, including navigating the console, provisioning specific API services, and implementing basic security restrictions.",
  },
  {
    name: "GitHub",
    category: "dev-cloud",
    icon: "github",
    description:
      "Managed source code versioning and project repositories using standard branch-based workflows. Handled commits, merges, and pull requests to maintain a clean codebase history and track project development.",
    proficiency: "Intermediate",
    tags: ["VersionControl", "GitFlow", "SourceCodeManagement"],
    tierDefinition:
      "Comfortable with common tasks, including standard repository management, branching, and code integration.",
  },
  {
    name: "Vercel",
    category: "dev-cloud",
    icon: "vercel",
    description:
      "Explored foundational deployment workflows and platform capabilities. Gained a practical understanding of continuous deployment concepts and how to connect Git repositories to host frontend applications on edge infrastructure.",
    proficiency: "Basic",
    tags: ["Deployment", "EdgeComputing", "FrontendHosting"],
    tierDefinition:
      "Familiar with core concepts and basic platform navigation.",
  },
  {
    name: "Supabase",
    category: "dev-cloud",
    icon: "supabase",
    description:
      "Explored foundational backend-as-a-service workflows. Gained a practical understanding of provisioning PostgreSQL databases, navigating the studio dashboard, and the basic concepts behind built-in authentication and Row Level Security (RLS).",
    proficiency: "Basic",
    tags: ["PostgreSQL", "BaaS", "Backend"],
    tierDefinition:
      "Familiar with core database concepts and basic platform navigation.",
  },
  {
    name: "Firebase",
    category: "dev-cloud",
    icon: "firebase",
    description:
      "Architected and deployed a complete serverless backend ecosystem, successfully integrating Firebase Authentication, NoSQL databases (Firestore), Cloud Storage, and Web Hosting to power a full-stack application.",
    proficiency: "Advanced",
    tags: ["NoSQL", "BaaS", "Authentication"],
    tierDefinition:
      "Highly capable of independently setting up, configuring, and managing a comprehensive suite of Firebase services for end-to-end application delivery.",
  },
  {
    name: "Discord",
    category: "dev-cloud",
    icon: "discord",
    description:
      "Experienced in architecting Discord servers for development teams and communities. Proficient in setting up custom webhooks, deploying bot automations, and integrating external services to streamline project notifications and workflows.",
    proficiency: "Proficient",
    tags: ["Webhooks", "BotAutomation", "RolePermissions"],
    tierDefinition:
      "Confident in configuring complex server environments from scratch, managing strict role-based permissions, and seamlessly integrating automated bot workflows and API webhooks.",
  },

  // ==========================================
  // Operating Systems (os)
  // ==========================================
  {
    name: "Linux",
    category: "os",
    icon: "linux",
    description:
      "Proficient in multiple Linux distributions for software development and daily operations, with a strong command of file systems, package management, and environment configuration comparable to my fluency in Windows.",
    proficiency: "Proficient",
    tags: ["MultiDistro", "CLI", "PowerUser"],
    tierDefinition:
      "Comfortably operates and navigates Linux environments natively for day-to-day tasks, personal workflows, and general computing.",
  },
  {
    name: "Windows",
    category: "os",
    icon: "windows",
    description:
      "Native fluency in Windows desktop operating systems. Highly capable of advanced system configuration, deep troubleshooting, software management, and optimizing the environment for daily computing and local development workflows.",
    proficiency: "Advanced",
    tags: ["DesktopOS", "PowerUser", "SystemConfiguration"],
    tierDefinition:
      "Possesses deep operational knowledge of the client OS, easily executing complex customizations and resolving system issues as a power user.",
  },

  // ==========================================
  // UI/UX & Design (design)
  // ==========================================
  {
    name: "Figma",
    category: "design",
    icon: "figma",
    description:
      "Designed and prototyped user interfaces and experiences across multiple projects. Used Figma to translate conceptual ideas into interactive mockups and cohesive design systems.",
    proficiency: "Proficient",
    tags: ["UIUX", "Prototyping", "Wireframing"],
    tierDefinition:
      "Highly capable of independently designing complete, multi-screen applications and interactive prototypes from scratch.",
  },
  {
    name: "Adobe Photoshop",
    category: "design",
    icon: "photoshop",
    description:
      "Used Photoshop for various real-world projects, creating a wide range of graphics. Comfortable making everything from logos and event posters to overall branding and UI layouts.",
    proficiency: "Advanced",
    tags: ["GraphicDesign", "Branding", "VisualDesign"],
    tierDefinition:
      "Confident using it in real-world projects, easily handling different types of creative tasks without needing much guidance.",
  },
  {
    name: "Adobe Illustrator",
    category: "design",
    icon: "illustrator",
    description:
      "Can create vector graphics and custom iconography across multiple projects. Applied Illustrator to construct foundational assets from scratch, providing clean, resizable elements for brand identities and user interfaces.",
    proficiency: "Advanced",
    tags: ["VectorDesign", "AssetCreation", "GraphicDesign"],
    tierDefinition:
      "Confident using it in real-world projects, independently managing custom asset design from initial concept to final export.",
  },

  // ==========================================
  // Shell & CLI (shell)
  // ==========================================
  {
    name: "PowerShell",
    category: "shell",
    icon: "powershell",
    description:
      "Executed command-line operations for troubleshooting. Capable of sourcing, understanding, and adapting external scripts to configure local environments.",
    proficiency: "Intermediate",
    tags: ["CLI", "Scripting", "SystemManagement"],
    tierDefinition:
      "Comfortable with common tasks, specifically running standard commands and modifying existing scripts to achieve desired outcomes.",
  },
  {
    name: "Bash",
    category: "shell",
    icon: "bash",
    description:
      "Navigated and managed Linux environments without a graphical interface (GUI). Comfortable using standard command-line tools for file management and system operations, while looking up references for more complex shell scripts.",
    proficiency: "Intermediate",
    tags: ["CLI", "Linux", "Shell"],
    tierDefinition:
      "Comfortable with common tasks, easily moving around the file system and executing basic commands in headless setups.",
  },

  // ==========================================
  // Networking Tools (networking)
  // ==========================================
  {
    name: "Wireshark",
    category: "networking",
    icon: "wireshark",
    description:
      "Gained hands-on experience during a networking certification program. Capable of capturing network traffic, applying basic display filters, and inspecting common protocols to understand general network behavior.",
    proficiency: "Intermediate",
    tags: ["PacketAnalysis", "ProtocolInspection", "Networking"],
    tierDefinition:
      "Comfortable with common tasks, like navigating the interface to set up captures and read basic packet data.",
  },
  {
    name: "Nmap",
    category: "networking",
    icon: "nmap",
    description:
      "Explored fundamental network discovery techniques during a certification program. Capable of executing standard command-line scans to identify live hosts, open ports, and basic network services without utilizing complex configurations or advanced scripts.",
    proficiency: "Basic",
    tags: ["NetworkScanning", "PortScanning", "Reconnaissance"],
    tierDefinition:
      "Familiar with core concepts and basic commands for introductory network reconnaissance.",
  },
  {
    name: "Cisco Packet Tracer",
    category: "networking",
    icon: "cisco",
    description:
      "Designed and constructed network topologies to simulate real-world infrastructure. Structured custom networking labs from the ground up, configuring routing, switching, and end-device behaviors to test various architectural scenarios.",
    proficiency: "Advanced",
    tags: ["NetworkSimulation", "TopologyDesign", "LabCreation"],
    tierDefinition:
      "Highly capable of independently building, simulating, and troubleshooting complex network environments without relying on pre-built templates.",
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
