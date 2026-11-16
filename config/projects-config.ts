import { ProjectCategory, ProjectSystem, PipelineStep, SystemPipeline, TopologyLayer } from "@/types";

export type { ProjectCategory, ProjectSystem, PipelineStep, SystemPipeline, TopologyLayer };

export interface ProjectCategoryDef {
  id: "all" | ProjectCategory;
  label: string;
}

export const PROJECT_CATEGORIES: ProjectCategoryDef[] = [
  { id: "all", label: "ALL SYSTEMS" },
  { id: "cloud-ai", label: "AWS & SERVERLESS CLOUD" },
  { id: "web-platform", label: "WEB & CLOUD PLATFORMS" },
  { id: "cisco-networking", label: "CISCO NETWORKING" },
];

export const PROJECTS_DATA: ProjectSystem[] = [
  {
    id: "court-edge",
    title: "CourtEdge: Automated NBA Intelligence & Probabilistic Projections Pipeline",
    subtitle: "Serverless Event-Driven Cloud Architecture & Generative AI Reasoning Engine",
    category: "cloud-ai",
    categoryLabel: "AWS & Serverless Cloud",
    role: "Cloud & Data Systems Architect",
    status: "PRODUCTION",
    stack: [
      "AWS Lambda (Python 3.14)",
      "Amazon Bedrock (Claude 3 Opus)",
      "Amazon DynamoDB",
      "Amazon EventBridge",
      "Amazon S3",
      "AWS Secrets Manager",
      "Discord Webhooks",
    ],
    metrics: [
      { label: "Runtime Model", value: "100% Serverless Pay-Per-Request" },
      { label: "Compute Engine", value: "AWS Lambda (Python 3.14)" },
      { label: "Foundation AI", value: "Amazon Bedrock (Claude 3)" },
      { label: "State Persistence", value: "Sub-5ms DynamoDB NoSQL" },
    ],
    overview:
      "An event-driven cloud application designed to aggregate live sports telemetry, executed using Bayesian probabilistic reasoning via generative AI, and deliver formatted analytical briefings directly into an automated Discord community ecosystem. It features automated pipelines for pre-game predictive generation and post-game win/loss evaluation with CSV audit logs.",
    architectureHighlights: [
      "Amazon EventBridge Scheduler: Automated time-based cron triggers used for pre-game generation and post-game resolution with zero idle compute costs.",
      "AWS Lambda: Multi-threaded async execution querying real-time public APIs, computing statistical variance, and building multipart Discord embeds.",
      "Amazon Bedrock (Claude 3 Opus): Generative AI core performing deep mathematical modeling, tier-based bet, and post-game verification.",
      "Amazon DynamoDB: Used for low-latency data storage, keeping a reliable history of application states and historical audit logs.",
      "Amazon S3 & Secrets Manager: Used S3 for read-only public CSV storage, and Secrets Manager to safely store encrypted credentials with tight access controls.",
    ],
    githubUrl: "https://github.com/your-username/courtedge-pipeline",
    discordUrl: "https://discord.gg/your-invite-code",
    keyHighlights: [
      "Built on a serverless AWS architecture to eliminate infrastructure management and reduce costs.",
      "Automated dual-pipeline workflow (Pre-Game Generation + Post-Game Grading)",
      "Predictive accuracy using statistical calibration models, and provided transparent results via audit logs.",
    ],
  },
  {
    id: "web-app-portfolio",
    title: "Modern Web Portfolio: Precision Engineering & Minimalist Architecture",
    subtitle: "Interactive Web Application with Custom UI Animations and Edge Deployment",
    category: "web-platform",
    categoryLabel: "Web & Cloud Platforms",
    role: "Frontend & Systems Architect",
    status: "PRODUCTION",
    stack: [
      "Next.js 15 (App Router)",
      "React 19 / TypeScript",
      "Tailwind CSS",
      "Framer Motion 12",
      "Three.js Canvas",
      "Vercel Edge Network",
      "Vercel Speed Insights",
      "Vercel Analytics",
    ],
    metrics: [
      { label: "Rendering Architecture", value: "Hybrid Static Site Generation (SSG)" },
      { label: "Motion & Physics Engine", value: "Framer Motion Spring Dynamics" },
      { label: "Design Token System", value: "Strict Monochromatic Grayscale" },
      { label: "Edge Telemetry", value: "Real-time Core Web Vitals Tracking" },
    ],
    overview:
      "A personal portfolio built with Next.js 15, React 19, and Tailwind CSS. Features an interactive UI with custom cursor effects, scroll-based parallax animations, dynamic SVG backgrounds, and a 3D Three.js canvas. Styled with a clean, monochromatic design and deployed via Vercel.",
    architectureSectionTitle: "Frontend Architecture, Motion Engine & Edge Performance:",
    architectureHighlights: [
      "Next.js 15 Architecture: Used the App Router and Turbopack for full static site generation (SSG), ensuring fast initial load times and layout stability.",
      "Framer Motion Animations: Implemented smooth, scroll-driven text reveals and spring-based UI transitions.",
      "Custom Interactive Cursor: Built a React Context provider to track pointer movement and create magnetic hover effects on UI elements.",
      "Monochromatic Design System: Created a strict grayscale design system using pure CSS variables.",
      "Performance Monitoring: Integrated Vercel Analytics and Speed Insights to track Core Web Vitals and monitor live user traffic.",
    ],
    githubUrl: "https://github.com/KianAbustan/Portfolio",
    keyHighlights: [
      "100% static route generation with zero-hydration layout shift",
      "Custom magnetic cursor HUD physics engine with element boundary absorption",
      "Strict monochromatic minimalist design language with zero colored accents",
    ],
  },
  {
    id: "retail-store-network",
    title: "Retail Store Network: Multi-VLAN Segmentation & Secure Infrastructure",
    subtitle: "Enterprise Branch Network Design with Layer 3 Routing, Port Security & PCI Compliance Readiness",
    category: "cisco-networking",
    categoryLabel: "Cisco Networking",
    role: "Network Infrastructure Engineer",
    status: "LAB_TOPOLOGY",
    stack: [
      "Cisco Packet Tracer",
      "Cisco Catalyst Switches",
      "Cisco ISR Routers",
      "802.1Q VLANs",
      "Layer 3 Switching",
      "ACL Security",
      "Port Security",
      "NAT / PAT",
    ],
    metrics: [
      { label: "Topology Model", value: "Hierarchical Multi-VLAN Branch" },
      { label: "Routing Standard", value: "Layer 3 SVI Inter-VLAN Routing" },
      { label: "Access Security", value: "Sticky MAC Port Security" },
      { label: "Egress Gateway", value: "Overloaded NAT / Dynamic PAT" },
    ],
    overview:
      "A realistic multi-department enterprise retail store network topology designed to isolate Point-of-Sale (POS) payment processing, administrative operations, and customer Wi-Fi. Incorporates Layer 3 SVI inter-VLAN routing, dynamic address allocation, granular access control policies, and perimeter hardening to simulate production PCI-compliant retail environments.",
    architectureHighlights: [
      "VLAN Segmentation: Isolated broadcast domains separating POS Terminals, Store Staff, Management, and Public Guest Wi-Fi.",
      "Layer 3 Switching & Inter-VLAN Routing: High-speed hardware routing via Switch Virtual Interfaces (SVIs) with ACL boundary filters.",
      "DHCP & Address Management: Automated multi-pool address assignment with exclusion ranges for servers and network gateways.",
      "Perimeter & Device Hardening: Port Security with sticky MAC restrictions, SSH remote management, and complete shutdown of unused ports.",
      "NAT / PAT Gateway: Public IPv4 translation ensuring secure outbound cloud payment connectivity and store operations.",
    ],
    githubUrl: "https://github.com/your-username/retail-store-network",
    keyHighlights: [
      "PCI-compliant network segregation separating POS payments from guest traffic",
      "Hardware-accelerated Inter-VLAN routing via Layer 3 Catalyst SVIs",
      "Layer 2 hardening with Port Security, SSH v2, and unused port suppression",
    ],
  },
  {
    id: "computer-shop-network",
    title: "Computer Shop Network: High-Throughput LAN Design & EtherChannel",
    subtitle: "Commercial Cyber Café & Esports Gaming Center Local Area Network Architecture",
    category: "cisco-networking",
    categoryLabel: "Cisco Networking",
    role: "Network Infrastructure Engineer",
    status: "LAB_TOPOLOGY",
    stack: [
      "Cisco Catalyst 2960 / 3560",
      "Cisco 2911 ISR Router",
      "LACP EtherChannel (802.3ad)",
      "VLAN Segmentation",
      "DHCP Server",
      "Dynamic PAT",
      "ICMP Latency Verification",
    ],
    metrics: [
      { label: "Network Purpose", value: "Commercial High-Density Gaming LAN" },
      { label: "Trunk Bandwidth", value: "LACP 802.3ad EtherChannel" },
      { label: "Address Protocol", value: "High-Concurrency DHCP Pools" },
      { label: "Edge Translation", value: "High-Capacity Overloaded PAT" },
    ],
    overview:
      "A high-throughput commercial network architecture designed for an esports computer café and gaming center. Prioritizes deterministic low-latency packet delivery, aggregated switch-to-switch trunk bandwidth via LACP EtherChannel, robust client subnet segregation, and high-concurrency NAT/PAT routing for gaming stations.",
    architectureHighlights: [
      "Network Topology Design: Resilient two-tier hierarchical switching topology connecting high-density client gaming stations and cashier terminals.",
      "LACP EtherChannel: Link aggregation bundling physical switch interlinks to eliminate bandwidth bottlenecks and deliver trunk failover redundancy.",
      "VLAN Segmentation & IP Schema: Logical segregation separating High-Performance Gaming PCs, Cashier/Admin Systems, and Management subnets.",
      "Automated DHCP & PAT: Automated dynamic IP provisioning with aggressive lease renewal paired with high-capacity PAT internet translation.",
      "Connectivity & Latency Testing: End-to-end ping sweep validation, path tracing, and QoS verification under simulated peak traffic loads.",
    ],
    githubUrl: "https://github.com/your-username/computer-shop-network",
    keyHighlights: [
      "LACP Port-Channels aggregating distribution switch links for multi-gigabit throughput",
      "Subnet isolation shielding administrative cashier terminals from client gaming stations",
      "High-throughput NAT/PAT optimization for concurrent low-latency gaming sessions",
    ],
  },
];
