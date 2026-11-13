"use client";

import * as React from "react";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { siteConfig } from "@/config";
import { customSpring } from "@/lib/animation";
import { useMagneticHover } from "@/components/ui/hero-cursor-context";
import { SectionHeader } from "@/components/ui/section-header";
import {
  GraduationCap,
  Cloud,
  Award,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { EducationItem } from "@/types";

interface EducationDossierCardProps {
  item: EducationItem;
  index: number;
}

function EducationDossierCard({ item, index }: EducationDossierCardProps) {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const { handleMouseEnter: handleMagneticHover, handleMouseLeave: handleMagneticLeave } =
    useMagneticHover(8);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const spotlightOpacity = useSpring(0, springConfig);
  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    spotlightOpacity.set(1);
  };

  const handleMouseLeave = () => {
    spotlightOpacity.set(0);
  };

  const activePillar = item.pillars[activePillarIndex] || item.pillars[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...customSpring, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0d10] p-6 sm:p-8 backdrop-blur-md overflow-hidden text-[#f8fafc] shadow-2xl transition-[border-color,box-shadow] duration-300 hover:border-white/30"
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

      <div className="relative z-0 flex flex-col justify-between h-full space-y-6">
        <div>
          {/* Top Meta Line: Category Badge, ID & Period */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <div className="flex items-center gap-2">
              {item.category === "ACADEMIC" ? (
                <GraduationCap className="h-4 w-4 text-white" />
              ) : (
                <Cloud className="h-4 w-4 text-white" />
              )}
              <span className="text-[10px] sm:text-xs text-neutral-300 font-semibold">
                {item.categoryBadge}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{item.id}</span>
              <span className="opacity-40">//</span>
              <span>{item.period}</span>
            </div>
          </div>

          {/* Program Title & Institution */}
          <div className="mt-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {item.program}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-300">
              <span className="font-semibold text-neutral-200">{item.institution}</span>
              <span className="text-neutral-600">&bull;</span>
              <span className="text-neutral-400">{item.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {item.description}
          </p>

          {/* Category-Specific Highlight Boxes */}
          {item.category === "ACADEMIC" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {item.metricBadge && (
                <div
                  onMouseEnter={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                  className="min-h-[72px] rounded-xl border border-white/15 bg-white/[0.04] p-3 flex flex-col justify-center transition-colors duration-200 hover:border-white/30"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    <Sparkles className="h-3 w-3 text-white" />
                    <span>Cumulative Academic Standing</span>
                  </div>
                  <div className="font-mono text-base sm:text-lg font-bold text-white tracking-tight mt-1">
                    {item.metricBadge}
                  </div>
                </div>
              )}
              {item.affiliation && (
                <div
                  onMouseEnter={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                  className="min-h-[72px] rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col justify-center transition-colors duration-200 hover:border-white/25"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    <Award className="h-3 w-3 text-white" />
                    <span>Student Affiliation</span>
                  </div>
                  <div className="text-xs font-medium text-neutral-200 leading-snug mt-1">
                    {item.affiliation}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {item.cohort && (
                <div
                  onMouseEnter={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                  className="min-h-[72px] rounded-xl border border-white/15 bg-white/[0.04] p-3 flex flex-col justify-center transition-colors duration-200 hover:border-white/30"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    <Award className="h-3 w-3 text-white" />
                    <span>Cohort &amp; Target Goal</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight mt-1">
                    {item.cohort}
                  </div>
                  {item.credentialTarget && (
                    <div className="text-[11px] text-neutral-300 mt-0.5 font-mono truncate">
                      {item.credentialTarget}
                    </div>
                  )}
                </div>
              )}
              {item.sponsors && item.sponsors.length > 0 && (
                <div
                  onMouseEnter={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                  className="min-h-[72px] rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col justify-center transition-colors duration-200 hover:border-white/25"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    <Layers className="h-3 w-3 text-white" />
                    <span>Fellowship Sponsors</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {item.sponsors.map((sponsor) => (
                      <span
                        key={sponsor}
                        className="inline-block rounded border border-white/15 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-neutral-200 font-semibold"
                      >
                        {sponsor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Interactive Curriculum Pillars */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-neutral-300" />
              <span>
                {item.category === "ACADEMIC" ? "Curriculum Core Pillars" : "Training Competency Pillars"}
              </span>
            </span>
            <span className="font-mono text-[10px] text-neutral-500">
              [0{activePillarIndex + 1} // 0{item.pillars.length}]
            </span>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {item.pillars.map((pillar, pIdx) => {
              const isActive = pIdx === activePillarIndex;
              return (
                <button
                  key={pillar.name}
                  type="button"
                  onClick={() => setActivePillarIndex(pIdx)}
                  onMouseEnter={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                  className={`px-3 py-2 text-left rounded-lg font-mono text-[11px] leading-snug transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? "border-white/30 bg-white/10 text-white font-semibold shadow-sm"
                      : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span className="truncate block">{pillar.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Details & Skill Tags (Locked Height to Prevent Layout Shift) */}
          <div className="relative rounded-xl border border-white/10 bg-white/[0.02] p-4 h-[148px] sm:h-[138px] overflow-hidden flex flex-col justify-between">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePillarIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="flex flex-col justify-between h-full"
              >
                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2 mb-2">
                  {activePillar.description}
                </p>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {activePillar.skills.map((skill) => (
                    <span
                      key={skill}
                      onMouseEnter={handleMagneticHover}
                      onMouseLeave={handleMagneticLeave}
                      className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-neutral-200 transition-colors hover:border-white/30 hover:text-white select-none cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative w-full min-h-screen px-6 py-24 md:px-12 md:py-32 flex flex-col justify-start"
    >
      <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col min-h-0">
        {/* Numbered Section Header: 05/ Education */}
        <SectionHeader
          badgeIcon={<GraduationCap className="h-3.5 w-3.5 text-foreground" />}
          badgeLabel="EDUCATION // TRAINING"
          number="05/"
          title="Education"
          subtitle="Academic Foundations & Professional Training"
          className="mb-8 md:mb-12 flex flex-col gap-3 shrink-0"
        />

        {/* 2-Column Comparative Dual-Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch flex-1">
          {siteConfig.education.map((item, idx) => (
            <EducationDossierCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* Bottom Attestation / Status Hints */}
        <div className="mt-8 pt-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-muted-foreground uppercase tracking-wider select-none shrink-0">
          <span className="text-foreground/60">[CONTINUOUS LEARNING // SKILL DEVELOPMENT]</span>
          <span>BUILDING FOUNDATIONAL KNOWLEDGE</span>
        </div>
      </div>
    </section>
  );
}

