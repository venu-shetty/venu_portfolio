import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(express.json());

  // Verify Gemini API Key exists
  const hasApiKey = !!process.env.GEMINI_API_KEY;
  if (!hasApiKey) {
    console.warn("[Warning]: GEMINI_API_KEY environment variable is not defined. AI Assistant will operate in fallback mode.");
  }

  // Initialize server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "stub-key",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  const SYSTEM_INSTRUCTION = `You are "Venu's AI Assistant", a professional and creative virtual twin representing Shetti Venu. Your job is to answer questions from recruiters, hiring managers, and collaborators who are visiting Venu's portfolio website.

Here is Venu's verified profile data from his resume:

- Name: Shetti Venu
- Role: Data Science student, Deep Learning Developer, Software Engineer
- Email: venushetti21@gmail.com
- Phone: +91 7331178273
- LinkedIn: https://www.linkedin.com/in/venushetti
- Professional Photo is present on his landing card representing a sharp, formal young developer in a deep charcoal blazer.
- Education:
  * Bachelor of Technology (B.Tech) in CSE - Data Science at Malla Reddy Engineering College (2023-2027). Current GPA: 9.18 / 10 (completed up to 5th Semester with outstanding results).
  * Intermediate (Maths, Physics, Chemistry - MPC) at Sri Nalanda Junior College (2021-2023), scored 9.88 / 10 GPA.
  * SSC at Bala Bharathi Vidyalayam (2021), scored 10 / 10 CGPA.
- Technical Skills:
  * Programming Languages: Python, Java, HTML, CSS, JavaScript (actively learning React for web applications).
  * Databases: MySQL, NoSQL (basics like MongoDB, Firebase).
  * Core ML Concepts: Advanced Deep Learning, Computer Vision (CNN architectures), Image Classification, Facial Landmark Tracking, Real-time Alert Systems.
  * Web Technologies: Django, HTML5, CSS3, JavaScript. React is actively leveraged for creating high-performance browser simulators.
  * Soft Skills: Strong verbal and written communication, active leadership, public speaking, presentation skills, seamless team collaboration and adaptability.
- Projects:
  1. Drowsiness Detection in Drivers using Deep Learning
     - Built a deep learning-based alert system that extracts facial landmarks (eye closure ratios and head tilting) in real-time.
     - Implemented specialized CV models to trigger high-priority alerts to improve transit safety and mitigate fatigue-related highway risks.
  2. Diabetic Retinopathy screening with Django & Deep Learning
     - Engineered a highly accurate deep learning convolutional model loaded onto a Django medical web application.
     - Processes fundus photographs of the retina to spot early indicators of diabetes-induced vision threats, rendering analytical reports.
- Certificates & Corporate Experience:
  * Research & Dev Intern | AimR Edu LLP [Hyderabad] [May 2024]
    - Completed structured training program. Successfully deployed foundational programming, ML pipelines, and algorithms in simulated corporate deployments.
  * Machine Learning Program Cert | TECH AUGUSTA Pvt Ltd [Hyderabad] 2024
    - Successfully mastered deep structures in Python and Data Structures and Algorithms (DSA) with high algorithmic performance.

Guidelines for your responses:
- Keep your tone helpful, professional, warm, and highly analytical.
- Always describe Venu in the third person context (e.g. "Venu developed...", "He is currently a student...") or represent yourself as his dedicated virtual proxy.
- Provide clean, formatting-rich markdown (bullets, bold labels, small tables if appropriate). Keep answers concise and strictly actionable.
- If recruiters inquire about his contact details, share his email (venushetti21@gmail.com), phone (+91 7331178273) and LinkedIn profile immediately.
- If asked about items or skills not explicitly in the resume, admit nicely that you do not have that data, but emphasize his continuous learning philosophy as a Data Science student. Ensure you never synthesize mock credentials.`;

  // API endpoint for Portfolio AI Companion Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        // Mock fallback mode if API key is not present so the app remains fully functional
        const lastMessage = messages[messages.length - 1]?.content || "hello";
        let mockResponse = "Hello! I am Venu's AI Assistant running in demo fallback mode. I'd be happy to share details about Venu! He is a Data Science B.Tech student graduating in 2027 from Malla Reddy Engineering College with a 9.18 CGPA. He has completed cool ML projects like Driver Drowsiness Detection and Diabetic Retinopathy screening!";
        
        if (lastMessage.toLowerCase().includes("project") || lastMessage.toLowerCase().includes("work")) {
          mockResponse = "Venu has completed two core deep learning projects: \n1. **Driver Drowsiness Detection**: An alert system focused on real-time facial feature tracking.\n2. **Diabetic Retinopathy Screening**: A Django web application utilizing CNNs to analyze retinal images.";
        } else if (lastMessage.toLowerCase().includes("skill") || lastMessage.toLowerCase().includes("language")) {
          mockResponse = "Venu is highly skilled in: \n- **Languages**: Python, Java, HTML, CSS, JavaScript\n- **Databases**: MySQL, NoSQL basics\n- **Domain**: Deep Learning, Computer Vision, DSA, Django, Web Development.";
        } else if (lastMessage.toLowerCase().includes("contact") || lastMessage.toLowerCase().includes("email")) {
          mockResponse = "You can contact Venu directly at **venushetti21@gmail.com** or call him at **+91 7331178273**. His LinkedIn URL is linkedin.com/in/venushetti.";
        }
        
        res.json({ text: mockResponse });
        return;
      }

      // Map incoming generic chat history to Gemini SDK parts
      const mappedContents = messages.map((m: any) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content || m.text || "" }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: mappedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error in /api/chat:", error);
      res.status(500).json({ error: error?.message || "An error occurred while generating response" });
    }
  });

  // Serve static assets in production, else use Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Portfolio backend listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
