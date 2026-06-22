import { useState, useRef, useEffect } from "react";
import { Eye, ShieldAlert, Sparkles, RefreshCw, Upload, FileText, BadgeCheck, Microscope } from "lucide-react";

interface EyeCase {
  id: string;
  name: string;
  stage: string;
  severity: "none" | "mild" | "severe";
  confidence: number;
  aneurysms: number;
  hemorrhages: number;
  description: string;
  clinicalAction: string;
}

const CASE_PRESETS: EyeCase[] = [
  {
    id: "case-healthy",
    name: "Patient Scan #8801 - Control Case",
    stage: "Healthy Retina - No Apparent Diabetic Retinopathy",
    severity: "none",
    confidence: 99.4,
    aneurysms: 0,
    hemorrhages: 0,
    description: "Macula is fully intact. Blood vessels exhibit uniform distribution. Optical disc structures are sharply defined with zero sign of fluid leakage, microaneurysms, or physical damage.",
    clinicalAction: "Routine diabetic eye screening recommended at 12-month interval."
  },
  {
    id: "case-mild",
    name: "Patient Scan #5122 - Moderate/Early Case",
    stage: "Moderate Non-Proliferative Retinopathy (NPDR)",
    severity: "mild",
    confidence: 91.8,
    aneurysms: 5,
    hemorrhages: 2,
    description: "Incipient cluster of microaneurysms visible as tiny red focal dots in temporal quadrant. Scattered microvascular alterations are visible, but no macular edema or cotton wool spots present.",
    clinicalAction: "Enhanced glycemic monitor required. Re-evaluate fundus within 6 months."
  },
  {
    id: "case-severe",
    name: "Patient Scan #9948 - Advanced Case",
    stage: "Severe Proliferative Diabetic Retinopathy (PDR)",
    severity: "severe",
    confidence: 97.5,
    aneurysms: 22,
    hemorrhages: 11,
    description: "Significant proliferation of delicate, abnormal new vessels (neovascularization) around optic disc. Frequent flame-shaped hemorrhages and physical macular exudate accumulation detected.",
    clinicalAction: "Urgent referral to consulting ophthalmologist. Laser photocoagulation requested immediately."
  }
];

