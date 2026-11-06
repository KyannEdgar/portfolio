"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { PrimeReactProvider } from "primereact/api";
import { Timeline } from "@primereact/ui/timeline";
import { siteConfig } from "@/config";
import { useHeroCursor } from "@/components/ui/hero-cursor-context";
import { customSpring } from "@/lib/animation";
import {
  Award,
  ArrowUpRight,
  Download,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface UnifiedCertification {
  id: string;
  title: string;
  issuer: string;
  period: string;
  credentialId?: string;
  certificateNo?: string;
  credentialUrl?: string;
  downloadUrl?: string;
  description: string;
  skills: string[];
  status: "VERIFIED" | "IN_PROGRESS" | "ACTIVE";
  group: "verified" | "inProgress";
}

const ALL_CERTIFICATIONS: UnifiedCertification[] = [
  ...siteConfig.certifications.map((c) => ({
    ...c,
    group: "verified" as const,
  })),
  ...(siteConfig.inProgressCertifications || []).map((c) => ({
    ...c,
    group: "inProgress" as const,
  })),
];

const VERIFIED_ITEMS = ALL_CERTIFICATIONS.filter(
  (c) => c.group === "verified"
);
const IN_PROGRESS_ITEMS = ALL_CERTIFICATIONS.filter(
  (c) => c.group === "inProgress"
);

export function CertificationsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setHoveredElementBounds } = useHeroCursor();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  // 5 cards mapped across [0, 0.72] of the 500vh track
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const cardRange = 0.72;
    const clamped = Math.min(latest, cardRange);
    const index = Math.min(
      ALL_CERTIFICATIONS.length - 1,
      Math.floor((clamped / cardRange) * ALL_CERTIFICATIONS.length)
    );
    setActiveIndex(index);
  });

  // Section 01 exit recede into Section 02
  const recedeScale = useTransform(smoothProgress, [0.78, 0.98], [1, 0.88]);
  const recedeOpacity = useTransform(smoothProgress, [0.78, 0.95], [1, 0]);
  const recedeY = useTransform(smoothProgress, [0.78, 0.98], [0, -60]);

  // Click-to-card smooth scroll handler
  const handleScrollToCard = (cardIdx: number) => {
    if (!containerRef.current) return;
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const totalScrollable =
      containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (cardIdx / 4) * 0.65;
    const targetScrollY = containerTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const isUserInVerified = activeIndex < 2;
  const isUserInProgress = activeIndex >= 2;

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="relative h-[500vh] w-full"
    >
      <motion.div
        style={{
          scale: recedeScale,
          opacity: recedeOpacity,
          y: recedeY,
        }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 pt-20 pb-4 md:px-12 md:pt-24 md:pb-6 origin-center will-change-transform"
      >
        <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col min-h-0">
          {/* Numbered Section Header: 01/ Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={customSpring}
            className="mb-4 sm:mb-6 md:mb-8 flex flex-col gap-2 md:gap-3 shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <Award className="h-3.5 w-3.5 text-foreground" />
                <span>CREDENTIALS // INDUSTRY ATTESTATIONS</span>
              </div>
              <span className="h-px flex-1 max-w-[80px] bg-border" />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
                <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                  01/
                </span>
                Certifications
              </h2>
              <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Verified Technical Credentials &amp; Cloud Specializations
              </p>
            </div>
          </motion.div>

          {/* Dual Track Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1 items-center min-h-0">
            {/* ==============================================================
                LEFT COLUMN: PrimeReact Timeline Attestation Tracks (5/12 cols)
                ============================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 select-none">
              {isMounted ? (
                <PrimeReactProvider unstyled>
                  {/* Track A: Verified Attestations */}
                  <div
                    className={`flex flex-col transition-opacity duration-500 ${
                      isUserInVerified ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2
                        className={`h-3.5 w-3.5 transition-colors duration-300 ${
                          isUserInVerified
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                        VERIFIED ATTESTATIONS
                      </span>
                    </div>

                    <Timeline.Root align="left" className="w-full">
                      {VERIFIED_ITEMS.map((item, index) => {
                        const globalIdx = index; // 0, 1
                        const isNodeActive =
                          isUserInVerified && activeIndex === globalIdx;
                        const isNodeCompleted =
                          isUserInVerified && activeIndex > globalIdx;

                        return (
                          <Timeline.Event
                            key={item.id}
                            className="flex items-stretch gap-4"
                          >
                            <Timeline.Separator className="self-stretch flex flex-col items-center shrink-0 w-5 relative">
                              {/* Full-width marker container overriding PrimeReact baseline align */}
                              <Timeline.Marker className="z-10 mt-2.5 w-5 flex items-center justify-center shrink-0 !border-0 !p-0 !bg-transparent !shadow-none !before:hidden !after:hidden">
                                <div
                                  className={`h-4 w-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                                    isNodeActive
                                      ? "border-foreground bg-foreground scale-110 shadow-sm"
                                      : isNodeCompleted
                                      ? "border-foreground bg-foreground/70"
                                      : "border-muted-foreground/40 bg-background"
                                  }`}
                                >
                                  {isNodeActive && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                                  )}
                                </div>
                              </Timeline.Marker>

                              {/* Mathematically centered 2px connector line */}
                              {index !== VERIFIED_ITEMS.length - 1 && (
                                <Timeline.Connector className="flex-1 w-0.5 bg-border/50 relative overflow-hidden my-1.5 mx-auto">
                                  <motion.div
                                    className="absolute inset-x-0 top-0 bg-foreground origin-top"
                                    animate={{
                                      height:
                                        isUserInVerified && activeIndex === 1
                                          ? "100%"
                                          : "0%",
                                    }}
                                    transition={{
                                      duration: 0.35,
                                      ease: "easeOut",
                                    }}
                                  />
                                </Timeline.Connector>
                              )}
                            </Timeline.Separator>

                            <Timeline.Content className="flex-1 pb-4">
                              <button
                                type="button"
                                onClick={() => handleScrollToCard(globalIdx)}
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
                                    borderRadius: 12,
                                  });
                                }}
                                onMouseLeave={() => setHoveredElementBounds(null)}
                                className={`text-left transition-all duration-200 cursor-pointer block p-2 rounded-xl border border-transparent w-full ${
                                  isNodeActive
                                    ? "text-foreground font-bold bg-foreground/[0.03] border-border/40"
                                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                                }`}
                              >
                                <span className="block text-sm md:text-base font-semibold leading-snug">
                                  {item.title}
                                </span>
                                <span className="block font-mono text-[11px] text-muted-foreground mt-0.5">
                                  {item.issuer} &bull; {item.period}
                                </span>
                              </button>
                            </Timeline.Content>
                          </Timeline.Event>
                        );
                      })}
                    </Timeline.Root>
                  </div>

                  {/* Track B: Pipeline // In-Progress (`isUserInProgress`) */}
                  <div
                    className={`flex flex-col transition-opacity duration-500 ${
                      isUserInProgress ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Clock
                        className={`h-3.5 w-3.5 transition-colors duration-300 ${
                          isUserInProgress
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                        PIPELINE // IN-PROGRESS
                      </span>
                    </div>

                    <Timeline.Root align="left" className="w-full">
                      {IN_PROGRESS_ITEMS.map((item, index) => {
                        const globalIdx = 2 + index; // 2, 3, 4
                        const isNodeActive =
                          isUserInProgress && activeIndex === globalIdx;
                        const isNodeCompleted =
                          isUserInProgress && activeIndex > globalIdx;

                        return (
                          <Timeline.Event
                            key={item.id}
                            className="flex items-stretch gap-4"
                          >
                            <Timeline.Separator className="self-stretch flex flex-col items-center shrink-0 w-5 relative">
                              <Timeline.Marker className="z-10 mt-2.5 w-5 flex items-center justify-center shrink-0 !border-0 !p-0 !bg-transparent !shadow-none !before:hidden !after:hidden">
                                <div
                                  className={`h-4 w-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                                    isNodeActive
                                      ? "border-foreground bg-foreground scale-110 shadow-sm"
                                      : isNodeCompleted
                                      ? "border-foreground bg-foreground/70"
                                      : "border-muted-foreground/40 bg-background"
                                  }`}
                                >
                                  {isNodeActive && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                                  )}
                                </div>
                              </Timeline.Marker>

                              {/* Mathematically centered 2px connector line */}
                              {index !== IN_PROGRESS_ITEMS.length - 1 && (
                                <Timeline.Connector className="flex-1 w-0.5 bg-border/50 relative overflow-hidden my-1.5 mx-auto">
                                  <motion.div
                                    className="absolute inset-x-0 top-0 bg-foreground origin-top"
                                    animate={{
                                      height:
                                        isUserInProgress &&
                                        activeIndex >= globalIdx + 1
                                          ? "100%"
                                          : "0%",
                                    }}
                                    transition={{
                                      duration: 0.35,
                                      ease: "easeOut",
                                    }}
                                  />
                                </Timeline.Connector>
                              )}
                            </Timeline.Separator>

                            <Timeline.Content className="flex-1 pb-4">
                              <button
                                type="button"
                                onClick={() => handleScrollToCard(globalIdx)}
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
                                    borderRadius: 12,
                                  });
                                }}
                                onMouseLeave={() => setHoveredElementBounds(null)}
                                className={`text-left transition-all duration-200 cursor-pointer block p-2 rounded-xl border border-transparent w-full ${
                                  isNodeActive
                                    ? "text-foreground font-bold bg-foreground/[0.03] border-border/40"
                                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                                }`}
                              >
                                <span className="block text-sm md:text-base font-semibold leading-snug">
                                  {item.title}
                                </span>
                                <span className="block font-mono text-[11px] text-muted-foreground mt-0.5">
                                  {item.issuer} &bull; {item.period}
                                </span>
                              </button>
                            </Timeline.Content>
                          </Timeline.Event>
                        );
                      })}
                    </Timeline.Root>
                  </div>
                </PrimeReactProvider>
              ) : (
                <div className="space-y-8 opacity-40">
                  <div className="h-28 rounded-xl border border-border/20 animate-pulse bg-card/20" />
                  <div className="h-36 rounded-xl border border-border/20 animate-pulse bg-card/20" />
                </div>
              )}
            </div>

            {/* ==============================================================
                RIGHT COLUMN: Shuffling Card Deck with Button Absorption
                ============================================================== */}
            <div className="lg:col-span-7 relative h-[380px] sm:h-[410px] md:h-[440px] lg:h-[460px] max-h-[calc(100vh-240px)] w-full max-w-xl mx-auto lg:ml-auto lg:mr-0 flex items-center justify-center">
              {ALL_CERTIFICATIONS.map((item, idx) => {
                const isPast = idx < activeIndex;
                const isCurrent = idx === activeIndex;
                const offsetIndex = idx - activeIndex;

                const targetY = isPast ? 110 : isCurrent ? 0 : offsetIndex * 12;
                const targetScale = isPast
                  ? 0.94
                  : isCurrent
                  ? 1
                  : 1 - offsetIndex * 0.035;
                const targetOpacity = isPast
                  ? 0
                  : isCurrent
                  ? 1
                  : Math.max(0.2, 1 - offsetIndex * 0.22);
                const targetZIndex = isPast ? 0 : 20 - offsetIndex;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      y: targetY,
                      scale: targetScale,
                      opacity: targetOpacity,
                      zIndex: targetZIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0d10] text-[#f8fafc] p-6 sm:p-8 shadow-2xl backdrop-blur-md will-change-transform overflow-hidden"
                    style={{ pointerEvents: isCurrent ? "auto" : "none" }}
                  >
                    <div>
                      {/* Card Top Meta */}
                      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <ShieldCheck className="h-4 w-4 shrink-0 text-white" />
                          <span className="shrink-0 text-white font-semibold">
                            {item.id}
                          </span>
                          <span className="opacity-40 shrink-0">//</span>
                          <span
                            className="truncate text-neutral-300 font-medium"
                            title={item.issuer}
                          >
                            {item.issuer}
                          </span>
                        </div>

                        <div className="shrink-0">
                          {item.status === "VERIFIED" ? (
                            <span className="inline-flex items-center rounded border border-white/20 bg-white/[0.08] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white">
                              VERIFIED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-neutral-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
                              IN_PROGRESS
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Metadata */}
                      <div className="mt-4 sm:mt-5">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight break-words">
                          {item.title}
                        </h3>

                        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-neutral-400">
                          {item.credentialId && (
                            <div>
                              CREDENTIAL_ID:{" "}
                              <span className="text-neutral-200">
                                {item.credentialId}
                              </span>
                            </div>
                          )}
                          {item.certificateNo && (
                            <div>
                              CERTIFICATE_NO:{" "}
                              <span className="text-neutral-200">
                                {item.certificateNo}
                              </span>
                            </div>
                          )}
                          {item.period && (
                            <div>
                              DURATION:{" "}
                              <span className="text-neutral-200">
                                {item.period}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {item.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] sm:text-xs text-neutral-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons: Button-Shaped Cursor Absorption */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3.5">
                      {item.downloadUrl ? (
                        <a
                          href={item.downloadUrl}
                          download
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
                              borderRadius: 8,
                            });
                          }}
                          onMouseLeave={() => setHoveredElementBounds(null)}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white/10 hover:border-white/30"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Download PDF</span>
                        </a>
                      ) : (
                        <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                          Roadmap Attestation
                        </div>
                      )}

                      {item.credentialUrl && (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
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
                              borderRadius: 8,
                            });
                          }}
                          onMouseLeave={() => setHoveredElementBounds(null)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-300 transition-colors duration-200 hover:text-white hover:border-white/20"
                        >
                          <span>Verify Attestation</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
