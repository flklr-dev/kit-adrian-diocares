import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

type ProjectCardProps = {
  project: Project;
  /** Max tags shown before a "+N tech" overflow label. Omit to show all tags. */
  tagLimit?: number;
};

export function ProjectCard({ project, tagLimit }: ProjectCardProps) {
  const visibleTags =
    tagLimit !== undefined ? project.tags.slice(0, tagLimit) : project.tags;
  const hiddenCount =
    tagLimit !== undefined ? Math.max(0, project.tags.length - tagLimit) : 0;

  return (
    <Card className="relative border-4 border-border bg-secondary text-secondary-foreground shadow-neo-sm hover:shadow-neo transition-all duration-150 flex flex-col justify-between h-full group cursor-pointer">
      {/* Stretched Link: Clicking anywhere on the card navigates to project details */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${project.title} project details`}
      />

      <CardContent className="p-4 flex flex-col justify-between h-full space-y-4 relative z-10 pointer-events-none">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <span className="text-[10px] font-black uppercase bg-background text-foreground border border-border px-2 py-0.5">
              {project.badge}
            </span>
            <span className="text-[10px] font-black uppercase opacity-75 shrink-0 text-right">
              {project.role}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-xl uppercase leading-none tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </span>
              {project.status && (
                <span
                  title={project.status === "WIP" ? "In Development" : project.status}
                  className="text-[8px] font-black uppercase bg-primary text-primary-foreground border border-border px-1 py-px shrink-0 leading-none"
                >
                  {project.status}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo in a new tab`}
                  className="flex items-center justify-center text-foreground hover:text-primary transition-colors cursor-pointer p-1 pointer-events-auto"
                  title="Live Demo"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <p className="text-xs font-bold leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t-2 border-border/20 gap-2">
          <div className="flex flex-nowrap items-center gap-1.5 overflow-hidden">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-black uppercase px-1.5 py-0.5 border border-border bg-background/50 text-foreground shrink-0 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 border border-border bg-background text-foreground shrink-0 whitespace-nowrap">
                +{hiddenCount} tech
              </span>
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-foreground group-hover:text-primary flex items-center shrink-0">
            Deep Dive <ChevronRight className="w-3 h-3 ml-0.5" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
