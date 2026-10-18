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
import { Briefcase } from "lucide-react";

// ============================================================================
// Tech Art 1: Isometric Server Rack & Mesh Topology (Cloud & Infrastructure)
// ============================================================================
function IsometricServerArt() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center select-none">
      {/* Background technical coordinate grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Animated Isometric Server Rack SVG */}
      <svg
        viewBox="0 0 240 240"
        className="relative h-44 w-44 sm:h-52 sm:w-52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Isometric base grid lines */}
        <g stroke="rgba(255,255,255,0.15)" strokeWidth="1">
          <line x1="20" y1="120" x2="120" y2="170" />
          <line x1="120" y1="170" x2="220" y2="120" />
          <line x1="220" y1="120" x2="120" y2="70" />
          <line x1="120" y1="70" x2="20" y2="120" />
        </g>

        {/* Server Bay 3 (Bottom) */}
        <path
          d="M 60 145 L 120 175 L 180 145 L 120 115 Z"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.02)"
        />
        <path
          d="M 60 145 L 60 160 L 120 190 L 120 175 Z"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.03)"
        />
        <path
          d="M 180 145 L 180 160 L 120 190 L 120 175 Z"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.01)"
        />

        {/* Server Bay 2 (Middle) */}
        <path
          d="M 60 115 L 120 145 L 180 115 L 120 85 Z"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.03)"
        />
        <path
          d="M 60 115 L 60 130 L 120 160 L 120 145 Z"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M 180 115 L 180 130 L 120 160 L 120 145 Z"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.02)"
        />

        {/* Server Bay 1 (Top) */}
        <path
          d="M 60 85 L 120 115 L 180 85 L 120 55 Z"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M 60 85 L 60 100 L 120 130 L 120 115 Z"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M 180 85 L 180 100 L 120 130 L 120 115 Z"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.02)"
        />

        {/* Vertical Server Corner Posts */}
        <line x1="60" y1="85" x2="60" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="120" y1="115" x2="120" y2="190" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <line x1="180" y1="85" x2="180" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Floating Rotating Wireframe Cube Above Rack */}
        <motion.g
          animate={{
            rotate: [0, 360],
            y: [-3, 3, -3],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ originX: "120px", originY: "45px" }}
        >
          <polygon points="120,25 140,35 120,45 100,35" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none" />
          <polygon points="100,35 120,45 120,65 100,55" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
          <polygon points="140,35 120,45 120,65 140,55" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" fill="none" />
          <circle cx="120" cy="45" r="2.5" fill="white" />
        </motion.g>

        {/* Data Stream Circuit Lines with Animated Dash */}
        <motion.path
          d="M 30 180 L 80 180 L 120 160 L 160 180 L 210 180"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        <motion.path
          d="M 120 190 L 120 220"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
          strokeDasharray="3 3"
          animate={{ strokeDashoffset: [0, -12] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </svg>

      {/* Technical Spec Box */}
      <div className="mt-2 rounded border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] text-neutral-400 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <span className="font-semibold text-neutral-200">K8S_TOPOLOGY // FASTPATH</span>
        </div>
        <div className="text-[9px] text-neutral-500 mt-0.5">WIREGUARD MESH &bull; DUAL-CLOUD</div>
      </div>
    </div>
  );
}

