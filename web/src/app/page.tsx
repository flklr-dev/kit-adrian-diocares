import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Download,
  Briefcase,
  Code2,
  Trophy,
  Linkedin,
  Github,
  LayoutGrid,
  Gamepad2,
  Star,
  GraduationCap,
  Terminal,
  Sparkles,
  Clock
} from "lucide-react";
import { ChatBot } from "@/components/chat-bot";
import { GithubCalendarSection } from "@/components/github-calendar-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ProjectCard } from "@/components/project-card";
import {
  techStack,
  experiences,
  achievements,
  socialLinks,
  projects,
  homeProjects,
  beyondCode,
  profile,
} from "@/lib/portfolio-data";

const socialIcons: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  GitHub: Github,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans neo-grid-bg relative overflow-x-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">

        {/* Hero / Header Section */}
        <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12 relative">
          <div className="absolute top-0 md:top-2 right-0 z-10">
            <ThemeToggle />
          </div>
          
          {/* Avatar Area with Offset Floating Shadow Backdrop */}
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-primary border-4 border-border translate-x-[8px] translate-y-[8px] transition-transform group-hover:translate-x-[12px] group-hover:translate-y-[12px]" />
            <Avatar className="w-36 h-36 md:w-48 md:h-52 rounded-none border-4 border-border relative z-0 transition-transform group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]">
              <AvatarImage src="/kit.png" alt="Kit Adrian" className="object-cover" />
              <AvatarFallback className="rounded-none bg-muted font-black text-2xl">KD</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                Kit Adrian Diocares
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <p className="flex items-center gap-1 font-black text-secondary-foreground uppercase text-xs bg-secondary px-2.5 py-1 border-2 border-border shadow-neo-sm">
                  Mobile & Web Developer
                </p>
                <p className="flex items-center gap-1 font-black text-muted-foreground uppercase text-xs">
                  <MapPin className="w-4 h-4 text-primary" /> Davao City, Philippines
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1 font-black text-muted-foreground uppercase text-xs hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" /> {profile.email}
                </a>
              </div>
            </div>

            <p className="text-sm md:text-base font-bold text-muted-foreground max-w-4xl leading-relaxed">
              Crafting robust cross-platform mobile apps with React Native/Expo and highly scalable web architectures with Next.js & TypeScript. Accelerating delivery and value through deliberate AI integrations.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
              <Button size="default" asChild className="bg-primary text-primary-foreground">
                <Link href="/resume">
                  <Download className="w-4 h-4 mr-2" /> DOWNLOAD RESUME
                </Link>
              </Button>
              {socialLinks.map(({ name, url }) => {
                const Icon = socialIcons[name];
                return (
                  <Button
                    key={name}
                    variant="outline"
                    size="icon"
                    asChild
                    className="bg-background text-foreground"
                    title={name}
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </header>

        {/* 4-Item Quick Stats Dashboard Row */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            
            <div className="bg-card border-4 border-border p-4 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary border-2 border-border flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">Current Status</p>
                <p className="text-lg font-black uppercase leading-tight">Open For Work</p>
              </div>
            </div>

            <div className="bg-card border-4 border-border p-4 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-4">
              <div className="w-12 h-12 bg-primary border-2 border-border flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">Academic Honor</p>
                <p className="text-lg font-black uppercase leading-tight">Cum Laude &apos;26</p>
              </div>
            </div>

            <div className="bg-card border-4 border-border p-4 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary border-2 border-border flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-secondary-foreground fill-secondary-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">Client Rating</p>
                <p className="text-lg font-black uppercase leading-tight">5.0 / 5.0</p>
              </div>
            </div>

            <div className="bg-card border-4 border-border p-4 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-4">
              <div className="w-12 h-12 bg-primary border-2 border-border flex items-center justify-center shrink-0">
                <Terminal className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">Projects Built</p>
                <p className="text-lg font-black uppercase leading-tight">{projects.length}+ Featured</p>
              </div>
            </div>

          </div>
        </section>

        {/* Main Section: Organized Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side (8 cols): Primary Experience-Projects & Work details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About Section */}
            <section>
              <Card className="bg-card border-4 border-border shadow-neo-lg">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-2xl font-black uppercase">
                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    <h2>About Me</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-3 text-base leading-relaxed font-bold space-y-4">
                  <p>
                    I&apos;m a <span className="bg-secondary text-secondary-foreground px-2 py-0.5 border-2 border-border shadow-neo-sm">Freelance Developer</span> specializing in building premium mobile and web environments — ranging from specialized cross-platform mobile apps using React Native and Expo to high-speed web platforms in Next.js and TypeScript.
                  </p>
                  <p>
                    Over my active freelance career, I have collaborated with digital startups and international clients on platforms like Fiverr to turn complex, theoretical ideas into robust, deployed application products.
                  </p>
                  <p>
                    Currently, I focus heavily on integrating modern AI workflows to accelerate development velocity while guaranteeing security, strict maintainability, and clean technical architecture in every project I deliver.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Projects Grid */}
            <section>
              <Card className="border-4 border-border shadow-neo-lg bg-card">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-2xl font-black uppercase">
                      <LayoutGrid className="w-6 h-6 text-primary" />
                      <h2>Projects</h2>
                    </div>
                    <Link
                      href="/projects"
                      className="text-xs font-black uppercase tracking-wider text-primary hover:underline shrink-0"
                    >
                      All Projects →
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {homeProjects.map((project) => (
                      <ProjectCard key={project.title} project={project} tagLimit={3} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Side (4 cols): Secondary Sidebar for Credentials & Tools */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Tech Stack Section */}
            <section>
              <Card className="bg-secondary text-secondary-foreground border-4 border-border shadow-neo-lg">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-xl font-black uppercase">
                    <Code2 className="w-5 h-5" />
                    <h2>Tech Stack</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    {Object.entries(techStack).map(([category, items]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="text-xs font-black uppercase tracking-widest border-b-2 border-border pb-1">
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((item) => (
                            <Badge
                              key={item}
                              variant="outline"
                              className="bg-background text-foreground border-2 border-border shadow-none font-bold text-[10px]"
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

            {/* Experience Section */}
            <section>
              <Card className="border-4 border-border shadow-neo-lg bg-card">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-xl font-black uppercase">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2>Experience</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="space-y-4">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="group relative pl-5 border-l-4 border-border">
                        <div
                          className={`absolute -left-[10px] top-0 w-4 h-4 border-4 border-border flex items-center justify-center ${
                            idx === 0 ? "bg-background" : "bg-muted"
                          }`}
                        >
                          {idx === 0 && (
                            <div className="w-1.5 h-1.5 bg-foreground" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-black text-xs uppercase leading-none">{exp.title}</h3>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{exp.company}</p>
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <Clock className="w-3 h-3 text-primary" />
                            <span className="text-[9px] font-black text-muted-foreground">{exp.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Achievements Section */}
            <section>
              <Card className="border-4 border-border shadow-neo-lg bg-primary text-primary-foreground">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 text-xl font-black uppercase">
                    <Trophy className="w-5 h-5 text-secondary" />
                    <h2>Achievements</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="space-y-4">
                    {achievements.map((item, idx) => (
                      <div key={idx} className="group relative pl-5 border-l-4 border-primary-foreground/50">
                        <div className="absolute -left-[10px] top-0 w-4 h-4 bg-secondary border-4 border-border" />
                        <div className="space-y-1">
                          <h3 className="font-black text-xs uppercase leading-tight">{item.title}</h3>
                          <p className="text-[10px] font-bold text-primary-foreground/80 uppercase">{item.issuer}</p>
                          {item.year && (
                            <span className="text-[9px] font-black bg-primary-foreground/15 px-2 py-0.5 border border-primary-foreground/30 text-primary-foreground inline-block mt-1">
                              {item.year}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* Full Width Sections: Trust & Proof Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8">
          
          {/* Client Reviews Section */}
          <ReviewsSection />

          {/* GitHub Activity Tracker */}
          <GithubCalendarSection />

        </div>

        {/* Human Touch Section: Beyond Code */}
        <section className="mt-8">
          <Card className="border-4 border-border shadow-neo-lg bg-card">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-3 text-2xl font-black uppercase">
                <Gamepad2 className="w-6 h-6 text-primary" />
                <h2>Life Beyond Code</h2>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold">
                {beyondCode.map((item, idx) => {
                  const accentClasses = [
                    "border-primary bg-secondary/5 text-primary",
                    "border-secondary bg-primary/5 text-secondary-foreground",
                    "border-border bg-muted/50 text-muted-foreground",
                  ];
                  const accent = accentClasses[idx % accentClasses.length];
                  const [borderClass, bgClass, textClass] = accent.split(" ");

                  return (
                    <div
                      key={item.title}
                      className={`border-l-4 ${borderClass} pl-4 ${bgClass} py-3 pr-3 flex flex-col gap-1.5 justify-between`}
                    >
                      <p className={`text-xs uppercase font-black tracking-widest ${textClass}`}>{item.title}</p>
                      <p className="text-sm leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer & Back to top hook */}
        <footer className="mt-12 py-10 border-t-4 border-border text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            © 2026 Kit Adrian Diocares. Built with Brutalist aesthetics.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs font-black uppercase tracking-wider text-primary hover:underline">
              BACK TO TOP ▲
            </a>
          </div>
        </footer>
      </div>

      {/* Floating Chat Bot assistant */}
      <ChatBot />
    </main >
  );
}
