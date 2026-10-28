import React from "react";
import { ClaudeStarburst, ClaudeArtifactIcon } from "./ClaudeIcons";
import { 
  FaSun, 
  FaMoon, 
  FaBars, 
  FaDownload, 
  FaPaperPlane, 
  FaColumns, 
  FaCommentDots, 
  FaFolderOpen,
  FaShieldAlt
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const ClaudeNavbar = ({
  theme,
  toggleTheme,
  viewMode, // 'chat' | 'artifacts' | 'split'
  setViewMode,
  isSidebarOpen,
  setIsSidebarOpen,
  onOpenTelemetry,
  onOpenNewChat
}) => {
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--border-color)] bg-[var(--bg-color)]/90 backdrop-blur-md transition-colors duration-200">
      <div className="flex h-14 items-center justify-between px-2.5 sm:px-5 max-w-[1920px] mx-auto gap-2">
        
        {/* Left: Sidebar Toggle & Claude Brand */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center shrink-0 ${
              isSidebarOpen 
                ? "bg-[#D97757]/15 text-[#D97757] ring-1 ring-[#D97757]/30" 
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]"
            }`}
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-label="Toggle sidebar"
          >
            <FaBars size={15} />
          </button>

          <div 
            onClick={onOpenNewChat}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group select-none shrink-0"
            title="Start new conversation"
          >
            <div className="w-7 h-7 rounded-lg bg-[#D97757]/10 flex items-center justify-center text-[#D97757] group-hover:bg-[#D97757]/20 transition-colors shrink-0">
              <ClaudeStarburst size={17} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="claude-font-serif text-base sm:text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                KlintGPT
              </span>
              <span className="hidden md:inline-block claude-font-mono text-[10px] px-1.5 py-0.2 rounded bg-[var(--border-color)] text-[var(--text-muted)] font-medium">
                v2.6
              </span>
            </div>
          </div>
        </div>

        {/* Center: View Switcher Tabs (Claude AI Style) */}
        <div className="flex items-center bg-[var(--card-bg)] p-1 rounded-xl border border-[var(--border-color)] shadow-xs shrink-0">
          <button
            onClick={() => setViewMode("chat")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "chat"
                ? "bg-[#D97757] text-white shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <FaCommentDots size={12} className="shrink-0" />
            <span className="hidden sm:inline">Interview</span>
            <span className="sm:hidden">Chat</span>
          </button>

          {/* Desktop Split View Mode */}
          <button
            onClick={() => setViewMode("split")}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "split"
                ? "bg-[#D97757] text-white shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            title="Side-by-side Claude Chat & Portfolio Canvas"
          >
            <FaColumns size={12} className="shrink-0" />
            <span>Split View</span>
          </button>

          <button
            onClick={() => setViewMode("artifacts")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "artifacts"
                ? "bg-[#D97757] text-white shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <ClaudeArtifactIcon size={12} className="shrink-0" />
            <span className="hidden sm:inline">Portfolio Canvas</span>
            <span className="sm:hidden">Canvas</span>
          </button>
        </div>

        {/* Right: Quick Actions & Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Security Telemetry Audit Button */}
          <button
            onClick={onOpenTelemetry}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] claude-font-mono text-[11px] transition-colors shrink-0"
            title="Browser Security & Telemetry Audit"
          >
            <FaShieldAlt className="text-emerald-500" size={11} />
            <span>Audit</span>
          </button>

          {/* Download CV */}
          <a
            href="/Klint_Ruales_Resume.pdf"
            download="Klint_Morales_Ruales_Resume.pdf"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#D97757] text-xs font-medium transition-colors shrink-0"
          >
            <FaDownload size={11} />
            <span>CV</span>
          </a>

          {/* Hire Me / Contact CTA */}
          <a
            href="mailto:klintruales11@gmail.com"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-[#D97757] hover:bg-[#C26547] text-white text-xs font-medium shadow-xs transition-all shrink-0"
          >
            <FaPaperPlane size={10} />
            <span>Hire Me</span>
          </a>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors shrink-0"
            title={isDark ? "Switch to Claude Light Theme" : "Switch to Claude Dark Theme"}
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun size={14} className="text-amber-400" /> : <FaMoon size={14} />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default ClaudeNavbar;
