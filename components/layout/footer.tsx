"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config";
import { useHeroCursor } from "@/components/ui/hero-cursor-context";
import {
  ArrowUp,
  ArrowUpRight,
  Copy,
  Check,
  Clock,
  Globe,
  Mail,
  Github,
  Linkedin,
  MessageSquare,
} from "lucide-react";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const { setHoveredElementBounds } = useHeroCursor();

  const emailAddress = "kianabustan01@gmail.com";

  // Hydration-safe live Manila local time (UTC+8)
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMagneticHover = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredElementBounds({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      shape: "rounded",
      borderRadius: 6,
    });
  };

  const handleMagneticLeave = () => {
    setHoveredElementBounds(null);
  };

  return (
    <footer className="relative z-30 w-full border-t border-border/80 bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-12 pb-8">
        
        {/* =========================================================================
            TOP UTILITY BAR: LIVE CLOCK • ONE-CLICK CONTACT • APEX RETURN
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-8 border-b border-border/60 font-mono text-xs text-muted-foreground">
          
          {/* Real-time Manila Location & Clock */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
              <Globe className="h-3.5 w-3.5 text-foreground" />
              <span>MANILA, PH</span>
            </span>
            <span className="opacity-30">//</span>
            <span className="flex items-center gap-1.5 tabular-nums">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{mounted ? `${timeString} PHT` : "12:00:00 PM PHT"}</span>
            </span>
          </div>

          {/* Quick Actions: Email Copy & Apex Return */}
          <div className="flex items-center gap-4">
            {/* Interactive Email Copy Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              onMouseEnter={handleMagneticHover}
              onMouseLeave={handleMagneticLeave}
              className="group flex items-center gap-2 rounded px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              title="Click to copy email address"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-foreground" />
                  <span className="text-foreground font-semibold">COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span>{emailAddress}</span>
                </>
              )}
            </button>

            <span className="opacity-30 hidden sm:inline">//</span>

            {/* Back to Top */}
            <button
              type="button"
              onClick={handleScrollToTop}
              onMouseEnter={handleMagneticHover}
              onMouseLeave={handleMagneticLeave}
              className="group flex items-center gap-1.5 rounded px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 text-foreground" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            MIDDLE DIRECTORY: 3-COLUMN TYPOGRAPHIC GRID (CARD-FREE)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-12 border-b border-border/60">
          
          {/* Column 1: Identity & Availability (5 Cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                ENGINEERING PROFILE
              </h3>
              <p className="mt-2 text-2xl font-bold tracking-tight text-foreground font-sans">
                {siteConfig.name}
              </p>
              <p className="mt-1 font-mono text-xs text-foreground/70">
                Cloud Systems &amp; Network Infrastructure
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground max-w-sm">
                Building foundational expertise in cloud infrastructure and enterprise networking. Actively learning and pursuing industry certifications with a commitment to continuous technical mastery.
              </p>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
                <span>OPEN FOR TECHNICAL ROLES &amp; COLLABORATION</span>
              </div>
            </div>
          </div>

          {/* Column 2: Index Navigation (4 Cols) */}
          <div className="md:col-span-4 flex flex-col">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              INDEX NAVIGATION
            </h3>
            <nav className="flex flex-col space-y-2.5">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  onMouseEnter={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                  className="group flex items-center justify-between py-1 text-xs transition-colors duration-200 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                      {item.number}/
                    </span>
                    <span className="font-sans text-muted-foreground group-hover:text-foreground font-medium transition-colors">
                      {item.label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-foreground" />
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Direct Channels & Connect (3 Cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              DIRECT CHANNELS
            </h3>
            <div className="flex flex-col space-y-2.5">
              {siteConfig.socials.map((social) => {
                const getIcon = () => {
                  switch (social.platform.toLowerCase()) {
                    case "github":
                      return <Github className="h-3.5 w-3.5" />;
                    case "linkedin":
                      return <Linkedin className="h-3.5 w-3.5" />;
                    case "discord":
                      return <MessageSquare className="h-3.5 w-3.5" />;
                    default:
                      return <Mail className="h-3.5 w-3.5" />;
                  }
                };

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleMagneticHover}
                    onMouseLeave={handleMagneticLeave}
                    className="group flex items-center justify-between py-1 text-xs transition-colors duration-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      {getIcon()}
                      <span className="font-sans font-medium">{social.platform}</span>
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex items-center gap-1">
                      <span>{social.handle}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM COPYRIGHT
            ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
          <div className="text-muted-foreground/80">
            CREATED WITH NEXT.JS &bull; TAILWIND CSS &bull; FRAMER MOTION
          </div>
        </div>

      </div>
    </footer>
  );
}
