"use client";

import * as React from "react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { siteConfig } from "@/config";
import { customSpring } from "@/lib/animation";
import { useHeroCursor } from "@/components/ui/hero-cursor-context";
import { Briefcase } from "lucide-react";

// ============================================================================
// Tech Art 1: Web Development & API Architecture (.NET / DDD / HRIS)
// ============================================================================
function WebDevArchitectureArt() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center select-none">
      {/* Subtle background coordinate grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <svg
        viewBox="0 0 240 240"
        className="relative h-44 w-44 sm:h-52 sm:w-52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Browser / UI Application Window Frame */}
        <rect
          x="25"
          y="30"
          width="190"
          height="115"
          rx="6"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.2"
          fill="rgba(0,0,0,0.5)"
        />
        {/* Browser Window Title Bar */}
        <line x1="25" y1="52" x2="215" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="37" cy="41" r="2.5" fill="rgba(255,255,255,0.5)" />
        <circle cx="47" cy="41" r="2.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="57" cy="41" r="2.5" fill="rgba(255,255,255,0.2)" />
        {/* Address bar wireframe */}
        <rect x="72" y="36" width="95" height="10" rx="3" fill="rgba(255,255,255,0.06)" />

        {/* Web Layout Components (Sidebar + Content Grid) */}
        <rect x="35" y="60" width="35" height="75" rx="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <rect x="78" y="60" width="128" height="24" rx="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <rect x="78" y="90" width="60" height="45" rx="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <rect x="146" y="90" width="60" height="45" rx="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />

        {/* Downward API Data Bus Cable with Moving Pulses */}
        <line x1="120" y1="145" x2="120" y2="175" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
        <motion.circle
          cx="120"
          cy="145"
          r="3"
          fill="white"
          animate={{ cy: [145, 175, 145] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Backend .NET Core & DDD Architecture Node */}
        <rect
          x="45"
          y="175"
          width="150"
          height="38"
          rx="5"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
          fill="rgba(0,0,0,0.6)"
        />
        <text x="56" y="198" fill="rgba(255,255,255,0.85)" fontFamily="monospace" fontSize="9" fontWeight="600" letterSpacing="1">
          .NET // CORE API [DDD]
        </text>
        <rect x="168" y="185" width="18" height="18" rx="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
        <circle cx="177" cy="194" r="2" fill="white" />
      </svg>

      {/* Technical Spec Box */}
      <div className="mt-2 rounded border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] text-neutral-400 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <span className="font-semibold text-neutral-200">ARCHITECTURE // DOMAIN-DRIVEN DESIGN</span>
        </div>
        <div className="text-[9px] text-neutral-500 mt-0.5">RESTful_API &bull; .NET_CORE &bull; HRIS_SERVICES</div>
      </div>
    </div>
  );
}

