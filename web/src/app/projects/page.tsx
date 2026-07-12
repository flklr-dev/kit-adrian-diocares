import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectListItem } from "@/components/project-list-item";
import { projects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Projects | Kit Adrian B. Diocares",
  description: "Browse all projects by Kit Adrian B. Diocares — mobile apps, web platforms, and machine learning work.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans neo-grid-bg">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
              Portfolio
            </p>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">
              All Projects
            </h1>
            <p className="text-xs font-bold text-muted-foreground mt-1.5">
              {projects.length} builds — live links open in a new tab where available.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center text-xs font-black uppercase tracking-wider text-primary hover:underline w-fit shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Back to Home
          </Link>
        </header>

        <Card className="border-4 border-border shadow-neo-lg bg-card py-0 gap-0 overflow-hidden">
          <CardContent className="p-0 divide-y-4 divide-border">
            {projects.map((project) => (
              <ProjectListItem key={project.title} project={project} />
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
