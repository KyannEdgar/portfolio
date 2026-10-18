"use client";

import { motion } from "framer-motion";
import { SkillItem } from "@/types";
import { TechIcon } from "@/components/ui/icons/tech-icons";
import { customSpring } from "@/lib/animation";

interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ ...customSpring, delay: index * 0.04 }}
      className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-[#0c0d10] text-[#f8fafc] p-6 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-white/30 hover:shadow-2xl"
    >
      <div>
        {/* Top Header: Monochrome Tool Icon & Category/Proficiency Pill */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-white transition-transform duration-200 group-hover:scale-105">
            <TechIcon name={skill.icon} className="h-6 w-6 text-white" />
          </div>

          {skill.proficiency && (
            <span className="rounded border border-white/15 bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
              {skill.proficiency}
            </span>
          )}
        </div>

        {/* Tool Name & Category */}
        <div className="mt-4">
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-white">
            {skill.name}
          </h3>
          <p className="mt-2 text-xs md:text-sm leading-relaxed text-neutral-400">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Bottom Tags */}
      {skill.tags && skill.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-white/[0.05] text-neutral-400 border border-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
