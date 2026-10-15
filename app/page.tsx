import { Hero } from "@/components/sections/hero/hero";
import { Marquee } from "@/components/sections/marquee/marquee";
import { AboutStatement } from "@/components/sections/about/about-statement";
import { CertificationsSection } from "@/components/sections/certifications/certifications";
import { SkillsSection } from "@/components/sections/skills/skills";
import { ProjectsSection } from "@/components/sections/projects/projects";
import { ExperienceSection } from "@/components/sections/experience/experience";
import { EducationSection } from "@/components/sections/education/education";
import { SocialsSection } from "@/components/sections/socials/socials";
import { getAllProjects } from "@/lib/mdx";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Landing Area */}
      <Hero />

      {/* Kinetic Marquee Section Bridge (High-contrast kinetic transition before About) */}
      <div className="relative z-20 bg-background border-y border-black/10 dark:border-white/10">
        <Marquee />
      </div>

      {/* Kinetic Typography Statement (Pinned Layer at z-10) */}
      <div className="relative z-10">
        <AboutStatement />
      </div>

      {/* Layered Parallax Curtain Container (Slides up and over About during final 100vh) */}
      <div className="relative z-20 bg-background -mt-[100vh] shadow-[0_-25px_60px_rgba(0,0,0,0.07)] dark:shadow-[0_-35px_70px_rgba(0,0,0,0.95)]">
        {/* Specular Horizon Line (Top Highlight) */}
        <div className="h-px w-full bg-gradient-to-r from-black/5 via-black/40 to-black/5 dark:from-white/5 dark:via-white/60 dark:to-white/5" />

        {/* Micro-Hatched Bezel Strip with Grid Rail Anchors */}
        <div className="h-6 w-full border-b border-black/10 dark:border-white/10 bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(0,0,0,0.04)_6px,rgba(0,0,0,0.04)_7px)] dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(255,255,255,0.04)_6px,rgba(255,255,255,0.04)_7px)]">
          <div className="max-w-7xl mx-auto h-full px-6 border-x border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="w-1.5 h-1.5 bg-black/30 dark:bg-white/30" />
            <div className="w-10 h-[2px] bg-black/20 dark:bg-white/20" />
            <div className="w-1.5 h-1.5 bg-black/30 dark:bg-white/30" />
          </div>
        </div>

        {/* 01/ Certifications */}
        <CertificationsSection />

        {/* 02/ Skills */}
        <SkillsSection />

        {/* 03/ Projects */}
        <ProjectsSection projects={projects} />

        {/* 04/ Experience */}
        <ExperienceSection />

        {/* 05/ Education */}
        <EducationSection />

        {/* 06/ Socials */}
        <SocialsSection />
      </div>
    </div>
  );
}
