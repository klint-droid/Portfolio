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
      <div className="flex h-14 items-center justify-between px-3 sm:px-5 max-w-[1920px] mx-auto">
        
        {/* Left: Sidebar Toggle & Claude Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
              isSidebarOpen 
                ? "bg-[#D97757]/15 text-[#D97757] ring-1 ring-[#D97757]/30" 
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]"
            }`}
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-label="Toggle sidebar"
          >
            <FaBars size={16} />
          </button>

          <div 
            onClick={onOpenNewChat}
            className="flex items-center gap-2 cursor-pointer group select-none"
            title="Start new conversation"
          >
            <div className="w-7 h-7 rounded-lg bg-[#D97757]/10 flex items-center justify-center text-[#D97757] group-hover:bg-[#D97757]/20 transition-colors">
              <ClaudeStarburst size={18} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="claude-font-serif text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                KlintGPT
              </span>
              <span className="hidden sm:inline-block claude-font-mono text-[10px] px-1.5 py-0.2 rounded bg-[var(--border-color)] text-[var(--text-muted)] font-medium">
                v2.6
              </span>
            </div>
          </div>
        </div>

        {/* Center: View Switcher Tabs (Claude AI Style) */}
        <div className="flex items-center bg-[var(--card-bg)] p-1 rounded-xl border border-[var(--border-color)] shadow-sm">
          <button
            onClick={() => setViewMode("chat")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "chat"
                ? "bg-[#D97757] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <FaCommentDots size={12} />
            <span className="hidden xs:inline">Interview</span>
            <span className="xs:hidden">Chat</span>
          </button>

          {/* Desktop Split View Mode */}
          <button
            onClick={() => setViewMode("split")}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "split"
                ? "bg-[#D97757] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            title="Side-by-side Claude Chat & Portfolio Canvas"
          >
            <FaColumns size={12} />
            <span>Split View</span>
          </button>

          <button
            onClick={() => setViewMode("artifacts")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "artifacts"
                ? "bg-[#D97757] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <ClaudeArtifactIcon size={13} />
            <span className="hidden xs:inline">Portfolio Canvas</span>
            <span className="xs:hidden">Canvas</span>
          </button>
        </div>

        {/* Right: Quick Actions & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Security Telemetry Audit Button */}
          <button
            onClick={onOpenTelemetry}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] claude-font-mono text-[11px] transition-colors"
            title="Browser Security & Telemetry Audit"
          >
            <FaShieldAlt className="text-emerald-500" size={11} />
            <span>Audit</span>
          </button>

          {/* Download CV */}
          <a
            href="/Klint_Ruales_Resume.pdf"
            download="Klint_Morales_Ruales_Resume.pdf"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#D97757] text-xs font-medium transition-colors"
          >
            <FaDownload size={11} />
            <span>CV</span>
          </a>

          {/* Hire Me / Contact CTA */}
          <a
            href="mailto:klintruales11@gmail.com"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#D97757] hover:bg-[#C26547] text-white text-xs font-medium shadow-sm transition-all"
          >
            <FaPaperPlane size={10} />
            <span>Hire Me</span>
          </a>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors"
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
