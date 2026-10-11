"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { customSpring } from "@/lib/animation";
import { Activity, Radio, Cpu, Network, Database, ShieldAlert } from "lucide-react";

export function TelemetrySection() {
  return (
    <section id="infrastructure" className="relative w-full border-t border-border px-6 py-24 md:px-12 md:py-32 bg-grid-pattern">
      <div className="mx-auto max-w-7xl">
        {/* Numbered Section Header: 02/ Infrastructure */}
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
              <Activity className="h-3.5 w-3.5 text-foreground" />
              <span>SYSTEM PERFORMANCE // CORE METRICS</span>
            </div>
            <span className="h-px flex-1 max-w-[80px] bg-border" />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl uppercase leading-none">
              <span className="text-foreground/40 font-mono text-3xl sm:text-4xl md:text-5xl mr-3 font-normal">
                02/
              </span>
              Infrastructure &amp; Metrics
            </h2>
            <p className="max-w-md font-mono text-xs text-muted-foreground uppercase tracking-wider">
              [MEASURED ARCHITECTURE BENCHMARKS]
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...customSpring, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col justify-between rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-xs text-muted-foreground">
                <span className="uppercase tracking-widest">METRIC_0{idx + 1}</span>
                <Radio className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="my-6">
                <div className="text-4xl font-black tracking-tight text-foreground font-mono">
                  {metric.value}
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground/80 border-t border-border pt-3">
                {metric.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Architecture Core (03/ Architecture) */}
        <div id="architecture" className="mt-24 pt-16 border-t border-border">
          <div className="mb-12 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded border border-card-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <Cpu className="h-3.5 w-3.5 text-foreground" />
                <span>CORE_CAPABILITIES // DOMAIN SPECIALIZATION</span>
              </div>
              <span className="h-px flex-1 max-w-[80px] bg-border" />
            </div>

            <h3 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl uppercase leading-none">
              <span className="text-foreground/40 font-mono text-3xl sm:text-4xl mr-3 font-normal">
                03/
              </span>
              Architecture &amp; Core Competencies
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4 text-foreground">
                <Network className="h-6 w-6" />
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  L3/L4 &amp; eBPF Kernel Mesh
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                WireGuard point-to-point tunnels, Cilium eBPF host routing, dynamic BGP peering with FRRouting, and custom XDP packet filtering for zero packet loss.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4 text-foreground">
                <ShieldAlert className="h-6 w-6" />
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  Zero-Trust &amp; Cryptography
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hardware-attested SPIFFE/SPIRE workload identities, mTLS service mesh, post-quantum ML-KEM/ML-DSA primitives, and Tetragon syscall auditing.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4 text-foreground">
                <Database className="h-6 w-6" />
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  Multi-Cloud &amp; Autonomous IaC
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Continuous Terraform state graph auditing, n8n-orchestrated drift rollback workflows, ARM64/x86 heterogenous compute clusters, and FinOps optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
