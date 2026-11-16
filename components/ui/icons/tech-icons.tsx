import React from "react";

export interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export function TechIcon({ name, className = "h-6 w-6", ...props }: TechIconProps) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (normalized) {
    case "aws":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* AWS Cloud & Smile Arc */}
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <path d="M7 16c2.5 2 7.5 2 10 0" strokeWidth="1.5" />
          <path d="M16 15l1.5 1-1 1.5" strokeWidth="1.5" />
        </svg>
      );

    case "googlecloud":
    case "gcp":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Cloud with network nodes */}
          <path d="M19 16.9A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
          <polyline points="9 13 12 10 15 13" />
          <line x1="12" y1="10" x2="12" y2="18" />
        </svg>
      );

    case "github":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );

    case "vercel":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Vercel Triangle */}
          <path d="M12 2L24 22H0L12 2Z" />
        </svg>
      );

    case "supabase":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Supabase Lightning / Bolt */}
          <path d="M13.5 2L3 14.5H11L10.5 22L21 9.5H13L13.5 2Z" />
        </svg>
      );

    case "firebase":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Firebase Flame Vector */}
          <path d="M4.5 15.5L8 3.5L12 11L15 5.5L19.5 15.5C20.5 17.5 19.5 20.5 17 21.5C14.5 22.5 9.5 22.5 7 21.5C4.5 20.5 3.5 17.5 4.5 15.5Z" />
          <path d="M8 17C9 18.5 11 19 12 19C13 19 15 18.5 16 17" />
        </svg>
      );

    case "discord":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Discord Clyde Logo */}
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );

    case "docker":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Docker Whale & Container Blocks Vector */}
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m21.758 1.48a6.386 6.386 0 00-2.88-1.579.186.186 0 00-.214.075c-.29.473-.706.877-1.22 1.17a6.6 6.6 0 01-1.076.471.186.186 0 01-.22-.093c-.47-.942-.996-1.396-1.583-1.396H.657a.64.64 0 00-.638.64 10.655 10.655 0 003.183 7.545c3.08 3.125 7.636 3.125 11.83 1.137a11.96 11.96 0 006.185-6.223 6.945 6.945 0 002.775-1.747z" />
        </svg>
      );

    case "linux":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Tux Penguin Minimal Line Geometry */}
          <ellipse cx="12" cy="13" rx="6" ry="8" />
          <ellipse cx="12" cy="7" rx="3.5" ry="4" />
          <circle cx="10.5" cy="6.5" r="0.75" fill="currentColor" />
          <circle cx="13.5" cy="6.5" r="0.75" fill="currentColor" />
          <path d="M11 8.5C11.5 9 12.5 9 13 8.5" />
          <path d="M6 13C5 14.5 5 17 6 18.5" />
          <path d="M18 13C19 14.5 19 17 18 18.5" />
          <path d="M8 21C9 21.5 11 21.5 12 21" />
          <path d="M12 21C13 21.5 15 21.5 16 21" />
        </svg>
      );

    case "windows":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Windows 4-Tile Minimal Geometry */}
          <rect x="2" y="3" width="9" height="8" rx="0.5" />
          <rect x="13" y="3" width="9" height="8" rx="0.5" />
          <rect x="2" y="13" width="9" height="8" rx="0.5" />
          <rect x="13" y="13" width="9" height="8" rx="0.5" />
        </svg>
      );

    case "figma":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Figma 5-Component Structure */}
          <circle cx="15.5" cy="12" r="3.5" />
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5Z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5Z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0Z" />
        </svg>
      );

    case "adobephotoshop":
    case "photoshop":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          {/* "Ps" Monogram */}
          <path d="M7 16V8h2.5a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H7" />
          <path d="M13.5 14c.5.7 1.2 1 2 1 1 0 1.5-.5 1.5-1.1 0-1.4-3.5-.8-3.5-3 0-1.2 1-2 2.5-2 .8 0 1.6.3 2 .8" />
        </svg>
      );

    case "adobeillustrator":
    case "illustrator":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          {/* "Ai" Monogram */}
          <path d="M7 16l2.5-8h1L13 16" />
          <line x1="8.2" y1="13" x2="11.8" y2="13" />
          <line x1="16" y1="10.5" x2="16" y2="16" />
          <circle cx="16" cy="8.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );

    case "powershell":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <rect x="2" y="3" width="20" height="18" rx="3" />
          {/* PowerShell Prompts */}
          <path d="M7 9l4 3-4 3" />
          <line x1="13" y1="15" x2="17" y2="15" />
        </svg>
      );

    case "bash":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <rect x="2" y="3" width="20" height="18" rx="3" />
          {/* Bash $ prompt */}
          <path d="M6 9l3 3-3 3" />
          <line x1="11" y1="15" x2="17" y2="15" />
          <line x1="13" y1="8" x2="13" y2="12" />
        </svg>
      );

    case "wireshark":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Wireshark Shark Fin & Flow Curves */}
          <path d="M3 18c4-1 7-3 9-8 1-2.5 3-6 7-7-1 4-1 8 2 11-3 1-6 2-10 2-3 0-5.5-.6-8 2Z" />
          <path d="M3 20h18" strokeDasharray="2 2" />
        </svg>
      );

    case "nmap":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Radar Scanner / Reconnaissance Network Eye */}
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" strokeDasharray="3 2" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <path d="M12 12l5-5" strokeWidth="2" />
        </svg>
      );

    case "cisco":
    case "ciscopackettracer":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {/* Cisco Bridge Vertical Bars / Router Matrix */}
          <line x1="4" y1="15" x2="4" y2="17" />
          <line x1="7" y1="13" x2="7" y2="17" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="12" y1="9" x2="12" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <line x1="17" y1="13" x2="17" y2="17" />
          <line x1="20" y1="15" x2="20" y2="17" />
          {/* Connection Arc */}
          <path d="M4 10C8 6 16 6 20 10" strokeDasharray="2 2" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}
