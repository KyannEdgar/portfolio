"use client";

import * as React from "react";
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
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

export function CertificationsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setHoveredElementBounds } = useHeroCursor();

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
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 pt-20 pb-8 md:px-12 md:pt-24 md:pb-12 origin-center will-change-transform"
      >
        <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col justify-between">
          {/* Numbered Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={customSpring}
            className="mb-4 sm:mb-6 flex flex-col gap-2 shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <Award className="h-3.5 w-3.5 text-foreground" />
                <span>CREDENTIALS // INDUSTRY ATTESTATIONS</span>
              </div>
              <span className="h-px flex-1 max-w-[80px] bg-border" />
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-3xl font-extrabold tracking-tighter text-foreground sm:text-4xl md:text-5xl uppercase leading-none">
                <span className="text-foreground/40 font-mono text-2xl sm:text-3xl md:text-4xl mr-3 font-normal">
                  01/
                </span>
                Certifications
              </h2>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Verified Technical Credentials &amp; Cloud Specializations
              </p>
            </div>
          </motion.div>

          {/* Dual Track Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1 items-center min-h-0">
            {/* ==============================================================
                LEFT COLUMN: High-Fidelity Attestation Timeline (5/12 cols)
                ============================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 select-none">
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

                <div className="flex flex-col">
                  {/* Node 0: Google Cybersecurity */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center shrink-0 w-5">
                      {/* Concentric Node Ring */}
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-10 ${
                          isUserInVerified && activeIndex === 0
                            ? "border-foreground bg-foreground scale-110 shadow-sm"
                            : isUserInVerified && activeIndex > 0
                            ? "border-foreground bg-foreground/70"
                            : "border-muted-foreground/40 bg-background"
                        }`}
                      >
                        {isUserInVerified && activeIndex === 0 && (
                          <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                        )}
                      </div>

                      {/* Discrete Connector Line (Node 0 -> Node 1) */}
                      <div className="w-[1.5px] h-10 sm:h-12 bg-border/50 relative overflow-hidden my-0.5">
                        <motion.div
                          className="absolute inset-x-0 top-0 bg-foreground origin-top"
                          animate={{
                            height:
                              isUserInVerified && activeIndex === 1
                                ? "100%"
                                : "0%",
                          }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Telemetry Card with Full Bubble Enclosure */}
                    <button
                      onClick={() => handleScrollToCard(0)}
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
                      className={`text-left transition-all duration-200 cursor-pointer block -mt-1 p-2 rounded-xl border border-transparent ${
                        isUserInVerified && activeIndex === 0
                          ? "text-foreground font-bold bg-foreground/[0.03] border-border/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                      }`}
                    >
                      <div className="text-sm md:text-base font-semibold leading-snug">
                        {ALL_CERTIFICATIONS[0].title}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                        {ALL_CERTIFICATIONS[0].issuer} &bull;{" "}
                        {ALL_CERTIFICATIONS[0].period}
                      </div>
                    </button>
                  </div>

                  {/* Node 1: TESDA NCII (Terminal node: NO line below Node 1) */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center shrink-0 w-5">
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-10 ${
                          isUserInVerified && activeIndex === 1
                            ? "border-foreground bg-foreground scale-110 shadow-sm"
                            : "border-muted-foreground/40 bg-background"
                        }`}
                      >
                        {isUserInVerified && activeIndex === 1 && (
                          <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Telemetry Card with Full Bubble Enclosure */}
                    <button
                      onClick={() => handleScrollToCard(1)}
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
                      className={`text-left transition-all duration-200 cursor-pointer block -mt-1 p-2 rounded-xl border border-transparent ${
                        isUserInVerified && activeIndex === 1
                          ? "text-foreground font-bold bg-foreground/[0.03] border-border/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                      }`}
                    >
                      <div className="text-sm md:text-base font-semibold leading-snug">
                        {ALL_CERTIFICATIONS[1].title}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                        {ALL_CERTIFICATIONS[1].issuer} &bull;{" "}
                        {ALL_CERTIFICATIONS[1].period}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Track B: In-Progress Roadmap (Decoupled from Track A) */}
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

                <div className="flex flex-col">
                  {/* Node 2: CCNA */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center shrink-0 w-5">
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-10 ${
                          isUserInProgress && activeIndex === 2
                            ? "border-foreground bg-foreground scale-110 shadow-sm"
                            : isUserInProgress && activeIndex > 2
                            ? "border-foreground bg-foreground/70"
                            : "border-muted-foreground/40 bg-background"
                        }`}
                      >
                        {isUserInProgress && activeIndex === 2 && (
                          <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                        )}
                      </div>

                      <div className="w-[1.5px] h-10 sm:h-12 bg-border/50 relative overflow-hidden my-0.5">
                        <motion.div
                          className="absolute inset-x-0 top-0 bg-foreground origin-top"
                          animate={{
                            height:
                              isUserInProgress && activeIndex >= 3
                                ? "100%"
                                : "0%",
                          }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleScrollToCard(2)}
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
                      className={`text-left transition-all duration-200 cursor-pointer block -mt-1 p-2 rounded-xl border border-transparent ${
                        isUserInProgress && activeIndex === 2
                          ? "text-foreground font-bold bg-foreground/[0.03] border-border/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                      }`}
                    >
                      <div className="text-sm md:text-base font-semibold leading-snug">
                        {ALL_CERTIFICATIONS[2].title}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                        {ALL_CERTIFICATIONS[2].issuer} &bull;{" "}
                        {ALL_CERTIFICATIONS[2].period}
                      </div>
                    </button>
                  </div>

                  {/* Node 3: AWS CCP */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center shrink-0 w-5">
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-10 ${
                          isUserInProgress && activeIndex === 3
                            ? "border-foreground bg-foreground scale-110 shadow-sm"
                            : isUserInProgress && activeIndex > 3
                            ? "border-foreground bg-foreground/70"
                            : "border-muted-foreground/40 bg-background"
                        }`}
                      >
                        {isUserInProgress && activeIndex === 3 && (
                          <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                        )}
                      </div>

                      <div className="w-[1.5px] h-10 sm:h-12 bg-border/50 relative overflow-hidden my-0.5">
                        <motion.div
                          className="absolute inset-x-0 top-0 bg-foreground origin-top"
                          animate={{
                            height:
                              isUserInProgress && activeIndex >= 4
                                ? "100%"
                                : "0%",
                          }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleScrollToCard(3)}
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
                      className={`text-left transition-all duration-200 cursor-pointer block -mt-1 p-2 rounded-xl border border-transparent ${
                        isUserInProgress && activeIndex === 3
                          ? "text-foreground font-bold bg-foreground/[0.03] border-border/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                      }`}
                    >
                      <div className="text-sm md:text-base font-semibold leading-snug">
                        {ALL_CERTIFICATIONS[3].title}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                        {ALL_CERTIFICATIONS[3].issuer} &bull;{" "}
                        {ALL_CERTIFICATIONS[3].period}
                      </div>
                    </button>
                  </div>

                  {/* Node 4: AWS SAA (Terminal node: NO line below Node 4) */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center shrink-0 w-5">
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-10 ${
                          isUserInProgress && activeIndex === 4
                            ? "border-foreground bg-foreground scale-110 shadow-sm"
                            : "border-muted-foreground/40 bg-background"
                        }`}
                      >
                        {isUserInProgress && activeIndex === 4 && (
                          <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleScrollToCard(4)}
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
                      className={`text-left transition-all duration-200 cursor-pointer block -mt-1 p-2 rounded-xl border border-transparent ${
                        isUserInProgress && activeIndex === 4
                          ? "text-foreground font-bold bg-foreground/[0.03] border-border/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                      }`}
                    >
                      <div className="text-sm md:text-base font-semibold leading-snug">
                        {ALL_CERTIFICATIONS[4].title}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                        {ALL_CERTIFICATIONS[4].issuer} &bull;{" "}
                        {ALL_CERTIFICATIONS[4].period}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ==============================================================
                RIGHT COLUMN: Shuffling Card Deck with Button Absorption
                ============================================================== */}
            <div className="lg:col-span-7 relative h-[440px] sm:h-[460px] md:h-[480px] w-full max-w-xl mx-auto flex items-center justify-center">
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