// ============================================================================
// Tech Art 2: Cryptographic Hyper-Lattice Gyroscope (Security & Systems)
// ============================================================================
function CryptographicLatticeArt() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center select-none">
      {/* Background radial coordinate dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <svg
        viewBox="0 0 240 240"
        className="relative h-44 w-44 sm:h-52 sm:w-52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Static Coordinate Ring */}
        <circle
          cx="120"
          cy="120"
          r="92"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Orbit Ring 1 (Clockwise Rotation) */}
        <motion.ellipse
          cx="120"
          cy="120"
          rx="80"
          ry="38"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          style={{ originX: "120px", originY: "120px" }}
        />

        {/* Orbit Ring 2 (Counter-Clockwise Rotation) */}
        <motion.ellipse
          cx="120"
          cy="120"
          rx="80"
          ry="38"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.2"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          style={{ originX: "120px", originY: "120px" }}
        />

        {/* Orbit Ring 3 (Inner Tilted Orbit) */}
        <motion.circle
          cx="120"
          cy="120"
          r="58"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="6 4"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
          style={{ originX: "120px", originY: "120px" }}
        />

        {/* Central Cryptographic Octahedron Polyhedron */}
        <motion.g
          animate={{
            rotate: [0, 360],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            rotate: { duration: 16, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ originX: "120px", originY: "120px" }}
        >
          {/* Top pyramid struts */}
          <line x1="120" y1="80" x2="90" y2="120" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
          <line x1="120" y1="80" x2="150" y2="120" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
          <line x1="120" y1="80" x2="120" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* Equator polygon */}
          <polygon points="90,120 120,105 150,120 120,135" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="rgba(255,255,255,0.03)" />

          {/* Bottom pyramid struts */}
          <line x1="120" y1="160" x2="90" y2="120" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <line x1="120" y1="160" x2="150" y2="120" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <line x1="120" y1="160" x2="120" y2="105" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* Vertices */}
          <circle cx="120" cy="80" r="3" fill="white" />
          <circle cx="120" cy="160" r="3" fill="white" />
          <circle cx="90" cy="120" r="2.5" fill="white" />
          <circle cx="150" cy="120" r="2.5" fill="white" />
        </motion.g>

        {/* Coordinate Crosshairs */}
        <line x1="25" y1="120" x2="45" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="195" y1="120" x2="215" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="120" y1="25" x2="120" y2="45" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="120" y1="195" x2="120" y2="215" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </svg>

      {/* Technical Spec Box */}
      <div className="mt-2 rounded border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] text-neutral-400 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <span className="font-semibold text-neutral-200">PRIMITIVE // ML-KEM-1024</span>
        </div>
        <div className="text-[9px] text-neutral-500 mt-0.5">POST-QUANTUM &bull; ZERO-TRUST</div>
      </div>
    </div>
  );
}

