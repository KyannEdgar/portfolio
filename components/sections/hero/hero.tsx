"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import {
  heroContainerVariants,
  heroItemVariants,
} from "@/lib/animation";
import { ArrowDownRight, Award, Terminal } from "lucide-react";
import { SocialIcon } from "@/components/ui/icons/social-icons";

// Dynamically import the 3D Canvas to prevent SSR WebGL canvas mismatches
const Hero3D = dynamic(
  () => import("@/components/sections/hero/hero-3d").then((mod) => mod.Hero3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-20 w-20 animate-pulse rounded-full border border-white/20" />
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section
      id="landing"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-24 pb-16 md:px-12 bg-grid-pattern"
    >
      {/* Background ambient lighting - strictly monochrome */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.03] blur-[140px]" />

      {/* Absolute 3D Architectural Canvas Layer */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[60vw] lg:w-[55vw] h-full pointer-events-none z-0 overflow-visible flex items-center justify-center"
        style={{
          WebkitMaskImage: "radial-gradient(circle at 60% 50%, black 45%, transparent 85%)",
          maskImage: "radial-gradient(circle at 60% 50%, black 45%, transparent 85%)",
        }}
      >
        <Hero3D />
      </div>

      {/* Main Content Grid Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Massive Typography & CTA Buttons (8 cols) */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center lg:col-span-8"
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
              {/* Primary CTA: Certifications */}
              <Link
                href="#certifications"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded bg-foreground px-8 py-4 font-mono text-sm font-semibold tracking-wider text-background uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <Award className="h-4 w-4" />
                <span>View Certifications</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>

              {/* Secondary CTA: Projects */}
              <Link
                href="#projects"
                className="group inline-flex items-center gap-3 rounded border border-card-border bg-card/60 px-8 py-4 font-mono text-sm font-medium tracking-wider text-foreground uppercase backdrop-blur-md transition-all duration-200 hover:border-foreground/40 hover:bg-card/90 active:scale-[0.98]"
              >
                <Terminal className="h-4 w-4 text-foreground" />
                <span>Explore Projects</span>
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

        </div>
      </div>
    </section>
  );
}
