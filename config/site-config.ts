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
      title: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      period: "2024 – 2027",
      credentialId: "AWS-PSA-948201",
      credentialUrl: "https://aws.amazon.com/verification",
      description:
        "Validation of advanced technical skills and experience designing distributed systems, hybrid architectures, multi-region failover topologies, and enterprise-grade cloud security.",
      skills: ["Multi-Cloud Architecture", "Disaster Recovery", "Hybrid Connectivity", "Cost Engineering", "IAM Governance"],
      status: "VERIFIED",
    },
    {
      id: "CERT_02",
      title: "Google Cloud Certified Professional Cloud Architect",
      issuer: "Google Cloud",
      period: "2024 – 2026",
      credentialId: "GCP-PCA-204918",
      credentialUrl: "https://cloud.google.com/certification",
      description:
        "Demonstrated proficiency in architecting reliable, robust, highly available, secure, and dynamically scalable enterprise infrastructure on Google Cloud Platform.",
      skills: ["GKE Enterprise", "VPC Service Controls", "Cloud Spanner", "Anthos", "Zero-Trust Security"],
      status: "VERIFIED",
    },
    {
      id: "CERT_03",
      title: "Certified Kubernetes Security Specialist (CKS)",
      issuer: "CNCF & Linux Foundation",
      period: "2023 – 2026",
      credentialId: "LF-CKS-719302",
      credentialUrl: "https://www.cncf.io/certification/cks/",
      description:
        "Specialized competency in securing containerized workloads, kernel runtime protection via eBPF/Falco, cluster hardening, supply chain attestation, and vulnerability mitigation.",
      skills: ["Runtime Security", "eBPF Tracing", "Cilium / Network Policies", "Cluster Hardening", "Supply Chain Security"],
      status: "VERIFIED",
    },
    {
      id: "CERT_04",
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "CNCF & Linux Foundation",
      period: "2023 – 2026",
      credentialId: "LF-CKA-582910",
      credentialUrl: "https://www.cncf.io/certification/cka/",
      description:
        "Proficiency in bare-metal and cloud Kubernetes administration, complex etcd cluster maintenance, ingress topologies, storage orchestration, and production debugging.",
      skills: ["Kubernetes Internals", "etcd Clustering", "CNI & Storage Orchestration", "Linux Namespaces", "Troubleshooting"],
      status: "VERIFIED",
    },
    {
      id: "CERT_05",
      title: "HashiCorp Certified: Terraform Associate (003)",
      issuer: "HashiCorp",
      period: "2023 – 2025",
      credentialId: "HC-TA-391048",
      credentialUrl: "https://www.credly.com",
      description:
        "Verification of Infrastructure-as-Code (IaC) principles, declarative cloud provisioning, state drift management, module lifecycle design, and Vault secret orchestrations.",
      skills: ["Terraform / OpenTofu", "IaC Pipelines", "State Management", "Vault Secrets", "Sentinel Policies"],
      status: "ACTIVE",
    },
  ],
  marqueeTech: SKILLS_DATA.map((skill) => skill.name),
  marqueeItems: SKILLS_MARQUEE_ITEMS,
};
