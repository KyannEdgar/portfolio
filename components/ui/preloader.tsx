"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_DURATION_MS = 3600; // 3.6 seconds smooth progress
const HOLD_AT_100_MS = 250;     // 250ms hold at 100%

const PHASES = [
  { threshold: 0, text: "INITIALIZING CORE RUNTIMES" },
  { threshold: 30, text: "SYNCHRONIZING TOPOLOGY & PROTOCOLS" },
  { threshold: 65, text: "MOUNTING INTERFACE MESH" },
  { threshold: 92, text: "SYSTEM ARCHITECTURE READY" },
];

// Smooth cubic easing for silky progress
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isContentDissolving, setIsContentDissolving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState(PHASES[0].text);
  const [mounted, setMounted] = useState(false);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Trigger smooth curtain exit
  const triggerExit = useCallback(() => {
    setIsContentDissolving(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 280);
  }, []);

  // Final cleanup once curtain exit animation completes
  const handleExitComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolio_intro_seen", "true");
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    // If already seen in this session, dismiss immediately
    const hasSeen = sessionStorage.getItem("portfolio_intro_seen");
    if (hasSeen === "true") {
      setIsVisible(false);
      return;
    }

    // Lock body scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Continuous requestAnimationFrame counter over 3.6 seconds
    const animateLoop = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawFraction = Math.min(elapsed / TOTAL_DURATION_MS, 1);
      const easedFraction = easeInOutCubic(rawFraction);
      const currentPercent = Math.min(Math.floor(easedFraction * 100), 100);

      setProgress(currentPercent);

      const activePhase = [...PHASES]
        .reverse()
        .find((p) => currentPercent >= p.threshold);
      if (activePhase) {
        setPhaseText(activePhase.text);
      }

      if (rawFraction < 1) {
        animFrameRef.current = requestAnimationFrame(animateLoop);
      } else {
        setProgress(100);
        setTimeout(() => {
          triggerExit();
        }, HOLD_AT_100_MS);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateLoop);

    // Skip handler (click, Space, Esc, Enter)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        setProgress(100);
        triggerExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [triggerExit]);

  // CRITICAL FIX: Only check mounted! Never return null on !isVisible, or AnimatePresence cannot animate!
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.15,
              ease: [0.76, 0, 0.24, 1], // Cinematic acceleration & smooth deceleration
            },
          }}
          onClick={() => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            setProgress(100);
            triggerExit();
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#050507] text-white p-6 sm:p-10 md:p-14 select-none cursor-pointer overflow-hidden will-change-transform"
          title="Click to skip"
        >
          {/* =========================================================================
              INNER CONTENT (Gracefully dissolves upward before curtain pulls up)
              ========================================================================= */}
          <motion.div
            animate={{
              opacity: isContentDissolving ? 0 : 1,
              y: isContentDissolving ? -20 : 0,
              filter: isContentDissolving ? "blur(4px)" : "blur(0px)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col justify-between h-full w-full"
          >
            {/* Top Meta Line: Monogram & Location */}
            <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs tracking-widest text-neutral-400 uppercase">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-wider">KA</span>
                <span className="opacity-40">/</span>
                <span>01</span>
                <span className="opacity-40">//</span>
                <span className="text-neutral-300">BOOT SEQUENCE</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-neutral-400">
                <span>MANILA, PH</span>
                <span className="opacity-40">//</span>
                <span>UTC+08:00</span>
              </div>
            </div>

            {/* Centerpiece: Engineering Title, Specular Progress Rail & Counter */}
            <div className="mx-auto w-full max-w-xl flex flex-col items-center text-center">
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white font-sans uppercase">
                  Kian Edgar Abustan
                </h1>
                <p className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400">
                  Cloud Systems &amp; Network Infrastructure
                </p>
              </div>

              {/* Progress Rail Track */}
              <div className="mt-8 sm:mt-10 w-full max-w-md">
                <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
                  <div
                    className="h-full bg-white transition-[width] duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Counter & Status Display */}
                <div className="mt-4 flex items-center justify-between font-mono text-xs sm:text-sm">
                  <span className="text-neutral-400 tracking-wider text-[11px] uppercase">
                    {phaseText}
                  </span>
                  <span className="font-semibold text-white tabular-nums tracking-tight">
                    [ {String(progress).padStart(3, "0")}% ]
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Skip Instruction & Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-neutral-500">
              <span>[ CLICK ANYWHERE OR PRESS ESC TO SKIP ]</span>
              <span>&copy; {new Date().getFullYear()} KIAN ABUSTAN</span>
            </div>
          </motion.div>

          {/* =========================================================================
              LUMINOUS HORIZON BLADE (Razor-sharp white line cutting into the Hero)
              ========================================================================= */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_24px_rgba(255,255,255,0.8)]"
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
