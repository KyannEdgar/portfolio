"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { customSpring } from "@/lib/animation";
import { Award, ArrowUpRight, ShieldCheck } from "lucide-react";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative w-full border-t border-border px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Numbered Section Header: 01/ Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={customSpring}
          className="mb-12 flex flex-col gap-3 md:mb-16"
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
              Verified Technical Credentials &amp; Cloud Architecture Specializations
            </p>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {siteConfig.certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...customSpring, delay: idx * 0.1 }}
              className="group flex flex-col justify-between rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-foreground/30 hover:shadow-xl md:p-10"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-foreground" />
                    <span>{cert.id}</span>
                    <span className="opacity-40">//</span>
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {cert.status && (
                      <span className="rounded border border-card-border bg-card/80 px-2 py-0.5 text-[10px] font-bold text-foreground">
                        {cert.status}
                      </span>
                    )}
                    <span>{cert.period}</span>
                  </div>
                </div>

                {/* Certification Title & Credential ID */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {cert.title}
                  </h3>
                  <div className="mt-2 font-mono text-xs text-muted-foreground">
                    CREDENTIAL_ID: <span className="text-foreground/80">{cert.credentialId}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed sm:text-base">
                  {cert.description}
                </p>

                {/* Skills Badges */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-card-border bg-muted/40 px-2.5 py-1 font-mono text-xs text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Footer */}
              {cert.credentialUrl && (
                <div className="mt-8 border-t border-border pt-4">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground hover:opacity-80 transition-opacity"
                  >
                    <span>Verify Attestation</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
