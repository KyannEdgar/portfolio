"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          {siteConfig.name}
        </Link>

        {/* Center / Navigation: Spaced-out, minimalist, clean unboxed text links */}
        <nav className="hidden items-center gap-10 md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Minimalist Theme Switcher */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