// ============================================================================
// Tech Art 2: Cross-Platform Quality Assurance & Verification Matrix
// ============================================================================
function QATestMatrixArt() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center select-none">
      {/* Subtle background radial dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <svg
        viewBox="0 0 240 240"
        className="relative h-44 w-44 sm:h-52 sm:w-52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desktop Monitor Frame */}
        <rect
          x="20"
          y="35"
          width="135"
          height="90"
          rx="5"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
          fill="rgba(0,0,0,0.5)"
        />
        {/* Stand */}
        <line x1="87" y1="125" x2="87" y2="145" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <line x1="65" y1="145" x2="110" y2="145" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

        {/* Mobile Device Frame (Overlapping) */}
        <rect
          x="150"
          y="50"
          width="68"
          height="115"
          rx="9"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.2"
          fill="rgba(10,10,12,0.8)"
        />
        {/* Phone Speaker & Screen */}
        <line x1="174" y1="58" x2="194" y2="58" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <rect x="156" y="65" width="56" height="88" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />

        {/* Moving Vertical Diagnostic Scanner Bar */}
        <motion.line
          x1="22"
          x2="153"
          y1="40"
          y2="40"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          animate={{ y: [0, 80, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Test Verification Checkpoint Badges */}
        <g transform="translate(30, 50)">
          <circle cx="8" cy="8" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <path d="M6 8 L8 10 L12 6" stroke="white" strokeWidth="1.2" fill="none" />
          <text x="18" y="11" fill="rgba(255,255,255,0.7)" fontFamily="monospace" fontSize="8">
            TEST_SUITE_01: PASS
          </text>
        </g>
        <g transform="translate(30, 70)">
          <circle cx="8" cy="8" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <path d="M6 8 L8 10 L12 6" stroke="white" strokeWidth="1.2" fill="none" />
          <text x="18" y="11" fill="rgba(255,255,255,0.7)" fontFamily="monospace" fontSize="8">
            RESPONSIVE_UI: PASS
          </text>
        </g>
        <g transform="translate(30, 90)">
          <circle cx="8" cy="8" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <path d="M6 8 L8 10 L12 6" stroke="white" strokeWidth="1.2" fill="none" />
          <text x="18" y="11" fill="rgba(255,255,255,0.7)" fontFamily="monospace" fontSize="8">
            DEVICE_LOGS: CAPTURED
          </text>
        </g>
      </svg>

      {/* Technical Spec Box */}
      <div className="mt-2 rounded border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] text-neutral-400 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <span className="font-semibold text-neutral-200">VALIDATION // CROSS-DEVICE MATRIX</span>
        </div>
        <div className="text-[9px] text-neutral-500 mt-0.5">TEST_CASES &bull; LOG_ANALYSIS &bull; REGRESSION_QA</div>
      </div>
    </div>
  );
}

function getExperienceArt(index: number) {
  switch (index) {
    case 0:
      return <WebDevArchitectureArt />;
    case 1:
      return <QATestMatrixArt />;
    default:
      return <WebDevArchitectureArt />;
  }
}

// ============================================================================
// Panoramic Experience Card (2-Column Grid)
// ============================================================================
interface ExperienceCardProps {
  item: (typeof siteConfig.experience)[number];
  index: number;
  total: number;
}

