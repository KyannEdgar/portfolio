"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { siteConfig } from "@/config";
import {
  heroContainerVariants,
  heroItemVariants,
} from "@/lib/animation";
import { SocialIcon } from "@/components/ui/icons/social-icons";

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
  const [hoveredSocialIndex, setHoveredSocialIndex] = useState<number | null>(null);
  const [isInsideHero, setIsInsideHero] = useState(false);

  // Compute visibility of the global trailing cursor bubble
  const isBubbleVisible = isInsideHero && !isHoveringPicture && hoveredSocialIndex === null;

  // Water fluid lag spring configuration for cursor bubble
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    if (!isInsideHero) setIsInsideHero(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsInsideHero(true);
  };

  const handleMouseLeave = () => {
    setIsInsideHero(false);
    setIsHoveringPicture(false);
    setHoveredSocialIndex(null);
  };

  const handleCyclePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % PORTRAITS.length);
  };

  return (
    <section
      id="landing"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen w-full flex-col justify-between px-6 pt-24 pb-8 md:px-12 md:pb-12 bg-background overflow-hidden select-none"
    >
      {/* Background ambient lighting - strictly monochrome */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.03] blur-[140px]" />

      {/* Trailing Inverted Fluid Water Bubble (Scoped to Hero, Desktop Only) */}
      <motion.div
        className="pointer-events-none absolute -top-12 -left-12 z-30 rounded-full bg-white mix-blend-difference hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: 70,
          height: 70,
          opacity: isBubbleVisible ? 1 : 0,
          scale: isBubbleVisible ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
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
                    width: isHoveringPicture ? "2.3em" : "1.25em",
                    height: isHoveringPicture ? "1.25em" : "0.85em",
                    scale: isHoveringPicture ? 1.05 : 1,
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
                        sizes="(max-width: 640px) 160px, (max-width: 768px) 220px, (max-width: 1024px) 300px, 360px"
                        className="object-cover object-[center_20%] grayscale contrast-105 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:contrast-100"
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
                        className="pointer-events-none absolute bottom-1.5 inset-x-0 mx-auto w-fit z-20 rounded bg-background/85 px-2 py-0.5 font-mono text-[9px] md:text-[10px] font-medium tracking-wider text-foreground backdrop-blur-md border border-border/80 uppercase shadow-sm select-none"
                      >
                        [{String(photoIndex + 1).padStart(2, "0")} // {String(PORTRAITS.length).padStart(2, "0")}]
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
          {/* Zone 1 (Left): Unboxed Social Icons with Dedicated Dock Bubble */}
          <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 order-2 md:order-1">
            {siteConfig.socials.map((social, idx) => {
              const isHovered = hoveredSocialIndex === idx;

              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  title={`${social.platform}: ${social.handle}`}
                  onMouseEnter={() => setHoveredSocialIndex(idx)}
                  onMouseLeave={() => setHoveredSocialIndex(null)}
                  layout
                  className="relative flex items-center justify-center h-9 w-9 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200"
                  animate={{
                    scale: isHovered ? 1.25 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Dedicated circle bubble appearing strictly on the hovered icon */}
                  {isHovered && (
                    <motion.div
                      layoutId="socialIconBubble"
                      className="absolute inset-0 rounded-full bg-foreground/10 dark:bg-white/15 border border-foreground/20 dark:border-white/20"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  <SocialIcon
                    platform={social.platform}
                    className="relative z-10 h-4 w-4"
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Zone 2 (Center): Role Descriptor */}
          <div className="order-1 md:order-2 flex justify-center px-4">
            <p className="font-mono text-xs md:text-sm uppercase tracking-wider sm:tracking-widest text-muted-foreground text-center max-w-[260px] md:max-w-none leading-relaxed">
              Aspiring Network and Cloud Engineer
            </p>
          </div>

          {/* Zone 3 (Right): Unboxed Scroll Indicator */}
          <div className="flex items-center justify-center md:justify-end order-3">
            <Link
              href="#certifications"
              className="group inline-flex items-center gap-1.5 font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
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
