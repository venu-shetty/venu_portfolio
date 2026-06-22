import React, { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Play, RotateCcw, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LogLine {
  text: string;
  type: "input" | "info" | "success" | "warn" | "error" | "output";
}

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<LogLine[]>([
    { text: "System Initialized. Shetti Venu OS [v1.0.0]", type: "info" },
    { text: "B.Tech CSE - Data Science Environment Active", type: "success" },
    { text: "Type 'help' to view available interactive simulations.", type: "warn" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    const newLogs: LogLine[] = [{ text: `venu@portfolio:~$ ${cmdStr}`, type: "input" }];

    if (cleanCmd === "help") {
      newLogs.push(
        { text: "Available CLI Commands representing Venu's tech skill matrix:", type: "info" },
        { text: "  python drowsiness_model.py  - Run simulated facial keypoint tracking algorithm", type: "output" },
        { text: "  python retinopathy_cnn.py    - Simulate diagnostic AI screening on eye scans", type: "output" },
        { text: "  java optimized_sort.java     - Execute DSA algorithm comparing quicksort to mergesort", type: "output" },
        { text: "  mysql -u recruiter -p        - Access Venu's custom SQL relational database console", type: "output" },
        { text: "  clear                        - Wipe the terminal output buffer", type: "output" },
        { text: "  help                         - Display this diagnostic guide", type: "output" }
      );
    } else if (cleanCmd === "clear") {
      setHistory([]);
      return;
    } else if (cleanCmd.startsWith("python drowsiness_model.py")) {
      newLogs.push(
        { text: "Initializing TensorFlow 2.15 Core environment...", type: "info" },
        { text: "Loading custom drowsiness_detection_weights.weights.h5", type: "info" },
        { text: "Parsing landmarks: Left-Eye MAR (0.16) | Right-Eye MAR (0.17) | Head tilt (12°)", type: "info" },
        { text: "Frame 12-48: Eye closure persistence detected (> 3.2 seconds)", type: "warn" },
        { text: ">>> HIGH COMPLIANCE WARNING: DRIVER SOLEMN STATE DETECTED", type: "error" },
        { text: "Action Triggered: Audio Alarm Siren Initiated at 95dB", type: "success" },
        { text: "Process executed successfully. Speed: 32 FPS.", type: "success" }
      );
    } else if (cleanCmd.startsWith("python retinopathy_cnn.py")) {
      newLogs.push(
        { text: "Spinning up Django REST server integration on port 8000...", type: "info" },
        { text: "Processing client fundus crop file: patient_scan_9918.png", type: "info" },
        { text: "Convolution layer 1 -> MaxPool -> Conv layer 2 -> Dense Dropout", type: "info" },
        { text: "Analyzing pixel discrepancies in macular layer...", type: "info" },
        { text: "Microaneurysms detected: 8. Hemorrhages noticed: 3. Exudates: None.", type: "warn" },
        { text: "Result: Severe Non-Proliferative Retinopathy detected with 94.2% model confidence.", type: "error" },
        { text: "Django feedback dispatching JSON payload to clinician dashboard.", type: "success" }
      );
    } else if (cleanCmd.startsWith("java optimized_sort.java")) {
      newLogs.push(
        { text: "Compiling OptimizedSort.java utilizing JDK 21 compiler...", type: "info" },
        { text: "Populating testing workspace with 5,000,000 randomized integers...", type: "info" },
        { text: "Running Standard Mergesort with extra heap bounds...", type: "info" },
        { text: "Mergesort duration: 184 milliseconds. Space complexity: O(N).", type: "output" },
        { text: "Running In-Place Quicksort with dual pivots (DSA strategy)...", type: "info" },
        { text: "Quicksort duration: 112 milliseconds. Space complexity: O(log N).", type: "output" },
        { text: "Algorithm Traversal Complete: Optimized In-place pivot saves 39.1% execution latency.", type: "success" }
      );
    } else if (cleanCmd.startsWith("mysql")) {
      newLogs.push(
        { text: "Entering MySQL Monitor (v8.0.32). Connection ID: 1045", type: "info" },
        { text: "Welcome. Your commands should end with ';'.", type: "info" },
        { text: "Try querying tables! Type: 'SELECT * FROM credentials;'", type: "warn" }
      );
    } else if (cleanCmd === "select * from credentials;") {
      newLogs.push(
        { text: "+-------------------+-----------------------------------+-------+", type: "output" },
        { text: "| Qualification     | Institution                       | Grade |", type: "output" },
        { text: "+-------------------+-----------------------------------+-------+", arrogance_level: 100 } as any,
        { text: "| B.Tech (CSE - DS) | Malla Reddy Deemed to be Univ.    | 9.18  |", type: "output" },
        { text: "| Intermediate MPC  | Sri Nalanda Junior College        | 9.88  |", type: "output" },
        { text: "| SSC               | Bala Bharathi Vidyalayam          | 10.0  |", type: "output" },
        { text: "+-------------------+-----------------------------------+-------+", type: "output" },
        { text: "3 rows in set (0.01 sec)", type: "success" }
      );
    } else if (cleanCmd === "show tables;") {
      newLogs.push(
        { text: "+-------------------------+", type: "output" },
        { text: "| Tables_in_venu_db       |", type: "output" },
        { text: "+-------------------------+", type: "output" },
        { text: "| credentials             |", type: "output" },
        { text: "| projects                |", type: "output" },
        { text: "| certificates            |", type: "output" },
        { text: "+-------------------------+", type: "output" },
        { text: "3 rows in set (0.00 sec)", type: "success" }
      );
    } else if (cleanCmd === "select * from projects;") {
      newLogs.push(
        { text: "+------+---------------------------------+----------------------------------+", type: "output" },
        { text: "| ID   | Project Title                   | Primary Architecture             |", type: "output" },
        { text: "+------+---------------------------------+----------------------------------+", type: "output" },
        { text: "| DS01 | Driver Drowsiness Detector      | TensorFlow, OpenCV, Facial Landmarks |", type: "output" },
        { text: "| DS02 | Diabetic Retinopathy Django App | CNN, Django, Clinical Fundus Scans |", type: "output" },
        { text: "+------+---------------------------------+----------------------------------+", type: "output" },
        { text: "2 rows in set (0.01 sec)", type: "success" }
      );
    } else {
      newLogs.push({
        text: `Command '${cmdStr}' not recognized. Try running 'help' for a lists of custom simulators built into the application.`,
        type: "error"
      });
    }

    setHistory((prev) => [...prev, ...newLogs]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="bg-slate-950 font-mono text-zinc-300 text-xs rounded-xl overflow-hidden border border-zinc-800 shadow-2xl h-80 flex flex-col">
      {/* Tab bar */}
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-zinc-850">
        <div className="flex items-center space-x-2">
          {/* Mac buttons */}
          <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
          <span className="ml-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            venu_data_science_console
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[10px] text-zinc-500">
          <span className="flex items-center text-emerald-500 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
            ENV_STABILIZED
          </span>
        </div>
      </div>

      {/* Output list */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-700">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === "input" && (
              <span className="text-zinc-400 font-semibold">{line.text}</span>
            )}
            {line.type === "info" && (
              <span className="text-blue-400">{line.text}</span>
            )}
            {line.type === "success" && (
              <span className="text-emerald-400">✔ {line.text}</span>
            )}
            {line.type === "warn" && (
              <span className="text-amber-400">⚠ {line.text}</span>
            )}
            {line.type === "error" && (
              <span className="text-rose-400 font-bold">✖ {line.text}</span>
            )}
            {line.type === "output" && (
              <span className="text-zinc-300 whitespace-pre-wrap">{line.text}</span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input row */}
      <div className="bg-slate-950/80 p-3 border-t border-zinc-850 flex items-center space-x-2">
        <span className="text-zinc-500">venu@portfolio:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' or run 'python drowsiness_model.py'..."
          className="flex-1 bg-transparent border-none text-zinc-100 outline-none focus:ring-0"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="text-emerald-500 hover:text-emerald-400 cursor-pointer p-1"
          title="Run query"
        >
          <Play size={14} className="fill-current" />
        </button>
      </div>
    </div>
  );
}
