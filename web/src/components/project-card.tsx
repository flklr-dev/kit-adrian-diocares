import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
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
    <Card className="border-4 border-border bg-secondary text-secondary-foreground shadow-neo-sm flex flex-col justify-between h-full">
      <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <span className="text-[10px] font-black uppercase bg-background text-foreground border border-border px-2 py-0.5">
              {project.badge}
            </span>
            <span className="text-[10px] font-black uppercase opacity-75 shrink-0 text-right">
              {project.role}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="font-black text-xl uppercase leading-none tracking-tight">
              {project.title}
            </h3>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} in a new tab`}
                className="flex items-center justify-center text-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>

          <p className="text-xs font-bold leading-relaxed opacity-85">
            {project.description}
          </p>
        </div>

        <div className="flex flex-nowrap items-center gap-1.5 pt-2 overflow-hidden">
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
      </CardContent>
    </Card>
  );
}
