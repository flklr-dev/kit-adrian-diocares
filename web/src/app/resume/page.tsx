import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ResumeAutoDownload } from "./resume-auto-download";

export const metadata: Metadata = {
  title: "Resume | Kit Adrian B. Diocares",
  description: "View and download Kit Adrian B. Diocares' resume.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      <ResumeAutoDownload />

      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
              Resume Viewer
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
              Kit Adrian B. Diocares
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="bg-background text-foreground">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
              </Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground">
              <a href="/Kit Adrian Diocares - Resume.pdf" download="Kit Adrian Diocares - Resume.pdf">
                <Download className="w-4 h-4 mr-2" /> Download Again
              </a>
            </Button>
          </div>
        </div>

        <Card className="border-4 border-border shadow-neo-lg bg-card">
          <CardHeader className="pb-2">
            <p className="text-sm font-bold text-muted-foreground">
              Your resume should start downloading automatically. If the browser blocks it, use the download button above.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden border-4 border-border bg-background shadow-neo-sm">
              <iframe
                src="/Kit Adrian Diocares - Resume.pdf"
                title="Kit Adrian Resume"
                className="w-full h-[90vh]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
