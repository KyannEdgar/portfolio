"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/lib/mdx";
import { customSpring } from "@/lib/animation";
import { ArrowUpRight, Cpu, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { frontmatter, slug } = project;
  const spanClass = frontmatter.gridSpan || "col-span-12 md:col-span-6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        ...customSpring,
        delay: (index % 2) * 0.1,
      }}
      className={`${spanClass} flex`}
    >
      <Link
        href={`/projects/${slug}`}
        className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 hover:scale-[1.01] hover:border-foreground/30 hover:shadow-2xl"
      >
        {/* Subtle decorative grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03] dark:to-white/[0.02]" />

        {/* Top bar: Numeric Index, Year & Role */}
        <div>
          <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-foreground font-bold">
                PRJ_0{index + 1}
              </span>
              <span className="opacity-40">//</span>
              <span>{frontmatter.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">{frontmatter.role}</span>
              <div className="flex h-7 w-7 items-center justify-center rounded border border-card-border bg-card transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4 text-foreground transition-transform duration-200 group-hover:scale-110" />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold tracking-tight text-foreground transition-opacity duration-200 group-hover:opacity-80 sm:text-3xl">
              {frontmatter.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {frontmatter.description}
            </p>
          </div>
        </div>

        {/* Bottom Section: Metric Badge & Tags */}
        <div className="mt-8 pt-6 border-t border-border">
          {frontmatter.architectureMetric && (
            <div className="mb-4 flex items-center justify-between rounded bg-muted/40 px-3.5 py-2 font-mono text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-foreground" />
                {frontmatter.architectureMetricLabel || "Key Metric"}
              </span>
              <span className="font-bold text-foreground">
                {frontmatter.architectureMetric}
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {frontmatter.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded border border-card-border bg-card/80 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                <Layers className="h-3 w-3 opacity-60" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
