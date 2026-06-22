import { useState } from "react";
import { Edit3, Check, RefreshCw, FileText, BadgeInfo, Download } from "lucide-react";

export default function ResumeBuilder() {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: "SHETTI VENU",
    email: "venushetti21@gmail.com",
    phone: "7331178273",
    linkedin: "www.linkedin.com/in/venushetti",
    objective: "Enthusiastic and adaptable graduate with a background in Data Science, strong problem-solving abilities, and knowledge of Python, DBMS, and Java. Seeking an entry-level position in the IT industry where I can utilize my technical skills, learn new technologies, and contribute effectively to organizational goals.",
    mrecGrade: "9.18 (upto 5th Sem)",
    intermediateGrade: "9.88",
    sscGrade: "10"
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - ${resumeData.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      color: #1e293b;
      background: #f8fafc;
      padding: 40px 20px;
      line-height: 1.5;
    }
    .resume-page {
      background: #ffffff;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 45px 50px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
      border: 1px solid #e2e8f0;
    }
    header {
      text-align: center;
      margin-bottom: 24px;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 16px;
    }
    h1 {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }
    .contact-info {
      font-size: 11.5px;
      color: #475569;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .contact-info a { color: #2563eb; text-decoration: none; }
    .contact-info a:hover { text-decoration: underline; }
    .bullet-divider { color: #cbd5e1; }
    .section { margin-top: 22px; }
    .section-title {
      font-size: 13.5px;
      font-weight: 800;
      text-transform: uppercase;
      color: #0f172a;
      border-bottom: 1.5px solid #475569;
      padding-bottom: 3.5px;
      margin-bottom: 10px;
      letter-spacing: 0.06em;
    }
    p.objective-text {
      font-size: 11.5px;
      color: #334155;
      text-align: justify;
      line-height: 1.6;
    }
    table.education-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin-top: 6px;
    }
    table.education-table th {
      border-bottom: 1.5px solid #cbd5e1;
      padding: 6px 4px;
      font-weight: 700;
      color: #475569;
      text-align: left;
    }
    table.education-table td {
      border-bottom: 1px solid #f1f5f9;
      padding: 8px 4px;
      color: #334155;
    }
    .education-title { font-weight: 700; color: #0f172a; }
    .education-grade { font-weight: 700; color: #0f172a; }
    ul.skills-list { list-style-type: none; font-size: 11px; color: #334155; margin-top: 6px; }
    ul.skills-list li { margin-bottom: 5px; }
    ul.skills-list li strong { color: #0f172a; }
    .project-item { margin-top: 8px; }
    .project-header { font-size: 11.5px; font-weight: 800; color: #0f172a; margin-bottom: 3px; }
    @media print {
      body { background: none; padding: 0; }
      .resume-page { border-radius: 0; box-shadow: none; border: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="resume-page">
    <header>
      <h1>${resumeData.name}</h1>
      <div class="contact-info">
        <span>Email: <a href="mailto:${resumeData.email}">${resumeData.email}</a></span>
        <span class="bullet-divider">&bull;</span>
        <span>Phone: ${resumeData.phone}</span>
        <span class="bullet-divider">&bull;</span>
        <span>LinkedIn: <a href="https://${resumeData.linkedin}" target="_blank">${resumeData.linkedin}</a></span>
      </div>
    </header>
    
    <div class="section">
      <div class="section-title">Objective</div>
      <p class="objective-text">${resumeData.objective}</p>
    </div>
    
    <div class="section">
      <div class="section-title">Education</div>
      <table class="education-table">
        <thead>
          <tr>
            <th>Qualification</th>
            <th>Institution</th>
            <th>Year</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="education-title">B.Tech (CSE – DS)</td>
            <td>Malla Reddy Deemed to be University</td>
            <td>2023-2027</td>
            <td class="education-grade">${resumeData.mrecGrade}</td>
          </tr>
          <tr>
            <td class="education-title">Intermediate (MPC)</td>
            <td>Sri Nalanda Junior College</td>
            <td>2021-2023</td>
            <td class="education-grade">${resumeData.intermediateGrade}</td>
          </tr>
          <tr>
            <td class="education-title">SSC</td>
            <td>Bala Bharathi Vidyalayam</td>
            <td>2021</td>
            <td class="education-grade">${resumeData.sscGrade} GPA</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <div class="section-title">Skills</div>
      <ul class="skills-list">
        <li><strong>Programming Languages:</strong> Python, Java.</li>
        <li><strong>Databases:</strong> MySQL, NoSQL (basics).</li>
        <li><strong>Web Technologies:</strong> HTML, CSS and JavaScript.</li>
        <li><strong>Concepts:</strong> Data Structures and Algorithms (DSA - Basic Knowledge).</li>
        <li><strong>Soft Skills:</strong> Communication, Teamwork, Public Speaking, Presentation Skills, Leadership.</li>
      </ul>
    </div>
    
    <div class="section">
      <div class="section-title">Projects</div>
      
      <div class="project-item">
        <div class="project-header">Drowsiness Detection in Drivers using Deep Learning</div>
        <ul style="list-style-type: disc; margin-left: 20px; font-size: 11px; color: #334155;">
          <li>Developed a deep learning–based system to detect driver drowsiness using real-time facial features like eye closure and head movement.</li>
          <li>Implemented computer vision models to trigger alerts and enhance road safety by preventing fatigue-related accidents.</li>
        </ul>
      </div>
      
      <div class="project-item" style="margin-top: 10px;">
        <div class="project-header">Diabetic Retinopathy Screener using Deep Learning (Django)</div>
        <ul style="list-style-type: disc; margin-left: 20px; font-size: 11px; color: #334155;">
          <li>Built a deep learning classifier model to identify retinopathy severity stages from retinal fundus images with high precision.</li>
          <li>Integrated the classifier model into an intuitive Django web application interface.</li>
        </ul>
      </div>

      <div class="project-item" style="margin-top: 10px;">
        <div class="project-header">Online Shopping Website</div>
        <ul style="list-style-type: disc; margin-left: 20px; font-size: 11px; color: #334155;">
          <li>Developed responsive web store layouts with search, dynamic detail listings, and fluid navigational structure support.</li>
        </ul>
      </div>
    </div>
    
    <div class="section">
      <div class="section-title">Awards and Certifications</div>
      
      <div class="award-item">
        <div class="award-header">Internship Certificate Holder | AimR Edu LLP | Hyderabad (May 2024)</div>
        <ul style="list-style-type: disc; margin-left: 20px; font-size: 11px; color: #334155;">
          <li>Practised enterprise application software programming and built interactive, data-driven analytical pipelines.</li>
        </ul>
      </div>
      
      <div class="award-item" style="margin-top: 10px;">
        <div class="award-header">Certificate of Completion: Python, DSA | TECH AUGUSTA Pvt Ltd | Hyderabad (2024)</div>
        <ul style="list-style-type: disc; margin-left: 20px; font-size: 11px; color: #334155;">
          <li>Successfully completed a comprehensive program focusing on Python programming algorithms and deep problem solving techniques.</li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "Shetti_Venu_Resume.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setResumeData({
      name: "SHETTI VENU",
      email: "venushetti21@gmail.com",
      phone: "7331178273",
      linkedin: "www.linkedin.com/in/venushetti",
      objective: "Enthusiastic and adaptable graduate with a background in Data Science, strong problem-solving abilities, and knowledge of Python, DBMS, and Java. Seeking an entry-level position in the IT industry where I can utilize my technical skills, learn new technologies, and contribute effectively to organizational goals.",
      mrecGrade: "9.18 (upto 5th Sem)",
      intermediateGrade: "9.88",
      sscGrade: "10"
    });
  };

  return (
    <div id="resume-builder" className="bg-[#121B2E]/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative transition-all duration-300">
      
      {/* Settings bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <h4 className="text-sm font-bold text-slate-200">Interactive Resume Builder & PDF Engine</h4>
          <p className="text-xs text-slate-500">Edit fields below to dynamically update Venu's print-certified CV format.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-1.5 bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
          >
            {isEditing ? <Check size={12} className="text-blue-400" /> : <Edit3 size={11} />}
            {isEditing ? "Finish Editing" : "Configure CV Fields"}
          </button>
          
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-slate-400 rounded-lg text-xs"
            title="Reset to original details"
          >
            <RefreshCw size={11} />
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow transition-colors"
          >
            <Download size={12} />
            Download Resume
          </button>
        </div>
      </div>

      {/* Editor Modal Drawer if configuring */}
      {isEditing && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4.5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-mono block">FULL NAME</label>
            <input
              type="text"
              value={resumeData.name}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
              className="w-full bg-[#121B2E] text-slate-200 border border-slate-850 rounded px-2.5 py-1.5 text-xs outline-none focus:border-blue-600 transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-mono block">EMAIL ADDRESS</label>
            <input
              type="email"
              value={resumeData.email}
              onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
              className="w-full bg-[#121B2E] text-slate-200 border border-slate-850 rounded px-2.5 py-1.5 text-xs outline-none focus:border-blue-600 transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-mono block">PHONE NUMBER</label>
            <input
              type="text"
              value={resumeData.phone}
              onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
              className="w-full bg-[#121B2E] text-slate-200 border border-slate-850 rounded px-2.5 py-1.5 text-xs outline-none focus:border-blue-600 transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-mono block">LINKEDIN LINK</label>
            <input
              type="text"
              value={resumeData.linkedin}
              onChange={(e) => setResumeData({ ...resumeData, linkedin: e.target.value })}
              className="w-full bg-[#121B2E] text-slate-200 border border-slate-850 rounded px-2.5 py-1.5 text-xs outline-none focus:border-blue-600 transition"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-[10px] text-slate-500 font-mono block">PROFESSIONAL OBJECTIVE</label>
            <textarea
              value={resumeData.objective}
              onChange={(e) => setResumeData({ ...resumeData, objective: e.target.value })}
              rows={3}
              className="w-full bg-[#121B2E] text-slate-200 border border-slate-850 rounded px-2.5 py-1.5 text-xs outline-none focus:border-blue-600 transition font-sans"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-mono block">B.TECH GPA</label>
            <input
              type="text"
              value={resumeData.mrecGrade}
              onChange={(e) => setResumeData({ ...resumeData, mrecGrade: e.target.value })}
              className="w-full bg-[#121B2E] text-slate-200 border border-slate-850 rounded px-2.5 py-1.5 text-xs outline-none focus:border-blue-600 transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-mono block">INTERMEDIATE GPA</label>
            <input
              type="text"
              value={resumeData.intermediateGrade}
              onChange={(e) => setResumeData({ ...resumeData, intermediateGrade: e.target.value })}
              className="w-full bg-[#121B2E] text-slate-200 border border-slate-850 rounded px-2.5 py-1.5 text-xs outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>
      )}

      {/* Styled Physical Resume Box (Classic layout mimicking original document formatting) */}
      <div className="bg-white text-zinc-900 p-8 rounded-xl shadow-2xl max-w-2xl mx-auto border border-zinc-200 font-sans leading-normal overflow-x-auto print:border-none print:shadow-none print:p-0 print:max-w-full">
        
        {/* Core Header */}
        <div className="text-center space-y-2 border-b-2 border-zinc-900 pb-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">{resumeData.name}</h1>
          <p className="text-xs text-neutral-600 font-medium">
            Email: <span className="text-blue-600 underline">{resumeData.email}</span> | Phone: {resumeData.phone}
          </p>
          <p className="text-xs text-blue-600 underline font-medium">
            LinkedIn: <a href={`https://${resumeData.linkedin}`} target="_blank" rel="noreferrer">{resumeData.linkedin}</a>
          </p>
        </div>

        {/* Objective */}
        <div className="mt-5 space-y-2">
          <h2 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-zinc-400 pb-1">
            Objective
          </h2>
          <p className="text-[11.5px] text-neutral-700 leading-relaxed text-left font-normal">
            {resumeData.objective}
          </p>
        </div>

        {/* Education Database representation matches original table */}
        <div className="mt-5 space-y-2">
          <h2 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-zinc-400 pb-1">
            Education
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b-2 border-zinc-300 text-neutral-800 font-bold">
                  <th className="py-1.5 pr-3">Qualification</th>
                  <th className="py-1.5 pr-3">Institution</th>
                  <th className="py-1.5 pr-3">Year</th>
                  <th className="py-1.5">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr className="text-neutral-700 font-medium">
                  <td className="py-1.5 font-bold">B.Tech (CSE – DS)</td>
                  <td className="py-1.5">Malla Reddy Engineering College</td>
                  <td className="py-1.5">2023-2027</td>
                  <td className="py-1.5 text-neutral-950 font-bold">{resumeData.mrecGrade}</td>
                </tr>
                <tr className="text-neutral-700">
                  <td className="py-1.5 font-bold">Intermediate (MPC)</td>
                  <td className="py-1.5">Sri Nalanda Junior College</td>
                  <td className="py-1.5">2021-2023</td>
                  <td className="py-1.5 text-neutral-950 font-bold">{resumeData.intermediateGrade}</td>
                </tr>
                <tr className="text-neutral-700">
                  <td className="py-1.5 font-bold">SSC</td>
                  <td className="py-1.5">Bala Bharathi Vidyalayam</td>
                  <td className="py-1.5">2021</td>
                  <td className="py-1.5 text-neutral-950 font-bold">{resumeData.sscGrade}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-5 space-y-2">
          <h2 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-zinc-400 pb-1">
            Skills
          </h2>
          <ul className="text-[11px] text-neutral-700 space-y-1 font-normal list-none pl-0">
            <li><strong>Programming Languages:</strong> Python, Java.</li>
            <li><strong>Databases:</strong> MySQL, NoSQL (basics).</li>
            <li><strong>Web Technologies:</strong> HTML, CSS and JavaScript.</li>
            <li><strong>Concepts:</strong> Data Structures and Algorithms (DSA - Basic Knowledge).</li>
            <li><strong>Soft Skills:</strong> Communication, Teamwork, Public Speaking, Presentation Skills, Leadership.</li>
          </ul>
        </div>

        {/* Projects */}
        <div className="mt-5 space-y-3">
          <h2 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-zinc-400 pb-1">
            Projects
          </h2>
          
          {/* Proj 1 */}
          <div className="space-y-1">
            <h3 className="text-[11.5px] font-black text-neutral-900">Drowsiness Detection in Drivers using Deep Learning</h3>
            <ul className="list-disc pl-4 text-[11px] text-neutral-700 space-y-0.5">
              <li>Developed a deep learning–based system to detect driver drowsiness using real-time facial features like eye closure and head movement.</li>
              <li>Implemented computer vision models to trigger alerts and enhance road safety by preventing fatigue-related accidents.</li>
            </ul>
          </div>

          {/* Proj 2 */}
          <div className="space-y-1">
            <h3 className="text-[11.5px] font-black text-neutral-900">Diabetic Retinopathy using Deep Learning using Django</h3>
            <ul className="list-disc pl-4 text-[11px] text-neutral-700 space-y-0.5">
              <li>Built a deep learning model to detect diabetic retinopathy from retinal images with high accuracy.</li>
              <li>Integrated the model into a Django web application for automated screening and early diagnosis support.</li>
            </ul>
          </div>
        </div>

        {/* Awards and Certifications matches the second page of original doc */}
        <div className="mt-5 space-y-3.5">
          <h2 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-zinc-400 pb-1">
            Awards and Certifications
          </h2>
          
          <div className="space-y-1">
            <h3 className="text-[11.5px] font-bold text-neutral-900">
              Internship Certificate Holder | AimR Edu LLP | [Hyderabad] [May 2024]
            </h3>
            <ul className="list-disc pl-4 text-[11px] text-neutral-700">
              <li>Completed an internship program. Applied foundational programming knowledge in a professional setting.</li>
            </ul>
          </div>

          <div className="space-y-1">
            <h3 className="text-[11.5px] font-bold text-neutral-900">
              Certificate of Completion: Python, DSA | TECH AUGUSTA Pvt Ltd | [Hyderabad] 2024
            </h3>
            <ul className="list-disc pl-4 text-[11px] text-neutral-700 space-y-0.5">
              <li>Successfully completed a comprehensive program focusing on Python programming and Data Structures & Algorithms.</li>
              <li>Developed a strong understanding of core programming concepts and efficient problem-solving techniques.</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="mt-4 flex items-start gap-2 bg-zinc-950/40 p-3 rounded-lg border border-zinc-850">
        <BadgeInfo size={14} className="text-emerald-450 shrink-0 mt-0.5" />
        <p className="text-[10px] text-zinc-550 leading-normal">
          <strong>Tip for Chrome:</strong> When clicking "Print", select "Save as PDF" as the Destination, set Margins to "Default", and enable "Background Graphics" inside the options panel to preserve clean layout structure!
        </p>
      </div>

    </div>
  );
}
