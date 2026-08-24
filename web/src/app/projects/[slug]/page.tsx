import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
  AlertTriangle,
  Code2,
  ChevronRight,
  FolderGit2,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects, getProjectBySlug } from "@/lib/portfolio-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Kit Adrian B. Diocares",
    };
  }

  return {
    title: `${project.title} — ${project.badge} | Kit Adrian B. Diocares`,
    description: project.tagline || project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans pb-24">
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b-4 border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="border-2 border-border shadow-neo-sm font-black text-xs uppercase bg-card text-foreground">
              <Link href="/projects">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> All Projects
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="font-bold text-xs uppercase text-muted-foreground hover:text-foreground hidden sm:inline-flex">
              <Link href="/">Home</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase text-muted-foreground hidden md:inline-block">
              {project.badge}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 md:pt-12 space-y-12">
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase px-2.5 py-1 bg-secondary text-secondary-foreground border-2 border-border shadow-neo-sm">
              {project.badge}
            </span>
            <span className="text-xs font-black uppercase px-2.5 py-1 bg-muted text-foreground border-2 border-border">
              Role: {project.role}
            </span>
            {project.status && (
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-primary text-primary-foreground border-2 border-border shadow-neo-sm">
                Status: {project.status === "WIP" ? "In Development (WIP)" : project.status}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
              {project.title}
            </h1>
            <p className="text-lg md:text-2xl font-bold text-muted-foreground leading-snug">
              {project.tagline || project.description}
            </p>
          </div>

          {/* Action Links & External Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            {project.url && (
              <Button asChild size="lg" className="border-4 border-border shadow-neo font-black text-sm uppercase bg-primary text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Live Demo ↗
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="lg" className="border-4 border-border shadow-neo font-black text-sm uppercase bg-card text-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" /> GitHub Source ↗
                </a>
              </Button>
            )}
          </div>
        </section>

        {/* Metrics Banner */}
        {project.metrics && project.metrics.length > 0 && (
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((metric, i) => (
                <div key={i} className="border-4 border-border bg-secondary text-secondary-foreground shadow-neo p-4 flex flex-col justify-between">
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-75">
                    {metric.label}
                  </p>
                  <p className="text-xl md:text-2xl font-black uppercase tracking-tight my-1">
                    {metric.value}
                  </p>
                  {metric.hint && (
                    <span className="text-[9px] font-bold uppercase bg-background text-foreground border border-border px-1.5 py-0.5 w-fit">
                      {metric.hint}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Overview Card */}
        <section>
          <div className="border-4 border-border bg-card shadow-neo-lg p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b-4 border-border pb-4">
              <Activity className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-black uppercase">Project Overview</h2>
            </div>
            <p className="text-sm md:text-base font-bold leading-relaxed text-foreground/90">
              {project.overview || project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-secondary text-secondary-foreground border-2 border-border text-xs font-black uppercase px-2.5 py-1 shadow-none"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* System Architecture Section */}
        {project.architecture && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-4 border-border pb-3">
              <Layers className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-black uppercase">System Architecture</h2>
            </div>

            <p className="text-sm md:text-base font-bold text-muted-foreground leading-relaxed">
              {project.architecture.summary}
            </p>

            {/* Architecture Diagram Display */}
            {project.architecture.image && (
              <div className="border-4 border-border bg-card shadow-neo-lg overflow-hidden">
                <div className="bg-muted border-b-4 border-border px-4 py-3 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" /> Technical Architecture Diagram & Data Flow
                  </span>
                  <span className="text-[10px] font-black uppercase bg-secondary text-secondary-foreground border border-border px-2 py-0.5">
                    Production Architecture
                  </span>
                </div>
                <div className="relative w-full aspect-video bg-[#0A0A0A] flex items-center justify-center p-2">
                  <Image
                    src={project.architecture.image}
                    alt={`${project.title} Architecture Diagram`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Architecture Layers Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {project.architecture.layers.map((layer, idx) => (
                <div key={idx} className="border-4 border-border bg-card shadow-neo flex flex-col justify-between overflow-hidden">
                  <div className="px-5 py-3 border-b-4 border-border bg-muted flex items-center justify-between">
                    <h3 className="font-black text-lg uppercase tracking-tight text-foreground">
                      {layer.name}
                    </h3>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 border-2 border-border bg-secondary text-secondary-foreground">
                      Layer 0{idx + 1}
                    </span>
                  </div>
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs md:text-sm font-bold text-muted-foreground leading-relaxed">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {layer.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-black uppercase px-2 py-0.5 border border-border bg-background text-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dual-Model ML Engine Section (Specialized Deep-Dive) */}
        {project.dualModelPipeline && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-4 border-border pb-3">
              <Cpu className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-black uppercase">Dual-Model AI Engine</h2>
            </div>

            <p className="text-sm md:text-base font-bold text-muted-foreground leading-relaxed">
              {project.dualModelPipeline.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Classification Card */}
              <div className="border-4 border-border bg-card shadow-neo p-6 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-border pb-2">
                  <h3 className="font-black text-lg uppercase flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" /> Stage 1: Disease Classification
                  </h3>
                  <span className="text-[10px] font-black uppercase bg-primary text-primary-foreground border border-border px-2 py-0.5">
                    MobileNetV2
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase text-muted-foreground tracking-wider">
                    Model Architecture:
                  </p>
                  <p className="text-sm font-bold bg-muted p-2.5 border-2 border-border font-mono">
                    {project.dualModelPipeline.classification.model}
                  </p>
                  <p className="text-xs font-bold leading-relaxed text-muted-foreground pt-1">
                    {project.dualModelPipeline.classification.desc}
                  </p>
                </div>
              </div>

              {/* Segmentation Card */}
              <div className="border-4 border-border bg-secondary text-secondary-foreground shadow-neo p-6 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-border pb-2">
                  <h3 className="font-black text-lg uppercase flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" /> Stage 2: U-Net Lesion Severity
                  </h3>
                  <span className="text-[10px] font-black uppercase bg-background text-foreground border border-border px-2 py-0.5">
                    Pixel Math
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase opacity-75 tracking-wider">
                    Mathematical Formulation:
                  </p>
                  <div className="bg-background text-foreground p-2.5 border-2 border-border font-mono text-xs font-black">
                    {project.dualModelPipeline.segmentation.formula}
                  </div>
                  <p className="text-xs font-bold leading-relaxed opacity-90 pt-1">
                    {project.dualModelPipeline.segmentation.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Severity Thresholds Table */}
            <div className="border-4 border-border bg-card shadow-neo-lg overflow-hidden">
              <div className="bg-muted border-b-4 border-border px-4 py-3">
                <h3 className="font-black text-sm uppercase tracking-wider">
                  Automated Infection Stage Grading & Intervention Protocol
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-border">
                {project.dualModelPipeline.stages.map((stage, idx) => (
                  <div key={idx} className="p-4 space-y-2 flex flex-col justify-between bg-card">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 border border-border ${stage.badgeColor}`}>
                          {stage.stage}
                        </span>
                        <span className="text-xs font-mono font-bold">{stage.coverage}</span>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground leading-snug">
                        {stage.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t-2 border-border/40">
                      <p className="text-[10px] font-black uppercase text-foreground mb-1">Recommended Action:</p>
                      <p className="text-[11px] font-bold text-foreground leading-tight">
                        {stage.treatment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Supported Diseases Showcase */}
        {project.supportedDiseases && project.supportedDiseases.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-4 border-border pb-3">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-black uppercase">Supported Foliage Diseases</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.supportedDiseases.map((disease, idx) => (
                <div key={idx} className="border-4 border-border bg-card shadow-neo flex flex-col justify-between overflow-hidden">
                  {disease.image && (
                    <div className="relative w-full h-40 border-b-4 border-border bg-muted">
                      <Image
                        src={disease.image}
                        alt={disease.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-black uppercase bg-secondary text-secondary-foreground border border-border px-1.5 py-0.5">
                          Code: {disease.code}
                        </span>
                      </div>
                      <h3 className="font-black text-base uppercase leading-tight pt-1">
                        {disease.name}
                      </h3>
                      <p className="text-[11px] italic font-bold text-muted-foreground">
                        {disease.scientificName}
                      </p>
                      <p className="text-xs font-bold text-muted-foreground leading-relaxed pt-2">
                        {disease.symptoms}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Features Grid */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-4 border-border pb-3">
              <Sparkles className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-black uppercase">Key Features</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.keyFeatures.map((feature, idx) => (
                <div key={idx} className="border-4 border-border bg-card shadow-neo p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase bg-muted border border-border px-2 py-0.5">
                        Feature 0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-black text-lg uppercase tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {feature.highlights && (
                    <ul className="space-y-1.5 pt-2 border-t-2 border-border/40">
                      {feature.highlights.map((h, i) => (
                        <li key={i} className="text-xs font-bold flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Full Tech Stack Breakdown */}
        {project.techStackBreakdown && project.techStackBreakdown.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-4 border-border pb-3">
              <Code2 className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-black uppercase">Detailed Tech Stack</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.techStackBreakdown.map((cat, idx) => (
                <div key={idx} className="border-4 border-border bg-card shadow-neo p-5 space-y-4">
                  <h3 className="text-base font-black uppercase border-b-4 border-border pb-2 text-primary flex items-center gap-2">
                    <Server className="w-4 h-4" /> {cat.category}
                  </h3>
                  <div className="space-y-3">
                    {cat.technologies.map((tech, i) => (
                      <div key={i} className="space-y-0.5">
                        <p className="text-xs font-black uppercase text-foreground">{tech.name}</p>
                        <p className="text-[11px] font-bold text-muted-foreground leading-snug">
                          {tech.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engineering Challenges & Solutions */}
        {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-4 border-border pb-3">
              <AlertTriangle className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-black uppercase">Engineering Challenges & Solutions</h2>
            </div>

            <div className="space-y-4">
              {project.challengesAndSolutions.map((item, idx) => (
                <div key={idx} className="border-4 border-border bg-card shadow-neo p-5 md:p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-black uppercase px-2 py-0.5 bg-rose-500 text-white border border-border shrink-0 mt-0.5">
                      Challenge
                    </span>
                    <p className="font-black text-sm md:text-base uppercase leading-snug">
                      {item.challenge}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-secondary/30 p-3.5 border-2 border-border">
                    <span className="text-xs font-black uppercase px-2 py-0.5 bg-emerald-600 text-white border border-border shrink-0 mt-0.5">
                      Solution
                    </span>
                    <p className="text-xs md:text-sm font-bold text-foreground leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State when detailed technical breakdown is not available */}
        {!project.architecture && (!project.keyFeatures || project.keyFeatures.length === 0) && (
          <section>
            <div className="border-4 border-border bg-secondary text-secondary-foreground shadow-neo-lg p-8 md:p-12 text-center space-y-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground border-4 border-border shadow-neo flex items-center justify-center mx-auto">
                <FolderGit2 className="w-8 h-8" />
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] font-black uppercase bg-background text-foreground border border-border px-2 py-0.5">
                  Deep Dive In Progress
                </span>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                  Case Study Unavailable
                </h2>
                <p className="text-xs md:text-sm font-bold text-muted-foreground leading-relaxed">
                  The technical schematics, architectural diagram, and comprehensive case study for {project.title} are currently unavailable or being compiled. In the meantime, explore our other featured deep dives.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="border-4 border-border shadow-neo font-black text-xs uppercase bg-primary text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
                  <Link href="/projects">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Explore Featured Projects
                  </Link>
                </Button>
                {project.url && (
                  <Button asChild variant="outline" size="lg" className="border-4 border-border shadow-neo font-black text-xs uppercase bg-card text-foreground">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visit Live Prototype ↗
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Next / Previous Project Navigation Bar */}
        <section className="border-t-4 border-border pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Button asChild variant="outline" className="border-4 border-border shadow-neo p-6 h-auto flex flex-col items-start bg-card hover:bg-secondary/30 justify-start">
                <Link href={`/projects/${prevProject.slug}`} className="w-full text-left">
                  <span className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Previous Project
                  </span>
                  <span className="text-lg font-black uppercase tracking-tight text-foreground block mt-1">
                    {prevProject.title}
                  </span>
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {nextProject && (
              <Button asChild variant="outline" className="border-4 border-border shadow-neo p-6 h-auto flex flex-col items-end bg-card hover:bg-secondary/30 justify-start text-right">
                <Link href={`/projects/${nextProject.slug}`} className="w-full text-right">
                  <span className="text-[10px] font-black uppercase text-muted-foreground flex items-center justify-end gap-1">
                    Next Project <ChevronRight className="w-3 h-3" />
                  </span>
                  <span className="text-lg font-black uppercase tracking-tight text-foreground block mt-1">
                    {nextProject.title}
                  </span>
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* Return to Projects CTA */}
        <section className="text-center pt-4">
          <Button asChild size="lg" className="border-4 border-border shadow-neo-lg font-black text-sm uppercase bg-primary text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
            <Link href="/projects">
              <FolderGit2 className="w-4 h-4 mr-2" /> Explore All {projects.length} Projects
            </Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
