"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { customSpring } from "@/lib/animation";
import { Award, ArrowUpRight, ShieldCheck, Download, Clock } from "lucide-react";

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

        {/* Primary Verified Certifications Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {siteConfig.certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...customSpring, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group flex flex-col justify-between rounded-xl border border-white/10 bg-[#0c0d10] text-[#f8fafc] p-8 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-white/30 hover:shadow-2xl md:p-10"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
                  <div className="flex items-center gap-2 min-w-0 pr-4">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-white" />
                    <span className="shrink-0">{cert.id}</span>
                    <span className="opacity-40 shrink-0">//</span>
                    <span className="truncate">{cert.issuer}</span>
                  </div>
                  {cert.status && (
                    <span className="shrink-0 rounded border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-white">
                      {cert.status}
                    </span>
                  )}
                </div>

                {/* Certification Title & Credential ID / Certificate No / Duration */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {cert.title}
                  </h3>
                  <div className="mt-2.5 flex flex-col gap-1 font-mono text-xs text-neutral-400">
                    {cert.credentialId && (
                      <div>
                        CREDENTIAL_ID: <span className="text-neutral-200">{cert.credentialId}</span>
                      </div>
                    )}
                    {cert.certificateNo && (
                      <div>
                        CERTIFICATE_NO: <span className="text-neutral-200">{cert.certificateNo}</span>
                      </div>
                    )}
                    {cert.period && (
                      <div>
                        DURATION: <span className="text-neutral-200">{cert.period}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-sm text-neutral-300 leading-relaxed sm:text-base">
                  {cert.description}
                </p>

                {/* Skills Badges */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-neutral-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Footer: PDF Download & Conditional Attestation Verification */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                {/* PDF Download Button */}
                {cert.downloadUrl && (
                  <a
                    href={cert.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white/10 hover:border-white/30"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}

                {/* Conditional External Verification Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-300 transition-colors duration-200 hover:text-white"
                  >
                    <span>Verify Attestation</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* In-Progress Pipeline Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground backdrop-blur-md">
              <Clock className="h-3.5 w-3.5 text-foreground" />
              <span>PIPELINE // IN-PROGRESS</span>
            </div>
            <span className="h-px flex-1 max-w-[80px] bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {siteConfig.inProgressCertifications?.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...customSpring, delay: idx * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0c0d10] p-6 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-white/25 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-neutral-400">
                    <span>{item.issuer}</span>
                    <div className="inline-flex items-center gap-1.5 rounded border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-neutral-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <h4 className="mt-4 text-lg font-bold tracking-tight text-white">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
