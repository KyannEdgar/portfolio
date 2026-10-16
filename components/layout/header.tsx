"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { siteConfig } from "@/config";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("landing");
  const [hidden, setHidden] = useState(false);

  const scrollAnimationRef = React.useRef<number | null>(null);
  const isAutoScrollingRef = React.useRef<boolean>(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isAutoScrollingRef.current) {
      setHidden(false);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (latest > 100 && diff > 0) {
      setHidden(true);
    } else if (diff < 0 || latest <= 100) {
      setHidden(false);
    }
  });

  const handleSmoothScroll = (targetId: string, duration: number = 1100) => {
    const target = document.getElementById(targetId);
    if (!target) {
      // Fallback if navigating from another route
      window.location.href = `/#${targetId}`;
      return;
    }

    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    isAutoScrollingRef.current = true;
    setHidden(false);

    const headerOffset = 80; // Matches h-20 header height
    const targetPosition =
      targetId === "landing"
        ? 0
        : Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (elapsed < duration) {
        scrollAnimationRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
        isAutoScrollingRef.current = false;
        // Update URL hash without instant jumping
        window.history.pushState(null, "", `#${targetId}`);
        setActiveSection(targetId);
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(step);
  };

  // Clean up any ongoing animation frame on unmount
  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  // Track scroll position for header frosted glass (GEMINI.md Rule 5)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      "landing",
      "certifications",
      "skills",
      "projects",
      "experience",
      "education",
      "socials",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Handle bottom of page edge-case to reliably highlight the final section
    const handleScrollBottom = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      if (isBottom) {
        setActiveSection("socials");
      }
    };

    window.addEventListener("scroll", handleScrollBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollBottom);
    };
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand / Logo */}
        <Link
          href="/#landing"
          onClick={(e) => {
            e.preventDefault();
            handleSmoothScroll("landing");
          }}
          className="font-mono text-sm md:text-base font-bold tracking-widest text-foreground transition-opacity duration-200 hover:opacity-70"
        >
          <span>KA</span>
          <span className="text-muted-foreground font-normal">/</span>
          <span>01</span>
        </Link>

        {/* Center / Navigation: Spaced-out, minimalist, clean unboxed text links with active indicator */}
        <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
          {siteConfig.navigation.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll(item.id);
                }}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-foreground"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Minimalist Theme Switcher */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
