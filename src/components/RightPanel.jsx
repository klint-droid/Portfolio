import React, { useState, useRef, useEffect } from "react";
import { FaTerminal, FaClock, FaCheckCircle, FaLaptopCode, FaBook } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { FaArrowRight, FaRotateRight } from "react-icons/fa6";

const RightPanel = () => {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "system", text: "Klint OS v2.6.0 (x86_64-pc-linux-gnu)" },
    { type: "system", text: "Type 'help' to view available terminal commands." }
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: "user", text: `klint@ruales:~$ ${cmd}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "response",
          text: "Available commands:\n • skills - List core technical stack\n • projects - View featured projects\n • hire - Check availability & contact info\n • matrix - Toggle hacker matrix mode\n • quote - Get a developer quote\n • clear - Clear terminal screen"
        });
        break;

      case "skills":
        newHistory.push({
          type: "response",
          text: "⚡ Technical Skills:\nFrontend: React, JavaScript, TypeScript, Tailwind CSS\nBackend: Node.js, PHP, Laravel, Python, Java\nCloud & DB: AWS (EC2, S3, RDS), MySQL, PostgreSQL"
        });
        break;

      case "projects":
        newHistory.push({
          type: "response",
          text: "🚀 Featured Projects:\n1. Portfolio Website (React + Vite)\n2. EvaTrack Capstone System (Laravel + MySQL)\n3. RPG Java Swing Game (Java OOP)\n4. AI Assistant & Web Chatbot"
        });
        break;

      case "hire":
        newHistory.push({
          type: "response",
          text: "🟢 Status: Open for Software Engineer, Full-Stack, & DevOps roles!\nEmail: klintruales11@gmail.com\nCalendly: calendly.com/klintruales11"
        });
        break;

      case "quote":
        const quotes = [
          "\"First, solve the problem. Then, write the code.\" – John Johnson",
          "\"Code is like humor. When you have to explain it, it's bad.\" – Cory House",
          "\"Make it work, make it right, make it fast.\" – Kent Beck",
          "\"Simplicity is prerequisite for reliability.\" – Edsger W. Dijkstra"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        newHistory.push({ type: "response", text: randomQuote });
        break;

      case "matrix":
        setIsMatrixMode((prev) => !prev);
        newHistory.push({
          type: "response",
          text: isMatrixMode ? "Matrix mode deactivated." : "🟢 Matrix mode activated! Follow the white rabbit..."
        });
        break;

      case "clear":
        setTerminalHistory([
          { type: "system", text: "Screen cleared. Type 'help' for commands." }
        ]);
        setTerminalInput("");
        return;

      default:
        newHistory.push({
          type: "response",
          text: `Command not found: '${cmd}'. Type 'help' for available commands.`
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  return (
    <aside className="hidden xl:flex flex-col justify-between w-80 h-screen sticky top-0 p-6 border-l border-gray-200 dark:border-[#27272a] bg-white/50 dark:bg-[#09090b]/80 backdrop-blur-md overflow-y-auto shrink-0 space-y-6">
      <div className="flex flex-col gap-6">
        {/* Top Status & Specs Card */}
        <div className="p-4 rounded-2xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#121215] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
              SYSTEM STATUS
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Hire
            </span>
          </div>

          <div className="space-y-2 pt-1 border-t border-gray-200 dark:border-[#27272a]/60">
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <span className="text-gray-400">Location:</span>
              <span className="font-semibold">Cebu City, PH</span>
            </div>
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <span className="text-gray-400">Timezone:</span>
              <span className="font-semibold">PHT (GMT+8)</span>
            </div>
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <span className="text-gray-400">Uptime:</span>
              <span className="text-blue-500 font-semibold">99.9% Operational</span>
            </div>
          </div>
        </div>

        {/* Interactive Developer Terminal Widget */}
        <div className="rounded-2xl border border-gray-200 dark:border-[#27272a] bg-gray-900 text-gray-100 overflow-hidden shadow-lg flex flex-col font-mono text-xs">
          <div className="px-3.5 py-2.5 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <FaTerminal size={12} className="text-emerald-400" />
              <span className="text-[11px] font-bold tracking-tight text-gray-300">klint-terminal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
          </div>

          <div className={`p-3 min-h-[220px] max-h-[260px] overflow-y-auto space-y-2 text-[11px] leading-relaxed ${isMatrixMode ? "text-emerald-400 bg-black font-bold" : "text-gray-300"}`}>
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {item.type === "user" ? (
                  <span className="text-blue-400 font-bold">{item.text}</span>
                ) : item.type === "system" ? (
                  <span className="text-gray-500 italic">{item.text}</span>
                ) : (
                  <span className={isMatrixMode ? "text-emerald-400" : "text-gray-300"}>{item.text}</span>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form onSubmit={handleCommandSubmit} className="p-2 bg-gray-950 border-t border-gray-800 flex items-center gap-2">
            <span className="text-emerald-400 font-bold text-xs">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type 'help'..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-gray-600"
            />
          </form>
        </div>

        {/* Currently Learning & Experimenting Widget */}
        <div className="p-4 rounded-2xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#121215] space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-xs">
            <HiSparkles className="text-blue-500" size={13} />
            <span>Currently Focused On</span>
          </div>

          <div className="space-y-2 text-[11px] text-gray-600 dark:text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">▹</span>
              <span>Java Spring Boot</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">▹</span>
              <span>Advanced System Architecture</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">▹</span>
              <span>Cloud Infrastructure and Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel Footer */}
      <div className="pt-3 border-t border-gray-200 dark:border-[#27272a] text-[10px] font-mono text-gray-400 text-center">
        <span>Press <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-[#27272a] text-gray-600 dark:text-gray-300">Alt + K</kbd> for AI Drawer</span>
      </div>
    </aside>
  );
};

export default RightPanel;
