"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import {
  customSpring,
  heroContainerVariants,
  heroItemVariants,
} from "@/lib/animation";
import { ArrowDownRight, Cpu } from "lucide-react";
import { SocialIcon } from "@/components/social-icons";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-24 pb-16 md:px-12 bg-grid-pattern">
      {/* Background ambient lighting - strictly monochrome */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.03] blur-[140px]" />

      {/* Main 2-Column Grid Container */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Massive Typography & CTA Buttons (7 cols) */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center lg:col-span-7"
          >
            {/* Tag / Category Indicator */}
            <motion.div
              variants={heroItemVariants}
              className="mb-6 flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                SYSTEM ARCHITECTURE &amp; SECURITY
              </span>
              <span className="h-px flex-1 max-w-[80px] bg-border" />
            </motion.div>

            {/* Massive Display Heading */}
            <motion.h1
              variants={heroItemVariants}
              className="text-5xl font-black tracking-tighter leading-none text-foreground sm:text-6xl md:text-7xl lg:text-8xl uppercase"
            >
              Infrastructure &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-muted-foreground inline-block pb-2">
                Cloud Engineering
              </span>
            </motion.h1>

            {/* Subtitle / Bio */}
            <motion.p
              variants={heroItemVariants}
              className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg font-normal leading-relaxed"
            >
              {siteConfig.description} Designing resilient multi-region architectures, line-rate WireGuard mesh networks, and post-quantum cryptographic primitives.
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              variants={heroItemVariants}
              className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* Primary CTA (Solid) */}
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded bg-foreground px-8 py-4 font-mono text-sm font-semibold tracking-wider text-background uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>

              {/* Secondary CTA (Outlined with blur effect) */}
              <Link
                href="#architecture"
                className="group inline-flex items-center gap-3 rounded border border-card-border bg-card/60 px-8 py-4 font-mono text-sm font-medium tracking-wider text-foreground uppercase backdrop-blur-md transition-all duration-200 hover:border-foreground/40 hover:bg-card/90 active:scale-[0.98]"
              >
                <Cpu className="h-4 w-4 text-foreground" />
                <span>System Specs</span>
              </Link>
            </motion.div>

            {/* Minimalist Social Links directly below CTA buttons */}
            <motion.div
              variants={heroItemVariants}
              className="mt-8 flex items-center gap-3 sm:gap-4"
            >
              {siteConfig.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  title={`${social.platform}: ${social.handle}`}
                  className="group flex h-9 w-9 items-center justify-center rounded-md border border-card-border bg-card/60 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-foreground/40 hover:bg-card/90 hover:text-foreground active:scale-95"
                >
                  <SocialIcon
                    platform={social.platform}
                    className="h-4 w-4 transition-transform group-hover:scale-110"
                  />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Large Grayscale Circular Portrait Placeholder (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...customSpring, delay: 0.2 }}
            className="flex items-center justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative flex items-center justify-center">
              {/* Subtle ambient back-glow ring - strictly monochrome */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-white/10 via-white/[0.02] to-transparent blur-2xl" />

              {/* Large Grayscale Circular Image Container */}
              <div className="group relative flex h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[420px] lg:w-[420px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-b from-neutral-800/80 via-neutral-900/90 to-neutral-950 p-3 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:scale-[1.01] dark:border-white/15 border-black/10">
                {/* Inner circular wrapper with grayscale styling */}
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-900 filter grayscale contrast-125">
                  {/* Abstract Portrait Graphic / Silhouette Placeholder */}
                  <svg
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  >
                    <defs>
                      <linearGradient id="portraitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4d4d8" />
                        <stop offset="40%" stopColor="#71717a" />
                        <stop offset="100%" stopColor="#18181b" />
                      </linearGradient>
                      <radialGradient id="headlight" cx="50%" cy="35%" r="40%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Background subtle radial texture */}
                    <rect width="400" height="400" fill="#121215" />
                    <circle cx="200" cy="160" r="140" fill="url(#headlight)" />

                    {/* Head / Face Silhouette */}
                    <ellipse cx="200" cy="155" rx="68" ry="85" fill="url(#portraitGrad)" />

                    {/* Jaw & Cheeks Contour */}
                    <path
                      d="M 145 160 Q 200 255 255 160 Z"
                      fill="#27272a"
                      opacity="0.8"
                    />

                    {/* Shoulders & Torso */}
                    <path
                      d="M 80 400 C 90 280, 140 250, 200 250 C 260 250, 310 280, 320 400 Z"
                      fill="url(#portraitGrad)"
                    />

                    {/* Technical collar contour */}
                    <path
                      d="M 160 260 L 200 300 L 240 260"
                      stroke="#3f3f46"
                      strokeWidth="3"
                      fill="none"
                    />

                    {/* Stylized lighting highlights */}
                    <ellipse cx="200" cy="140" rx="42" ry="50" fill="#ffffff" opacity="0.08" />
                  </svg>

                  {/* Minimal Portrait Overlay Tag */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-4 py-1 font-mono text-[11px] uppercase tracking-widest text-white/80 backdrop-blur-md">
                    PORTRAIT // ARCHITECT
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
