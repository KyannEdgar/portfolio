import React from "react";

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  platform: string;
}

export function SocialIcon({ platform, className = "h-4 w-4", ...props }: SocialIconProps) {
  const normalized = platform.toLowerCase().trim();

  switch (normalized) {
    case "linkedin":
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
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
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

    case "facebook":
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
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );

    case "instagram":
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
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );

    case "discord":
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
          <path d="M18.89 5.52A16.08 16.08 0 0 0 15 4.31a.1.1 0 0 0-.1.05c-.18.33-.39.76-.53 1.1a14.88 14.88 0 0 0-4.74 0c-.14-.34-.35-.77-.53-1.1a.1.1 0 0 0-.1-.05 16.09 16.09 0 0 0-3.89 1.21.1.1 0 0 0-.05.04C2.56 9.29 1.87 13.96 2.2 18.57a.1.1 0 0 0 .04.07 16.21 16.21 0 0 0 4.88 2.47.1.1 0 0 0 .11-.03c.38-.52.71-1.07 1-1.64a.1.1 0 0 0-.05-.14 10.66 10.66 0 0 1-1.52-.73.1.1 0 0 1 0-.17c.1-.08.2-.16.3-.24a.1.1 0 0 1 .1 0c3.19 1.46 6.64 1.46 9.79 0a.1.1 0 0 1 .1 0c.1.08.2.16.3.24a.1.1 0 0 1 0 .17 10.74 10.74 0 0 1-1.52.73.1.1 0 0 0-.05.14c.29.57.62 1.12 1 1.64a.1.1 0 0 0 .11.03 16.18 16.18 0 0 0 4.89-2.47.1.1 0 0 0 .04-.07c.41-5.32-.7-9.96-2.93-13.01a.1.1 0 0 0-.04-.04Z" />
          <circle cx="8.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
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
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
  }
}
