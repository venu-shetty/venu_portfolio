import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, Database, RefreshCw, Star, Info } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to new chat elements smoothly
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "msg-welcome",
          role: "assistant",
          content: "Hello! I am **Venu's Portfolio Assistant**, powered by **Gemini 3.5**. Ask me anything about Venu's B.Tech coursework, deep learning projects, core technical skills (Python, Java, DSA), or corporate certifications!",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Direct call to our custom full-stack Express service proxying the server API key safely
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact API chatbot proxy");
      }

      const responseData = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: responseData.text || "I was unable to formulate a response. Please ask me about his ML certificates or engineering benchmarks!",
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          content: "Hello! I encountered a temporary connection glitch. However, as Venu's backup twin, I can verify that he is highly skilled in **Python, Java, Deep Learning, and DSA**, and recently completed his AimR Edu LLP research internship details in May 2024!",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const QUICK_PROMPTS = [
    "Tell me about his ML projects",
    "What are his exact B.Tech GPA scores?",
    "Where did he complete certificates?",
    "Show his email & contact detail"
  ];

  // Helper function to render simple markdown bold and bullet points cleanly
  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return (
      <div className="space-y-1.5 leading-normal text-xs md:text-sm font-sans font-normal text-zinc-350">
        {lines.map((line, idx) => {
          let cleanLine = line;
          
          // Bullet lines check
          const isBullet = cleanLine.startsWith("- ") || cleanLine.startsWith("* ") || cleanLine.startsWith("• ");
          if (isBullet) {
            cleanLine = cleanLine.substring(2);
          }

          // Simple double-asterisk replacement for bold tags
          const parts = cleanLine.split("**");
          const renderedText = parts.map((part, pIdx) => {
            if (pIdx % 2 === 1) {
              return <strong key={pIdx} className="font-bold text-zinc-100 font-medium">{part}</strong>;
            }
            return part;
          });

          if (isBullet) {
            return (
              <li key={idx} className="list-disc ml-4 list-outside text-zinc-300">
                <span>{renderedText}</span>
              </li>
            );
          }

          if (cleanLine.trim() === "") {
            return <div key={idx} className="h-2" />;
          }

          return <p key={idx}>{renderedText}</p>;
        })}
      </div>
    );
  };  return (
    <div id="ai-chat" className="bg-[#121B2E] border border-slate-800 rounded-2xl flex flex-col h-[400px] overflow-hidden shadow-xl transition">
      
      {/* Header bar */}
      <div className="bg-gradient-to-r from-blue-950/20 via-slate-900 to-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative">
            <span className="w-2 h-2 rounded-full bg-blue-400 absolute top-0.5 right-0.5 animate-pulse" />
            <Sparkles size={14} className="text-blue-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-sans">Recruiter Twin Assistant</h4>
            <span className="text-[10px] text-slate-500 font-mono">Gemini 2.0 LLM Active</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
          <Database size={11} className="text-blue-400" />
          <span>No-Auth Sandbox</span>
        </div>
      </div>

      {/* Message Output Viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/30 scrollbar-thin scrollbar-thumb-zinc-805">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            {/* Avatar Node */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
              m.role === "user"
                ? "bg-slate-850 border-slate-750 text-slate-300"
                : "bg-blue-500/10 border-blue-500/20 text-blue-400"
            }`}>
              {m.role === "user" ? <User size={13} /> : <Sparkles size={11} />}
            </div>

            {/* Bubble */}
            <div className={`rounded-2xl px-3.5 py-2.5 shadow-sm text-slate-200 ${
              m.role === "user"
                ? "bg-blue-600 text-white rounded-tr-none"
                : "bg-slate-900 rounded-tl-none border border-slate-800"
            }`}>
              {renderMessageContent(m.content)}
              <span className="text-[8px] text-slate-500 block text-right mt-1 font-mono">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 text-blue-400 flex items-center justify-center shrink-0">
              <RefreshCw size={11} className="animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-slate-400 text-xs font-mono">
              Consolidating Venu's database records...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Prompt Suggestions Drawer */}
      <div className="bg-[#0F172A] px-4 py-2 border-t border-slate-800 flex gap-2 overflow-x-auto scrollbar-none items-center">
        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider shrink-0 mr-1 flex items-center">
          <Info size={10} className="mr-1 text-blue-400" />
          Queries:
        </span>
        {QUICK_PROMPTS.map((prompt, pIdx) => (
          <button
            key={pIdx}
            onClick={() => handleSendMessage(prompt)}
            className="px-3 py-1 bg-slate-900 border border-slate-850 rounded-full text-[10.5px] text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition shrink-0 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form Footer */}
      <div className="bg-slate-900 p-3 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
          placeholder="Ask Venu's digital twin about his tech stacks..."
          className="flex-1 bg-[#121B2E] text-slate-200 border border-slate-800 rounded-xl px-4 py-2 text-xs md:text-sm outline-none focus:border-blue-600 transition font-sans"
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition shrink-0"
        >
          <Send size={14} />
        </button>
      </div>

    </div>
  );
}
