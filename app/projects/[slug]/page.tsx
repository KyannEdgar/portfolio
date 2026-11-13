import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/ui/mdx-components";
import { ArrowLeft, Cpu, Layers, Calendar, UserCheck, ShieldCheck } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <article className="min-h-screen pt-24 pb-32">
      {/* Top Breadcrumb & Return Link */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-8">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>&larr; Return to System Index</span>
        </Link>
      </div>

      {/* Hero Header Section */}
      <header className="relative mx-auto mt-6 max-w-7xl px-6 md:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 md:p-14 backdrop-blur-md">
          {/* Subtle geometric pattern in hero header */}
          <div className="pointer-events-none absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-foreground/[0.03] blur-[100px]" />
          
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-6">
            <span className="flex items-center gap-1.5 text-foreground font-bold">
              <ShieldCheck className="h-4 w-4" />
              CASE_STUDY // {frontmatter.year}
            </span>
            <span className="opacity-40">//</span>
            <span>SLUG: {frontmatter.slug}</span>
            <span className="opacity-40">//</span>
            <span>CLEARANCE: LEVEL-4</span>
          </div>

          <h1 className="mt-8 text-4xl font-black tracking-tighter text-foreground sm:text-6xl md:text-7xl uppercase leading-none">
            {frontmatter.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
            {frontmatter.description}
          </p>

          {/* Hero Header Telemetry Bar */}
          {frontmatter.architectureMetric && (
            <div className="mt-8 inline-flex items-center gap-4 rounded-lg border border-card-border bg-card/80 px-4 py-2.5 font-mono text-sm">
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs uppercase">
                <Cpu className="h-4 w-4 text-foreground" />
                {frontmatter.architectureMetricLabel || "Validated Metric"}
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="font-bold text-foreground">
                {frontmatter.architectureMetric}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Layout: Metadata Sidebar + Case Study Prose Container */}
      <main className="mx-auto mt-12 max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Metadata Sidebar (4 columns) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6 rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-6 md:p-8 backdrop-blur-md">
              <div className="border-b border-border pb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                SYSTEM METADATA // 01-04
              </div>

              {/* 01/ Role */}
              <div className="space-y-1.5">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="text-foreground/40 font-bold">01/</span>
                  <UserCheck className="h-3.5 w-3.5 opacity-60" />
                  <span>Role</span>
                </div>
                <div className="font-mono text-sm font-semibold text-foreground">
                  {frontmatter.role}
                </div>
              </div>

              {/* 02/ Stack */}
              <div className="space-y-2 border-t border-border pt-4">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="text-foreground/40 font-bold">02/</span>
                  <Layers className="h-3.5 w-3.5 opacity-60" />
                  <span>Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {frontmatter.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-card-border bg-card px-2.5 py-1 font-mono text-xs text-foreground/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 03/ Year */}
              <div className="space-y-1.5 border-t border-border pt-4">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="text-foreground/40 font-bold">03/</span>
                  <Calendar className="h-3.5 w-3.5 opacity-60" />
                  <span>Timeline</span>
                </div>
                <div className="font-mono text-sm font-semibold text-foreground">
                  {frontmatter.year} // Active Deploy
                </div>
              </div>

              {/* 04/ Taxonomy Tags */}
              <div className="space-y-2 border-t border-border pt-4">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="text-foreground/40 font-bold">04/</span>
                  <span>Domain Tags</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Case Study: Prose Container (8 columns) */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-white/10 dark:border-white/10 border-black/10 bg-card/60 p-8 md:p-12 backdrop-blur-md">
              <div className="prose prose-invert max-w-none">
                <MDXRemote source={content} components={mdxComponents} />
              </div>

              {/* Bottom Project Navigator */}
              <div className="mt-16 flex items-center justify-between border-t border-border pt-8 font-mono text-xs uppercase tracking-wider">
                <Link
                  href="/#projects"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  &larr; Back to Systems
                </Link>
                <span className="text-foreground font-bold">[VERIFIED SPECIFICATION]</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </article>
  );
}
