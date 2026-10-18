import { Hero } from "@/components/sections/hero/hero";
import { Marquee } from "@/components/sections/marquee/marquee";
import { AboutStatement } from "@/components/sections/about/about-statement";
import { CertificationsSection } from "@/components/sections/certifications/certifications";
import { SkillsSection } from "@/components/sections/skills/skills";
import { ProjectsSection } from "@/components/sections/projects/projects";
import { ExperienceSection } from "@/components/sections/experience/experience";
import { EducationSection } from "@/components/sections/education/education";
import { SectionCurtainDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Landing Area */}
      <Hero />

      {/* Kinetic Marquee Section Bridge */}
      <div className="relative z-20 bg-background border-y border-black/10 dark:border-white/10">
        <Marquee />
      </div>

      {/* Kinetic Typography Statement (Pinned Layer at z-10) */}
      <div className="relative z-10">
        <AboutStatement />
      </div>

      {/* =========================================================================
          SECTION 01: CERTIFICATIONS (Curtain Layer over About)
          ========================================================================= */}
      <div className="relative z-20 bg-background -mt-[100vh] shadow-[0_-25px_60px_rgba(0,0,0,0.07)] dark:shadow-[0_-35px_70px_rgba(0,0,0,0.95)]">
        <SectionCurtainDivider />
        <CertificationsSection />
      </div>

      {/* =========================================================================
          SECTION 02: SKILLS (Cascading Parallax Curtain Layer over Section 01)
          ========================================================================= */}
      <div className="relative z-[21] bg-background -mt-[100vh] shadow-[0_-30px_70px_rgba(0,0,0,0.12)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.95)]">
        <SectionCurtainDivider />
        <SkillsSection />
      </div>

      {/* =========================================================================
          SECTION 03: PROJECTS (Cascading Parallax Curtain Layer over Section 02)
          ========================================================================= */}
      <div className="relative z-[22] bg-background -mt-[100vh] shadow-[0_-30px_70px_rgba(0,0,0,0.12)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.95)]">
        <SectionCurtainDivider />
        <ProjectsSection />
      </div>

      {/* =========================================================================
          SECTION 04: EXPERIENCE (Cascading Parallax Curtain Layer over Section 03)
          ========================================================================= */}
      <div className="relative z-[23] bg-background -mt-[100vh] shadow-[0_-30px_70px_rgba(0,0,0,0.12)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.95)]">
        <SectionCurtainDivider />
        <ExperienceSection />
      </div>

      {/* =========================================================================
          SECTION 05: EDUCATION (Cascading Parallax Curtain Layer over Section 04)
          ========================================================================= */}
      <div className="relative z-[24] bg-background -mt-[100vh] shadow-[0_-30px_70px_rgba(0,0,0,0.12)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.95)]">
        <SectionCurtainDivider />
        <EducationSection />
      </div>
    </div>
  );
}
