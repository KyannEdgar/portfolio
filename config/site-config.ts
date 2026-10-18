import { SiteConfig } from "@/types";
import { SKILLS_DATA, SKILLS_MARQUEE_ITEMS } from "./skills-config";

export const siteConfig: SiteConfig = {
  name: "Kian Edgar Villamater Abustan",
  author: "Kian Edgar Villamater Abustan",
  role: "Principal Infrastructure & Security Architect",
  title: "Infrastructure & Cloud Engineering Portfolio",
  description:
    "High-throughput multi-cloud architectures, resilient zero-trust networking, eBPF-driven telemetry, and post-quantum cryptographic systems.",
  location: "Distributed // Global Anycast",
  navigation: [
    { id: "certifications", number: "01", label: "Certifications", href: "#certifications" },
    { id: "skills", number: "02", label: "Skills", href: "#skills" },
    { id: "projects", number: "03", label: "Projects", href: "#projects" },
    { id: "experience", number: "04", label: "Experience", href: "#experience" },
    { id: "education", number: "05", label: "Education", href: "#education" },
    { id: "socials", number: "06", label: "Socials", href: "#socials" },
  ],
  socials: [
    {
      platform: "LinkedIn",
      label: "Professional Profile",
      url: "https://www.linkedin.com/in/kian-abustan/",
      handle: "kian-abustan",
    },
    {
      platform: "GitHub",
      label: "Code Repositories",
      url: "https://github.com/KyannEdgar",
      handle: "@KyannEdgar",
    },
    {
      platform: "Facebook",
      label: "Social Network",
      url: "https://www.facebook.com/kianedgar.abustan",
      handle: "kianedgar.abustan",
    },
    {
      platform: "Instagram",
      label: "Visual Feed",
      url: "https://www.instagram.com/kyannedgar",
      handle: "@kyannedgar",
    },
    {
      platform: "Discord",
      label: "Direct Comms",
      url: "https://discord.com/invite/hZPrBDpS",
      handle: "hZPrBDpS",
    },
  ],
  experience: [
    {
      period: "2024 – PRESENT",
      role: "Lead Cloud & Infrastructure Architect",
      company: "Autonomous Infrastructure Systems",
      location: "Distributed // Global Anycast",
      description:
        "Architecting resilient multi-region Kubernetes clusters, line-rate WireGuard mesh overlays, and automated eBPF runtime security instrumentation.",
      achievements: [
        "Designed and deployed dual-cloud Kubernetes infrastructure across AWS and GCP maintaining 99.999% SLA.",
        "Engineered Cilium eBPF host routing topology that reduced cross-region network latency by 42%.",
        "Implemented zero-trust workload attestation using SPIFFE/SPIRE with hardware TPM verification.",
      ],
      skills: ["Kubernetes", "eBPF", "AWS", "Google Cloud", "WireGuard", "Terraform", "Go"],
    },
    {
      period: "2022 – 2024",
      role: "Senior Security & Systems Engineer",
      company: "Enterprise Cloud Platforms",
      location: "Manila // Hybrid",
      description:
        "Led continuous infrastructure-as-code automation, post-quantum cryptographic migration, and autonomous threat mitigation systems.",
      achievements: [
        "Automated infrastructure drift reconciliation using custom n8n workflows and OpenTofu state tracking, reducing MTTR below 15s.",
        "Integrated post-quantum ML-KEM key exchange primitives into internal microservice transport security layers.",
        "Standardized zero-regression GitOps deployment pipelines across 24 high-throughput microservices.",
      ],
      skills: ["Zero-Trust", "Cryptography", "Linux Kernel", "Docker", "n8n", "CI/CD", "TypeScript"],
    },
    {
      period: "2020 – 2022",
      role: "Full-Stack & Cloud Systems Engineer",
      company: "Core Distributed Engineering",
      location: "Manila, PH",
      description:
        "Engineered scalable distributed applications, relational and time-series database optimizations, and telemetry ingestion pipelines.",
      achievements: [
        "Architected high-throughput API microservices handling over 10M daily requests with sub-50ms latency.",
        "Refactored relational database schemas and indexing structures, achieving a 65% reduction in query execution times.",
        "Built real-time telemetry observation dashboards and alerting mechanisms for mission-critical services.",
      ],
      skills: ["Next.js", "Node.js", "PostgreSQL", "Supabase", "Firebase", "Redis", "SQL"],
    },
  ],
  education: [
    {
      period: "2018 – 2022",
      degree: "Bachelor of Science in Computer Science",
      institution: "Technological University // Engineering Institute",
      location: "Manila, Philippines",
      honors: "Magna Cum Laude // Highest Academic Honors",
      description:
        "Rigorous specialization in Distributed Systems, Computer Networks, Operating Systems, and Applied Cryptography. Completed thesis on resilient peer-to-peer mesh networking.",
      focusAreas: [
        "Distributed Systems & Consensus",
        "Network Protocols & Architecture",
        "Cryptography & Data Security",
        "Advanced Algorithms & Complexity",
        "Operating Systems & Kernel Programming",
      ],
    },
  ],
  certifications: [
    {
      id: "CERT_01",
      title: "Google Cybersecurity Professional Certificate",
      issuer: "Coursera – Google Career Certificates",
      period: "Issued Jan 20, 2026",
      credentialId: "7WZONMEN5LJ9",
      credentialUrl: "https://coursera.org/share/9d88fffc473e6ace2f2af29a90c516ee",
      downloadUrl: "/documents/certificates/google-cybersecurity-certificate.pdf",
      description:
        "Professional cybersecurity certification authorized by Google and offered through Coursera. Attests core competency in network security defense, SIEM tools, threat analysis, Linux command-line operations, and automated incident response.",
      skills: [
        "Network Security",
        "Linux CLI",
        "Threat Analysis",
        "SIEM & Incident Response",
        "Python Automation",
        "Detection & Defense",
      ],
      status: "VERIFIED",
    },
    {
      id: "CERT_02",
      title: "Computer Systems Servicing – NCII",
      issuer: "Technical Education and Skills Development Authority (TESDA)",
      period: "June 21, 2025 – June 20, 2030",
      credentialId: "25045602016527",
      certificateNo: "ULI-AKV-04-121-04056-001",
      downloadUrl: "/documents/certificates/tesda-ncii-computer-systems-servicing.pdf",
      description:
        "National qualification under the Philippine TVET Competency Assessment and Certification System. Verifies competence in installing and configuring computer systems, setup and configuration of computer networks and servers, and hardware diagnostics/maintenance.",
      skills: [
        "Computer Systems Configuration",
        "Network Setup",
        "Server Administration",
        "Hardware Diagnostics",
        "Cable Termination & Testing",
      ],
      status: "VERIFIED",
    },
  ],
  inProgressCertifications: [
    {
      id: "IN_PROG_01",
      title: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco Systems",
      period: "Expected Q1 – 2027",
      description:
        "Comprehensive enterprise networking track covering network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation/programmability.",
      skills: ["Routing & Switching", "OSPF / IP Services", "VLANs & Trunking", "Subnetting", "Network Automation"],
      status: "IN_PROGRESS",
    },
    {
      id: "IN_PROG_02",
      title: "AWS Certified Cloud Practitioner (AWS CCP)",
      issuer: "Amazon Web Services (AWS)",
      period: "Expected Q1 – 2027",
      description:
        "Foundational credential validating overall understanding of the AWS Cloud platform, global infrastructure, security compliance, core services, and architectural economics.",
      skills: ["Cloud Foundations", "AWS Core Architecture", "Security & Compliance", "Billing & Pricing"],
      status: "IN_PROGRESS",
    },
    {
      id: "IN_PROG_03",
      title: "AWS Certified Solutions Architect – Associate (AWS SAA)",
      issuer: "Amazon Web Services (AWS)",
      period: "Expected Q1 – 2027",
      description:
        "Knowledge and skills in designing high-availability, cost-effective, fault-tolerant, and scalable distributed systems across multi-tier AWS environments.",
      skills: ["Multi-Tier Architecture", "VPC & Hybrid Networking", "Resilient Storage", "High Availability", "IAM Governance"],
      status: "IN_PROGRESS",
    },
  ],
  documents: {
    resume: "/documents/resume/kian-edgar-abustan-resume.pdf",
  },
  marqueeTech: SKILLS_DATA.map((skill) => skill.name),
  marqueeItems: SKILLS_MARQUEE_ITEMS,
};
