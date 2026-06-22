import { useState, useEffect, useRef } from "react";
import { Eye, ShieldAlert, BadgeCheck, Bell, Sparkles, RefreshCw, AlertTriangle, Monitor } from "lucide-react";

export default function DrowsinessSimulator() {
  const [eyeClosure, setEyeClosure] = useState(30); // Percentage
  const [headTilt, setHeadTilt] = useState(15); // Degrees
  const [isSimulating, setIsSimulating] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [fatigueScore, setFatigueScore] = useState(15);
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Fatigue score logic formulas
  useEffect(() => {
    // Score increases exponentially as eye closure and head tilt exceed normal parameters
    const eyeWeight = (eyeClosure - 20) > 0 ? (eyeClosure - 20) * 1.6 : 0;
    const tiltWeight = (headTilt - 15) > 0 ? (headTilt - 15) * 1.8 : 0;
    const calculated = Math.min(Math.round(10 + eyeWeight + tiltWeight), 100);
    setFatigueScore(calculated);

    if (calculated >= 75) {
      setAlarmTriggered(true);
      triggerAudioAlarm();
    } else {
      setAlarmTriggered(false);
    }
  }, [eyeClosure, headTilt]);

  // Synthesize warning alarm beep safely using HTML5 Web Audio
  const triggerAudioAlarm = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch alarm A5
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime); // Quiet alert volume
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); // Fade out quickly
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      // Audio fallback
    }
  };

  // Draw simulated face mesh with dots mapping
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Background Matrix Grid if simulating
    if (cameraActive) {
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 15) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 15) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }
    }

    // Apply rotation for Head Tilt
    ctx.save();
    ctx.translate(centerX, centerY);
    const rotationRad = (headTilt * Math.PI) / 180;
    ctx.rotate(rotationRad);

    // Face boundary outline (oval)
    ctx.strokeStyle = alarmTriggered ? "rgba(239, 68, 68, 0.8)" : "rgba(59, 130, 246, 0.4)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 60, 80, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw grid bounds coordinates targeting the face
    if (cameraActive) {
      ctx.fillStyle = alarmTriggered ? "rgba(239, 68, 68, 0.15)" : "rgba(59, 130, 246, 0.05)";
      ctx.beginPath();
      ctx.ellipse(0, 0, 60, 80, 0, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Eyes - Left Eye (height correlates to inverse of eyeClosure percentage)
    const eyeOpenFactor = Math.max(0.1, (100 - eyeClosure) / 100);
    ctx.fillStyle = alarmTriggered ? "#f87171" : "#60a5fa";
    
    // Left Eye
    ctx.beginPath();
    ctx.ellipse(-22, -15, 12, 12 * eyeOpenFactor, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Pupil
    ctx.fillStyle = "#020617";
    ctx.beginPath();
    ctx.arc(-22, -15, 4 * eyeOpenFactor, 0, 2 * Math.PI);
    ctx.fill();

    // Right Eye
    ctx.fillStyle = alarmTriggered ? "#f87171" : "#60a5fa";
    ctx.beginPath();
    ctx.ellipse(22, -15, 12, 12 * eyeOpenFactor, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Pupil
    ctx.fillStyle = "#020617";
    ctx.beginPath();
    ctx.arc(22, -15, 4 * eyeOpenFactor, 0, 2 * Math.PI);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = alarmTriggered ? "#fca5a5" : "#3b82f6";
    ctx.lineWidth = 3;
    // Slanted eyebrows depending on eyelid exhaustion
    const browSlant = eyeClosure > 60 ? 5 : 0;
    ctx.beginPath();
    ctx.moveTo(-35, -28 + browSlant);
    ctx.lineTo(-12, -25);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(35, -28 + browSlant);
    ctx.lineTo(12, -25);
    ctx.stroke();

    // Nose line
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(0, 15);
    ctx.lineTo(-5, 15);
    ctx.stroke();

    // Mouth / Jaw (slight arc opening if yawning!)
    ctx.fillStyle = alarmTriggered ? "#ef4444" : "#1e293b";
    ctx.strokeStyle = alarmTriggered ? "#ef4444" : "#3b82f6";
    ctx.lineWidth = 2.5;
    const mouthYawnFactor = eyeClosure > 70 ? 12 : 3;
    ctx.beginPath();
    ctx.ellipse(0, 35, 16, mouthYawnFactor, 0, 0, 2 * Math.PI);
    eyeClosure > 70 ? ctx.fill() : ctx.stroke();

    // Draw Facial Landmarks Nodes (Deep Learning Keypoints Simulation)
    ctx.fillStyle = alarmTriggered ? "#fca5a5" : "#60a5fa";
    const landmarkDots = [
      [-60, 0], [60, 0], [0, -80], [0, 80], // Facial bounding nodes
      [-22, -15], [22, -15], // Eyes
      [-30, -28], [30, -28], // Eyebrows
      [0, 35], [-16, 35], [16, 35] // Lips
    ];

    landmarkDots.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.restore();

    // Overlay boundary box targeting simulation
    if (cameraActive) {
      ctx.strokeStyle = alarmTriggered ? "rgba(239, 68, 68, 0.7)" : "rgba(59, 130, 246, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(centerX - 80, centerY - 95, 160, 190);
      
      // Tracking Text details
      ctx.fillStyle = alarmTriggered ? "#ef4444" : "#3b82f6";
      ctx.font = "bold 9px monospace";
      ctx.fillText(`EAR_RATIO: ${Math.max(0.08, (100 - eyeClosure) / 300).toFixed(2)}`, centerX - 75, centerY - 80);
      ctx.fillText(`HEAD_TILT: ${headTilt}°`, centerX - 75, centerY - 68);
    }
  }, [eyeClosure, headTilt, cameraActive, alarmTriggered]);

  const presetDrowsy = () => {
    setEyeClosure(85);
    setHeadTilt(38);
  };

  const presetHealthy = () => {
    setEyeClosure(18);
    setHeadTilt(2);
  };

  return (
    <div id="drowsiness-simulator" className="bg-[#121B2E]/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Absolute red blink overlay */}
      {alarmTriggered && (
        <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none border-2 border-red-500/80 rounded-2xl" />
      )}
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Visual Terminal Canvas */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative bg-zinc-950 rounded-xl p-3 border border-zinc-850 w-full max-w-[280px]">
            {/* Camera Status lights */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${cameraActive ? "bg-blue-500 animate-pulse" : "bg-zinc-700"}`} />
                <span className="text-[10px] text-zinc-500 font-mono">
                  {cameraActive ? "LIVE_FACIAL_FEED" : "STANDBY"}
                </span>
              </div>
              <span className="text-[9px] text-zinc-600 font-mono">30 FPS | CV_CORE</span>
            </div>

            <div className="bg-slate-950 flex items-center justify-center rounded-lg overflow-hidden border border-zinc-900/60 h-[210px]">
              <canvas
                ref={canvasRef}
                width={240}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Simulated UI scanner elements overlay */}
            {cameraActive && (
              <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[9px] text-blue-400">
                <span>[SCANNING_GRID_POINT]</span>
                <span className={alarmTriggered ? "text-red-400 animate-pulse" : ""}>
                  {alarmTriggered ? "FATIGUE_CRITICAL" : "MONITOR_SAFE"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setCameraActive(!cameraActive)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border flex items-center gap-1.5 transition ${
                cameraActive
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                  : "bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700"
              }`}
            >
              <Monitor size={12} />
              {cameraActive ? "Disable Camera Mesh" : "Trigger Camera Model"}
            </button>
          </div>
        </div>

        {/* Dashboard Control panel */}
        <div className="flex-1 space-y-5 font-sans">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-205">Driver Fatigue Assessment</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Processes eyelid closure (EAR) & spatial head rotation constraints.
              </p>
            </div>
            {alarmTriggered ? (
              <span className="flex items-center bg-red-950/60 border border-red-850 px-2.5 py-1 rounded text-[11px] font-semibold text-red-400 animate-bounce">
                <AlertTriangle size={12} className="mr-1.5 text-red-400" />
                SIREN ALARM
              </span>
            ) : (
              <span className="flex items-center bg-slate-950 border border-slate-800 px-2.5 py-1 rounded text-[11px] text-slate-400">
                <BadgeCheck size={12} className="mr-1.5 text-blue-400" />
                SYSTEM SECURE
              </span>
            )}
          </div>

          {/* Radial/Bar Level */}
          <div className="bg-[#0F172A] border border-slate-850 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium font-mono">Fatigue Safety score (%):</span>
              <span
                className={`text-sm font-bold font-mono ${
                  fatigueScore >= 75 ? "text-red-400" : fatigueScore >= 45 ? "text-amber-400" : "text-blue-400"
                }`}
              >
                {fatigueScore}%
              </span>
            </div>
            
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  fatigueScore >= 75 ? "bg-red-500" : fatigueScore >= 45 ? "bg-amber-500" : "bg-blue-500"
                }`}
                style={{ width: `${fatigueScore}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-400 leading-normal font-mono pt-1">
              {fatigueScore >= 75
                ? "WARNING: Eyelid closure surpassed maximum drowsiness parameters (3.2s index threshold). Dispatching physical sound alarm in vehicle."
                : fatigueScore >= 45
                ? "NOTICE: Slight drowsiness threshold detected. Advising rest point suggestion in navigation dashboard."
                : "STATUS: Vigilant state. Eyelid movement and head positioning are within safe operational limits."}
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-300">Eyelid Closure (Exhaustion Level %):</label>
                <span className="text-slate-450 font-mono text-xs">{eyeClosure}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={eyeClosure}
                onChange={(e) => {
                  setEyeClosure(parseInt(e.target.value));
                  if (!cameraActive) setCameraActive(true);
                }}
                className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-300">Head Tilting angle (Nodding °):</label>
                <span className="text-slate-450 font-mono text-xs">{headTilt}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={headTilt}
                onChange={(e) => {
                  setHeadTilt(parseInt(e.target.value));
                  if (!cameraActive) setCameraActive(true);
                }}
                className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Quick preset trigger buttons */}
          <div className="flex gap-2.5 pt-1">
            <button
              onClick={presetHealthy}
              className="px-3.5 py-1.5 bg-[#0F172A] border border-slate-800 text-slate-300 rounded-lg text-xs hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer font-medium"
            >
              <RefreshCw size={11} className="text-blue-400" />
              Preset: Active Driver
            </button>
            <button
              onClick={presetDrowsy}
              className="px-3.5 py-1.5 bg-[#0F172A] border border-slate-800 text-slate-300 rounded-lg text-xs hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer font-medium"
            >
              <AlertTriangle size={11} className="text-rose-455" />
              Preset: Exhausted Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
