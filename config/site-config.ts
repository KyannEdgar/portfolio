import { SiteConfig } from "@/types";
import { SKILLS_DATA, SKILLS_MARQUEE_ITEMS } from "./skills-config";

export const siteConfig: SiteConfig = {
  name: "Kian Abustan",
  author: "Kian Abustan",
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
      url: "https://discord.com/users/1556539432176328794",
      handle: "hZPrBDpS",
    },
  ],
  experience: [
    {
      period: "Feb 2026 – May 2026",
      role: "Web Developer Intern (OJT)",
      company: "ABBE Technology Solutions Inc.",
      location: "Makati City, Philippines",
      description:
        "Initiated code architecture and backend API services for an enterprise Human Resource Information System (HRIS) utilizing .NET within a Domain-Driven Design (DDD) framework.",
      achievements: [
        "Initiated the initial setup and code structure for Human Resource Information System (HRIS).",
        "Designed and implemented core API logic using .NET within a Domain-Driven Design (DDD) architecture for scalable and modular backend services.",
        "Presented weekly progress reports and system demonstrations to the HR department to gather feedback and align project goals.",
        "Collaborated with the internal development team during sync meetings to review tasks, update sprint goals, and document system workflows.",
      ],
      skills: [
        ".NET",
        "Domain-Driven Design",
        "C#",
        "RESTful APIs",
        "SQL Database Querying",
        "System Architecture",
        "HRIS",
      ],
    },
    {
      period: "2024 – 2025",
      role: "Freelance Quality Assurance Tester",
      company: "uTest & Tester Work",
      location: "Remote",
      description:
        "Executed functional test cases, cross-device stability tests, and detailed defect reproduction reporting across mobile, tablet, and desktop platforms.",
      achievements: [
        "Executed test cases across different applications to detect functional errors and interface anomalies.",
        "Tested app stability and layout compatibility across multiple mobile devices, tablets, and operating systems.",
        "Prepared detailed bug reports including step-by-step reproduction instructions, screenshots, and device log files.",
      ],
      skills: [
        "QA Testing",
        "Test Case Execution",
        "Cross-Platform Validation",
        "Bug Reporting",
        "Device Log Analysis",
        "Mobile & Web Testing",
        "Android / iOS",
      ],
    },
  ],
  education: [
    {
      id: "EDU_01",
      category: "ACADEMIC",
      categoryBadge: "ACADEMIC DEGREE // FORMAL HIGHER EDUCATION",
      program: "Bachelor of Science in Information Technology",
      institution: "Southern Luzon State University – Main Campus",
      period: "2022 – 2026",
      location: "Lucban, Quezon",
      metricBadge: "GPA: 1.53",
      affiliation: "Member of Integrated Student of Information Technology",
      description:
        "Four-year undergraduate degree program focusing on software engineering, database systems, networking fundamentals, and computer hardware diagnostics.",
      pillars: [
        {
          name: "Backend & Software Architecture",
          description:
            "Enterprise system design, object-oriented programming, and relational database schema construction.",
          skills: [".NET", "Domain-Driven Design (DDD)", "C#", "SQL Querying"],
        },
        {
          name: "Systems & Networking",
          description:
            "Network layer protocols, IP address planning, and packet flow simulation.",
          skills: ["Routing & Switching", "TCP/IP & Subnetting", "Cisco Packet Tracer"],
        },
        {
          name: "Infrastructure & Security",
          description:
            "Linux systems administration, access control architectures, and network reconnaissance.",
          skills: ["Linux CLI", "Virtual Machines", "Nmap", "Wireshark", "RBAC"],
        },
        {
          name: "Hardware & IT Operations",
          description:
            "Modular hardware assembly, component-level troubleshooting, and firmware maintenance.",
          skills: ["PC Assembly & Diagnostics", "Hardware Upgrades", "OS Management"],
        },
      ],
    },
    {
      id: "EDU_02",
      category: "UPSKILL",
      categoryBadge: "CLOUD WORKFORCE INITIATIVE // INDUSTRY FELLOWSHIP",
      program: "AWS re/Start Program",
      institution: "Amazon Web Services (AWS) Training & Certification",
      period: "Cohort 2026",
      location: "Hybrid // Philippines",
      cohort: "BATCH PHMAN 31",
      sponsors: ["DigiPlus Interactive Corp.", "Edukasyon.ph"],
      credentialTarget: "AWS Certified Cloud Practitioner (CCP) Readiness",
      description:
        "Intensive, skills-based training curriculum preparing non-traditional learners for entry-level cloud careers with hands-on labs and scenario-based technical drills.",
      pillars: [
        {
          name: "AWS Core Infrastructure",
          description:
            "Foundational compute, storage, virtual networking, and identity management in the AWS Cloud.",
          skills: ["Amazon EC2", "Amazon S3", "Amazon VPC", "AWS IAM", "Amazon RDS"],
        },
        {
          name: "Linux & Shell Scripting",
          description:
            "POSIX shell command proficiency, automated system maintenance, and user permission models.",
          skills: ["Bash Shell", "File Systems", "Process Management", "Permissions"],
        },
        {
          name: "Cloud Networking & Security",
          description:
            "Virtual private cloud segmentation, stateful security groups, and cloud perimeter defense.",
          skills: ["Subnetting", "Security Groups & NACLs", "Zero-Trust Access"],
        },
        {
          name: "Python Automation & Observability",
          description:
            "Programmatic cloud infrastructure interactions and runtime metrics monitoring.",
          skills: ["Python Scripting", "Boto3 Fundamentals", "Amazon CloudWatch"],
        },
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
      credentialUrl: "https://coursera.org/share/cec56f222d28de31555c1700553d8fd5",
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
