"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

interface Token {
  text: string;
  isKeyword: boolean;
}

const PART1_TOKENS: Token[] = [
  { text: "Every", isKeyword: false },
  { text: "reliable", isKeyword: false },
  { text: "cloud", isKeyword: false },
  { text: "environment", isKeyword: false },
  { text: "relies", isKeyword: false },
  { text: "on", isKeyword: false },
  { text: "a", isKeyword: false },
  { text: "solid", isKeyword: false },
  { text: "network.", isKeyword: true },
];

const PART2_TOKENS: Token[] = [
  { text: "As", isKeyword: false },
  { text: "an", isKeyword: false },
  { text: "Information Technology", isKeyword: true },
  { text: "graduate", isKeyword: false },
  { text: "focused", isKeyword: false },
  { text: "on", isKeyword: false },
  { text: "network", isKeyword: true },
  { text: "and", isKeyword: false },
  { text: "cloud", isKeyword: true },
  { text: "engineering,", isKeyword: false },
  { text: "I", isKeyword: false },
  { text: "am", isKeyword: false },
  { text: "driven", isKeyword: false },
  { text: "by", isKeyword: false },
  { text: "how", isKeyword: false },
  { text: "data", isKeyword: false },
  { text: "moves,", isKeyword: false },
  { text: "scales,", isKeyword: false },
  { text: "and", isKeyword: false },
  { text: "stays", isKeyword: false },
  { text: "protected.", isKeyword: true },
];

const HORIZONTAL_TRACKS = ["12%", "26%", "40%", "54%", "68%", "82%", "94%"];
const VERTICAL_TRACKS = ["10%", "25%", "40%", "55%", "70%", "85%"];

const KEY_INTERSECTIONS = [
  { x: "10%", y: "26%", delay: 0.2 },
  { x: "25%", y: "12%", delay: 1.1 },
  { x: "25%", y: "40%", delay: 2.3 },
  { x: "40%", y: "26%", delay: 0.7 },
  { x: "40%", y: "68%", delay: 1.9 },
  { x: "55%", y: "12%", delay: 2.5 },
  { x: "55%", y: "54%", delay: 0.4 },
  { x: "55%", y: "82%", delay: 1.6 },
  { x: "70%", y: "40%", delay: 1.2 },
  { x: "70%", y: "68%", delay: 2.1 },
  { x: "85%", y: "26%", delay: 0.9 },
  { x: "85%", y: "54%", delay: 1.7 },
  { x: "10%", y: "68%", delay: 2.8 },
  { x: "25%", y: "82%", delay: 0.5 },
  { x: "70%", y: "94%", delay: 2.4 },
  { x: "85%", y: "82%", delay: 1.3 },
];

interface WordTokenProps {
  token: Token;
  index: number;
  totalTokens: number;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}

function WordToken({
  token,
  index,
  totalTokens,
  progress,
  rangeStart,
  rangeEnd,
}: WordTokenProps) {
  const totalRange = rangeEnd - rangeStart;
  const step = totalRange / totalTokens;
  const start = rangeStart + index * step;
  const end = Math.min(start + step * 1.8, rangeEnd);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const blurValue = useTransform(progress, [start, end], [12, 0]);
  const filter = useTransform(blurValue, (v) => (v <= 0.05 ? "none" : `blur(${v}px)`));
  const y = useTransform(progress, [start, end], [28, 0]);
  const scale = useTransform(progress, [start, end], [0.94, 1]);

  const borderStart = start + (end - start) * 0.5;
  const scaleX = useTransform(progress, [borderStart, end], [0, 1]);

  return (
    <motion.span
      style={{
        opacity,
        filter,
        y,
        scale,
      }}
      className={`relative inline-block whitespace-normal sm:whitespace-nowrap text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tighter transition-colors duration-300 ${
        token.isKeyword
          ? "font-bold text-black dark:text-white tracking-tight"
          : "font-light text-neutral-700 dark:text-white/80"
      }`}
    >
      <span className="relative z-10">{token.text}</span>

      {token.isKeyword && (
        <motion.span
          style={{ scaleX }}
          className="absolute left-0 bottom-1 sm:bottom-2 md:bottom-3 h-[1px] md:h-[2px] w-full bg-black dark:bg-white origin-left pointer-events-none block shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        />
      )}
    </motion.span>
  );
}

function OrthogonalRoutingCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] transition-colors duration-500" />

      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {HORIZONTAL_TRACKS.map((yPos, idx) => (
          <line
            key={`h-track-${idx}`}
            x1="0%"
            y1={yPos}
            x2="100%"
            y2={yPos}
            className="stroke-black/[0.06] dark:stroke-white/[0.04] transition-colors duration-500"
            strokeWidth="1"
          />
        ))}

        {VERTICAL_TRACKS.map((xPos, idx) => (
          <line
            key={`v-track-${idx}`}
            x1={xPos}
            y1="0%"
            x2={xPos}
            y2="100%"
            className="stroke-black/[0.06] dark:stroke-white/[0.04] transition-colors duration-500"
            strokeWidth="1"
          />
        ))}

        <motion.line
          x1="0%"
          y1="26%"
          x2="100%"
          y2="26%"
          className="stroke-black/30 dark:stroke-white/25 transition-colors duration-500"
          strokeWidth="1.2"
          strokeDasharray="60 600"
          animate={{ strokeDashoffset: [660, -660] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
        />

        <motion.line
          x1="0%"
          y1="54%"
          x2="100%"
          y2="54%"
          className="stroke-black/30 dark:stroke-white/25 transition-colors duration-500"
          strokeWidth="1.2"
          strokeDasharray="80 700"
          animate={{ strokeDashoffset: [-780, 780] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "linear", delay: 1.8 }}
        />

        <motion.line
          x1="0%"
          y1="82%"
          x2="100%"
          y2="82%"
          className="stroke-black/30 dark:stroke-white/25 transition-colors duration-500"
          strokeWidth="1.2"
          strokeDasharray="50 500"
          animate={{ strokeDashoffset: [550, -550] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "linear", delay: 3.1 }}
        />

        <motion.line
          x1="0%"
          y1="12%"
          x2="100%"
          y2="12%"
          className="stroke-black/30 dark:stroke-white/25 transition-colors duration-500"
          strokeWidth="1.2"
          strokeDasharray="70 650"
          animate={{ strokeDashoffset: [-720, 720] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
        />

        <motion.line
          x1="25%"
          y1="0%"
          x2="25%"
          y2="100%"
          className="stroke-black/30 dark:stroke-white/25 transition-colors duration-500"
          strokeWidth="1.2"
          strokeDasharray="60 600"
          animate={{ strokeDashoffset: [660, -660] }}
          transition={{ duration: 6.0, repeat: Infinity, ease: "linear", delay: 1.0 }}
        />

        <motion.line
          x1="70%"
          y1="0%"
          x2="70%"
          y2="100%"
          className="stroke-black/30 dark:stroke-white/25 transition-colors duration-500"
          strokeWidth="1.2"
          strokeDasharray="80 700"
          animate={{ strokeDashoffset: [-780, 780] }}
          transition={{ duration: 7.8, repeat: Infinity, ease: "linear", delay: 2.4 }}
        />

        <motion.line
          x1="40%"
          y1="0%"
          x2="40%"
          y2="100%"
          className="stroke-black/30 dark:stroke-white/25 transition-colors duration-500"
          strokeWidth="1.2"
          strokeDasharray="50 550"
          animate={{ strokeDashoffset: [600, -600] }}
          transition={{ duration: 5.0, repeat: Infinity, ease: "linear", delay: 4.2 }}
        />

        <motion.line
          x1="85%"
          y1="0%"
          x2="85%"
          y2="100%"
          className="stroke-black/30 dark:stroke-white/25 transition-colors duration-500"
          strokeWidth="1.2"
          strokeDasharray="65 650"
          animate={{ strokeDashoffset: [-715, 715] }}
          transition={{ duration: 8.8, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />

        {KEY_INTERSECTIONS.map((node, idx) => (
          <motion.rect
            key={`intersection-${idx}`}
            x={node.x}
            y={node.y}
            width="3"
            height="3"
            transform="translate(-1.5, -1.5)"
            className="fill-black/15 dark:fill-white/10 transition-colors duration-500"
            animate={{ opacity: [0.05, 0.35, 0.05] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
          />
        ))}
      </svg>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,250,251,0.88)_0%,transparent_75%)] dark:bg-[radial-gradient(circle_at_center,rgba(8,8,8,0.85)_0%,transparent_75%)] transition-colors duration-500" />
    </div>
  );
}

export function AboutStatement() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  // Part 1 Exit: Opacity 1 -> 0, Scale 1 -> 1.05 across [0.30, 0.38]
  const part1Opacity = useTransform(smoothProgress, [0.30, 0.38], [1, 0]);
  const part1Scale = useTransform(smoothProgress, [0.30, 0.38], [1, 1.05]);
  const part1Visibility = useTransform(smoothProgress, (v) =>
    v >= 0.38 ? "hidden" : "visible"
  );

  // Part 2 Visibility & Opacity Guard (reveals words across [0.42, 0.70])
  const part2Opacity = useTransform(smoothProgress, [0.40, 0.42], [0, 1]);
  const part2Visibility = useTransform(smoothProgress, (v) =>
    v < 0.40 ? "hidden" : "visible"
  );

  // Parallax Recede: Keep overall container receding during final [0.75, 1.0] as Projects curtain rises
  const recedeScale = useTransform(smoothProgress, [0.75, 1], [1, 0.93]);
  const recedeOpacity = useTransform(smoothProgress, [0.75, 1], [1, 0.3]);
  const recedeY = useTransform(smoothProgress, [0.75, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] w-full bg-background transition-colors duration-500 z-10"
    >
      {/* Sticky full-viewport container with depth recede animation */}
      <motion.div
        style={{
          scale: recedeScale,
          opacity: recedeOpacity,
          y: recedeY,
        }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-background transition-colors duration-500 origin-center will-change-transform"
      >
        {/* Autonomous Orthogonal Cloud Routing Background Canvas & Radial Vignette */}
        <OrthogonalRoutingCanvas />

        {/* Massive Centered Coordinate Space for Sequential Reveal */}
        <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto px-6 h-full flex items-center justify-center select-none">
          {/* Part 1: Reveals [0.02, 0.25], Holds [0.25, 0.30], Exits [0.30, 0.38] */}
          <motion.div
            style={{
              opacity: part1Opacity,
              scale: part1Scale,
              visibility: part1Visibility,
            }}
            className="absolute inset-0 flex flex-wrap justify-center items-center content-center text-center gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-4 px-4 sm:px-6 pointer-events-none"
          >
            {PART1_TOKENS.map((token, index) => (
              <WordToken
                key={`p1-${token.text}-${index}`}
                token={token}
                index={index}
                totalTokens={PART1_TOKENS.length}
                progress={smoothProgress}
                rangeStart={0.02}
                rangeEnd={0.25}
              />
            ))}
          </motion.div>

          {/* Part 2: Reveals [0.42, 0.70], Holds [0.70, 0.75], Recedes [0.75, 1.0] */}
          <motion.div
            style={{
              opacity: part2Opacity,
              visibility: part2Visibility,
            }}
            className="absolute inset-0 flex flex-wrap justify-center items-center content-center text-center gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-4 px-4 sm:px-6 pointer-events-none"
          >
            {PART2_TOKENS.map((token, index) => (
              <WordToken
                key={`p2-${token.text}-${index}`}
                token={token}
                index={index}
                totalTokens={PART2_TOKENS.length}
                progress={smoothProgress}
                rangeStart={0.42}
                rangeEnd={0.70}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
