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
import { useHeroCursor, useMagneticHover } from "@/components/ui/hero-cursor-context";
import { SectionHeader } from "@/components/ui/section-header";
import { CategoryTabs } from "@/components/ui/category-tabs";
import {
  PROJECTS_DATA,
  PROJECT_CATEGORIES,
  ProjectSystem,
} from "@/config/projects-config";
import { Terminal, ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "cloud-ai" | "cisco-networking" | "web-platform"
  >("all");
  const [activeProject, setActiveProject] = useState<ProjectSystem>(
    PROJECTS_DATA[0]
  );

  const { setHoveredElementBounds } = useHeroCursor();
  const { bind: bindCardAction } = useMagneticHover(8);
  const { bind: bindCardBadge } = useMagneticHover(6);
  const listRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up scroll timer on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Filter projects by selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Visibility & conditional auto-scroll helper
  const handleProjectInteraction = (
    project: ProjectSystem,
    element: HTMLElement
  ) => {
    if (!listRef.current) return;
    const containerRect = listRef.current.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();

    const isCutOffBottom = itemRect.bottom > containerRect.bottom + 1;
    const isCutOffTop = itemRect.top < containerRect.top - 1;

    if (isCutOffBottom || isCutOffTop) {
      // Condition A (Partially Visible / Cut Off):
      // Dismiss bounds immediately and auto-scroll with 12px breathing buffer
      setHoveredElementBounds(null);
      setActiveProject(project);

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
      setActiveProject(project);
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

  // Settle cursor bubble onto whichever project card rests under pointer after scrolling stops
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
      const projectBtn = element?.closest<HTMLButtonElement>(
        "button[data-project-id]"
      );
      if (projectBtn) {
        const projectId = projectBtn.getAttribute("data-project-id");
        const matched = filteredProjects.find((p) => p.id === projectId);
        if (matched) {
          const containerRect = listRef.current.getBoundingClientRect();
          const itemRect = projectBtn.getBoundingClientRect();
          const isCutOffBottom = itemRect.bottom > containerRect.bottom + 1;
          const isCutOffTop = itemRect.top < containerRect.top - 1;

          if (!isCutOffBottom && !isCutOffTop) {
            if (activeProject.id !== matched.id) {
              setActiveProject(matched);
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

  const globalProjectIndex = useMemo(() => {
    const idx = PROJECTS_DATA.findIndex((p) => p.id === activeProject.id);
    return idx >= 0 ? idx : 0;
  }, [activeProject.id]);

  // Keep active project within filtered results
  useEffect(() => {
    const exists = filteredProjects.some((p) => p.id === activeProject.id);
    if (!exists && filteredProjects.length > 0) {
      setActiveProject(filteredProjects[0]);
    }
  }, [filteredProjects, activeProject.id]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  // Section 03 exit recede into Section 04 (Synchronized with Section 04 rising)
  const recedeScale = useTransform(smoothProgress, [0.72, 0.96], [1, 0.88]);
  const recedeOpacity = useTransform(smoothProgress, [0.72, 0.94], [1, 0]);
  const recedeY = useTransform(smoothProgress, [0.72, 0.96], [0, -60]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-[280vh] w-full"
    >
      <motion.div
        style={{
          scale: recedeScale,
          opacity: recedeOpacity,
          y: recedeY,
        }}
        className="sticky top-0 min-h-screen lg:h-screen w-full overflow-y-auto flex flex-col justify-between px-4 pt-12 pb-4 sm:px-6 md:px-12 md:pt-24 md:pb-4 origin-center will-change-transform"
      >
        <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col min-h-0 justify-between">
          {/* Numbered Section Header: 03/ Projects */}
          <SectionHeader
            badgeIcon={<Terminal className="h-3.5 w-3.5 text-foreground" />}
            badgeLabel="BUILDS // IMPLEMENTATIONS"
            number="03/"
            title="Projects & Labs"
            subtitle="Network Infrastructure, Cloud Services & Server Management"
            className="mb-3 sm:mb-4 md:mb-5 flex flex-col gap-1.5 shrink-0"
          />

          {/* Precision System Console Container (Top-Anchored, Invariant Filter Position) */}
          <div className="flex-1 flex flex-col justify-start min-h-0 w-full pt-3 sm:pt-4 md:pt-5">
            {/* Unboxed Category Filter Navigation */}
            <CategoryTabs
              categories={PROJECT_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={(id) => setSelectedCategory(id)}
              getItemCount={(id) =>
                id === "all"
                  ? PROJECTS_DATA.length
                  : PROJECTS_DATA.filter((p) => p.category === id).length
              }
              layoutId="activeProjectCategoryUnderline"
            />

            {/* Mobile Horizontal Swipeable Dossier Carousel (< 1024px) */}
            <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-2 -mx-4 px-4">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="w-[88vw] sm:w-[420px] shrink-0 snap-center rounded-2xl border border-white/10 bg-[#0c0d10] text-[#f8fafc] p-5 flex flex-col justify-between"
                >
                  {/* Top Meta */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[11px] text-neutral-400">
                    <span>PRJ_0{idx + 1} // {project.categoryLabel.toUpperCase()}</span>
                    <span className="rounded border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                      {project.status}
                    </span>
                  </div>
                  {/* Title */}
                  <div className="mt-3">
                    <h3 className="text-lg font-bold uppercase text-white leading-tight">{project.title}</h3>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">{project.subtitle}</p>
                  </div>
                  {/* Overview */}
                  <p className="text-xs text-neutral-300 leading-relaxed mt-2.5 line-clamp-3">{project.overview}</p>
                  {/* Stack Pills */}
                  <div className="mt-3 flex flex-wrap gap-1 border-t border-white/10 pt-2.5">
                    {project.stack.map((t) => (
                      <span key={t} className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Action Links */}
                  <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white"
                      >
                        <span>Repository</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                    {project.discordUrl && (
                      <a
                        href={project.discordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white"
                      >
                        <span>Discord</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch min-h-0">
              {/* Left Column: System Project Manifest (5/12 cols) */}
              <div className="hidden lg:flex lg:col-span-5 flex-col min-h-0">
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
                  className="h-full min-h-[480px] lg:min-h-[520px] max-h-[580px] overflow-y-auto space-y-2 pr-1.5 select-none"
                >
                  {filteredProjects.map((project, idx) => {
                    const isSelected = project.id === activeProject.id;
                    return (
                      <button
                        key={project.id}
                        data-project-id={project.id}
                        type="button"
                        onClick={() => setActiveProject(project)}
                        onMouseEnter={(e) =>
                          handleProjectInteraction(project, e.currentTarget)
                        }
                        onFocus={(e) =>
                          handleProjectInteraction(project, e.currentTarget)
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
                        className={`w-full flex flex-col p-3 sm:p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                          isSelected
                            ? "bg-foreground/[0.06] border-foreground/30 shadow-sm"
                            : "bg-card/40 border-border/50 hover:bg-foreground/[0.03] hover:border-border"
                        }`}
                      >
                        {/* Top Meta Line: Index + Status Badge */}
                        <div className="flex items-center justify-between font-mono text-xs mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground/80 font-bold">
                              [{String(idx + 1).padStart(2, "0")}]
                            </span>
                            <span className="text-foreground/80 font-semibold uppercase tracking-wider text-[11px]">
                              PRJ_0{idx + 1}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                              project.status === "PRODUCTION"
                                ? "bg-foreground/10 border-foreground/30 text-foreground font-bold"
                                : "bg-muted/40 border-border/60 text-muted-foreground"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="mb-3">
                          <h3
                            className={`text-xs sm:text-sm md:text-base font-bold leading-snug line-clamp-2 ${
                              isSelected
                                ? "text-foreground"
                                : "text-foreground/90"
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Stack Pills Tray */}
                        <div className="flex items-center gap-1.5 pt-2 border-t border-border/40 overflow-hidden">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground truncate max-w-[140px] shrink-0"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">
                              +{project.stack.length - 3}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Executive Project Dossier (7/12 cols) */}
              <div className="hidden lg:flex lg:col-span-7 h-auto min-h-[480px] lg:min-h-[520px] rounded-2xl border border-white/10 bg-[#0c0d10] text-[#f8fafc] p-4 sm:p-6 flex-col justify-between backdrop-blur-md relative overflow-hidden shadow-2xl">
                {/* Architectural Vector Geometry Watermark */}
                <motion.svg
                  viewBox="0 0 200 200"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 80,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 opacity-[0.08] select-none text-white"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect
                    x="20"
                    y="20"
                    width="160"
                    height="160"
                    strokeWidth="0.75"
                    strokeDasharray="4 4"
                  />
                  <circle cx="100" cy="100" r="70" strokeWidth="1" />
                  <circle
                    cx="100"
                    cy="100"
                    r="40"
                    strokeWidth="0.75"
                    strokeDasharray="2 4"
                  />
                  <line x1="20" y1="100" x2="180" y2="100" strokeWidth="0.75" />
                  <line x1="100" y1="20" x2="100" y2="180" strokeWidth="0.75" />
                  <circle cx="50" cy="50" r="6" strokeWidth="1" />
                  <circle cx="150" cy="50" r="6" strokeWidth="1" />
                  <circle cx="50" cy="150" r="6" strokeWidth="1" />
                  <circle cx="150" cy="150" r="6" strokeWidth="1" />
                </motion.svg>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="relative z-10 flex flex-col justify-between h-full min-h-0"
                  >
                    <div>
                      {/* Top Console Meta Bar / Header Spec Line */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-white font-bold shrink-0">
                            SPEC_ID // 0x
                            {String(globalProjectIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="opacity-40">//</span>
                          <span className="text-[11px] text-neutral-300 truncate">
                            DOMAIN: {activeProject.categoryLabel.toUpperCase()}
                          </span>
                        </div>
                        <span
                          {...bindCardBadge(6)}
                          className="rounded border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shrink-0 cursor-default select-none"
                        >
                          {activeProject.status}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="mt-3">
                        <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white leading-tight">
                          {activeProject.title}
                        </h3>
                        <p className="text-xs font-mono text-neutral-400 mt-1">
                          {activeProject.subtitle}
                        </p>
                      </div>

                      {/* Overview Narrative */}
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-3">
                        {activeProject.overview}
                      </p>

                      {/* Architecture & System Highlights */}
                      <div className="mt-3.5 space-y-2 border-t border-white/10 pt-3">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                          {activeProject.architectureSectionTitle ||
                            (activeProject.category === "cloud-ai"
                              ? "AWS Cloud Infrastructure & Services Architecture:"
                              : activeProject.category === "web-platform"
                              ? "Frontend Architecture, Motion Engine & Edge Performance:"
                              : "Core Network Features & Implementation:")}
                        </div>
                        <ul className="space-y-1.5 overflow-y-auto max-h-[130px] sm:max-h-[140px] pr-1">
                          {activeProject.architectureHighlights.map(
                            (highlight, hIdx) => {
                              const [label, ...descParts] = highlight.split(":");
                              const desc = descParts.join(":");
                              return (
                                <li
                                  key={hIdx}
                                  className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed flex items-start gap-2"
                                >
                                  <span className="mt-1.5 h-1 w-1 rounded-full bg-white/70 shrink-0" />
                                  <span>
                                    <strong className="text-white font-semibold">
                                      {label}:
                                    </strong>
                                    {desc}
                                  </span>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Area: Tech Stack Pills & Action Links */}
                    <div>
                      {/* Technology Stack Pills */}
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-2.5">
                        {activeProject.stack.map((tech) => (
                          <span
                            key={tech}
                            {...bindCardBadge(6)}
                            className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-neutral-300 transition-colors hover:border-white/30 hover:text-white cursor-default select-none"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links Tray (GitHub, Live URL & Discord) */}
                      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-3">
                        {activeProject.githubUrl && (
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...bindCardAction(8)}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white/10 hover:border-white/30 cursor-pointer"
                          >
                            <span>Project Repository</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {activeProject.liveUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...bindCardAction(8)}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white/10 hover:border-white/30 cursor-pointer"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {activeProject.discordUrl && (
                          <a
                            href={activeProject.discordUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...bindCardAction(8)}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white/10 hover:border-white/30 cursor-pointer"
                          >
                            <span>Discord Showcase</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Status Rail */}
          <div className="mt-2 pt-2 border-t border-border/40 flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-wider shrink-0 select-none">
            <span className="text-foreground/70 truncate max-w-[70%]">
              {`[DOSSIER: ${activeProject.title}] // EXECUTIVE ENGINEERING SPEC`}
            </span>
            <span className="shrink-0">
              {`SYSTEMS // 0${filteredProjects.length} ARCHITECTURES`}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
