"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { siteConfig } from "@/config";
import { useHeroCursor } from "@/components/ui/hero-cursor-context";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("landing");
  const [hidden, setHidden] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);

  const { setHoveredElementBounds, setIsHeaderHovered } = useHeroCursor();

  const scrollAnimationRef = React.useRef<number | null>(null);
  const isAutoScrollingRef = React.useRef<boolean>(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Step A: Programmatic Scroll Guard
    if (isAutoScrollingRef.current) {
      setHidden(false);
      return;
    }

    // Step B: Hero Resting State
    if (latest <= 20) {
      setHidden(false);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Step C: Section Boundary Check
    const hasHero = !!document.getElementById("landing");

    if (hasHero) {
      const certEl = document.getElementById("certifications");
      const isInSections1to6 = certEl
        ? certEl.getBoundingClientRect().top <= 100
        : false;

      // Hero & About suppression: keep sticky header hidden during both scroll-down and scroll-up
      if (!isInSections1to6) {
        setHidden(true);
        return;
      }

      // Sections 1–6 sticky behavior
      if (diff > 0) {
        setHidden(true);
      } else if (diff < 0) {
        setHidden(false);
      }
    } else {
      // Fallback for standalone routes without #landing (e.g. /projects/[slug])
      if (latest <= 100) {
        setHidden(false);
      } else if (diff > 0) {
        setHidden(true);
      } else if (diff < 0) {
        setHidden(false);
      }
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
    setActiveSection(targetId);

    // Temporarily bypass any browser smooth-scroll interception
    if (typeof document !== "undefined") {
      document.documentElement.style.scrollBehavior = "auto";
    }

    // Do NOT subtract headerOffset: sections have built-in py-24/py-32 padding and sticky top-0 containers.
    // Scrolling directly to the section top tucks the preceding SectionCurtainDivider off-screen.
    const targetPosition =
      targetId === "landing"
        ? 0
        : Math.ceil(target.getBoundingClientRect().top + window.scrollY);
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

      window.scrollTo({
        top: startPosition + distance * ease,
        left: 0,
        behavior: "instant",
      });

      if (elapsed < duration) {
        scrollAnimationRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
        isAutoScrollingRef.current = false;
        if (typeof document !== "undefined") {
          document.documentElement.style.scrollBehavior = "";
        }
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
      if (typeof document !== "undefined") {
        document.documentElement.style.scrollBehavior = "";
      }
    };
  }, []);

  // Track scroll position for header frosted glass and synchronize initial visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (!isAutoScrollingRef.current) {
        if (currentScrollY <= 20) {
          setHidden(false);
        } else {
          const hasHero = !!document.getElementById("landing");
          if (hasHero) {
            const certEl = document.getElementById("certifications");
            const isInSections1to6 = certEl
              ? certEl.getBoundingClientRect().top <= 100
              : false;
            if (!isInSections1to6) {
              setHidden(true);
            }
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section based on the cascading curtain stack layout
  useEffect(() => {
    // Reverse DOM order: highest z-index / lowest section in DOM checked first
    const sectionIds = [
      "education",
      "experience",
      "projects",
      "skills",
      "certifications",
      "landing",
    ];

    const updateActiveSection = () => {
      // Do not overwrite during active programmatic smooth scrolling
      if (isAutoScrollingRef.current) return;

      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Bottom of page check: reliably highlight education when scrolled to bottom/footer
      if (currentScrollY + windowHeight >= fullHeight - 60) {
        setActiveSection("education");
        return;
      }

      // Top of page / Hero resting state
      if (currentScrollY <= 80) {
        setActiveSection("landing");
        return;
      }

      // In cascading curtain architecture, sections stack with ascending z-index.
      // The highest-order section whose top has reached or passed the activation threshold (120px)
      // is the layer currently in view.
      const activationThreshold = 120; // 80px header height + 40px buffer

      for (const id of sectionIds) {
        if (id === "landing") continue;
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= activationThreshold) {
          setActiveSection(id);
          return;
        }
      }

      setActiveSection("landing");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
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
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => {
        setIsHeaderHovered(false);
        setHoveredNavId(null);
        setHoveredElementBounds(null);
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-sm"
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
          onMouseEnter={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            setHoveredElementBounds({
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height,
              shape: "pill",
            });
          }}
          onMouseLeave={() => {
            setHoveredElementBounds(null);
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
            const isThisLinkHovered = hoveredNavId === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll(item.id);
                }}
                onMouseEnter={(e) => {
                  setHoveredNavId(item.id);
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setHoveredElementBounds({
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                    shape: "pill",
                  });
                }}
                onMouseLeave={() => {
                  setHoveredNavId(null);
                  setHoveredElementBounds(null);
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
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-foreground origin-center"
                    initial={false}
                    animate={{
                      opacity: isThisLinkHovered ? 0 : 1,
                      scaleX: isThisLinkHovered ? 0.2 : 1,
                      scaleY: isThisLinkHovered ? 0 : 1,
                      y: isThisLinkHovered ? -10 : 0,
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      },
                      opacity: { duration: 0.18, ease: "easeInOut" },
                      scaleX: { type: "spring", stiffness: 400, damping: 28 },
                      scaleY: { type: "spring", stiffness: 400, damping: 28 },
                      y: { type: "spring", stiffness: 400, damping: 28 },
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4" />
      </div>
    </motion.header>
  );
}
