import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Download, CheckCircle2, Briefcase, Code2, Rocket, Trophy, Linkedin, Github, Link, LayoutGrid, ExternalLink, ChevronRight, Gamepad2, BookOpen, Music } from "lucide-react";
import Image from "next/image";
import { ChatBot } from "@/components/chat-bot";


export default function Home() {
  const techStack = {
    frontend: ["JavaScript", "TypeScript", "React Native", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "PHP", "MongoDB", "SQL"],
    tools: ["Git", "Docker", "AWS", "Figma", "Vercel"]
  };

  const experiences = [
    {
      title: "Freelance Mobile Developer",
      company: "Fiverr",
      year: "2024 - 2025",
      type: "work"
    },
    {
      title: "BS Information Technology",
      company: "Davao Oriental State University",
      year: "2022",
      type: "education"
    }
  ];

  const achievements = [
    {
      title: "ICT Diagnostic Examination (Level 1)",
      issuer: "DICT",
      year: ""
    },
    {
      title: "Instituional Scholar - Mangalayan & Bagani",
      issuer: "Davao Oriental State University",
      year: ""
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kit-adrian-diocares-349a20338/", icon: <Linkedin className="w-4 h-4" /> },
    { name: "GitHub", url: "https://github.com/flklr-dev", icon: <Github className="w-4 h-4" /> }
  ];

  const projects = [
    {
      title: "EVA Alert",
      description: "Peer-to-peer personal safety application.",
      url: "eva-safety.app",
    },
    {
      title: "KAPPI",
      description: "Automated coffee leaf disease detection.",
      url: "kappi-coffee.app",
    },
    {
      title: "CodeMentor AI",
      description: "Personalized AI coding guidance assistant.",
      url: "codementor.ai",
    },
    {
      title: "EduBoost AI",
      description: "AI-powered learning coach for students.",
      url: "eduboost.ai",
    }
  ];


  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>

          <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-xl">
            <AvatarImage src="/kit.png" alt="Bryl Lim" className="object-cover" />
            <AvatarFallback className="rounded-2xl">BL</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center md:justify-start gap-2">
                Kit Adrian B. Diocares
              </h1>
              <p className="flex items-center justify-center md:justify-start gap-1 font-normal text-muted-foreground text-xs">
                <MapPin className="w-3 h-3" /> Davao Oriental, Philippines
              </p>
              <p className="text-sm font-medium opacity-90">
                IT Student <span className="text-muted-foreground mx-1">\</span> Freelance Mobile Developer
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <Button className="rounded-md h-8 px-4 text-[10px] md:text-xs font-medium transition-transform hover:-translate-y-0.5" variant="default">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download Resume
              </Button>
              <Button variant="outline" className="rounded-md h-8 px-4 text-[10px] md:text-xs font-medium transition-transform hover:-translate-y-0.5 border-border">
                <Mail className="w-3.5 h-3.5 mr-1.5" /> Send Email
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          {/* Top Row: About/Tech (Left) & Sidebar (Right) */}
          <div className="md:col-span-12 lg:col-span-8 space-y-2">
            {/* About Section */}
            <section className="space-y-1">
              <Card className="border shadow-none bg-background hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-0 mb-0 space-y-0">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <Briefcase className="w-5 h-5" />
                    <h2>About</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 -mt-5 text-sm leading-relaxed text-foreground/90">
                  <p className="mb-2">
                    I&apos;m an IT Student and a Freelance Mobile App Developer specializing in building cross-platform
                    applications using React Native, Expo, and TypeScript. I have worked with various web and mobile
                    technologies to deliver high-quality software solutions.
                  </p>
                  <p className="mb-2">
                    I&apos;ve helped clients and startups on platforms like Fiverr turn their ideas into
                    reality by developing robust and efficient applications.
                  </p>
                  <p>
                    Currently, I&apos;m focused on integrating AI tools and techniques into my workflow to accelerate
                    job delivery while ensuring scalability, maintainability, and security in every application I build.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Tech Stack Section */}
            <section className="space-y-1">
              <Card className="border shadow-none bg-background hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-0 mb-0 space-y-0">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <Code2 className="w-5 h-5 text-muted-foreground" />
                    <h2>Tech Stack</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 -mt-5">
                  <div className="space-y-3">
                    {Object.entries(techStack).map(([category, items]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="text-sm font-bold capitalize text-foreground/80">{category}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((item) => (
                            <Badge
                              key={item}
                              variant="outline"
                              className="px-3 py-1 rounded-md text-xs border-border bg-background hover:bg-muted transition-colors cursor-default"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <aside className="md:col-span-12 lg:col-span-4 space-y-2">
            {/* Experience Section */}
            <section className="space-y-1">
              <Card className="border shadow-none bg-background hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-0 mb-0 space-y-0">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <Briefcase className="w-5 h-5" />
                    <h2>Experience</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 -mt-5">
                  <div className="space-y-0">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="group flex gap-3 relative pb-6 last:pb-0">
                        {/* Timeline Line */}
                        {idx !== experiences.length - 1 && (
                          <div className="absolute left-[7px] top-6 bottom-0 w-[2px] bg-muted group-hover:bg-muted/80 transition-colors" />
                        )}

                        {/* Timeline Dot */}
                        <div className={`relative z-10 w-4 h-4 rounded-full border-2 bg-background transition-all duration-300 flex-shrink-0 flex items-center justify-center mt-1.5
                          ${idx === 0
                            ? 'border-foreground bg-background ring-4 ring-foreground/10'
                            : 'border-muted group-hover:border-foreground'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full bg-foreground transition-opacity duration-300 
                            ${idx === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                          />
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm text-foreground">{exp.title}</h3>
                            <Badge variant="outline" className="rounded-full text-[9px] opacity-70 font-mono h-5 px-1.5 border-muted-foreground/20">
                              {exp.year}
                            </Badge>
                          </div>
                          <p className="text-xs text-foreground/70">{exp.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Achievements Section */}
            <section className="space-y-1">
              <Card className="border shadow-none bg-background hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-0 mb-0 space-y-0">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <Trophy className="w-5 h-5" />
                    <h2>Achievements</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 -mt-5">
                  <div className="space-y-0">
                    {achievements.map((item, idx) => (
                      <div key={idx} className="group flex gap-3 relative pb-6 last:pb-0">
                        {/* Timeline Line */}
                        {idx !== achievements.length - 1 && (
                          <div className="absolute left-[7px] top-6 bottom-0 w-[2px] bg-muted group-hover:bg-muted/80 transition-colors" />
                        )}

                        {/* Dot */}
                        <div className="relative z-10 w-4 h-4 rounded-full border-2 bg-background border-muted group-hover:border-foreground transition-all duration-300 flex-shrink-0 flex items-center justify-center mt-1.5">
                          <div className="w-2 h-2 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold text-sm text-foreground leading-tight">{item.title}</h3>
                          <p className="text-xs text-foreground/70">{item.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Social Links Section */}
            <section className="space-y-1">
              <Card className="border shadow-none bg-background hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-0 mb-0 space-y-0">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <Link className="w-5 h-5 text-muted-foreground" />
                    <h2>Social Links</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-0 -mt-5">
                  <div className="flex items-center gap-4 pt-2">
                    {socialLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.name}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                      >
                        {link.icon && React.cloneElement(link.icon as React.ReactElement<any>, { className: "w-4 h-4" })}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </aside>

          {/* Bottom Row: Life Beyond Code (Left-4) & Recent Projects (Right-8) */}
          <div className="md:col-span-12 lg:col-span-4">
            <section className="space-y-1 h-full">
              <Card className="border shadow-none bg-background hover:shadow-md transition-shadow duration-300 h-full">
                <CardHeader className="pb-0 mb-0 space-y-0">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <Gamepad2 className="w-5 h-5 text-muted-foreground" />
                    <h2>Life Beyond Code</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-1 -mt-5 space-y-3">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Competitive gaming player and tech enthusiast exploring the latest in software and emerging digital trends.
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Listener of deep beats and lo-fi while building or just unwinding from long sessions.
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    A curious mind browsing interesting facts, reading about minimalism, and staying updated on modern aesthetics.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="md:col-span-12 lg:col-span-8">
            <section className="space-y-1 h-full">
              <Card className="border shadow-none bg-background hover:shadow-md transition-shadow duration-300 h-full">
                <CardHeader className="pb-0 mb-0 space-y-0">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <LayoutGrid className="w-5 h-5 text-muted-foreground" />
                    <h2>Recent Projects</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 -mt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {projects.map((project, idx) => (
                      <Card
                        key={idx}
                        className="group border border-black/[0.08] dark:border-white/10 bg-background/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-none py-0"
                      >
                        <div className="py-3 px-4 flex flex-col gap-3.5">
                          <h3 className="font-bold text-base text-foreground leading-tight">{project.title}</h3>
                          <p className="text-sm text-foreground/90 leading-tight line-clamp-1">
                            {project.description}
                          </p>
                          <Badge variant="secondary" className="text-xs font-mono px-3 py-1.5 bg-muted/50 text-foreground border-none leading-none w-fit">
                            {project.url}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        <footer className="mt-12 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Kit Adrian Diocares. All Rights Reserved.
          </p>
        </footer>
      </div>

      <ChatBot />
    </main >
  );
}
