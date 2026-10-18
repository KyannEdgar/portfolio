"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { customSpring } from "@/lib/animation";
import { Cpu } from "lucide-react";

export function SkillsSection() {
  const containerRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  const recedeScale = useTransform(smoothProgress, [0.15, 0.85], [1, 0.88]);
  const recedeOpacity = useTransform(smoothProgress, [0.15, 0.75], [1, 0]);
  const recedeY = useTransform(smoothProgress, [0.15, 0.85], [0, -60]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative h-[200vh] w-full"
    >
      <motion.div
        style={{
          scale: recedeScale,
          opacity: recedeOpacity,
          y: recedeY,
        }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start px-6 py-24 md:px-12 md:py-32 origin-center will-change-transform"
      >
        <div className="mx-auto max-w-7xl w-full">
          {/* Numbered Section Header: 02/ Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={customSpring}
            className="mb-12 flex flex-col gap-3 md:mb-16"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <Cpu className="h-3.5 w-3.5 text-foreground" />
                <span>TOOLCHAIN // PRODUCTION CAPABILITIES</span>
              </div>
              <span className="h-px flex-1 max-w-[80px] bg-border" />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
                <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                  02/
                </span>
                Skills &amp; Tooling
              </h2>
              <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Platforms, Runtimes, System Utilities &amp; Networking Tooling
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
