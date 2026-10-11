"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { customSpring } from "@/lib/animation";
import { Briefcase } from "lucide-react";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full border-t border-border px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Numbered Section Header: 02/ Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={customSpring}
          className="mb-12 flex flex-col gap-3 md:mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
              <Briefcase className="h-3.5 w-3.5 text-foreground" />
              <span>CAREER // TRACK RECORD</span>
            </div>
            <span className="h-px flex-1 max-w-[80px] bg-border" />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
              <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                02/
              </span>
              Experience
            </h2>
            <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Engineering Roles &amp; Production Architecture Impact
            </p>
          </div>
        </motion.div>

        {/* Experience Timeline Cards */}
        <div className="flex flex-col gap-8">
          {siteConfig.experience.map((item, idx) => (
            <motion.div
              key={`${item.role}-${item.company}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...customSpring, delay: idx * 0.1 }}
              className="group relative rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-foreground/30 hover:shadow-xl md:p-10"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {/* Left Meta: Period, Company, Location */}
                <div className="flex flex-col gap-1.5 lg:w-1/3">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {item.period}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground/90 sm:text-2xl">
                    {item.company}
                  </h3>
                  <div className="font-mono text-xs text-muted-foreground/80">
                    {item.location}
                  </div>
                </div>

                {/* Right Content: Role, Description, Achievements, Skills */}
                <div className="flex flex-col gap-5 lg:w-2/3 border-t border-border pt-6 lg:border-t-0 lg:pt-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold uppercase tracking-tight text-foreground sm:text-xl">
                      {item.role}
                    </h4>
                    <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs uppercase text-muted-foreground">
                      <span>EXP_0{idx + 1}</span>
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.description}
                  </p>

                  {/* Key Achievements */}
                  <ul className="flex flex-col gap-2.5 pt-2">
                    {item.achievements.map((achievement, aIdx) => (
                      <li
                        key={aIdx}
                        className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-card-border bg-card/80 px-2.5 py-1 font-mono text-xs text-foreground/80 transition-colors hover:text-foreground hover:border-foreground/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
