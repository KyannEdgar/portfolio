import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { BentoGrid } from "@/components/bento-grid";
import { ExperienceSection } from "@/components/experience";
import { EducationSection } from "@/components/education";
import { CertificationsSection } from "@/components/certifications";
import { SocialsSection } from "@/components/socials";
import { getAllProjects } from "@/lib/mdx";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Landing Area */}
      <Hero />

      {/* Infinite Horizontal Marquee */}
      <Marquee />

      {/* 01/ Projects */}
      <BentoGrid projects={projects} />

      {/* 02/ Experience */}
      <ExperienceSection />

      {/* 03/ Education */}
      <EducationSection />

      {/* 04/ Certifications */}
      <CertificationsSection />

      {/* 05/ Socials */}
      <SocialsSection />
    </div>
  );
}
