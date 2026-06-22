import { useState } from "react";
import { GraduationCap, Award, BookOpen, Layers, CheckCircle } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // 0-100
  category: "prog" | "web" | "db" | "concept" | "soft";
}

const SKILLS_DATA: SkillItem[] = [
  { name: "Python Programming", level: 92, category: "prog" },
  { name: "Java Coding (JDK)", level: 85, category: "prog" },
  { name: "Django Framework", level: 80, category: "web" },
  { name: "HTML5 / CSS3", level: 90, category: "web" },
  { name: "MySQL Relational DB", level: 82, category: "db" },
  { name: "NoSQL Database (Basics)", level: 65, category: "db" },
  { name: "Deep Learning (CNNs)", level: 88, category: "concept" },
  { name: "Computer Vision (OpenCV)", level: 84, category: "concept" },
  { name: "Data Structures & Algos (DSA)", level: 80, category: "concept" },
  { name: "JavaScript", level: 72, category: "web" },
  { name: "Team Leadership", level: 85, category: "soft" },
  { name: "System Presentation", level: 90, category: "soft" },
  { name: "Technical Writing", level: 85, category: "soft" }
];

export default function SkillsSection() {
  const [filter, setFilter] = useState<"all" | "prog" | "web_db" | "concept" | "soft">("all");

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (filter === "all") return true;
    if (filter === "prog") return skill.category === "prog";
    if (filter === "web_db") return skill.category === "web" || skill.category === "db";
    if (filter === "concept") return skill.category === "concept";
    if (filter === "soft") return skill.category === "soft";
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      
      {/* Education Timeline Map */}
      <div className="md:col-span-12 lg:col-span-5 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="text-blue-400" size={20} />
            Academic Career
          </h3>
          <p className="text-xs text-slate-400 leading-normal mt-1 font-sans">
            Consistent top-tier academic standing across consecutive boards.
          </p>
        </div>

        {/* Education Blocks */}
        <div className="relative border-l-2 border-slate-850 ml-3.5 pl-6 space-y-6">
          
          {/* Malla Reddy Engineering College */}
          <div className="relative font-sans">
            <div className="absolute -left-[31px] top-1 w-4 h-4 bg-blue-500 border-2 border-[#121B2E] rounded-full" />
            <div>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded font-mono font-bold">
                2023 - 2027 (Expected)
              </span>
              <h4 className="text-sm font-bold text-slate-100 mt-2">B.Tech in Computer Science & Eng. (Data Science)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Malla Reddy Engineering College (Autonomous)</p>
              
              {/* Core Grade Card */}
              <div className="bg-[#121B2E] border border-slate-800 p-2.5 rounded-lg mt-2 flex items-center justify-between font-mono">
                <span className="text-[10.5px] text-slate-400">CGPA up to 5th Semester:</span>
                <span className="text-xs text-blue-400 font-bold">9.18 / 10 GPA</span>
              </div>
            </div>
          </div>

          {/* Sri Nalanda Junior College */}
          <div className="relative font-sans">
            <div className="absolute -left-[31px] top-1 w-4 h-4 bg-blue-700 border-2 border-[#121B2E] rounded-full" />
            <div>
              <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono">
                2021 - 2023
              </span>
              <h4 className="text-sm font-bold text-slate-200 mt-2">Intermediate MPC (Maths, Physics, Chemistry)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sri Nalanda Junior College</p>
              
              <div className="bg-[#121B2E] border border-slate-800 p-2.5 rounded-lg mt-2 flex items-center justify-between font-mono">
                <span className="text-[10.5px] text-slate-400">Board CGPA:</span>
                <span className="text-xs text-blue-400 font-bold">9.88 / 10 GPA</span>
              </div>
            </div>
          </div>

          {/* Bala Bharathi Vidyalayam */}
          <div className="relative font-sans">
            <div className="absolute -left-[31px] top-1 w-4 h-4 bg-blue-800 border-2 border-[#121B2E] rounded-full" />
            <div>
              <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono">
                2021 (Graduation)
              </span>
              <h4 className="text-sm font-bold text-slate-200 mt-2">Secondary School Certificate (SSC)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Bala Bharathi Vidyalayam</p>
              
              <div className="bg-[#121B2E] border border-slate-800 p-2.5 rounded-lg mt-2 flex items-center justify-between font-mono">
                <span className="text-[10.5px] text-slate-400">SSC Board Score:</span>
                <span className="text-xs text-blue-400 font-bold">10 / 10 CGPA</span>
              </div>
            </div>
          </div>

        </div>

        {/* Custom educational performance chart visually compiled */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-2">
          <span className="text-[10px] text-slate-400 font-mono block">Academic GPA Comparison:</span>
          {/* Visual SVG bar graphs */}
          <div className="space-y-2.5 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-[10.5px] font-mono">
                <span className="text-slate-400">SSC Board</span>
                <span className="text-blue-400 font-bold">10.0 / 10</span>
              </div>
              <div className="w-full bg-[#121B2E] h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full w-[100%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10.5px] font-mono">
                <span className="text-slate-400">Intermediate Board</span>
                <span className="text-blue-400 font-bold">9.88 / 10</span>
              </div>
              <div className="w-full bg-[#121B2E] h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full w-[98.8%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10.5px] font-mono">
                <span className="text-slate-400">B.Tech (CSE - Data Science)</span>
                <span className="text-blue-400 font-bold">9.18 / 10</span>
              </div>
              <div className="w-full bg-[#121B2E] h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full w-[91.8%]" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Skill Matrix Filter */}
      <div className="md:col-span-12 lg:col-span-7 space-y-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-blue-400" size={20} />
            Skill Matrix
          </h3>
          <p className="text-xs text-slate-400 leading-normal mt-1 font-sans">
            Structured domains focused on modern enterprise architecture & computer science.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Stacks" },
            { id: "prog", label: "Programming" },
            { id: "web_db", label: "Web & SQL" },
            { id: "concept", label: "Core ML & DSA" },
            { id: "soft", label: "Soft Skills" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition ${
                filter === cat.id
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : "bg-[#121B2E] border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill list results */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4.5 space-y-4 max-h-[310px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
          {filteredSkills.map((skill, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-blue-400" />
                  {skill.name}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">{skill.level}% competence</span>
              </div>
              <div className="w-full bg-[#121B2E] h-2 rounded-full overflow-hidden border border-slate-800/60">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
