import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaTerminal, FaShieldAlt, FaChevronRight, FaSync, FaExclamationTriangle } from "react-icons/fa";
import { IoClose, IoSparkles } from "react-icons/io5";

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState("scan"); // 'scan' | 'chat'
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const messagesEndRef = useRef(null);

  // Telemetry details state
  const [telemetryData, setTelemetryData] = useState(null);
  const [scanStep, setScanStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm Klint's virtual assistant. ⚠️ Remember: every website you visit automatically receives browser metadata like the specs shown in your scan. Always be cautious about what you click on the web! Now, ask me anything about Klint's skills, projects, or experience!"
    }
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.altKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleCustomToggle = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-ai-chat", handleCustomToggle);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-ai-chat", handleCustomToggle);
    };
  }, []);

  // Gather browser & device telemetry data
  const gatherTelemetry = async () => {
    const ua = navigator.userAgent;

    // Detect OS
    let os = "Unknown OS";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android OS";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    // Detect Browser
    let browser = "Unknown Browser";
    if (ua.includes("Edg/")) browser = "Microsoft Edge";
    else if (ua.includes("Chrome/")) browser = "Google Chrome";
    else if (ua.includes("Firefox/")) browser = "Mozilla Firefox";
    else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Apple Safari";
    else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";

    // Screen details
    const screenRes = `${window.screen.width} x ${window.screen.height}`;
    const viewportRes = `${window.innerWidth} x ${window.innerHeight}`;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Timezone & Language
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const language = navigator.language || "en-US";

    // Hardware
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "Unavailable";
    const memory = navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : "Standard RAM";
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? "Touch Enabled" : "Mouse / Keyboard";

    // WebGL / GPU Renderer Info
    let gpu = "Standard Renderer";
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
      gpu = "Canvas 2D / Software Renderer";
    }

    // Network & Cookies
    const connection = navigator.connection?.effectiveType ? navigator.connection.effectiveType.toUpperCase() : "Online";
    const cookies = navigator.cookieEnabled ? "Enabled" : "Disabled";
    const referrer = document.referrer ? new URL(document.referrer).hostname : "Direct Visit";

    // Fetch IP and Location asynchronously with fast fallback
    let ip = "Collecting...";
    let location = "Detecting Region...";
    let isp = "Local Provider";

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        ip = data.ip || "127.0.0.1";
        location = `${data.city || ""}, ${data.country_name || ""}`.trim().replace(/^,|,$/g, "") || "Global Node";
        isp = data.org || "Network Provider";
      }
    } catch (e) {
      try {
        const res2 = await fetch("https://api.ipify.org?format=json");
        if (res2.ok) {
          const d2 = await res2.json();
          ip = d2.ip;
          location = "Online Node";
        }
      } catch (err) {
        ip = "Client Encrypted";
        location = "Protected Subnet";
      }
    }

    // Generate Fingerprint Hash
    const rawString = `${ua}-${screenRes}-${timezone}-${language}-${cores}-${gpu}`;
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) {
      const char = rawString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const fpHash = `#${Math.abs(hash).toString(16).padStart(8, "0").toUpperCase().slice(0, 4)}-${Math.abs(hash).toString(16).padStart(8, "0").toUpperCase().slice(4, 8)}`;

    const data = {
      ip,
      location,
      isp,
      os,
      browser,
      screenRes,
      viewportRes,
      pixelRatio: `${devicePixelRatio}x`,
      timezone,
      language,
      cores,
      memory,
      touch,
      gpu,
      connection,
      cookies,
      referrer,
      fpHash
    };

    setTelemetryData(data);
    return data;
  };

  // Start the telemetry scanning animation sequence
  const startScanSequence = async () => {
    setIsScanning(true);
    setScanStep(0);
    setScanProgress(0);
    setDisplayedLines([]);

    const data = await gatherTelemetry();

    const steps = [
      { label: "📡 Network Identity", text: `IP: ${data.ip} | Location: ${data.location}` },
      { label: "💻 System Environment", text: `OS: ${data.os} | Browser: ${data.browser}` },
      { label: "🖥️ Display & Viewport", text: `Screen: ${data.screenRes} | Timezone: ${data.timezone}` },
      { label: "⚡ Hardware Resources", text: `CPU: ${data.cores} | RAM: ${data.memory}` },
      { label: "🎮 Graphics Accelerator", text: `GPU: ${data.gpu.length > 35 ? data.gpu.slice(0, 35) + '...' : data.gpu}` },
      { label: "🌐 Session & Metadata", text: `Lang: ${data.language} | Connection: ${data.connection} | Cookies: ${data.cookies}` },
      { label: "🔐 Digital Fingerprint", text: `Browser Footprint ID: ${data.fpHash}` },
      { 
        label: "⚠️ Security & Privacy Reminder", 
        text: "⚠️ Every single time you visit ANY website on the internet, your browser automatically sends all of this device & network data! Always be careful about which links you click and which websites you visit.",
        isWarning: true 
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setScanStep(i + 1);
      setScanProgress(Math.round(((i + 1) / steps.length) * 100));
      setDisplayedLines((prev) => [...prev, steps[i]]);
    }

    setIsScanning(false);
    setHasScanned(true);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (!hasScanned) {
        setViewMode("scan");
        startScanSequence();
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleSkipToChat = () => {
    setIsScanning(false);
    setHasScanned(true);
    setViewMode("chat");
  };

  const handleRestartScan = () => {
    setViewMode("scan");
    startScanSequence();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (viewMode === "chat") {
      scrollToBottom();
    }
  }, [messages, viewMode]);

  const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase();

    if (text.includes("privacy") || text.includes("data") || text.includes("safety") || text.includes("warning") || text.includes("careful")) {
      return "⚠️ Web Safety Tip: Every webpage automatically receives browser data like your IP, OS, and screen resolution. Always double-check links and avoid entering sensitive information on untrusted websites!";
    }
    if (text.includes("skill") || text.includes("tech") || text.includes("stack") || text.includes("tools")) {
      return "Klint's technical skills include HTML, CSS, JavaScript, ReactJs, PHP, Python, SQL, C#, Java, C, Git, Docker, Linux, Figma, and Photoshop.";
    }
    if (text.includes("project") || text.includes("portfolio") || text.includes("built")) {
      return "Some of his notable projects include a C-based Console Game with a live WebSocket dashboard, and a mental health platform that won 3rd place in the Wakuworks Social Innovation Competition!";
    }
    if (text.includes("education") || text.includes("school") || text.includes("degree") || text.includes("study")) {
      return "He is currently taking an Associate Degree in Computer Technology (Software Development) at the University of San Jose - Recoletos, graduating in December 2026.";
    }
    if (text.includes("experience") || text.includes("work") || text.includes("job") || text.includes("intern")) {
      return "Klint has a strong passion for learning and staying up-to-date with software trends. He is a Digital Designer Trainee at Datawords Philippines and participated in the Youth Empowerment Session at Synchrony.";
    }
    if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach")) {
      return "You can reach Klint directly at klint.ruales@student.passerellesnumeriques.org or connect with him on LinkedIn!";
    }
    if (text.includes("hobby") || text.includes("interest") || text.includes("passion") || text.includes("like")) {
      return "Klint enjoys exploring new technologies, building personal projects, open-source contributing, and digital UI/UX design.";
    }
    if (text.includes("strength") || text.includes("weakness") || text.includes("improve") || text.includes("challenge")) {
      return "Klint's strengths include strong adaptability, rapid learning, and visual problem solving. He is continuously deepening his backend and DevOps knowledge.";
    }
    if (text.includes("goal") || text.includes("future") || text.includes("aspire") || text.includes("plan")) {
      return "Klint aspires to become a high-impact full-stack software engineer crafting scalable, user-centric web applications.";
    }
    if (text.includes("fun fact") || text.includes("random") || text.includes("interesting") || text.includes("quirky")) {
      return "Fun fact: Klint's background in digital design allows him to bridge the gap between aesthetic UI design and robust code!";
    }
    if (text.includes("certification") || text.includes("course") || text.includes("learned") || text.includes("training")) {
      return "Klint has completed multiple certifications on Coursera, Cisco, and web design platforms, continually honing his skills.";
    }
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello! How can I help you learn more about Klint today?";
    }
    if (text.includes("browser") || text.includes("telemetry") || text.includes("ip") || text.includes("fingerprint")) {
      if (telemetryData) {
        return `I detected you are browsing from ${telemetryData.location} using ${telemetryData.browser} on ${telemetryData.os} (${telemetryData.screenRes})!`;
      }
      return "I can analyze your browser telemetry! Click the 'Telemetry Specs' tab in the header to view full details.";
    }

    return "That's a great question! For more specific details, feel free to email Klint directly at klint.ruales@student.passerellesnumeriques.org.";
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userText);
      setMessages((prev) => [...prev, { role: "model", text: botResponse }]);
      setIsLoading(false);
    }, 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded Modal Window */}
      {isOpen && (
        <div className="w-[330px] sm:w-[380px] h-[500px] bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-2 animate-fade-in-up transition-all duration-300">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-3.5 text-white flex justify-between items-center z-10 shadow-md">
            <div className="flex items-center gap-2 font-bold text-sm">
              <FaRobot className="text-lg text-blue-200 animate-pulse" />
              <span>{viewMode === "scan" ? "Browser Telemetry Audit" : "Ask about Klint"}</span>
            </div>

            <div className="flex items-center gap-2">
              {viewMode === "chat" ? (
                <button
                  onClick={handleRestartScan}
                  className="bg-blue-800/60 hover:bg-blue-800 text-xs px-2.5 py-1 rounded-full text-blue-100 flex items-center gap-1 transition-colors border border-blue-400/30"
                  title="View Telemetry Specs"
                >
                  <FaTerminal size={10} />
                  <span>Telemetry</span>
                </button>
              ) : (
                <button
                  onClick={handleSkipToChat}
                  className="bg-emerald-600/80 hover:bg-emerald-600 text-xs px-2.5 py-1 rounded-full text-white flex items-center gap-1 transition-colors border border-emerald-400/30"
                  title="Skip to AI Chat"
                >
                  <span>Chat UI</span>
                  <FaChevronRight size={10} />
                </button>
              )}

              <button
                onClick={toggleChat}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Close modal"
              >
                <IoClose size={20} />
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: TELEMETRY SCANNING SEQUENCE */}
          {viewMode === "scan" && (
            <div className="flex-1 p-4 bg-slate-950 text-emerald-400 font-mono text-xs overflow-y-auto flex flex-col justify-between select-none">
              <div className="space-y-3">
                {/* Header terminal badge */}
                <div className="border border-emerald-500/30 bg-emerald-950/40 p-2.5 rounded-lg flex items-center justify-between text-[11px] text-emerald-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="font-semibold tracking-wider">SYSTEM DIAGNOSTIC HUD</span>
                  </div>
                  <span className="text-emerald-500/80">{scanProgress}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>

                {/* Animated sequential output lines */}
                <div className="space-y-2 mt-3 pt-1">
                  {displayedLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded border transition-all duration-300 animate-fade-in ${
                        line.isWarning
                          ? "bg-amber-950/80 border-amber-500/60 text-amber-200 shadow-md"
                          : idx === displayedLines.length - 1
                          ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
                          : "bg-slate-900/60 border-slate-800 text-slate-300"
                      }`}
                    >
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                          line.isWarning ? "text-amber-400" : "text-emerald-400"
                        }`}
                      >
                        {line.isWarning && <FaExclamationTriangle className="text-amber-400 text-xs" />}
                        <span>{line.label}</span>
                      </div>
                      <div className={`text-[11px] leading-relaxed break-words ${line.isWarning ? "font-sans text-amber-100 font-medium" : "font-mono"}`}>
                        {line.text}
                      </div>
                    </div>
                  ))}

                  {isScanning && (
                    <div className="flex items-center gap-2 text-cyan-400 text-[11px] py-1">
                      <FaSync className="animate-spin text-xs" />
                      <span>Scanning client footprint APIs...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action inside Scanner */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <FaShieldAlt size={10} className="text-emerald-500" /> Client-side readout
                </span>
                <button
                  onClick={handleSkipToChat}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 shadow-lg transition-all"
                >
                  <span>Continue to Chat</span>
                  <IoSparkles className="text-yellow-300" />
                </button>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: CHAT INTERFACE */}
          {viewMode === "chat" && (
            <>
              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4 bg-[var(--bg-color)]">
                {/* Telemetry info summary badge inside chat */}
                {telemetryData && (
                  <div className="bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 p-2.5 rounded-xl text-xs flex items-center justify-between text-blue-900 dark:text-blue-200 shadow-sm">
                    <div className="flex items-center gap-2">
                      <FaShieldAlt className="text-blue-500 text-sm" />
                      <span>
                        Detected: <strong>{telemetryData.browser}</strong> on <strong>{telemetryData.os}</strong>
                      </span>
                    </div>
                    <button
                      onClick={handleRestartScan}
                      className="text-[10px] text-blue-600 dark:text-blue-400 underline hover:text-blue-800 font-medium"
                    >
                      View Specs
                    </button>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm ${
                        msg.role === "user" ? "bg-slate-700" : "bg-blue-600"
                      }`}
                    >
                      {msg.role === "user" ? <FaUser size={12} /> : <FaRobot size={14} />}
                    </div>

                    <p
                      className={`p-3 rounded-2xl shadow-sm max-w-[80%] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </p>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                      <FaRobot size={14} />
                    </div>
                    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-[44px]">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer */}
              <div className="p-3 bg-[var(--card-bg)] border-t border-[var(--border-color)] flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask e.g. What are Klint's skills?"
                  className="flex-1 bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 flex-shrink-0 transition-colors shadow-md"
                >
                  <FaPaperPlane size={14} className="-ml-0.5" />
                </button>
              </div>
            </>
          )}

        </div>
      )}

      {/* Floating Action Launcher Button */}
      <button
        onClick={toggleChat}
        className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 border border-blue-400/30"
        aria-label="Ask me AI Assistant"
      >
        {isOpen ? (
          <div className="flex items-center gap-2">
            <IoClose size={22} />
            <span className="font-semibold text-sm">Close</span>
          </div>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <FaRobot size={22} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
            </div>
            <span className="font-semibold text-sm tracking-wide">Ask me</span>
            <IoSparkles className="text-yellow-300 text-xs animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
};

export default AIChatButton;