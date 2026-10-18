"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { customSpring } from "@/lib/animation";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative w-full h-screen px-6 py-24 md:px-12 md:py-32 flex flex-col justify-start"
    >
      <div className="mx-auto max-w-7xl w-full">
        {/* Numbered Section Header: 05/ Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={customSpring}
          className="mb-12 flex flex-col gap-3 md:mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
              <GraduationCap className="h-3.5 w-3.5 text-foreground" />
              <span>FOUNDATIONS // ATTESTATIONS</span>
            </div>
            <span className="h-px flex-1 max-w-[80px] bg-border" />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
              <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                05/
              </span>
              Education
            </h2>
            <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Academic Foundations &amp; Theoretical Computer Science
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
