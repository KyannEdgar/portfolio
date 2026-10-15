"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CATEGORIES, SKILLS_DATA } from "@/config";
import { SkillCategory } from "@/types";
import { SkillCard } from "./skill-card";
import { customSpring } from "@/lib/animation";
import { Cpu } from "lucide-react";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeCategory);

  const activeCategoryDef = SKILL_CATEGORIES.find(
    (c) => c.id === activeCategory
  );

  return (
    <section
      id="skills"
      className="relative w-full border-t border-border px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
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
              {activeCategoryDef?.description ||
                "Platforms, Runtimes, System Utilities & Networking Tooling"}
            </p>
          </div>
        </motion.div>

        {/* Minimalist Unboxed Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-border pb-4">
          {SKILL_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "font-bold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{category.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategoryUnderline"
                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-foreground"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
