import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content", "projects");

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  role: string;
  stack: string[];
  year: string;
  heroImage?: string;
  featured?: boolean;
  gridSpan?: typeof VALID_GRID_SPANS[number];
  architectureMetric?: string;
  architectureMetricLabel?: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    return [];
  }
  const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
  return fileNames
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

const VALID_GRID_SPANS = [
  "col-span-12 md:col-span-8",
  "col-span-12 md:col-span-4",
  "col-span-12 md:col-span-6",
  "col-span-12",
] as const;

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPathMdx = path.join(PROJECTS_DIRECTORY, `${slug}.mdx`);
    const fullPathMd = path.join(PROJECTS_DIRECTORY, `${slug}.md`);

    const filePath = fs.existsSync(fullPathMdx)
      ? fullPathMdx
      : fs.existsSync(fullPathMd)
      ? fullPathMd
      : null;

    if (!filePath) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter: ProjectFrontmatter = {
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "2026-01-01",
      slug: data.slug || slug,
      tags: Array.isArray(data.tags) ? data.tags : [],
      role: data.role || "Lead Architect",
      stack: Array.isArray(data.stack) ? data.stack : [],
      year: data.year ? String(data.year) : "2026",
      heroImage: data.heroImage || "",
      featured: Boolean(data.featured),
      gridSpan: VALID_GRID_SPANS.includes(data.gridSpan as typeof VALID_GRID_SPANS[number])
        ? (data.gridSpan as typeof VALID_GRID_SPANS[number])
        : "col-span-12 md:col-span-6",
      architectureMetric: data.architectureMetric || "",
      architectureMetricLabel: data.architectureMetricLabel || "",
    };

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (err) {
    console.error(`Error loading project MDX for slug "${slug}":`, err);
    return null;
  }
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });

  return projects;
}
