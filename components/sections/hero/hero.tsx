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
import { ArrowDown, Download, FileText } from "lucide-react";
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
  const [isResumeHovered, setIsResumeHovered] = useState(false);

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
      if (typeof document !== "undefined") {
        document.documentElement.style.scrollBehavior = "";
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

    // Temporarily bypass any browser smooth-scroll interception
    if (typeof document !== "undefined") {
      document.documentElement.style.scrollBehavior = "auto";
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

      window.scrollTo({
        top: startPosition + distance * ease,
        left: 0,
        behavior: "instant",
      });

      if (elapsed < duration) {
        scrollAnimationRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
        if (typeof document !== "undefined") {
          document.documentElement.style.scrollBehavior = "";
        }
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
  let targetRadius = 35; // 70 / 2 = exact circle (never 9999!)

  if (hoveredElementBounds) {
    if (hoveredElementBounds.shape === "circle") {
      targetWidth = Math.max(
        hoveredElementBounds.width,
        hoveredElementBounds.height,
        42
      );
      targetHeight = targetWidth;
      targetRadius = targetHeight / 2;
    } else if (
      hoveredElementBounds.shape === "rounded" ||
      hoveredElementBounds.borderRadius !== undefined
    ) {
      // Follow exact element dimensions
      targetWidth = hoveredElementBounds.width + 12;
      targetHeight = hoveredElementBounds.height + 8;
      targetRadius =
        typeof hoveredElementBounds.borderRadius === "number"
          ? hoveredElementBounds.borderRadius
          : 12;
    } else {
      // Pill shape (header nav links)
      targetWidth = hoveredElementBounds.width + 20;
      targetHeight = hoveredElementBounds.height + 8;
      targetRadius = targetHeight / 2;
    }
  }

  return (
    <section
      id="landing"
      className="relative flex min-h-screen w-full flex-col justify-between px-4 pt-16 pb-6 sm:px-6 md:px-12 md:pt-24 md:pb-12 bg-background overflow-hidden select-none"
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
            className="w-full text-center text-4xl sm:text-6xl md:text-[5.5vw] lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase leading-none text-foreground select-none"
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
                    className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md md:rounded-lg border border-border/80 dark:border-white/10 cursor-pointer align-middle shadow-sm focus:outline-none focus:ring-1 focus:ring-foreground/40 w-[1.25em] h-[0.85em]"
                  >
                    {/* Multi-Photo Transition Layer */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={photoIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="relative h-full w-full min-h-[0.85em] min-w-[1.25em]"
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

          {/* =========================================================================
              CENTRAL HIGH-VISIBILITY RESUME DOWNLOAD ACTION (BUBBLE-ABSORBING)
              ========================================================================= */}
          <motion.div
            variants={heroItemVariants}
            className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center justify-center relative z-20"
          >
            {/* Floating Info Tooltip on Hover */}
            <AnimatePresence>
              {isResumeHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.92 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="pointer-events-none absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-background/95 px-3 py-0.5 font-mono text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-foreground backdrop-blur-md border border-border/80 shadow-md select-none"
                >
                  <FileText className="h-3 w-3 text-foreground" />
                  <span>DIRECT PDF DOWNLOAD &bull; 179 KB</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Interactive Capsule Button (Dimension-Locked to Prevent Edge Hover Jitter) */}
            <motion.a
              href={siteConfig.documents?.resume || "/documents/resume/kian-edgar-abustan-resume.pdf"}
              download="Kian_Edgar_Abustan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Kian Edgar Abustan's Resume in PDF format"
              onMouseEnter={(e) => {
                setIsResumeHovered(true);
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
                setIsResumeHovered(false);
                setHoveredElementBounds(null);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 w-[270px] sm:w-[310px] h-11 sm:h-12 rounded-full border border-foreground/25 bg-foreground/[0.04] hover:bg-foreground/[0.08] hover:border-foreground/80 px-4 sm:px-5 font-mono text-[10px] sm:text-xs tracking-wider uppercase text-foreground backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-[border-color,background-color,box-shadow] duration-200 cursor-pointer select-none"
            >
              {/* Pulsing Monochrome Beacon Dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
              </span>

              {/* Animated Download Icon */}
              <motion.span
                animate={{ y: isResumeHovered ? [0, 3, 0] : [0, 1.5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: isResumeHovered ? 0.9 : 1.8,
                  ease: "easeInOut",
                }}
                className="inline-flex shrink-0"
              >
                <Download className="h-4 w-4 text-foreground" />
              </motion.span>

              {/* Dimension-Locked Dual-Layer Text Slide (Zero Layout Reflow) */}
              <div className="relative h-4 flex-1 flex items-center justify-center overflow-hidden">
                <span
                  className={`absolute inset-0 flex items-center justify-center font-semibold tracking-widest font-mono text-[10px] sm:text-[11px] text-foreground transition-all duration-200 ${
                    isResumeHovered
                      ? "opacity-0 -translate-y-2 pointer-events-none"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  CURRICULUM VITAE // RESUME
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center font-semibold tracking-widest font-mono text-[10px] sm:text-[11px] text-foreground transition-all duration-200 ${
                    isResumeHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  DOWNLOAD RESUME [PDF]
                </span>
              </div>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Editorial Footer Bar (3 Responsive Zones) */}
        <motion.div
          variants={heroItemVariants}
          className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-5 pt-6 md:pt-8 text-center"
        >
          {/* Zone 1 (Left): Unboxed Social Icons with Animated Directional Indicator */}
          <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 order-2 md:order-1">
            <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground select-none">
              <span>Socials</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block text-current"
              >
                &rarr;
              </motion.span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
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
                  className="relative flex items-center justify-center h-9 w-9 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <SocialIcon
                    platform={social.platform}
                    className="h-4 w-4"
                  />
                </motion.a>
              ))}
            </div>
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
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block text-current"
              >
                &darr;
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
