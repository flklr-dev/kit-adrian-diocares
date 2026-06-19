import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Download, Briefcase, Code2, Trophy, Linkedin, Github, LayoutGrid, Gamepad2 } from "lucide-react";
import { ChatBot } from "@/components/chat-bot";
import { GithubCalendarSection } from "@/components/github-calendar-section";
import { ReviewsSection } from "@/components/reviews-section";


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
      year: "2025 - 2026",
      type: "work"
    },
    {
      title: "Web Developer",
      company: "DICT-DOrSU (386-hour internship)",
      year: "2026",
      type: "work"
    },
    {
      title: "BS Information Technology",
      company: "Davao Oriental State University",
      year: "2022-2026",
      type: "education"
    }
  ];

  const achievements = [
    {
      title: "Cum Laude",
      issuer: "Davao Oriental State University",
      year: "2026"
    },
    {
      title: "ICT Diagnostic Examination (Level 1)",
      issuer: "DICT",
      year: ""
    },
    {
      title: "Institutional Scholar - Mangalayan & Bagani",
      issuer: "Davao Oriental State University",
      year: ""
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kit-adrian-diocares-349a20338/", Icon: Linkedin },
    { name: "GitHub", url: "https://github.com/flklr-dev", Icon: Github },
  ];

  const projects = [
    {
      title: "EVA Alert",
      description:
        "Personal safety app with live tracking, check-ins, SOS alerts, and Bluetooth device support.",
    },
    {
      title: "KAPPI",
      description:
        "Detects coffee leaf disease and severity using machine learning and computer vision.",
    },
    {
      title: "CodeMentor AI",
      description:
        "Gamified code learning with levels, challenges, awards, and perks.",
    },
    {
      title: "Thumbnail-Lab",
      description:
        "AI thumbnail creator with face integration and unique design features.",
    },
  ];


  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>

          <Avatar className="w-36 h-36 md:w-52 md:h-52 shrink-0 rounded-none border-4 border-border shadow-neo-lg">
            <AvatarImage src="/kit.png" alt="Kit Adrian" className="object-cover" />
            <AvatarFallback className="rounded-none">KD</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                Kit Adrian B. Diocares
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <p className="flex items-center gap-1 font-black text-secondary-foreground uppercase text-sm bg-secondary px-2 py-1 border-2 border-border shadow-neo-sm">
                  Mobile Developer
                </p>
                <p className="flex items-center gap-1 font-black text-muted-foreground uppercase text-sm">
                  <MapPin className="w-4 h-4" /> Davao Oriental, Philippines
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <Button size="lg" className="bg-primary text-primary-foreground">
                <Download className="w-5 h-5 mr-2" /> DOWNLOAD RESUME
              </Button>
              {socialLinks.map(({ name, url, Icon }) => (
                <Button
                  key={name}
                  variant="outline"
                  size="icon-sm"
                  asChild
                  className="bg-background text-foreground"
                  title={name}
                >
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                    <Icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Top Row: About/Tech (Left) & Sidebar (Right) */}
          <div className="md:col-span-12 lg:col-span-8 space-y-6">
            {/* About Section */}
            <section>
              <Card className="bg-card border-4 border-border shadow-neo-lg">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-2xl font-black uppercase">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <h2>About Me</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-3 text-base leading-relaxed font-bold">
                  <p className="mb-4">
                    I&apos;m a <span className="bg-secondary text-secondary-foreground px-2 border-2 border-border shadow-neo-sm">Freelance Mobile App Developer</span> specializing in building cross-platform
                    applications using React Native, Expo, and TypeScript.
                  </p>
                  <p className="mb-4">
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
            <section>
              <Card className="bg-secondary text-secondary-foreground border-4 border-border shadow-neo-lg">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-2xl font-black uppercase">
                    <Code2 className="w-6 h-6" />
                    <h2>Tech Stack</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {Object.entries(techStack).map(([category, items]) => (
                      <div key={category} className="space-y-3">
                        <h3 className="text-sm font-black uppercase tracking-widest border-b-4 border-border pb-1">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <Badge
                              key={item}
                              variant="outline"
                              className="bg-background text-foreground border-2 border-border shadow-neo-sm font-bold"
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

          <aside className="md:col-span-12 lg:col-span-4 space-y-6">
            {/* Experience Section */}
            <section>
              <Card className="border-4 border-border shadow-neo-lg bg-card gap-2">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-xl font-black uppercase">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2>Experience</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-3">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="group relative pl-6 border-l-4 border-border">
                        <div
                          className={`absolute -left-[12px] top-0 w-5 h-5 border-4 border-border flex items-center justify-center ${
                            idx === 0 ? "bg-background" : "bg-muted"
                          }`}
                        >
                          {idx === 0 && (
                            <div className="w-2 h-2 bg-foreground" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-black text-sm uppercase">{exp.title}</h3>
                          </div>
                          <p className="text-xs font-bold text-muted-foreground uppercase">{exp.company}</p>
                          <Badge variant="secondary" className="mt-1 text-[9px] border-2 border-border shadow-none text-secondary-foreground">
                            {exp.year}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Achievements Section */}
            <section>
              <Card className="border-4 border-border shadow-neo-lg bg-primary text-primary-foreground gap-2">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-xl font-black uppercase">
                    <Trophy className="w-5 h-5 text-secondary" />
                    <h2>Achievements</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-3">
                    {achievements.map((item, idx) => (
                      <div key={idx} className="group relative pl-6 border-l-4 border-primary-foreground">
                        <div className="absolute -left-[12px] top-0 w-5 h-5 bg-secondary border-4 border-border" />
                        <div className="space-y-1">
                          <h3 className="font-black text-sm uppercase leading-tight">{item.title}</h3>
                          <p className="text-xs font-bold text-primary-foreground/80 uppercase">{item.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </aside>

          {/* Bottom Row: Life Beyond Code (Left-4) & Recent Projects (Right-8) */}
          <div className="md:col-span-12 lg:col-span-4">
            <section className="h-full">
              <Card className="border-4 border-border shadow-neo-lg h-full bg-card gap-2">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-xl font-black uppercase">
                    <Gamepad2 className="w-5 h-5 text-primary" />
                    <h2>Beyond Code</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 space-y-3 font-bold">
                  <p className="text-sm leading-relaxed border-l-4 border-primary pl-3 bg-secondary/10 py-2">
                    Competitive gaming player and tech enthusiast exploring the latest in software and emerging digital trends.
                  </p>
                  <p className="text-sm leading-relaxed border-l-4 border-secondary pl-3 bg-primary/5 py-2">
                    Listener of deep beats and lo-fi while building or just unwinding from long sessions.
                  </p>
                  <p className="text-sm leading-relaxed border-l-4 border-border pl-3 bg-muted py-2">
                    A curious mind browsing interesting facts, reading about minimalism, and staying updated on modern aesthetics.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="md:col-span-12 lg:col-span-8">
            <section className="h-full">
              <Card className="border-4 border-border shadow-neo-lg h-full bg-card gap-2">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-2xl font-black uppercase">
                    <LayoutGrid className="w-6 h-6 text-primary" />
                    <h2>Recent Projects</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {projects.map((project, idx) => (
                      <Card
                        key={idx}
                        className="group border-4 border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer shadow-neo-sm hover:shadow-neo hover:translate-x-[-3px] hover:translate-y-[-3px]"
                      >
                        <CardContent className="p-3 flex flex-col gap-2">
                          <h3 className="font-black text-xl uppercase leading-tight">{project.title}</h3>
                          <p className="text-sm font-normal leading-relaxed opacity-80 group-hover:opacity-90">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        <ReviewsSection />

        <div className="mt-12">
          <GithubCalendarSection />
        </div>

        <footer className="mt-12 py-8 border-t-4 border-border text-center">
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">
            © 2026 Kit Adrian Diocares. All Rights Reserved.
          </p>
        </footer>
      </div>

      <ChatBot />
    </main >

  );
}
