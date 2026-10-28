import React, { useState, useEffect } from "react";
import { 
  FaShieldAlt, 
  FaTerminal, 
  FaSync, 
  FaExclamationTriangle, 
  FaTimes, 
  FaCheckCircle 
} from "react-icons/fa";

const TelemetryModal = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [telemetryData, setTelemetryData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      startScanSequence();
    }
  }, [isOpen]);

  const gatherTelemetry = async () => {
    const ua = navigator.userAgent;

    let os = "Unknown OS";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android OS";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    let browser = "Unknown Browser";
    if (ua.includes("Edg/")) browser = "Microsoft Edge";
    else if (ua.includes("Chrome/")) browser = "Google Chrome";
    else if (ua.includes("Firefox/")) browser = "Mozilla Firefox";
    else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Apple Safari";
    else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";

    const screenRes = `${window.screen.width} x ${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const language = navigator.language || "en-US";
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "8 Cores";
    const memory = navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : "Standard RAM";

    let gpu = "Hardware Accelerated GPU";
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "Standard WebGL GPU";
        }
      }
    } catch (e) {
      gpu = "Canvas 2D / Integrated GPU";
    }

    let ip = "127.0.0.1";
    let location = "Global Node";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        ip = data.ip || "127.0.0.1";
        location = `${data.city || ""}, ${data.country_name || ""}`.trim().replace(/^,|,$/g, "") || "Detected Subnet";
      }
    } catch (e) {
      ip = "Protected Client Node";
      location = "Encrypted Subnet";
    }

    const rawString = `${ua}-${screenRes}-${timezone}-${language}-${cores}-${gpu}`;
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) {
      hash = (hash << 5) - hash + rawString.charCodeAt(i);
      hash |= 0;
    }
    const fpHash = `#${Math.abs(hash).toString(16).padStart(8, "0").toUpperCase().slice(0, 4)}-${Math.abs(hash).toString(16).padStart(8, "0").toUpperCase().slice(4, 8)}`;

    const data = {
      ip,
      location,
      os,
      browser,
      screenRes,
      timezone,
      language,
      cores,
      memory,
      gpu: gpu.length > 40 ? gpu.slice(0, 40) + "..." : gpu,
      fpHash
    };

    setTelemetryData(data);
    return data;
  };

  const startScanSequence = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setDisplayedLines([]);

    const data = await gatherTelemetry();

    const steps = [
      { label: "📡 Network Identity", text: `IP: ${data.ip} | Location: ${data.location}` },
      { label: "💻 System Environment", text: `OS: ${data.os} | Browser: ${data.browser}` },
      { label: "🖥️ Display Specs", text: `Resolution: ${data.screenRes} | Timezone: ${data.timezone}` },
      { label: "⚡ Hardware Resources", text: `CPU: ${data.cores} | RAM: ${data.memory}` },
      { label: "🎮 Graphics Hardware", text: `GPU: ${data.gpu}` },
      { label: "🔐 Device Footprint ID", text: `Fingerprint Hash: ${data.fpHash}` },
      { 
        label: "⚠️ Web Safety & Security Principle", 
        text: "Every website you browse automatically receives device & network metadata via standard HTTP headers and DOM APIs. Always inspect links and be cautious when providing credentials!",
        isWarning: true 
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setScanProgress(Math.round(((i + 1) / steps.length) * 100));
      setDisplayedLines((prev) => [...prev, steps[i]]);
    }

    setIsScanning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#111110] border border-[#2B2A26] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs select-none">
        
        {/* Terminal Header */}
        <div className="p-3.5 bg-[#181816] border-b border-[#2B2A26] flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-emerald-400" size={14} />
            <span className="font-semibold text-xs tracking-wider">CLIENT TELEMETRY AUDIT</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={startScanSequence}
              disabled={isScanning}
              className="p-1 rounded text-gray-400 hover:text-white transition-colors"
              title="Rescan telemetry"
            >
              <FaSync size={11} className={isScanning ? "animate-spin" : ""} />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-gray-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <FaTimes size={13} />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto text-emerald-400">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-[11px] text-emerald-400/80 mb-1">
            <span>DIAGNOSTIC SCANNER</span>
            <span>{scanProgress}%</span>
          </div>
          <div className="w-full bg-[#20201D] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-[#D97757] h-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>

          {/* Sequential Lines */}
          <div className="space-y-2 pt-2">
            {displayedLines.map((line, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs transition-all animate-fade-in ${
                  line.isWarning
                    ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
                    : "bg-[#181816] border-[#2B2A26] text-gray-200"
                }`}
              >
                <div className={`text-[10px] uppercase font-semibold tracking-wider mb-1 flex items-center gap-1.5 ${
                  line.isWarning ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {line.isWarning && <FaExclamationTriangle size={11} />}
                  <span>{line.label}</span>
                </div>
                <div className="font-mono text-[11px] leading-relaxed break-words">
                  {line.text}
                </div>
              </div>
            ))}

            {isScanning && (
              <div className="flex items-center gap-2 text-cyan-400 text-[11px] py-1">
                <FaSync className="animate-spin text-xs" />
                <span>Collecting client browser parameters...</span>
              </div>
            )}
          </div>

        </div>

        {/* Terminal Footer */}
        <div className="p-3 bg-[#181816] border-t border-[#2B2A26] flex items-center justify-between text-[11px] text-gray-400 font-sans">
          <span>Client-side inspection • Zero external logging</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-[#D97757] hover:bg-[#C26547] text-white text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

export default TelemetryModal;
