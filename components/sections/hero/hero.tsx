"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config";
import {
  heroContainerVariants,
  heroItemVariants,
} from "@/lib/animation";
import { SocialIcon } from "@/components/ui/icons/social-icons";
import { useHeroCursor } from "@/components/ui/hero-cursor-context";

const PORTRAITS = [
  {
    src: "/images/portrait-1.jpg",
    alt: "Kian Abustan - Graduation Portrait (No Cap)",
  },
  {
    src: "/images/portrait-2.jpg",
    alt: "Kian Abustan - Graduation Portrait (Holding Cap)",
  },
  {
    src: "/images/portrait-3.jpg",
    alt: "Kian Abustan - Graduation Portrait (Academic Cap A)",
  },
  {
    src: "/images/portrait-4.jpg",
    alt: "Kian Abustan - Graduation Portrait (Academic Cap B)",
  },
];

export function Hero() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isHoveringPicture, setIsHoveringPicture] = useState(false);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { hoveredElementBounds, setHoveredElementBounds } = useHeroCursor();

  // Water fluid lag spring configuration for cursor bubble
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springConfig = { stiffness: 140, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Window-level mouse tracking for the entire page
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      setIsCursorActive(true);

      // Follow cursor if not currently locked to an absorbed element
      if (!hoveredElementBounds) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleWindowMouseLeave = () => {
      setIsCursorActive(false);
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleWindowMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseleave", handleWindowMouseLeave);
    };
  }, [hoveredElementBounds, mouseX, mouseY]);

  // Snap spring targets to exact element center on absorption
  useEffect(() => {
    if (hoveredElementBounds) {
      const centerX = hoveredElementBounds.x + hoveredElementBounds.width / 2;
      const centerY = hoveredElementBounds.y + hoveredElementBounds.height / 2;
      mouseX.set(centerX);
      mouseY.set(centerY);
    }
  }, [hoveredElementBounds, mouseX, mouseY]);

  const scrollAnimationRef = useRef<number | null>(null);

  // Clean up any running animation frame on unmount
  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    setHoveredElementBounds(null); // Release bubble absorption smoothly

    const target = document.getElementById("about");
    if (!target) return;

    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    const startPosition = window.scrollY;
    // Target the start of About where Statement 1 is fully displayed
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 2200; // Slower, paced cinematic scroll
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
        window.history.pushState(null, "", "#about");
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(step);
  };

  const handleCyclePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % PORTRAITS.length);
  };

  // The bubble remains visible across all sections on the page!
  // Only hide when hovering the central portrait:
  const isBubbleVisible = isCursorActive && !isHoveringPicture;

  let targetWidth = 70;
  let targetHeight = 70;
  let targetRadius: number | string = 9999;

  if (hoveredElementBounds) {
    if (hoveredElementBounds.shape === "circle") {
      targetWidth = Math.max(
        hoveredElementBounds.width,
        hoveredElementBounds.height,
        42
      );
      targetHeight = targetWidth;
      targetRadius = 9999;
    } else if (
      hoveredElementBounds.shape === "rounded" ||
      hoveredElementBounds.borderRadius !== undefined
    ) {
      // Follow the exact element dimensions with comfortable breathing room
      targetWidth = hoveredElementBounds.width + 12;
      targetHeight = hoveredElementBounds.height + 8;
      targetRadius =
        typeof hoveredElementBounds.borderRadius === "number"
          ? hoveredElementBounds.borderRadius
          : 8;
    } else {
      // Default / "pill"
      targetWidth = hoveredElementBounds.width + 20;
      targetHeight = hoveredElementBounds.height + 8;
      targetRadius = 9999;
    }
  }

  return (
    <section
      id="landing"
      className="relative flex min-h-screen w-full flex-col justify-between px-6 pt-24 pb-8 md:px-12 md:pb-12 bg-background overflow-hidden select-none"
    >
      {/* Background ambient lighting - strictly monochrome */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.03] blur-[140px]" />

      {/* Trailing Inverted Fluid Water Bubble */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[60] bg-white mix-blend-difference hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: targetWidth,
          height: targetHeight,
          borderRadius: targetRadius,
          opacity: isBubbleVisible ? 1 : 0,
          scale: isBubbleVisible ? 1 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 24,
          mass: 0.5,
        }}
      />

      {/* Master Framer Motion Stagger Container */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-1 flex-col justify-between w-full mx-auto"
      >
        {/* Invisible Top Rail for optical vertical centering */}
        <div className="hidden md:block h-6 w-full opacity-0 pointer-events-none" />

        {/* Centerpiece: Massive Editorial Typographic Lockup with Dual-Axis Expandable Portrait */}
        <div className="my-auto flex flex-col items-center justify-center w-full py-8 md:py-12">
          <motion.h1
            variants={heroItemVariants}
            className="w-full text-center text-5xl sm:text-6xl md:text-[5.5vw] lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase leading-none text-foreground select-none"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8"
            >
              {/* Word 1: Kian + Dual-Axis Expandable Portrait */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="inline-flex items-center gap-3 sm:gap-4 md:gap-8"
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="tracking-tighter transition-opacity duration-300 hover:opacity-85 select-none"
                >
                  Kian
                </motion.span>

                {/* Anchor Wrapper for Portrait & Floating Callout */}
                <div className="relative inline-flex items-center justify-center align-middle">
                  {/* Floating "CLICK ME ↓" Callout */}
                  <AnimatePresence>
                    {isHoveringPicture && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.9 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="pointer-events-none absolute -top-8 md:-top-9 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-background/90 px-2.5 py-0.5 font-mono text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-foreground backdrop-blur-md border border-border/80 shadow-sm select-none"
                      >
                        <span>Click me</span>
                        <motion.span
                          animate={{ y: [0, 2.5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "easeInOut",
                          }}
                          className="inline-flex"
                        >
                          <ArrowDown className="h-3 w-3 text-foreground" />
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Center Dual-Axis Expandable Interactive Multi-Portrait Frame */}
                  <motion.div
                    layout
                    role="button"
                    tabIndex={0}
                    aria-label={`Cycle portrait gallery. Showing photo ${photoIndex + 1} of ${PORTRAITS.length}`}
                    onMouseEnter={() => setIsHoveringPicture(true)}
                    onMouseLeave={() => setIsHoveringPicture(false)}
                    onClick={handleCyclePhoto}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setPhotoIndex((prev) => (prev + 1) % PORTRAITS.length);
                      }
                    }}
                    animate={{
                      width: isHoveringPicture ? "1.55em" : "1.25em",
                      height: isHoveringPicture ? "2.35em" : "0.85em",
                      scale: isHoveringPicture ? 1.02 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                    className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md md:rounded-lg border border-border/80 dark:border-white/10 cursor-pointer align-middle shadow-sm focus:outline-none focus:ring-1 focus:ring-foreground/40"
                  >
                    {/* Multi-Photo Transition Layer */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={photoIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="relative h-full w-full"
                      >
                        <Image
                          src={PORTRAITS[photoIndex].src}
                          alt={PORTRAITS[photoIndex].alt}
                          fill
                          priority
                          sizes="(max-width: 640px) 160px, (max-width: 768px) 240px, (max-width: 1024px) 340px, 420px"
                          className="object-cover object-[center_20%] group-hover:object-[center_12%] grayscale contrast-105 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:contrast-100"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Subtle Minimalist Index Pill on Hover */}
                    <AnimatePresence>
                      {isHoveringPicture && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="pointer-events-none absolute bottom-2 inset-x-0 mx-auto w-fit z-20 rounded bg-background/85 px-2 py-0.5 font-mono text-[9px] md:text-[10px] font-medium tracking-wider text-foreground backdrop-blur-md border border-border/80 uppercase shadow-sm select-none"
                        >
                          [{String(photoIndex + 1).padStart(2, "0")} // {String(PORTRAITS.length).padStart(2, "0")}]
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>

              {/* Word 2: Abustan */}
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="tracking-tighter transition-opacity duration-300 hover:opacity-85 select-none"
              >
                Abustan
              </motion.span>
            </motion.div>
          </motion.h1>
        </div>

        {/* Bottom Editorial Footer Bar (3 Responsive Zones) */}
        <motion.div
          variants={heroItemVariants}
          className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-5 pt-8 text-center"
        >
          {/* Zone 1 (Left): Unboxed Social Icons with Absorption Bubble */}
          <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 order-2 md:order-1">
            {siteConfig.socials.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                title={`${social.platform}: ${social.handle}`}
                onMouseEnter={(e) => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setHoveredElementBounds({
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                    shape: "circle",
                  });
                }}
                onMouseLeave={() => setHoveredElementBounds(null)}
                className="relative flex items-center justify-center h-10 w-10 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <SocialIcon
                  platform={social.platform}
                  className="h-4 w-4"
                />
              </motion.a>
            ))}
          </div>

          {/* Zone 2 (Center): Role Descriptor */}
          <div className="order-1 md:order-2 flex justify-center px-4">
            <p className="font-mono text-xs md:text-sm uppercase tracking-wider sm:tracking-widest text-muted-foreground text-center max-w-[260px] md:max-w-none leading-relaxed">
              Aspiring Network and Cloud Engineer
            </p>
          </div>

          {/* Zone 3 (Right): Unboxed Scroll Indicator with Absorption Bubble */}
          <div className="flex items-center justify-center md:justify-end order-3">
            <Link
              href="#about"
              onClick={handleScrollToAbout}
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
              onMouseLeave={() => setHoveredElementBounds(null)}
              className="group inline-flex items-center gap-1.5 font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 py-1"
            >
              <span>Scroll to Explore</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
