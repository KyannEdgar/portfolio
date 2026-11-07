"use client";

import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { customSpring } from "@/lib/animation";
import { useHeroCursor } from "@/components/ui/hero-cursor-context";
import { SKILLS_DATA, SKILL_CATEGORIES } from "@/config/skills-config";
import { TechIcon } from "@/components/ui/icons/tech-icons";
import { SkillCategory, SkillItem } from "@/types";
import { Cpu } from "lucide-react";

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("all");
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const { setHoveredElementBounds } = useHeroCursor();

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === "all") return SKILLS_DATA;
    return SKILLS_DATA.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  // Visibility & conditional auto-scroll helper
  const handleSkillInteraction = (
    skill: SkillItem,
    element: HTMLElement
  ) => {
    if (!listRef.current) return;
    const containerRect = listRef.current.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();

    const isCutOffBottom = itemRect.bottom > containerRect.bottom + 1;
    const isCutOffTop = itemRect.top < containerRect.top - 1;

    if (isCutOffBottom || isCutOffTop) {
      // Condition A (Partially Visible / Cut Off):
      // Clear cursor bounds immediately and auto-scroll with 12px breathing cushion
      setHoveredElementBounds(null);
      if (activeSkill.name !== skill.name) {
        setActiveSkill(skill);
      }

      if (isCutOffBottom) {
        listRef.current.scrollTo({
          top:
            listRef.current.scrollTop +
            (itemRect.bottom - containerRect.bottom) +
            12,
          behavior: "smooth",
        });
      } else if (isCutOffTop) {
        listRef.current.scrollTo({
          top:
            listRef.current.scrollTop -
            (containerRect.top - itemRect.top) -
            12,
          behavior: "smooth",
        });
      }
    } else {
      // Condition B (Already Fully Visible): No scroll, immediate snap
      if (activeSkill.name !== skill.name) {
        setActiveSkill(skill);
      }
      setHoveredElementBounds({
        x: itemRect.left,
        y: itemRect.top,
        width: itemRect.width,
        height: itemRect.height,
        shape: "rounded",
        borderRadius: 12,
      });
    }
  };

  // Automatically activate whichever skill lands under the resting cursor when scrolling stops
  const handleListScroll = () => {
    setHoveredElementBounds(null);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!mousePosRef.current || !listRef.current) return;
      const element = document.elementFromPoint(
        mousePosRef.current.x,
        mousePosRef.current.y
      );
      const skillBtn = element?.closest<HTMLButtonElement>(
        "button[data-skill-name]"
      );
      if (skillBtn) {
        const skillName = skillBtn.getAttribute("data-skill-name");
        const matched = filteredSkills.find((s) => s.name === skillName);
        if (matched) {
          const containerRect = listRef.current.getBoundingClientRect();
          const itemRect = skillBtn.getBoundingClientRect();
          const isCutOffBottom = itemRect.bottom > containerRect.bottom + 1;
          const isCutOffTop = itemRect.top < containerRect.top - 1;

          if (!isCutOffBottom && !isCutOffTop) {
            if (activeSkill.name !== matched.name) {
              setActiveSkill(matched);
            }
            setHoveredElementBounds({
              x: itemRect.left,
              y: itemRect.top,
              width: itemRect.width,
              height: itemRect.height,
              shape: "rounded",
              borderRadius: 12,
            });
          }
        }
      }
    }, 40);
  };

  const globalSkillIndex = useMemo(() => {
    const idx = SKILLS_DATA.findIndex((s) => s.name === activeSkill.name);
    return idx >= 0 ? idx : 0;
  }, [activeSkill.name]);

  const activeCategoryLabel = useMemo(() => {
    const cat = SKILL_CATEGORIES.find((c) => c.id === activeSkill.category);
    return cat?.label || activeSkill.category.toUpperCase();
  }, [activeSkill.category]);

  // Dissolve global cursor bubble on page scroll
  useEffect(() => {
    const handleWindowScroll = () => {
      setHoveredElementBounds(null);
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [setHoveredElementBounds]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  // Section 02 exit recede into Section 03 (Synchronized with Section 03 rising through the middle)
  const recedeScale = useTransform(smoothProgress, [0.48, 0.96], [1, 0.88]);
  const recedeOpacity = useTransform(smoothProgress, [0.48, 0.92], [1, 0]);
  const recedeY = useTransform(smoothProgress, [0.48, 0.96], [0, -60]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative h-[280vh] w-full"
    >
      <motion.div
        style={{
          scale: recedeScale,
          opacity: recedeOpacity,
          y: recedeY,
        }}
        className="sticky top-0 min-h-screen lg:h-screen w-full overflow-y-auto lg:overflow-hidden flex flex-col justify-between px-4 pt-12 pb-6 sm:px-6 md:px-12 md:pt-24 md:pb-6 origin-center will-change-transform"
      >
        <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col min-h-0 justify-between">
          {/* Numbered Section Header: 02/ Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={customSpring}
            className="mb-2.5 sm:mb-3 md:mb-4 flex flex-col gap-2 shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <Cpu className="h-3.5 w-3.5 text-foreground" />
                <span>TECH STACK // EXPERTISE</span>
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
                Core Technologies, Operating Systems &amp; Engineering Tools
              </p>
            </div>
          </motion.div>

          {/* Precision Toolchain Workbench Container (Vertically Balanced) */}
          <div className="flex-1 flex flex-col justify-center min-h-0 my-auto w-full">
            {/* Unboxed Category Filter Navigation */}
            <div className="mb-4 sm:mb-5 flex items-center overflow-x-auto overflow-y-hidden no-scrollbar gap-x-6 sm:gap-x-8 border-b border-border/50 pb-0 shrink-0 select-none">
              {SKILL_CATEGORIES.map((cat) => {
                const count =
                  cat.id === "all"
                    ? SKILLS_DATA.length
                    : SKILLS_DATA.filter((s) => s.category === cat.id).length;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      const first =
                        cat.id === "all"
                          ? SKILLS_DATA[0]
                          : SKILLS_DATA.find((s) => s.category === cat.id);
                      if (first) setActiveSkill(first);
                    }}
                    onMouseEnter={(e) => {
                      const rect = (
                        e.currentTarget as HTMLElement
                      ).getBoundingClientRect();
                      setHoveredElementBounds({
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                        shape: "rounded",
                        borderRadius: 6,
                      });
                    }}
                    onMouseLeave={() => setHoveredElementBounds(null)}
                    className={`relative pb-2.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer shrink-0 ${
                      isActive
                        ? "font-bold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="ml-1.5 opacity-50 text-[10px]">
                      ({count < 10 ? `0${count}` : count})
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillUnderline"
                        className="absolute -bottom-px left-0 right-0 h-[2px] bg-foreground"
                        transition={customSpring}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch min-h-0">
              {/* Left Column: The Toolchain Ledger Stream (7/12 cols) */}
              <div className="lg:col-span-7 flex flex-col min-h-0">
                <div
                  ref={listRef}
                  onMouseMove={(e) => {
                    mousePosRef.current = { x: e.clientX, y: e.clientY };
                  }}
                  onScroll={handleListScroll}
                  onMouseLeave={() => {
                    mousePosRef.current = null;
                    setHoveredElementBounds(null);
                  }}
                  className="max-h-[240px] sm:max-h-[360px] lg:max-h-[430px] overflow-y-auto space-y-1.5 pr-2 select-none"
                >
                  {filteredSkills.map((skill, idx) => {
                    const isSelected = skill.name === activeSkill.name;
                    return (
                      <button
                        key={skill.name}
                        data-skill-name={skill.name}
                        type="button"
                        onClick={() => setActiveSkill(skill)}
                        onMouseEnter={(e) =>
                          handleSkillInteraction(skill, e.currentTarget)
                        }
                        onFocus={(e) =>
                          handleSkillInteraction(skill, e.currentTarget)
                        }
                        onMouseMove={(e) => {
                          if (!listRef.current) return;
                          const containerRect =
                            listRef.current.getBoundingClientRect();
                          const itemRect = (
                            e.currentTarget as HTMLElement
                          ).getBoundingClientRect();
                          const isCutOffBottom =
                            itemRect.bottom > containerRect.bottom + 1;
                          const isCutOffTop =
                            itemRect.top < containerRect.top - 1;

                          if (isCutOffBottom || isCutOffTop) {
                            setHoveredElementBounds(null);
                          } else {
                            setHoveredElementBounds({
                              x: itemRect.left,
                              y: itemRect.top,
                              width: itemRect.width,
                              height: itemRect.height,
                              shape: "rounded",
                              borderRadius: 12,
                            });
                          }
                        }}
                        onMouseLeave={() => setHoveredElementBounds(null)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                          isSelected
                            ? "bg-foreground/[0.06] border-foreground/30 shadow-sm"
                            : "bg-card/40 border-border/50 hover:bg-foreground/[0.03] hover:border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs text-muted-foreground/80 shrink-0">
                            [{String(idx + 1).padStart(2, "0")}]
                          </span>
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-card shrink-0">
                            <TechIcon
                              name={skill.icon}
                              className="h-4 w-4 text-foreground"
                            />
                          </div>
                          <span
                            className={`text-sm truncate ${
                              isSelected
                                ? "font-bold text-foreground"
                                : "font-semibold text-foreground/90"
                            }`}
                          >
                            {skill.name}
                          </span>
                          {skill.tags && skill.tags[0] && (
                            <span className="hidden sm:inline-block font-mono text-[11px] text-muted-foreground truncate">
                              // {skill.tags[0]}
                            </span>
                          )}
                        </div>

                        {skill.proficiency && (
                          <span
                            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${
                              isSelected
                                ? "bg-foreground/10 border-foreground/30 text-foreground font-bold"
                                : "bg-muted/40 border-border/60 text-muted-foreground"
                            }`}
                          >
                            {skill.proficiency}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Dynamic Spec Inspector Canvas (5/12 cols) */}
              <div className="lg:col-span-5 h-auto min-h-[240px] sm:h-[390px] lg:h-[430px] max-h-[calc(100vh-270px)] rounded-2xl border border-white/10 bg-[#0c0d10] text-[#f8fafc] p-4 sm:p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden shadow-2xl">
              {/* Architectural Vector Geometry Watermark */}
              <motion.svg
                viewBox="0 0 200 200"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 opacity-10 select-none text-white"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle cx="100" cy="100" r="70" strokeWidth="1" />
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <circle cx="100" cy="100" r="30" strokeWidth="1" />
                <line
                  x1="10"
                  y1="100"
                  x2="190"
                  y2="100"
                  strokeWidth="0.75"
                  strokeDasharray="3 3"
                />
                <line
                  x1="100"
                  y1="10"
                  x2="100"
                  y2="190"
                  strokeWidth="0.75"
                  strokeDasharray="3 3"
                />
                <rect x="70" y="70" width="60" height="60" strokeWidth="0.75" />
              </motion.svg>

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="relative z-10 flex flex-col justify-between h-full"
                >
                  {/* Top Spec Header */}
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">
                          SPEC_ID // 0x
                          {String(globalSkillIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="opacity-40">//</span>
                        <span className="text-[11px] text-neutral-300">
                          DOMAIN: {activeSkill.category.toUpperCase()}
                        </span>
                      </div>
                      {activeSkill.proficiency && (
                        <div className="flex items-center gap-2">
                          <span className="rounded border border-white/20 bg-white/[0.08] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                            {activeSkill.proficiency}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Centerpiece: Large Icon + Title + Category Label */}
                    <div className="mt-6 flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white">
                        <TechIcon
                          name={activeSkill.icon}
                          className="h-8 w-8 text-white"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight truncate">
                          {activeSkill.name}
                        </h3>
                        <span className="font-mono text-[11px] text-neutral-400 block mt-0.5 uppercase tracking-wider">
                          {activeCategoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Engineering Description */}
                    <p className="mt-5 text-xs sm:text-sm leading-relaxed text-neutral-300">
                      {activeSkill.description}
                    </p>

                    {/* Tier Definition */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-neutral-400">
                      <span className="text-neutral-500 uppercase tracking-wider">TIER DEFINITION:</span>
                      <span className="text-neutral-200">
                        {activeSkill.proficiency === "Advanced" && "Confident using it in real-world projects"}
                        {activeSkill.proficiency === "Proficient" && "Can work independently with it"}
                        {activeSkill.proficiency === "Intermediate" && "Comfortable with common tasks"}
                        {activeSkill.proficiency === "Basic" && "Familiar with the fundamentals"}
                      </span>
                    </div>
                  </div>

                  {/* Capability Tags Tray */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2.5">
                      Verified Capability Profiles:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSkill.tags?.map((tag) => (
                        <span
                          key={tag}
                          onMouseEnter={(e) => {
                            const rect = (
                              e.currentTarget as HTMLElement
                            ).getBoundingClientRect();
                            setHoveredElementBounds({
                              x: rect.left,
                              y: rect.top,
                              width: rect.width,
                              height: rect.height,
                              shape: "rounded",
                              borderRadius: 6,
                            });
                          }}
                          onMouseLeave={() => setHoveredElementBounds(null)}
                          className="rounded border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-neutral-200 transition-colors hover:border-white/30 hover:text-white select-none cursor-default"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Status Rail */}
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-wider shrink-0 select-none">
            <span className="text-foreground/70">{`[INSPECTED: ${activeSkill.name}] // HOVER TO EXPLORE TECH STACK`}</span>
            <span>{`TECH STACK // ${filteredSkills.length} PROFICIENCIES`}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
