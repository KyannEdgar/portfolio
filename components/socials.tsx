"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { customSpring } from "@/lib/animation";
import { SocialIcon } from "@/components/social-icons";
import { ArrowUpRight, Share2, Mail } from "lucide-react";

export function SocialsSection() {
  return (
    <section
      id="socials"
      className="relative w-full border-t border-border px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Numbered Section Header: 05/ Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={customSpring}
          className="mb-16 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
              <Share2 className="h-3.5 w-3.5 text-foreground" />
              <span>NETWORK // DIRECT COMMS</span>
            </div>
            <span className="h-px flex-1 max-w-[80px] bg-border" />
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
                <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                  05/
                </span>
                Socials &amp; Connect
              </h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
                Connect across public technical repositories, professional networks, and direct comms channels.
              </p>
            </div>

            <a
              href="mailto:contact@kian.infra"
              className="group inline-flex items-center gap-3 rounded bg-foreground px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-background transition-opacity duration-200 hover:opacity-90 active:scale-95"
            >
              <Mail className="h-4 w-4" />
              <span>Transmit Message</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* 5-Column Grid of Social Links */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-border pt-12">
          {siteConfig.socials.map((social, idx) => (
            <motion.a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...customSpring, delay: idx * 0.06 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group flex flex-col justify-between rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-6 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-foreground/30 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-card-border bg-card/80 text-foreground transition-transform group-hover:scale-110">
                    <SocialIcon platform={social.platform} className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>

                <div className="mt-6">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {social.platform}
                  </div>
                  <div className="mt-1 font-mono text-base font-bold text-foreground">
                    {social.handle}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-3 text-xs text-muted-foreground">
                {social.label}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