function ExperienceCard({ item, index, total }: ExperienceCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const { setHoveredElementBounds } = useHeroCursor();

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

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const spotlightOpacity = useSpring(0, springConfig);

  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
    spotlightOpacity.set(1);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    const maxTilt = 4.5;
    rawRotateX.set(-normY * maxTilt);
    rawRotateY.set(normX * maxTilt);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    spotlightOpacity.set(0);
    setHoveredElementBounds(null);
  };

  return (
    <div className="perspective-[1000px] h-full w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex shrink-0 w-[90vw] sm:w-[84vw] md:w-[68vw] lg:w-[58vw] xl:w-[54vw] h-[54vh] sm:h-[52vh] lg:h-[56vh] min-h-[340px] sm:min-h-[390px] lg:min-h-[420px] max-h-[500px] rounded-2xl border border-white/10 bg-black/95 text-white backdrop-blur-md overflow-hidden shadow-2xl transition-[border-color,box-shadow] duration-300 hover:border-white/30 hover:shadow-2xl"
      >
        {/* Dynamic Monochrome Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 rounded-2xl"
          style={{
            background: spotlightBg,
            opacity: spotlightOpacity,
          }}
          aria-hidden="true"
        />

        <div className="relative z-0 grid grid-cols-1 lg:grid-cols-12 h-full w-full">
          {/* Left Column: Massive Typography, Meta, Role, Key Achievements & Skills */}
          <div
            onScroll={handleMagneticLeave}
            className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-6 lg:p-8 h-full overflow-y-auto"
          >
            {/* Top Meta Line */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span
                  onMouseEnter={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                  className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-neutral-300 transition-colors hover:border-white/30 cursor-default select-none"
                >
                  {item.period}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  EXP_0{index + 1} // 0{total}
                </span>
              </div>

              {/* Massive Typography: Role & Company */}
              <div className="mt-4 space-y-2">
                <h3 className="text-lg sm:text-xl lg:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                  {item.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-400">
                  <span className="text-white font-semibold">{item.company}</span>
                  <span className="text-neutral-600">&bull;</span>
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-[11px] sm:text-xs sm:text-sm leading-relaxed text-neutral-400">
                {item.description}
              </p>

              {/* Key Achievements */}
              <ul className="mt-3 space-y-2">
                {item.achievements.map((achievement, aIdx) => (
                  <li
                    key={aIdx}
                    className="flex items-start gap-2.5 text-[11px] sm:text-xs sm:text-sm text-neutral-300 leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skill Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-3 border-t border-white/10">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  onMouseEnter={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                  className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-neutral-300 transition-colors hover:border-white/30 hover:text-white cursor-default select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Tech-Themed Monochrome Art Canvas */}
          <div className="hidden sm:flex lg:col-span-5 flex-col items-center justify-center p-6 lg:p-8 bg-neutral-900/40 border-t lg:border-t-0 lg:border-l border-white/10 relative overflow-hidden">
            {getExperienceArt(index)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Main Experience Horizontal Scroll Section
// ============================================================================
export function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = React.useState(0);
  const { setHoveredElementBounds } = useHeroCursor();

  React.useEffect(() => {
    const handleWindowScroll = () => {
      setHoveredElementBounds(null);
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [setHoveredElementBounds]);

  // 500vh track provides ample horizontal scroll room plus clean reading buffer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  React.useEffect(() => {
    const calculateDistance = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const scrollWidth = track.scrollWidth;
      const clientWidth = track.parentElement?.clientWidth || window.innerWidth;
      const distance = Math.max(0, Math.ceil(scrollWidth - clientWidth));
      setScrollRange(distance);
    };

    calculateDistance();

    const resizeObserver = new ResizeObserver(calculateDistance);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }
    window.addEventListener("resize", calculateDistance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  // Horizontal travel finishes at 0.46 progress, hitting the right side padding before Section 05 enters at 0.58
  const x = useTransform(smoothProgress, [0.04, 0.46], [0, -scrollRange]);

  // Section 04 exit recede into Section 05 (Synchronized with Section 05 rising through the middle)
  const recedeScale = useTransform(smoothProgress, [0.65, 0.96], [1, 0.88]);
  const recedeOpacity = useTransform(smoothProgress, [0.65, 0.92], [1, 0]);
  const recedeY = useTransform(smoothProgress, [0.65, 0.96], [0, -50]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative h-[340vh] w-full"
    >
      {/* Sticky Frame: Stays fixed in viewport while user scrolls through 340vh */}
      <motion.div
        style={{
          scale: recedeScale,
          opacity: recedeOpacity,
          y: recedeY,
        }}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 pt-12 pb-6 sm:px-6 md:px-12 md:pt-24 md:pb-6 origin-center will-change-transform"
      >
        {/* Top Header */}
        <div className="mx-auto max-w-7xl w-full shrink-0">
          {/* Numbered Section Header: 04/ Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={customSpring}
            className="mb-3 sm:mb-4 md:mb-6 flex flex-col gap-2 md:gap-3 shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <Briefcase className="h-3.5 w-3.5 text-foreground" />
                <span>CAREER // TIMELINE</span>
              </div>
              <span className="h-px flex-1 max-w-[80px] bg-border" />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
                <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                  04/
                </span>
                Experience
              </h2>
              <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Professional &amp; Technical Experience
              </p>
            </div>
          </motion.div>
        </div>

        {/* Middle Track: Horizontally Scrolling Panoramic Cards */}
        <div className="relative flex-1 flex items-center overflow-hidden my-auto -mx-6 md:-mx-12 w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] min-h-0 py-3 sm:py-4">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-6 md:gap-8 px-[max(1.5rem,calc((100vw-80rem)/2))] md:px-[max(3rem,calc((100vw-80rem)/2))]"
          >
            {siteConfig.experience.map((item, idx) => (
              <div
                key={`${item.role}-${item.company}`}
                className="shrink-0"
              >
                <ExperienceCard
                  item={item}
                  index={idx}
                  total={siteConfig.experience.length}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Status / Navigation Hints */}
        <div className="mx-auto max-w-7xl w-full shrink-0 flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
          <span className="text-foreground/60">
            [PINNED TIMELINE // WORK EXPERIENCE]
          </span>
          <span>CONTINUE SCROLLING DOWN TO ADVANCE &darr;</span>
        </div>
      </motion.div>
    </section>
  );
}
