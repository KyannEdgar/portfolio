"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SKILLS_MARQUEE_ITEMS } from "@/config";
import { TechIcon } from "@/components/ui/icons/tech-icons";
import { MarqueeItem } from "@/types";

export interface MarqueeProps {
  items?: MarqueeItem[];
  speed?: number;
  className?: string;
  showIcons?: boolean;
}

export function Marquee({
  items,
  speed = 50,
  className = "",
  showIcons = true,
}: MarqueeProps = {}) {
  // Dynamically resolve technologies and concepts from the skills section
  const activeItems = items && items.length > 0 ? items : SKILLS_MARQUEE_ITEMS;

  // Duplicate items array to guarantee a seamless, glitch-free infinite loop across all viewport widths
  const repeatCount = activeItems.length < 15 ? 4 : 2;
  const loopedItems = Array.from({ length: repeatCount }, () => activeItems).flat();
  const shiftTarget = `-${100 / repeatCount}%`;

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-border bg-card/40 py-4 md:py-5 backdrop-blur-sm ${className}`}
      aria-label="Technologies and Engineering Concepts Marquee"
    >
      {/* Edge gradient masks for smooth fade-in/fade-out */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 md:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 md:w-32 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex w-max items-center gap-7 whitespace-nowrap will-change-transform"
        animate={{
          x: ["0%", shiftTarget],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {loopedItems.map((item, idx) => {
          const isTech = item.type === "technology";

          return (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center gap-7 select-none"
            >
              {isTech ? (
                /* Technology Item: Monochrome Tech Icon + Name */
                <span className="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-foreground/90 transition-colors duration-200 hover:text-foreground">
                  {showIcons && item.icon ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded border border-card-border bg-card/90 text-foreground transition-transform duration-200 group-hover:scale-110">
                      <TechIcon name={item.icon} className="h-3.5 w-3.5 text-foreground" />
                    </span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 transition-colors duration-200 group-hover:bg-foreground" />
                  )}
                  <span className="font-bold tracking-wider text-foreground">
                    {item.label}
                  </span>
                </span>
              ) : (
                /* Concept Item: Minimalist Monospace Hash/Concept Tag */
                <span className="group flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground/75 transition-colors duration-200 hover:text-foreground">
                  <span className="text-[11px] font-semibold text-muted-foreground/40 transition-colors duration-200 group-hover:text-foreground/70">
                    #
                  </span>
                  <span className="text-[11px] font-medium tracking-wide">
                    {item.label}
                  </span>
                </span>
              )}

              {/* Minimalist Delimiter */}
              <span className="select-none font-mono text-xs text-muted-foreground/25">
                //
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