export default function RetinopathyAnalyzer() {
  const [selectedCase, setSelectedCase] = useState<EyeCase>(CASE_PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showGradCam, setShowGradCam] = useState(true);
  const [userUploaded, setUserUploaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scan progress effect
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 12;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isScanning]);

  const triggerScan = (preset: EyeCase) => {
    setIsScanning(true);
    setScanProgress(0);
    setSelectedCase(preset);
  };

  // Draw Retinal visual diagram with heatmaps
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Retina physical base (warm orange-red sphere background)
    ctx.fillStyle = "#3a1310"; // Dark cavity
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Glowing Fundus backing
    const fundusGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 95);
    fundusGrad.addColorStop(0, "#c2410c");   // Warm orange temporal zone
    fundusGrad.addColorStop(0.6, "#7c2d12"); // deep rustic red
    fundusGrad.addColorStop(1, "#3c1215");   // dark perimeter
    
    ctx.fillStyle = fundusGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 90, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Macula Lutea (dark center focus area)
    ctx.fillStyle = "rgba(43, 8, 5, 0.9)";
    ctx.beginPath();
    ctx.arc(cx - 30, cy + 10, 22, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#9a3412";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw Optic Disc (yellow glowing entry point of optic nerve)
    ctx.fillStyle = "#ffedd5";
    ctx.beginPath();
    ctx.arc(cx + 45, cy - 5, 14, 0, 2 * Math.PI);
    ctx.fill();
    
    // Optic disc outer glow
    const opticGlow = ctx.createRadialGradient(cx + 45, cy - 5, 5, cx + 45, cy - 5, 18);
    opticGlow.addColorStop(0, "rgba(254, 215, 170, 0.8)");
    opticGlow.addColorStop(1, "rgba(254, 215, 170, 0)");
    ctx.fillStyle = opticGlow;
    ctx.beginPath();
    ctx.arc(cx + 45, cy - 5, 18, 0, 2 * Math.PI);
    ctx.fill();

    // Draw main branching vessels from Optic Disc (crimson wavy lines)
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 1.8;
    
    const drawVessel = (startAngle: number, controlPoints: number[][]) => {
      ctx.beginPath();
      ctx.moveTo(cx + 45, cy - 5);
      let px = cx + 45;
      let py = cy - 5;
      controlPoints.forEach(([dx, dy]) => {
        const nx = px + dx;
        const ny = py + dy;
        ctx.quadraticCurveTo(px + dx/2, py + dy/1.4, nx, ny);
        px = nx;
        py = ny;
      });
      ctx.stroke();
    };

    // Upper nasal branch
    drawVessel(0, [[-30, -35], [-25, -20], [-20, -10]]);
    // Lower nasal branch
    drawVessel(0, [[-35, 30], [-20, 25], [-20, 15]]);
    // Upper temporal branch wrapping macula
    drawVessel(0, [[-45, -20], [-40, 5], [-20, 10]]);
    // Lower temporal branch wrapping macula
    drawVessel(0, [[-45, 25], [-45, -5], [-25, -12]]);

    // Draw anomalies based on severity settings
    if (selectedCase.severity === "mild") {
      // Small red dots (Aneurysms)
      ctx.fillStyle = "#ef4450";
      const spots = [[cx - 15, cy - 10], [cx - 2, cy - 25], [cx - 50, cy - 5], [cx + 10, cy + 30]];
      spots.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        // Custom spot ring highlight
        ctx.strokeStyle = "rgba(239, 68, 80, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.stroke();
      });

      // Grad-CAM Heatmap overlay
      if (showGradCam && !isScanning) {
        const heatmap = ctx.createRadialGradient(cx - 20, cy - 15, 5, cx - 20, cy - 15, 35);
        heatmap.addColorStop(0, "rgba(234, 179, 8, 0.44)"); // amber warning spot
        heatmap.addColorStop(0.5, "rgba(234, 179, 8, 0.15)");
        heatmap.addColorStop(1, "rgba(234, 179, 8, 0)");
        ctx.fillStyle = heatmap;
        ctx.beginPath();
        ctx.arc(cx - 20, cy - 15, 35, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else if (selectedCase.severity === "severe") {
      // Extensive Hemorrhages (splotchy blotches)
      ctx.fillStyle = "rgba(127, 29, 29, 0.85)"; // Deep blood spot
      const hemSplotches = [[cx - 20, cy + 28, 6], [cx - 55, cy - 15, 8], [cx + 5, cy - 35, 5], [cx + 30, cy + 40, 7]];
      hemSplotches.forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Yellow spots representing cotton wool exudates exudate accumulation
      ctx.fillStyle = "rgba(254, 240, 138, 0.8)";
      const exudates = [[cx - 35, cy - 28], [cx - 48, cy + 18], [cx + 15, cy - 10]];
      exudates.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.ellipse(x, y, 4, 2.5, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Heavy Proliferative new branching pathways (neovascular threads)
      ctx.strokeStyle = "#dc2626";
      ctx.lineWidth = 0.8;
      drawVessel(0, [[-15, -15], [-5, -2], [-10, 5]]);
      drawVessel(0, [[-20, 20], [5, 4], [8, -3]]);

      // Severe Diagnostic Grad-CAM overlay
      if (showGradCam && !isScanning) {
        // Red primary hotspot over severe hemorrhages
        const redMap = ctx.createRadialGradient(cx - 30, cy + 15, 5, cx - 30, cy + 15, 50);
        redMap.addColorStop(0, "rgba(220, 38, 38, 0.58)"); // deep red CAM
        redMap.addColorStop(0.5, "rgba(234, 179, 8, 0.28)"); // transitional amber
        redMap.addColorStop(1, "rgba(234, 179, 8, 0)");
        ctx.fillStyle = redMap;
        ctx.beginPath();
        ctx.arc(cx - 30, cy + 15, 50, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Scanning visual sweep bar line
    if (isScanning) {
      const sweepY = (canvas.height * scanProgress) / 100;
      ctx.strokeStyle = "rgba(59, 130, 246, 0.85)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 8;
      
      ctx.beginPath();
      ctx.moveTo(cx - 95, sweepY);
      ctx.lineTo(cx + 95, sweepY);
      ctx.stroke();
      
      ctx.shadowBlur = 0; // reset
    }

    // Outer framing coordinate borders
    ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 95, 0, 2 * Math.PI);
    ctx.stroke();

  }, [selectedCase, isScanning, scanProgress, showGradCam]);

  const handleUploadClick = () => {
    setIsScanning(true);
    setScanProgress(0);
    setUserUploaded(true);
    setTimeout(() => {
      setSelectedCase({
        id: "case-uploaded",
        name: "Your Custom Upload Scan",
        stage: "Mild Non-Proliferative Retinopathy detected (Simulation)",
        severity: "mild",
        confidence: 89.4,
        aneurysms: 4,
        hemorrhages: 1,
        description: "Your uploaded simulation file shows microvascular changes consistent with Mild NPDR. Focal aneurysms are observed in outer margins. Optic disc appears healthy.",
        clinicalAction: "Follow up with standard clinical tests. Maintain standard glucose and blood pressure goals."
      });
    }, 1800);
  };

  return (
    <div id="retinopathy-analyzer" className="bg-[#121B2E]/60 border border-slate-800 rounded-2xl p-6 shadow-xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Eye Fundus Image Viewport */}
        <div className="flex-1 flex flex-col items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-850">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-[10px] text-zinc-400 font-mono flex items-center">
              <Microscope size={12} className="mr-1.5 text-blue-400" />
              DJANGO_PORT_CONNECT: 8000
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] text-zinc-500 font-mono">Grad-CAM Overlay</span>
              <button
                onClick={() => setShowGradCam(!showGradCam)}
                className={`w-7 h-4 rounded-full transition relative border cursor-pointer ${
                  showGradCam ? "bg-blue-600 border-blue-500" : "bg-zinc-800 border-zinc-700"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full bg-white absolute top-0.5 transition-all ${
                  showGradCam ? "right-0.5" : "left-0.5"
                }`} />
              </button>
            </div>
          </div>

          {/* Canvas container */}
          <div className="relative bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center p-3 w-full max-w-[240px] h-[220px]">
            <canvas
              ref={canvasRef}
              width={220}
              height={200}
              className="rounded-lg max-w-full max-h-full"
            />
            {isScanning && (
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center backdrop-blur-[1px]">
                <div className="text-center">
                  <RefreshCw className="animate-spin text-blue-400 mx-auto mb-2" size={24} />
                  <span className="text-xs text-blue-400 font-bold font-mono">SCANNING {scanProgress}%</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 w-full text-center">
            <p className="text-[10px] text-zinc-500 font-mono truncate">{selectedCase.name}</p>
          </div>
        </div>

        {/* Diagnostic Reports and Presets */}
        <div className="flex-1 space-y-4">
          <div>
            <span className="text-[10px] text-blue-400 font-mono uppercase bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded tracking-wider">
              Clinical CNN Screening Model
            </span>
            <h3 className="text-lg font-bold text-zinc-100 mt-2">Fundus Diagnostic Console</h3>
            <p className="text-xs text-zinc-500">
              Integrates high-precision Deep CNN predictions inside a corporate Django healthcare framework.
            </p>
          </div>

          {/* Diagnostic report layout */}
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 space-y-3 font-mono">
            <div className="flex items-start justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] text-zinc-550 uppercase">Stage Classification:</span>
              <span className={`text-[11px] font-bold text-right max-w-[160px] ${
                selectedCase.severity === "severe" ? "text-rose-450" : selectedCase.severity === "mild" ? "text-amber-400" : "text-blue-400"
              }`}>
                {selectedCase.stage}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs border-b border-zinc-900 pb-2">
              <span className="text-zinc-500 font-sans">Model Accuracy Index:</span>
              <span className="font-bold text-blue-400">{selectedCase.confidence}%</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-zinc-900 pb-2 font-sans">
              <div>
                <span className="text-zinc-500 block font-mono text-[10px]">Microaneurysms:</span>
                <span className="text-zinc-200 font-semibold">{selectedCase.aneurysms} detected</span>
              </div>
              <div>
                <span className="text-zinc-500 block font-mono text-[10px]">Hemorrhages Count:</span>
                <span className="text-zinc-200 font-semibold">{selectedCase.hemorrhages} spotted</span>
              </div>
            </div>

            <div className="text-[10px] text-zinc-400 leading-normal border-b border-zinc-900 pb-2 bg-zinc-900/30 p-2.5 rounded font-sans">
              <span className="text-zinc-500 font-bold block mb-1 text-[9px] uppercase tracking-wider font-mono">Clinical Description:</span>
              {selectedCase.description}
            </div>

            <div className="text-[10px] text-zinc-350 leading-normal flex items-start gap-1.5 p-1 font-sans">
              <FileText size={12} className="text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-blue-450 font-bold">Suggested Path: </strong>
                {selectedCase.clinicalAction}
              </span>
            </div>
          </div>

          {/* Presets Grid Selection & custom upload simulator */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 font-mono block">Diagnostic Presets:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => triggerScan(CASE_PRESETS[0])}
                className={`py-2 px-1 text-center rounded-lg text-[10px] border cursor-pointer font-semibold uppercase tracking-wider transition ${
                  selectedCase.id === "case-healthy"
                    ? "bg-blue-500/10 border-blue-500 text-blue-400"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                Healthy Case
              </button>
              <button
                onClick={() => triggerScan(CASE_PRESETS[1])}
                className={`py-2 px-1 text-center rounded-lg text-[10px] border cursor-pointer font-semibold uppercase tracking-wider transition ${
                  selectedCase.id === "case-mild"
                    ? "bg-amber-950/40 border-amber-500 text-amber-400"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                Mild Stage
              </button>
              <button
                onClick={() => triggerScan(CASE_PRESETS[2])}
                className={`py-2 px-1 text-center rounded-lg text-[10px] border cursor-pointer font-semibold uppercase tracking-wider transition ${
                  selectedCase.id === "case-severe"
                    ? "bg-rose-950/40 border-rose-500 text-rose-455"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                Severe Stage
              </button>
            </div>

            <div className="pt-1">
              <button
                onClick={handleUploadClick}
                className="w-full py-2 bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 transition font-sans"
              >
                <Upload size={13} />
                Upload Custom Fundus Scan PNG (Simulator)
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
