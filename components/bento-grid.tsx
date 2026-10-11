"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/mdx";
import { ProjectCard } from "./project-card";
import { Terminal } from "lucide-react";
import { customSpring } from "@/lib/animation";

interface BentoGridProps {
  projects: Project[];
}

export function BentoGrid({ projects }: BentoGridProps) {
  return (
    <section id="projects" className="relative w-full px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Numbered Section Header: 01/ Engineering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={customSpring}
          className="mb-12 flex flex-col gap-3 md:mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
              <Terminal className="h-3.5 w-3.5 text-foreground" />
              <span>INDEX // PRODUCTION SYSTEMS</span>
            </div>
            <span className="h-px flex-1 max-w-[80px] bg-border" />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
              <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                01/
              </span>
              Engineering Case Studies
            </h2>
            <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
              High-Availability Cluster Architectures &amp; Distributed Systems
            </p>
          </div>
        </motion.div>

        {/* 12-Column Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
