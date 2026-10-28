import React from "react";
import { Link } from "react-router-dom";
import { ClaudeStarburst, ClaudeArtifactIcon } from "./ClaudeIcons";
import { 
  FaPlus, 
  FaCommentDots, 
  FaBriefcase, 
  FaFolderOpen, 
  FaCode, 
  FaCertificate, 
  FaStar, 
  FaBook, 
  FaMagic, 
  FaEnvelope, 
  FaDownload, 
  FaSun, 
  FaMoon, 
  FaTimes, 
  FaShieldAlt,
  FaGamepad,
  FaCube,
  FaExternalLinkAlt
} from "react-icons/fa";

const ClaudeSidebar = ({
  isOpen,
  onClose,
  theme,
  toggleTheme,
  onSelectPrompt,
  onSelectArtifact,
  onStartNewChat,
  onOpenTelemetry,
  activeSection
}) => {
  const isDark = theme === "dark";

  const interviewTopics = [
    { id: "brief", label: "⚡ 2-Min Recruiter Brief", icon: FaStar, prompt: "Give me the 2-minute recruiter summary of Klint's experience and strengths" },
    { id: "projects", label: "Featured Projects", icon: FaFolderOpen, prompt: "What kind of projects has Klint built?" },
    { id: "react", label: "React & Frontend", icon: FaCode, prompt: "How strong is his React experience?" },
    { id: "ab-testing", label: "A/B Testing & Optimization", icon: FaMagic, prompt: "Tell me about his experience with A/B testing and performance optimization" },
    { id: "technologies", label: "Technologies & Stack", icon: FaCode, prompt: "What technologies does he work with?" },
    { id: "backend", label: "Cloud & DevOps (AWS)", icon: FaCube, prompt: "Tell me about his Cloud & DevOps architecture" },
    { id: "why-hire", label: "Why Consider Klint?", icon: FaStar, prompt: "Why should I consider him for a Software Engineer role?" },
    { id: "experience", label: "Work Experience", icon: FaBriefcase, prompt: "What are his career milestones, internships, and education?" },
    { id: "recommendations", label: "Recommendations", icon: FaStar, prompt: "Can I read what colleagues say about him?" },
    { id: "certifications", label: "Certifications", icon: FaCertificate, prompt: "What are his certifications and courses?" },
    { id: "contact", label: "Contact / Hire Me", icon: FaEnvelope, prompt: "How can I contact Klint or download his CV?" },
  ];

  const toolsAndPages = [
    { label: "Friend Quiz & Leaderboard", path: "/friend-quiz", icon: FaGamepad, isInternal: true },
    { label: "3D Tech Stack Universe", path: "/3d", icon: FaCube, isInternal: true },
    { label: "React Guided Course", path: "/react-course", icon: FaBook, isInternal: true },
    { label: "All Shipped Projects", path: "/all-projects", icon: FaFolderOpen, isInternal: true },
    { label: "All Certifications", path: "/all-certifications", icon: FaCertificate, isInternal: true },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Claude Sidebar Container */}
      <aside
        className={`bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] transition-all duration-300 ease-in-out shrink-0 ${
          isOpen
            ? "fixed inset-y-0 left-0 z-50 w-72 sm:w-80 shadow-2xl lg:shadow-none lg:static lg:w-72 lg:sm:w-80 lg:h-full lg:opacity-100 lg:pointer-events-auto"
            : "fixed inset-y-0 left-0 z-50 w-72 sm:w-80 -translate-x-full pointer-events-none lg:static lg:w-0 lg:translate-x-0 lg:opacity-0 lg:border-none lg:pointer-events-none lg:overflow-hidden"
        }`}
      >
        <div className="w-72 sm:w-80 h-full flex flex-col justify-between overflow-hidden">
          {/* Top Header & New Chat Button */}
          <div className="p-3.5 border-b border-[var(--border-color)] flex flex-col gap-2.5 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#D97757]/15 flex items-center justify-center text-[#D97757]">
                  <ClaudeStarburst size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="claude-font-serif text-lg font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                    KlintGPT
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] claude-font-mono">
                    Personal AI Portfolio
                  </span>
                </div>
              </div>

              {/* Close Button (Visible and working on all screens) */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <FaTimes size={15} />
              </button>
            </div>

          {/* New Chat Button (Claude AI Style) */}
          <button
            onClick={() => {
              onStartNewChat();
              if (window.innerWidth < 1024) onClose();
            }}
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] hover:bg-[var(--card-hover)] text-[var(--text-primary)] text-xs font-medium shadow-sm transition-all group"
          >
            <div className="flex items-center gap-2">
              <FaPlus size={11} className="text-[#D97757] group-hover:rotate-90 transition-transform" />
              <span>Start New Interview</span>
            </div>
            <span className="claude-font-mono text-[10px] text-[var(--text-muted)] bg-[var(--border-subtle)] px-1.5 py-0.5 rounded">
              Esc
            </span>
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          
          {/* Section 1: Explore Topics (Recents / Shortcuts) */}
          <div>
            <div className="px-2 mb-1.5 flex items-center justify-between">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)] claude-font-mono">
                Ask KlintGPT
              </span>
            </div>
            <div className="space-y-0.5">
              {interviewTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      onSelectPrompt(topic.prompt, topic.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors text-left group"
                  >
                    <Icon size={13} className="text-[var(--text-muted)] group-hover:text-[#D97757] transition-colors shrink-0" />
                    <span className="truncate">{topic.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Portfolio Canvas Sections */}
          <div>
            <div className="px-2 mb-1.5 flex items-center justify-between">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)] claude-font-mono">
                Canvas Artifacts
              </span>
            </div>
            <div className="space-y-0.5">
              {[
                { id: "about", label: "01 — About Klint", icon: FaCommentDots },
                { id: "experience", label: "02 — Experience", icon: FaBriefcase },
                { id: "projects", label: "03 — Shipped Projects", icon: FaFolderOpen },
                { id: "techstack", label: "04 — Tech Stack", icon: FaCode },
                { id: "certifications", label: "05 — Certifications", icon: FaCertificate },
                { id: "recommendations", label: "06 — Recommendations", icon: FaStar },
                { id: "courses", label: "07 — Guided Courses", icon: FaBook },
                { id: "book-of-answers", label: "08 — Book of Answers", icon: FaMagic },
                { id: "contact", label: "09 — Get in Touch", icon: FaEnvelope },
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    onSelectArtifact(sec.id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                    activeSection === sec.id
                      ? "bg-[#D97757]/10 text-[#D97757] font-medium"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]"
                  }`}
                >
                  <span className="truncate claude-font-mono">{sec.label}</span>
                  <ClaudeArtifactIcon size={12} className="opacity-50" />
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Interactive Apps & Tools */}
          <div>
            <div className="px-2 mb-1.5">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)] claude-font-mono">
                Interactive Apps
              </span>
            </div>
            <div className="space-y-0.5">
              {toolsAndPages.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={idx}
                    to={tool.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon size={13} className="text-[#D97757] shrink-0" />
                      <span className="truncate">{tool.label}</span>
                    </div>
                    <FaExternalLinkAlt size={9} className="opacity-40 shrink-0" />
                  </Link>
                );
              })}

              {/* Telemetry Security Audit Trigger */}
              <button
                onClick={() => {
                  onOpenTelemetry();
                  if (window.innerWidth < 1024) onClose();
                }}
                className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <FaShieldAlt size={13} className="text-emerald-500 shrink-0" />
                  <span className="truncate">Browser Security Audit</span>
                </div>
                <span className="claude-font-mono text-[9px] px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  HUD
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Profile Card */}
        <div className="p-3 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[var(--border-color)] shrink-0">
                <img 
                  src="/1st.jpg" 
                  alt="Klint Morales Ruales" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "1st.jpg";
                  }}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#22211E]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                  Klint Morales Ruales
                </p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">
                  Kyocera • Software Engineer
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors shrink-0"
              title={isDark ? "Light theme" : "Dark theme"}
            >
              {isDark ? <FaSun size={13} className="text-amber-400" /> : <FaMoon size={13} />}
            </button>
          </div>

          <a
            href="/Klint_Ruales_Resume.pdf"
            download="Klint_Morales_Ruales_Resume.pdf"
            className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[#D97757] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs claude-font-mono transition-colors"
          >
            <FaDownload size={10} />
            <span>Download Official Resume</span>
          </a>
        </div>
      </div>
    </aside>
    </>
  );
};

export default ClaudeSidebar;
