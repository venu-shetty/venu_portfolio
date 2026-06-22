import { Award, Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { CertificationItem } from "../types";

const CERTIFICATES_DATA: CertificationItem[] = [
  {
    id: "cert-aimr",
    title: "Internship Certificate Holder (R&D)",
    issuer: "AimR Edu LLP",
    location: "Hyderabad, India",
    year: "May 2024",
    bullets: [
      "Completed a comprehensive data structures and analytical programming internship program.",
      "Applied core programming structures and algorithms in functional corporate codebases.",
      "Collaborated with project guides to deploy modular Python modules and evaluate performance indicators."
    ]
  },
  {
    id: "cert-augusta",
    title: "Certificate of Completion: Python, DSA & Deep Architectures",
    issuer: "TECH AUGUSTA Private Limited",
    location: "Hyderabad, India",
    year: "2024",
    bullets: [
      "Successfully completed a comprehensive track focusing on Python programming, Data Structures & Algorithms.",
      "Developed a robust command of core OOP paradigms, arrays memory alignment, and advanced sorting.",
      "Built mock predictive algorithms and evaluated space-complexity bottlenecks."
    ]
  }
];

export default function Certifications() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {CERTIFICATES_DATA.map((cert) => (
        <div
          key={cert.id}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-slate-700 transition duration-300 relative overflow-hidden"
        >
          {/* Subtle glowing element in corner based on designer guide */}
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            {/* Header Badge */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  {cert.id.includes("aimr") ? <Briefcase size={18} /> : <Award size={18} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100 leading-snug">{cert.title}</h4>
                  <p className="text-xs text-slate-400 font-semibold mt-1">{cert.issuer}</p>
                </div>
              </div>
            </div>

            {/* Geographical Metadatas */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-slate-450 border-y border-slate-800/60 py-2.5">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-blue-400" />
                {cert.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-blue-400" />
                {cert.year}
              </span>
              <span className="flex items-center gap-1 text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                VERIFIED_CERT
              </span>
            </div>

            {/* Bullets text */}
            <ul className="space-y-2 font-sans">
              {cert.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                  <CheckCircle2 size={13} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/40 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>ISSUER_CODE: {cert.id.toUpperCase()}-HYD</span>
            <span className="text-blue-400 font-bold">ACTIVE CREDENTIAL</span>
          </div>

        </div>
      ))}
    </div>
  );
}
