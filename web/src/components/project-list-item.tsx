import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

type ProjectListItemProps = {
  project: Project;
};

export function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <article className="p-3 md:p-4 hover:bg-secondary/30 transition-colors">
      <div className="flex flex-col gap-2 md:gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-[9px] font-black uppercase bg-secondary text-secondary-foreground border border-border px-1.5 py-0.5 shrink-0">
              {project.badge}
            </span>
            <div className="flex items-center gap-1.5 min-w-0">
              <h2 className="font-black text-sm md:text-base uppercase leading-tight tracking-tight truncate">
                {project.title}
              </h2>
              {project.status && (
                <span
                  title="In Development"
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
                  aria-label={`Open ${project.title} in a new tab`}
                  className="text-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
          <span className="text-[9px] font-black uppercase text-muted-foreground shrink-0">
            {project.role}
          </span>
        </div>

        <p className="text-[11px] md:text-xs font-bold text-muted-foreground leading-snug line-clamp-2">
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
