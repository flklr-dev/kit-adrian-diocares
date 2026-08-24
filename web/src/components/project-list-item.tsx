import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

type ProjectListItemProps = {
  project: Project;
};

export function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <article className="relative p-3 md:p-4 hover:bg-secondary/30 transition-colors group cursor-pointer">
      {/* Stretched Link: Navigates to project details when clicking anywhere on the container */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${project.title} project details`}
      />

      <div className="flex flex-col gap-2 md:gap-2.5 relative z-10 pointer-events-none">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-[9px] font-black uppercase bg-secondary text-secondary-foreground border border-border px-1.5 py-0.5 shrink-0">
              {project.badge}
            </span>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-black text-sm md:text-base uppercase leading-tight tracking-tight truncate group-hover:text-primary transition-colors">
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
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo in a new tab`}
                  className="text-foreground hover:text-primary transition-colors cursor-pointer shrink-0 pointer-events-auto p-0.5"
                  title="Live Demo"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black uppercase text-muted-foreground shrink-0">
              {project.role}
            </span>
            <span className="text-[9px] font-black uppercase text-foreground group-hover:text-primary flex items-center shrink-0">
              Details <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        <p className="text-[11px] md:text-xs font-bold text-muted-foreground leading-snug line-clamp-2 group-hover:text-foreground transition-colors">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[8px] font-black uppercase px-1.5 py-0.5 border border-border bg-background/60 text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
