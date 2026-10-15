"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config";

export function Marquee() {
  const items = siteConfig.marqueeTech;
  // Duplicate array multiple times to ensure seamless infinite loop across all viewport widths
  const loopedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-card/40 py-5 backdrop-blur-sm">
      {/* Edge gradient masks for smooth fade-in/fade-out */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {loopedItems.map((tech, idx) => (
          <div
            key={`${tech}-${idx}`}
            className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
              <span className="font-semibold text-foreground/90">{tech}</span>
            </span>
            <span className="select-none text-muted-foreground/30">//</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
