"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { customSpring } from "@/lib/animation";
import { GraduationCap, Award, BookOpen } from "lucide-react";

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative w-full border-t border-border px-6 py-24 md:px-12 md:py-32 bg-grid-pattern"
    >
      <div className="mx-auto max-w-7xl">
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

        {/* Education & Credentials Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {siteConfig.education.map((item, idx) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...customSpring, delay: idx * 0.15 }}
              className="group flex flex-col justify-between rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-foreground/30 hover:shadow-xl md:p-10"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {idx === 0 ? (
                      <BookOpen className="h-4 w-4 text-foreground" />
                    ) : (
                      <Award className="h-4 w-4 text-foreground" />
                    )}
                    <span>EDU_0{idx + 1}</span>
                  </div>
                  <span>{item.period}</span>
                </div>

                {/* Degree & Institution */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {item.degree}
                  </h3>
                  <div className="mt-2 font-mono text-sm text-foreground/80">
                    {item.institution}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground mt-0.5">
                    {item.location}
                  </div>
                  {item.honors && (
                    <div className="mt-3 inline-block rounded border border-card-border bg-card/80 px-2.5 py-1 font-mono text-xs font-semibold text-foreground">
                      {item.honors}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.description}
                </p>
              </div>

              {/* Focus Areas / Certifications */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  {idx === 0 ? "Core Focus Areas" : "Verified Accreditations"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded border border-card-border bg-card/80 px-2.5 py-1 font-mono text-xs text-foreground/80"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
