import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle,
  Database,
  Award,
  BookOpen,
  ArrowRight,
  GitBranch,
  Star,
  Download,
  X
} from "lucide-react";
import ResumeBuilder from "./components/ResumeBuilder";
import VenuPhoto from "./components/VenuPhoto";

interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  isFetched?: boolean;
  stars?: number;
}

export default function App() {
  // Education List
  const educationDetails = [
    {
      degree: "B.Tech — CSE (Data Science)",
      institution: "Malla Reddy Deemed to be University",
      period: "2023 - 2027 (Expected)",
      grade: "9.18 CGPA (Upto 5th Sem)",
      status: "Present Academic Track",
      focus: "Software Engineering, OOP (Java / Python), Relational Databases (SQL), Web Infrastructures"
    },
    {
      degree: "Intermediate — MPC",
      institution: "Sri Nalanda Junior College",
      period: "2021 - 2023",
      grade: "9.88 / 10 CGPA",
      status: "Completed",
      focus: "Mathematics, Physics, Chemistry"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Bala Bharathi Vidyalayam",
      period: "Completed 2021",
      grade: "10.0 GPA",
      status: "Completed",
      focus: "General Sciences, Basic Mathematics, Languages & Communications"
    }
  ];

  // Core portfolio projects (loaded as curated presets with GitHub links)
  const defaultProjects: Project[] = [
    {
      title: "Online Shopping Website (Frontend)",
      description: "Designed and built the responsive customer-facing shopping client interface. Connected dynamic catalog, basket state management, and grid interfaces.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      repoUrl: "https://github.com/venu-shetty/frontend-app",
    },
    {
      title: "Online Shopping Website (Backend)",
      description: "Backend architecture and storage engine for the Online Shopping Website. Configured with SQL interfaces, microservice pathways, and secure system gateways.",
      tags: ["Python", "MySQL", "Backend", "REST APIs"],
      repoUrl: "https://github.com/venu-shetty/BACKEND-APP",
    },
    {
      title: "Drowsiness Detection (drowsiness_project)",
      description: "Developed a deep learning–based system to detect driver fatigue in real-time, utilizing computer vision algorithms and facial landmark features to trigger warnings and prevent road accidents.",
      tags: ["Python", "Deep Learning", "Keras", "OpenCV"],
      repoUrl: "https://github.com/venu-shetty/drowsiness_project",
    },
    {
      title: "Diabetic Retinopathy Detection",
      description: "Built a diagnostic deep learning classifier model to identify retinopathy severity stages from retinal fundus images with high precision, integrated seamlessly into an intuitive Django web application interface.",
      tags: ["Django", "Python", "TensorFlow", "Deep Learning"],
      repoUrl: "https://github.com/venu-shetty/diabetic-retinopathy",
    }
  ];

  const [githubUsername, setGithubUsername] = useState("venu-shetty");
  const [fetchedRepos, setFetchedRepos] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Live repository retrieval from GitHub APIs
  const handleFetchRepos = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`https://api.github.com/users/${githubUsername.trim()}/repos?sort=updated&per_page=6`);
      if (!res.ok) {
        throw new Error("Could not fetch user. Verify the GitHub username.");
      }
      const data = await res.json();
      if (data && Array.isArray(data)) {
        const mappedRepos: Project[] = data.map((repo: any) => ({
          title: repo.name.replace(/[-_]/g, " "),
          description: repo.description || "No public repository description provided yet.",
          tags: repo.language ? [repo.language] : ["GitHub Repo"],
          repoUrl: repo.html_url,
          isFetched: true,
          stars: repo.stargazers_count
        }));
        setFetchedRepos(mappedRepos);
        setSuccessMsg(`Successfully imported ${mappedRepos.length} live repositories from github.com/${githubUsername}!`);
      } else {
        setFetchedRepos([]);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sync GitHub repositories.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetRepos = () => {
    setFetchedRepos(null);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const currentProjects = fetchedRepos ? fetchedRepos : defaultProjects;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-400 relative overflow-x-hidden">
      
      {/* SHADOW BACKDROP MESH GLOWS FOR COHESIVE LOOK */}
      <div className="absolute top-[4%] left-[10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[35%] right-[5%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[65%] left-[5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#070B16]/80 backdrop-blur-md border-b border-slate-900/80">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection("hero")}>
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-800/80 group-hover:border-blue-500/80 transition duration-300">
              <VenuPhoto className="w-full h-full object-cover" isHeader={true} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition duration-300">Shetti Venu</span>
          </div>

          {/* Simple Navigation Links exactly as shown in screenshot */}
          <nav className="flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
            <button onClick={() => scrollToSection("about")} className="hover:text-blue-400 transition cursor-pointer text-left">About</button>
            <button onClick={() => setIsResumeOpen(true)} className="hover:text-blue-400 transition cursor-pointer text-left">Resume</button>
            <button onClick={() => scrollToSection("skills")} className="hover:text-blue-400 transition cursor-pointer text-left">Skills</button>
            <button onClick={() => scrollToSection("featured-projects")} className="hover:text-blue-400 transition cursor-pointer text-left">Projects</button>
            <button onClick={() => scrollToSection("connect")} className="hover:text-blue-400 transition cursor-pointer text-left">Contact</button>
          </nav>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-32 relative z-10">
        
        {/* HERO SECTION */}
        <section id="hero" className="flex flex-col items-center justify-center text-center py-16 space-y-8">
          
          {/* Main Large Profile Photo Frame with Gradient Ring & Soft Pulsing Glow */}
          <div className="relative group">
            {/* Pulsing visual glow background */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-[20px] opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-200" />
            
            {/* Outer animated gradient ring */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-500/40 shadow-xl group-hover:scale-[1.02] transition duration-500 ease-out">
              {/* Inner container to crop image */}
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0F172A] border-2 border-[#070B16]">
                <VenuPhoto className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out" />
              </div>
            </div>
            
            {/* Floating verified/active status badge */}
            <span className="absolute bottom-2 right-2 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#070B16]"></span>
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-[#3B82F6]">Shetti Venu</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-300 tracking-tight">
              Aspiring Software Developer & Data Science Student
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
              I am a B.Tech Computer Science and Engineering (Data Science) student at Malla Reddy Deemed to be University with a CGPA of 9.18. I am passionate about software development, web technologies, data architectures, and building innovative modern digital solutions.
            </p>
          </div>

          {/* Centered Buttons matching the image design */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("featured-projects")}
              className="px-8 py-3 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer shadow-lg shadow-blue-900/30 font-sans"
            >
              View Projects
            </button>
            <a
              href="https://github.com/venu-shetty"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 bg-[#111827]/40 border border-slate-800 hover:border-slate-500 hover:bg-[#111827] text-white rounded-full text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <Github size={14} />
              GitHub
            </a>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-8 py-3 bg-[#111827]/40 border border-slate-400/55 hover:border-blue-500/70 hover:bg-[#111827] text-white rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer font-sans flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-[#3B82F6]" />
              View Resume
            </button>
          </div>
        </section>

        {/* ABOUT ME & EDUCATION DETAILS SECTION */}
        <section id="about" className="space-y-12">
          {/* Centered Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-white tracking-wide">About Me</h2>
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full shadow" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Biography (Exactly as sent) */}
            <div className="lg:col-span-7 space-y-6 text-slate-300 text-[14px] leading-relaxed font-sans">
              <p>
                My journey into technology began with a deep fascination for how software impacts daily human interaction. This curiosity led me to pursue my B.Tech in Computer Science and Engineering at Malla Reddy Deemed to be University, where I chose to specialize in Data Science to bridge the gap between scalable application development and intelligent analytics.
              </p>
              <p>
                Throughout my academic path, I have maintained a strong focus on technical excellence, building a solid foundation in core computer science concepts, object-oriented programming (Java & Python), and full-stack web development. I thrive on turning abstract logic into cleanly structured, functional code.
              </p>
              <p>
                Beyond the classroom curriculum, I am consistently looking to apply theory to practice—whether that's designing responsive user interfaces or developing optimized backend architectures. My goal is to grow into an adaptable software developer who can confidently build data-driven systems that make a difference.
              </p>
            </div>

            {/* Right Column: CGPA and Dynamic Education Credentials Grid (Adds all requested education details) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Card 1: CGPA Header (Visual Identity) */}
              <div className="bg-[#111827]/30 border border-slate-800/80 rounded-2xl p-8 text-center flex flex-col justify-center items-center shadow-lg transition duration-300 hover:border-slate-700/80">
                <span className="text-5xl font-black text-[#3B82F6] tracking-tight">9.18</span>
                <span className="text-[10px] text-slate-400 tracking-widest font-mono font-bold uppercase mt-2">
                  CUMULATIVE CGPA
                </span>
              </div>

              {/* Clean Timeline Layout for Academic Background */}
              <div className="space-y-6">
                <div className="px-1">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Academic Background</h3>
                </div>

                <div className="relative border-l border-slate-800 pl-6 ml-3 space-y-8">
                  {educationDetails.map((edu, idx) => (
                    <div 
                      key={idx}
                      className="relative md:hover:translate-x-1 transition duration-350 group"
                    >
                      {/* Left timeline connector bullet */}
                      <span className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#070B16] border border-slate-800 text-blue-400 ring-4 ring-[#070B16] group-hover:border-blue-500 group-hover:text-white transition duration-300 shadow-sm">
                        <GraduationCap size={12} />
                      </span>

                      <div className="space-y-3 bg-[#111827]/30 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition duration-350 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1">
                          <div>
                            <span className="text-[10px] font-bold text-[#3B82F6] tracking-wider uppercase font-mono">
                              {edu.period}
                            </span>
                            <h4 className="text-sm font-extrabold text-white tracking-tight mt-0.5 leading-snug">
                              {edu.degree}
                            </h4>
                          </div>
                          <div>
                            <span className="inline-block text-[10.5px] bg-blue-950/70 border border-blue-900/60 text-blue-300 px-3 py-0.5 rounded-full font-mono font-bold shadow-sm whitespace-nowrap">
                              {edu.grade}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-350 leading-relaxed">
                            {edu.institution}
                          </p>
                          <span className="inline-block text-[9px] text-[#10B981] font-mono uppercase bg-emerald-950/30 border border-emerald-950/60 px-2 py-0.5 rounded-md mt-1.5 font-bold tracking-wider">
                            {edu.status}
                          </span>
                        </div>

                        <div className="border-t border-slate-850/80 pt-3 mt-1.5">
                          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block mb-1">
                            Curriculum & Core Focus
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                            {edu.focus}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS SECTION */}
        <section id="skills" className="space-y-12">
          {/* Centered Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-white tracking-wide">Technical Skills</h2>
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full shadow" />
          </div>

          {/* Centered Horizontal Pills exactly matching user image */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {["HTML5", "CSS3", "JavaScript", "Java", "Python", "SQL", "NoSQL"].map((skill) => (
              <div
                key={skill}
                className="bg-[#0F172A] border border-slate-850 px-6 py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider text-slate-200 hover:border-blue-500/50 hover:bg-[#111827]/80 hover:text-white transition duration-300 cursor-default shadow-md"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS FROM GITHUB */}
        <section id="featured-projects" className="space-y-12">
          {/* Centered Heading */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black text-white tracking-wide font-sans">Featured Projects</h2>
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full shadow" />
            <p className="text-xs text-slate-350 max-w-lg mx-auto font-sans pt-1">
              Explore my main repositories. Click on any card to view the source code and documentation on GitHub.
            </p>
          </div>

          {/* Grid matching exactly the visual cards design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {currentProjects.map((project, index) => (
              <a 
                key={index}
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#111827]/30 border border-slate-800/80 hover:border-blue-500/50 hover:bg-[#111827]/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition duration-300 relative group cursor-pointer block"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-blue-450 transition font-sans">
                      {project.title}
                    </h3>
                    <span className="text-slate-500 group-hover:text-blue-500 transition shrink-0 p-1.5 bg-[#0F172A]/80 border border-slate-850 rounded-lg">
                      <Github size={15} />
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 space-y-4 pt-4 border-t border-slate-850/60">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span key={t} className="bg-slate-900 border border-slate-850 text-slate-400 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="w-full py-2.5 bg-[#0F172A]/60 border border-slate-800 hover:border-blue-500 hover:bg-blue-600/10 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer font-sans tracking-wide text-center">
                    <span>View Repository</span>
                    <ExternalLink size={11} className="text-blue-400" />
                  </div>
                </div>
              </a>
            ))}

          </div>
        </section>

        {/* CONNECT WITH ME */}
        <section id="connect" className="space-y-12">
          {/* Centered Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-white tracking-wide">Connect With Me</h2>
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full shadow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* GitHub Card */}
            <div className="bg-[#111827]/40 border border-slate-800/85 rounded-2xl p-6 text-center space-y-4 hover:border-slate-700 transition duration-300 shadow-lg">
              <h3 className="text-lg font-bold text-white tracking-tight">GitHub</h3>
              <a
                href="https://github.com/venu-shetty"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-block py-2.5 bg-blue-600 hover:bg-blue-700 text-white border border-transparent rounded-lg text-xs font-bold tracking-wider transition cursor-pointer font-sans shadow shadow-blue-900/10"
              >
                View Profile
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-[#111827]/40 border border-slate-800/85 rounded-2xl p-6 text-center space-y-4 hover:border-slate-700 transition duration-300 shadow-lg">
              <h3 className="text-lg font-bold text-white tracking-tight">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/venushetti"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-block py-2.5 bg-blue-600 hover:bg-blue-700 text-white border border-transparent rounded-lg text-xs font-bold tracking-wider transition cursor-pointer font-sans shadow shadow-blue-900/10"
              >
                Connect with Me
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-[#111827]/40 border border-slate-800/85 rounded-2xl p-6 text-center space-y-4 hover:border-slate-700 transition duration-300 shadow-lg">
              <h3 className="text-lg font-bold text-white tracking-tight">Email</h3>
              <a
                href="mailto:venushetti21@gmail.com"
                className="w-full inline-block py-2.5 bg-blue-600 hover:bg-blue-700 text-white border border-transparent rounded-lg text-xs font-bold tracking-wider transition cursor-pointer font-sans shadow shadow-blue-900/10"
              >
                Send Email
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-slate-900 mt-28 py-8 text-center text-xs text-slate-500 bg-[#040710] font-sans relative z-20">
        <p className="leading-relaxed font-sans">
          &copy; 2026 Shetti Venu | Portfolio Website
        </p>
      </footer>

      {/* BEAUTIFUL PROFESSIONAL RESUME MODAL OVERLAY */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6">
          <div className="relative w-full max-w-5xl bg-[#090D1A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 animate-in fade-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsResumeOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-slate-900/80 transition cursor-pointer p-2 rounded-full border border-slate-800 shadow"
              title="Close Resume View"
            >
              <X size={18} />
            </button>
            
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4 pr-12">
                <h2 className="text-2xl font-black text-white tracking-wide">Professional Resume Workspace</h2>
                <p className="text-xs text-slate-400">Review, customize details in real-time, and download your official resume instantly.</p>
              </div>
              
              <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                <ResumeBuilder />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
