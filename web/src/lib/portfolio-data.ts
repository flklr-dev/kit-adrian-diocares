/**
 * Single source of truth for Kit's portfolio content.
 *
 * Both the website UI (`src/app/page.tsx`) and the AI chatbot's knowledge
 * base (`src/app/api/chat/route.ts`) read from this file, so updating a
 * project, job, or skill here keeps the whole site and the chatbot in sync.
 * Add new entries here whenever new content comes in — no other file needs
 * to change for the data to show up.
 */

export const profile = {
  name: "Kit Adrian B. Diocares",
  title: "Freelance Developer — Mobile & Web",
  location: "Davao City, Philippines",
  status: "Open for work",
  email: "kitadriand@gmail.com",
  summary:
    "BSIT Graduate (Cum Laude, 2026) from Davao Oriental State University and a Freelance Developer specializing in mobile and web applications — cross-platform apps with React Native & Expo, plus scalable web platforms with Next.js & TypeScript. Currently focused on integrating AI tooling into the workflow to accelerate delivery without sacrificing quality, security, or maintainability.",
  resumeUrl: "/resume",
};

export const techStack: Record<string, string[]> = {
  frontend: ["JavaScript", "TypeScript", "React Native", "Next.js", "Tailwind CSS"],
  backend: ["Node.js", "PHP", "MongoDB", "SQL"],
  tools: ["Git", "Docker", "AWS", "Figma"],
};

export type Experience = {
  title: string;
  company: string;
  year: string;
  type: "work" | "education";
};

export const experiences: Experience[] = [
  {
    title: "Freelance Developer",
    company: "Fiverr",
    year: "2025 - 2026",
    type: "work",
  },
  {
    title: "Web Developer",
    company: "DICT-DOrSU (386-hour internship)",
    year: "2026",
    type: "work",
  },
  {
    title: "BS Information Technology",
    company: "Davao Oriental State University",
    year: "2022-2026",
    type: "education",
  },
];

export type Achievement = {
  title: string;
  issuer: string;
  year: string;
};

export const achievements: Achievement[] = [
  {
    title: "Cum Laude",
    issuer: "Davao Oriental State University",
    year: "2026",
  },
  {
    title: "ICT Diagnostic Examination (Level 1)",
    issuer: "DICT",
    year: "2025",
  },
  {
    title: "Institutional Scholar - Mangalayan & Bagani",
    issuer: "Davao Oriental State University",
    year: "2022 - 2026",
  },
];

export type SocialLink = {
  name: string;
  url: string;
};

export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/kit-adrian-diocares-349a20338/" },
  { name: "GitHub", url: "https://github.com/flklr-dev" },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  role: string;
  badge: string;
  /** Optional build status shown on cards (e.g. "In Development"). */
  status?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    title: "EVA Alert",
    description:
      "Personal safety application with live real-time tracking, check-ins, automated SOS alerts, and modular Bluetooth hardware device support.",
    tags: ["React Native", "Expo", "GPS Tracking", "BLE", "Node.js", "Express.js", "MongoDB"],
    role: "Full-Stack Developer & DevOps",
    badge: "Mobile App",
  },
  {
    title: "KAPPI",
    description:
      "Automated scanner that detects coffee leaf disease types and evaluates severity levels using tailored machine learning and computer vision.",
    tags: ["Python", "TensorFlow", "Computer Vision", "React Native", "Expo", "Node.js", "Express", "MongoDB"],
    role: "AI & ML Engineer",
    badge: "Machine Learning",
    url: "https://kappi-landing-page-2.vercel.app/",
  },
  {
    title: "ACCESSMAP PH",
    description:
      "Crowdsourced accessibility mapping platform where users report and verify wheelchair ramps, accessible restrooms, and barrier-free entrances across the Philippines.",
    tags: ["React", "Node.js", "MongoDB"],
    role: "Full-Stack Developer",
    badge: "Web Platform",
    url: "https://accessmapph.vercel.app/",
  },
  {
    title: "CodeMentor AI",
    description:
      "Gamified educational code learning platform with curated level pathways, algorithmic challenges, achievement awards, and unlockable user perks.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    role: "Full-Stack Developer",
    badge: "Web Platform",
  },
  {
    title: "Thumbnail-Lab",
    description:
      "Interactive AI thumbnail generator featuring face integration templates, layered canvas overlays, and automated custom design rendering.",
    tags: ["Next.js", "Stable Diffusion", "Canvas API", "Node.js"],
    role: "Full-Stack Developer",
    badge: "SaaS Product",
    status: "WIP",
  },
];

/** Projects shown on the home page (excludes entries only listed on /projects). */
export const homeProjects = projects.filter((p) => p.title !== "CodeMentor AI");

export type BeyondCodeItem = {
  title: string;
  description: string;
};

export const beyondCode: BeyondCodeItem[] = [
  {
    title: "Competitive Focus",
    description:
      "Dedicated esports player and tech enthusiast. I enjoy competitive matches and analyzing modern hardware, keeping my focus sharp and reflexes quick.",
  },
  {
    title: "Acoustic Flows",
    description:
      "Always listening to lofi rhythms and ambient synths while configuring code. A steady beat helps me build flow state and maintain momentum.",
  },
  {
    title: "Minimalist Mindset",
    description:
      "An avid researcher of clean layouts, structural web design, and cognitive productivity hacks to simplify workflows and design patterns.",
  },
];

/**
 * Renders all of the above into a Markdown knowledge base for the chatbot's
 * system prompt. Keeping this here (instead of duplicating facts inside
 * route.ts) means the AI's answers automatically stay accurate as this file
 * is updated.
 */
export function buildAiKnowledgeBase(): string {
  const techLines = Object.entries(techStack)
    .map(([category, items]) => `  - ${capitalize(category)}: ${items.join(", ")}.`)
    .join("\n");

  const experienceLines = experiences
    .map((exp) => `  - ${exp.title} at ${exp.company} (${exp.year}).`)
    .join("\n");

  const projectLines = projects
    .map((p) => {
      const liveUrl = p.url ? ` Live at ${p.url}.` : "";
      const statusNote = p.status
        ? ` Status: ${p.status === "WIP" ? "In Development (WIP)" : p.status}.`
        : "";
      return `  - **${p.title}** (${p.badge}, role: ${p.role}): ${p.description} Built with ${p.tags.join(", ")}.${statusNote}${liveUrl}`;
    })
    .join("\n");

  const achievementLines = achievements
    .map((a) => `${a.title} — ${a.issuer}${a.year ? ` (${a.year})` : ""}`)
    .join("; ");

  const beyondCodeLines = beyondCode.map((b) => `${b.title.toLowerCase()}`).join(", ");

  const socialLines = socialLinks.map((s) => `${s.name} (${s.url})`).join(", ");

  return `- **Summary**: ${profile.summary}
- **Current Status**: ${profile.status}.
- **Email**: ${profile.email}
- **Tech Stack**:
${techLines}
- **Experience**:
${experienceLines}
- **Recent Projects**:
${projectLines}
- **Achievements**: ${achievementLines}.
- **Life Beyond Code**: ${beyondCodeLines}.
- **Links**: ${socialLines}.`;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
