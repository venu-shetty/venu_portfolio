export interface AcademicRecord {
  id: string;
  qualification: string;
  institution: string;
  year: string;
  grade: string;
  maxGrade: string;
  details: string;
  percentage?: string;
}

export interface SkillNode {
  name: string;
  level: number; // 0 to 100
  category: "language" | "database" | "web" | "concept" | "softskill";
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  location: string;
  year: string | number;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  tags: string[];
  demoType: "drowsiness" | "retinopathy" | "none";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
