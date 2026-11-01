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
import {
  PROJECTS_DATA,
  PROJECT_CATEGORIES,
  ProjectSystem,
  PipelineStep,
  TopologyLayer,
} from "@/config/projects-config";
import {
  Terminal,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Cpu,
  Workflow,
  Network,
} from "lucide-react";

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "cloud-ai" | "cisco-networking"
  >("all");
  const [activeProject, setActiveProject] = useState<ProjectSystem>(
    PROJECTS_DATA[0]
  );
  const [activePipelineId, setActivePipelineId] = useState<string>("pipeline-a");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);

  const { setHoveredElementBounds } = useHeroCursor();
  const listRef = useRef<HTMLDivElement>(null);

  // Filter projects by selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

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

  // Reset pipeline/layer indices when active project changes
  useEffect(() => {
    setActiveStepIndex(0);
    setActiveLayerIndex(0);
    if (activeProject.pipelines && activeProject.pipelines.length > 0) {
      setActivePipelineId(activeProject.pipelines[0].id);
    }
  }, [activeProject.id]);

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

  // Section 03 exit recede as Section 04 (Experience) cascades in
  const recedeScale = useTransform(smoothProgress, [0.78, 0.98], [1, 0.88]);
  const recedeOpacity = useTransform(smoothProgress, [0.78, 0.95], [1, 0]);
  const recedeY = useTransform(smoothProgress, [0.78, 0.98], [0, -60]);

  // Active pipeline resolution for Cloud-AI
  const activePipeline = useMemo(() => {
    if (!activeProject.pipelines || activeProject.pipelines.length === 0) {
      return null;
    }
    return (
      activeProject.pipelines.find((p) => p.id === activePipelineId) ||
      activeProject.pipelines[0]
    );
  }, [activeProject.pipelines, activePipelineId]);

  const activeStep: PipelineStep | null = useMemo(() => {
    if (!activePipeline || !activePipeline.steps) return null;
    return activePipeline.steps[activeStepIndex] || activePipeline.steps[0];
  }, [activePipeline, activeStepIndex]);

  // Active topology layer for Cisco Networking
  const activeLayer: TopologyLayer | null = useMemo(() => {
    if (
      !activeProject.topologyLayers ||
      activeProject.topologyLayers.length === 0
    ) {
      return null;
    }
    return (
      activeProject.topologyLayers[activeLayerIndex] ||
      activeProject.topologyLayers[0]
    );
  }, [activeProject.topologyLayers, activeLayerIndex]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-[250vh] w-full"
    >
      <motion.div
        style={{
          scale: recedeScale,
          opacity: recedeOpacity,
          y: recedeY,
        }}
        className="sticky top-0 min-h-screen lg:h-screen w-full overflow-y-auto lg:overflow-hidden flex flex-col justify-between px-6 py-24 md:px-12 md:py-32 origin-center will-change-transform"
      >
        <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col min-h-0 justify-between">
          {/* Numbered Section Header: 03/ Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={customSpring}
            className="mb-6 md:mb-8 flex flex-col gap-3 shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <Terminal className="h-3.5 w-3.5 text-foreground" />
                <span>BUILDS // IMPLEMENTATIONS</span>
              </div>
              <span className="h-px flex-1 max-w-[80px] bg-border" />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
                <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                  03/
                </span>
                Projects &amp; Labs
              </h2>
              <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Network Infrastructure, Cloud Services &amp; Server Management
              </p>
            </div>
          </motion.div>

          {/* Unboxed Category Filter Navigation */}
          <div className="mb-6 md:mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/50 pb-3.5 shrink-0 select-none">
            {PROJECT_CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? PROJECTS_DATA.length
                  : PROJECTS_DATA.filter((p) => p.category === cat.id).length;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
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
                  className={`relative py-1 font-mono text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
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
                      layoutId="activeProjectCategoryUnderline"
                      className="absolute -bottom-[15px] left-0 right-0 h-[2px] bg-foreground"
                      transition={customSpring}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Precision System Console Container (Vertically Balanced) */}
          <div className="flex-1 flex flex-col justify-center min-h-0 my-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch min-h-0">
              {/* Left Column: System Project Manifest (5/12 cols) */}
              <div className="lg:col-span-5 flex flex-col min-h-0">
                <div
                  ref={listRef}
                  onScroll={() => setHoveredElementBounds(null)}
                  onMouseLeave={() => setHoveredElementBounds(null)}
                  className="max-h-[480px] overflow-y-auto space-y-2.5 pr-1 select-none"
                >
                  {filteredProjects.map((project, idx) => {
                    const isSelected = project.id === activeProject.id;
                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => setActiveProject(project)}
                        onMouseEnter={(e) => {
                          setActiveProject(project);
                          const rect = (
                            e.currentTarget as HTMLElement
                          ).getBoundingClientRect();
                          setHoveredElementBounds({
                            x: rect.left,
                            y: rect.top,
                            width: rect.width,
                            height: rect.height,
                            shape: "rounded",
                            borderRadius: 12,
                          });
                        }}
                        onMouseMove={(e) => {
                          const rect = (
                            e.currentTarget as HTMLElement
                          ).getBoundingClientRect();
                          setHoveredElementBounds({
                            x: rect.left,
                            y: rect.top,
                            width: rect.width,
                            height: rect.height,
                            shape: "rounded",
                            borderRadius: 12,
                          });
                        }}
                        onMouseLeave={() => setHoveredElementBounds(null)}
                        className={`w-full flex flex-col p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
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
                            className={`text-sm sm:text-base font-bold leading-snug line-clamp-2 ${
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
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/40">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground truncate max-w-[140px]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="font-mono text-[10px] text-muted-foreground/60">
                              +{project.stack.length - 3}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Live Architecture Blueprint Visualizer (7/12 cols) */}
              <div className="lg:col-span-7 h-[460px] lg:h-[480px] rounded-2xl border border-white/10 bg-[#0c0d10] text-[#f8fafc] p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md relative overflow-hidden shadow-2xl">
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
                    {/* Top Console Meta Bar */}
                    <div>
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
                        <span className="rounded border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shrink-0">
                          {activeProject.status}
                        </span>
                      </div>

                      {/* Project Header & Controls */}
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white leading-tight truncate">
                            {activeProject.title}
                          </h3>
                        </div>

                        {/* Interactive Switchers */}
                        {activeProject.category === "cloud-ai" &&
                          activeProject.pipelines && (
                            <div className="flex items-center gap-1.5 shrink-0 select-none">
                              {activeProject.pipelines.map((pipe) => {
                                const isPipeActive =
                                  activePipeline?.id === pipe.id;
                                return (
                                  <button
                                    key={pipe.id}
                                    type="button"
                                    onClick={() => {
                                      setActivePipelineId(pipe.id);
                                      setActiveStepIndex(0);
                                    }}
                                    className={`px-2.5 py-1 rounded font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                                      isPipeActive
                                        ? "bg-white text-black font-bold shadow-sm"
                                        : "text-neutral-400 hover:text-white bg-white/[0.04] border border-white/10"
                                    }`}
                                  >
                                    {pipe.id === "pipeline-a"
                                      ? "PIPELINE A: PRE-GAME"
                                      : "PIPELINE B: POST-GAME"}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                        {activeProject.category === "cisco-networking" &&
                          activeProject.topologyLayers && (
                            <div className="flex items-center gap-1.5 shrink-0 select-none">
                              {activeProject.topologyLayers.map(
                                (layer, idx) => {
                                  const isLayerActive =
                                    activeLayerIndex === idx;
                                  return (
                                    <button
                                      key={layer.layer}
                                      type="button"
                                      onClick={() => setActiveLayerIndex(idx)}
                                      className={`px-2.5 py-1 rounded font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                                        isLayerActive
                                          ? "bg-white text-black font-bold shadow-sm"
                                          : "text-neutral-400 hover:text-white bg-white/[0.04] border border-white/10"
                                      }`}
                                    >
                                      {layer.layer.split(" ")[0]}
                                    </button>
                                  );
                                }
                              )}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Middle Interactive Blueprint Console */}
                    <div className="my-2 flex-1 min-h-0 flex flex-col justify-between">
                      {activeProject.category === "cloud-ai" &&
                        activePipeline &&
                        activeStep && (
                          <div className="flex flex-col h-full justify-between min-h-0">
                            {/* Pipeline Step Sequence Train */}
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none select-none">
                              {activePipeline.steps.map((step, idx) => {
                                const isStepActive = activeStepIndex === idx;
                                return (
                                  <React.Fragment key={step.id}>
                                    <button
                                      type="button"
                                      onClick={() => setActiveStepIndex(idx)}
                                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-left transition-all duration-200 cursor-pointer shrink-0 ${
                                        isStepActive
                                          ? "bg-white text-black font-bold border-white shadow-sm"
                                          : "bg-white/[0.04] text-neutral-300 border-white/10 hover:border-white/25 hover:text-white"
                                      }`}
                                    >
                                      <span className="font-mono text-[10px] opacity-70">
                                        0{step.stepNumber}
                                      </span>
                                      <span className="font-mono text-[11px] truncate max-w-[90px] sm:max-w-none">
                                        {step.service.split("&")[0].trim()}
                                      </span>
                                    </button>
                                    {idx < activePipeline.steps.length - 1 && (
                                      <ArrowRight className="h-3 w-3 text-neutral-600 shrink-0" />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>

                            {/* Active Step Details & Code Drawer */}
                            <div className="flex-1 min-h-0 flex flex-col justify-between pt-1">
                              <div>
                                <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                                  <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                    <Workflow className="h-3.5 w-3.5 text-neutral-300" />
                                    STEP 0{activeStep.stepNumber} //{" "}
                                    {activeStep.title}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                                    TARGET: {activeStep.service}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-neutral-300 leading-relaxed line-clamp-2">
                                  {activeStep.description}
                                </p>
                              </div>

                              {/* Terminal Code Snippet Box */}
                              {activeStep.detailCode && (
                                <div className="rounded-lg border border-white/10 bg-black/60 p-2.5 font-mono text-[10.5px] leading-relaxed text-neutral-300 mt-2">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1 text-[9px] uppercase tracking-wider text-neutral-400">
                                    <div className="flex items-center gap-1.5">
                                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                                      <span className="ml-1 text-white/80 font-bold">
                                        EXECUTION_LOGIC // PYTHON 3.14
                                      </span>
                                    </div>
                                    <span className="text-[9px] text-neutral-400 truncate max-w-[200px]">
                                      {activeStep.service}
                                    </span>
                                  </div>
                                  <pre className="overflow-x-auto text-[10.5px] font-mono text-neutral-300 leading-snug max-h-[75px] pr-1">
                                    <code>{activeStep.detailCode}</code>
                                  </pre>
                                </div>
                              )}

                              {/* Security & Runtime Badge Rail */}
                              <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono text-neutral-400">
                                {activeStep.securityControl && (
                                  <div className="flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-2 py-0.5">
                                    <ShieldCheck className="h-3 w-3 text-neutral-300 shrink-0" />
                                    <span className="truncate max-w-[280px]">
                                      {activeStep.securityControl}
                                    </span>
                                  </div>
                                )}
                                {activeStep.runtimeLogic && (
                                  <div className="flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-2 py-0.5">
                                    <Activity className="h-3 w-3 text-neutral-300 shrink-0" />
                                    <span className="truncate max-w-[240px]">
                                      {activeStep.runtimeLogic}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                      {activeProject.category === "cisco-networking" &&
                        activeLayer && (
                          <div className="flex flex-col h-full justify-between min-h-0">
                            <div>
                              <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                  <Network className="h-3.5 w-3.5 text-neutral-300" />
                                  TOPOLOGY // {activeLayer.layer}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                                  {activeLayer.devices}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-neutral-300 leading-relaxed line-clamp-2">
                                {activeLayer.details}
                              </p>
                            </div>

                            {/* Cisco IOS CLI Terminal Box */}
                            {activeLayer.configSnippet && (
                              <div className="rounded-lg border border-white/10 bg-black/60 p-2.5 font-mono text-[10.5px] leading-relaxed text-neutral-300 mt-2">
                                <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1 text-[9px] uppercase tracking-wider text-neutral-400">
                                  <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                                    <span className="ml-1 text-white/80 font-bold">
                                      CISCO_IOS // RUNNING-CONFIG
                                    </span>
                                  </div>
                                  <span className="text-[9px] text-neutral-400 truncate max-w-[200px]">
                                    {activeLayer.devices}
                                  </span>
                                </div>
                                <pre className="overflow-x-auto text-[10.5px] font-mono text-neutral-300 leading-snug max-h-[85px] pr-1">
                                  <code>{activeLayer.configSnippet}</code>
                                </pre>
                              </div>
                            )}

                            {/* Protocols Badge Rail */}
                            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-neutral-300">
                              <span className="text-neutral-500 uppercase">
                                Active Protocols:
                              </span>
                              {activeLayer.protocols
                                .split(",")
                                .map((protocol) => (
                                  <span
                                    key={protocol.trim()}
                                    className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-neutral-300"
                                  >
                                    {protocol.trim()}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Bottom Console Metric Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/10 text-left shrink-0">
                      {activeProject.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 truncate">
                            {m.label}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-white truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Status Rail */}
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-wider shrink-0 select-none">
            <span className="text-foreground/70 truncate max-w-[70%]">
              {`[INSPECTED: ${activeProject.title}] // CLICK PIPELINE STEPS TO INSPECT LOGIC`}
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
