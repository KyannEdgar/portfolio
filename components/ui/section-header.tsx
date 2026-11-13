"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { customSpring } from "@/lib/animation";

interface SectionHeaderProps {
  badgeIcon: React.ReactNode;
  badgeLabel: string;
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  badgeIcon,
  badgeLabel,
  number,
  title,
  subtitle,
  className = "mb-4 sm:mb-6 md:mb-8 flex flex-col gap-2 md:gap-3 shrink-0",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={customSpring}
      className={className}
    >
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
          {badgeIcon}
          <span>{badgeLabel}</span>
        </div>
        <span className="h-px flex-1 max-w-[80px] bg-border" />
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
          <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
            {number}
          </span>
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
