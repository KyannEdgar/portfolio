"use client";

import { siteConfig } from "@/config";
import { Key } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border bg-card/40 px-6 py-12 md:px-12 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Key className="h-3.5 w-3.5 text-foreground" />
          <span>ENCRYPTED PROTOCOL // SHA-256 SIGNED</span>
        </div>

        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
          <span className="opacity-30">//</span>
          <span className="text-foreground">ARTCRAFT EDITION</span>
        </div>
      </div>
    </footer>
  );
}