// ============================================================================
// Tech Art 3: Topographic Waveform & Cluster Mesh (Distributed Engineering)
// ============================================================================
function TopographicWaveArt() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center select-none">
      {/* Background isometric grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <svg
        viewBox="0 0 240 240"
        className="relative h-44 w-44 sm:h-52 sm:w-52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Frame Boundary */}
        <rect
          x="20"
          y="30"
          width="200"
          height="180"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="rgba(0,0,0,0.4)"
        />

        {/* Undulating Wave Contour 1 */}
        <motion.path
          d="M 20 70 Q 70 45, 120 70 T 220 70"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          animate={{
            d: [
              "M 20 70 Q 70 45, 120 70 T 220 70",
              "M 20 70 Q 70 95, 120 70 T 220 70",
              "M 20 70 Q 70 45, 120 70 T 220 70",
            ],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />

        {/* Undulating Wave Contour 2 */}
        <motion.path
          d="M 20 100 Q 70 75, 120 100 T 220 100"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.2"
          animate={{
            d: [
              "M 20 100 Q 70 75, 120 100 T 220 100",
              "M 20 100 Q 70 125, 120 100 T 220 100",
              "M 20 100 Q 70 75, 120 100 T 220 100",
            ],
          }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.4 }}
        />

        {/* Undulating Wave Contour 3 */}
        <motion.path
          d="M 20 130 Q 70 155, 120 130 T 220 130"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.2"
          animate={{
            d: [
              "M 20 130 Q 70 155, 120 130 T 220 130",
              "M 20 130 Q 70 105, 120 130 T 220 130",
              "M 20 130 Q 70 155, 120 130 T 220 130",
            ],
          }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.8 }}
        />

        {/* Undulating Wave Contour 4 */}
        <motion.path
          d="M 20 160 Q 70 135, 120 160 T 220 160"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
          animate={{
            d: [
              "M 20 160 Q 70 135, 120 160 T 220 160",
              "M 20 160 Q 70 185, 120 160 T 220 160",
              "M 20 160 Q 70 135, 120 160 T 220 160",
            ],
          }}
          transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.2 }}
        />

        {/* Vertical Scan Grid Lines */}
        <line x1="70" y1="30" x2="70" y2="210" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
        <line x1="120" y1="30" x2="120" y2="210" stroke="rgba(255,255,255,0.15)" />
        <line x1="170" y1="30" x2="170" y2="210" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

        {/* Floating Data Nodes */}
        <motion.circle
          cx="70"
          cy="70"
          r="3"
          fill="white"
          animate={{ y: [-15, 15, -15] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="120"
          cy="100"
          r="3.5"
          fill="white"
          animate={{ y: [15, -15, 15] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="170"
          cy="130"
          r="3"
          fill="white"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Technical Spec Box */}
      <div className="mt-2 rounded border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] text-neutral-400 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <span className="font-semibold text-neutral-200">STREAM_PIPELINE // &lt;50MS</span>
        </div>
        <div className="text-[9px] text-neutral-500 mt-0.5">INGESTION &bull; DISTRIBUTED_KV</div>
      </div>
    </div>
  );
}

function getExperienceArt(index: number) {
  switch (index) {
    case 0:
      return <IsometricServerArt />;
    case 1:
      return <CryptographicLatticeArt />;
    case 2:
      return <TopographicWaveArt />;
    default:
      return <IsometricServerArt />;
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
        className="group relative flex shrink-0 w-[85vw] md:w-[60vw] lg:w-[52vw] h-[60vh] min-h-[500px] max-h-[620px] rounded-2xl border border-white/10 bg-black/95 text-white backdrop-blur-md overflow-hidden shadow-2xl transition-[border-color,box-shadow] duration-300 hover:border-white/30 hover:shadow-2xl"
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
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 lg:p-9 h-full overflow-y-auto">
            {/* Top Meta Line */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-neutral-300">
                  {item.period}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  EXP_0{index + 1} // 0{total}
                </span>
              </div>

              {/* Massive Typography: Role & Company */}
              <div className="mt-4 space-y-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                  {item.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-400">
                  <span className="text-white font-semibold">{item.company}</span>
                  <span className="text-neutral-600">&bull;</span>
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-400">
                {item.description}
              </p>

              {/* Key Achievements */}
              <ul className="mt-3 space-y-2">
                {item.achievements.map((achievement, aIdx) => (
                  <li
                    key={aIdx}
                    className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed"
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
                  className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-neutral-300 transition-colors hover:border-white/30 hover:text-white"
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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = React.useState(0);

  // Scroll hijacking: Track progress across the h-[300vh] container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  React.useEffect(() => {
    const calculateDistance = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const scrollWidth = track.scrollWidth;
      const clientWidth = track.parentElement?.clientWidth || window.innerWidth;
      const distance = Math.max(0, scrollWidth - clientWidth);
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

  // Map vertical scroll progress so the horizontal scroll stops precisely when the final card aligns with the right-side global margin
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative h-[300vh] bg-background border-t border-border"
    >
      {/* Sticky Frame: Stays fixed in viewport while user scrolls through 300vh */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-8 md:py-12">
        {/* Top Header & Visual Scroll Progress Bar */}
        <div className="mx-auto max-w-7xl px-6 md:px-12 w-full shrink-0">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <Briefcase className="h-3.5 w-3.5 text-foreground" />
                <span>CAREER // TIMELINE</span>
              </div>
              <span className="h-px flex-1 max-w-[80px] bg-border hidden sm:block" />
            </div>

            {/* Visual Timeline Progress Indicator */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase">
                <span>SCROLL HORIZONTALLY</span>
                <span className="text-foreground font-bold">&rarr;</span>
              </div>
              <div className="relative h-1 w-24 sm:w-36 overflow-hidden rounded-full bg-border">
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                  className="h-full w-full bg-foreground"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h2 className="text-3xl font-black tracking-tighter text-foreground sm:text-4xl md:text-5xl uppercase leading-none">
              <span className="text-foreground/40 font-mono text-2xl sm:text-3xl md:text-4xl mr-3 font-normal">
                04/
              </span>
              Experience
            </h2>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              SYSTEM ARCHITECTURE &bull; PRODUCTION MILESTONES
            </p>
          </div>
        </div>

        {/* Middle Track: Horizontally Scrolling Panoramic Cards */}
        <div className="relative flex-1 flex items-center overflow-hidden my-auto w-full">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-6 md:gap-8 px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:px-[max(3rem,calc((100vw-80rem)/2+3rem))]"
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
        <div className="mx-auto max-w-7xl px-6 md:px-12 w-full shrink-0 flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
          <span className="text-foreground/60">[PINNED TIMELINE // 03 STATIONS]</span>
          <span>CONTINUE SCROLLING DOWN TO ADVANCE &darr;</span>
        </div>
      </div>
    </section>
  );
}
