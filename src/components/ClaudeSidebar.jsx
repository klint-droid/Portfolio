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
      {/* Mobile Backdrop Overlay - starts below navbar */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-x-0 top-14 bottom-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Claude Sidebar Container - positioned below navbar on mobile, static flex column on desktop */}
      <aside
        className={`bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
          isOpen
            ? "fixed top-14 bottom-0 left-0 z-40 w-72 sm:w-80 shadow-2xl lg:shadow-none lg:static lg:top-auto lg:bottom-auto lg:w-72 xl:w-80 lg:h-full lg:opacity-100 lg:pointer-events-auto"
            : "fixed top-14 bottom-0 left-0 z-40 w-72 sm:w-80 -translate-x-full pointer-events-none lg:static lg:w-0 lg:translate-x-0 lg:opacity-0 lg:border-none lg:pointer-events-none"
        }`}
      >
        <div className="w-full h-full flex flex-col justify-between overflow-hidden">
          {/* Top Action Bar */}
          <div className="p-3 border-b border-[var(--border-color)] flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={() => {
                onStartNewChat();
                if (window.innerWidth < 1024) onClose();
              }}
              className="flex-1 min-w-0 flex items-center justify-between px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] hover:bg-[var(--card-hover)] text-[var(--text-primary)] text-xs font-medium shadow-2xs transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0 truncate">
                <FaPlus size={11} className="text-[#D97757] group-hover:rotate-90 transition-transform shrink-0" />
                <span className="truncate">Start New Interview</span>
              </div>
              <span className="claude-font-mono text-[10px] text-[var(--text-muted)] bg-[var(--border-subtle)] px-1.5 py-0.5 rounded shrink-0 ml-1.5">
                Esc
              </span>
            </button>

            {/* Close Button (Visible and working on all screens) */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] border border-transparent hover:border-[var(--border-color)] transition-colors shrink-0"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* Scrollable Navigation Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-4">
            
            {/* Section 1: Explore Topics (Recents / Shortcuts) */}
            <div className="min-w-0">
              <div className="px-2 mb-1.5 flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)] claude-font-mono">
                  Ask KlintGPT
                </span>
              </div>
              <div className="space-y-0.5 min-w-0">
                {interviewTopics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        onSelectPrompt(topic.prompt, topic.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className="flex items-center gap-2.5 w-full min-w-0 px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors text-left group"
                    >
                      <Icon size={13} className="text-[var(--text-muted)] group-hover:text-[#D97757] transition-colors shrink-0" />
                      <span className="truncate flex-1 min-w-0">{topic.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Portfolio Canvas Sections */}
            <div className="min-w-0">
              <div className="px-2 mb-1.5 flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)] claude-font-mono">
                  Canvas Artifacts
                </span>
              </div>
              <div className="space-y-0.5 min-w-0">
                {[
                  { id: "about", label: "About Klint", num: "01", icon: FaCommentDots },
                  { id: "experience", label: "Work Experience", num: "02", icon: FaBriefcase },
                  { id: "projects", label: "Shipped Projects", num: "03", icon: FaFolderOpen },
                  { id: "techstack", label: "Tech Stack & AWS", num: "04", icon: FaCode },
                  { id: "certifications", label: "Certifications", num: "05", icon: FaCertificate },
                  { id: "recommendations", label: "Recommendations", num: "06", icon: FaStar },
                  { id: "courses", label: "Guided Courses", num: "07", icon: FaBook },
                  { id: "book-of-answers", label: "Book of Answers", num: "08", icon: FaMagic },
                  { id: "contact", label: "Get in Touch", num: "09", icon: FaEnvelope },
                ].map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        onSelectArtifact(sec.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex items-center justify-between w-full min-w-0 px-2.5 py-2 rounded-lg text-xs transition-colors text-left group ${
                        isActive
                          ? "bg-[#D97757]/15 text-[#D97757] font-semibold"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 truncate flex-1">
                        <Icon
                          size={13}
                          className={`shrink-0 transition-colors ${
                            isActive ? "text-[#D97757]" : "text-[var(--text-muted)] group-hover:text-[#D97757]"
                          }`}
                        />
                        <span className="truncate">{sec.label}</span>
                      </div>
                      <span className="claude-font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] opacity-70 shrink-0 ml-2">
                        {sec.num}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Interactive Apps & Tools */}
            <div className="min-w-0">
              <div className="px-2 mb-1.5">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)] claude-font-mono">
                  Interactive Apps
                </span>
              </div>
              <div className="space-y-0.5 min-w-0">
                {toolsAndPages.map((tool, idx) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={idx}
                      to={tool.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className="flex items-center justify-between w-full min-w-0 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 truncate flex-1">
                        <Icon size={13} className="text-[#D97757] shrink-0" />
                        <span className="truncate">{tool.label}</span>
                      </div>
                      <FaExternalLinkAlt size={9} className="opacity-40 shrink-0 ml-2" />
                    </Link>
                  );
                })}

                {/* Telemetry Security Audit Trigger */}
                <button
                  onClick={() => {
                    onOpenTelemetry();
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className="flex items-center justify-between w-full min-w-0 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors text-left"
                >
                  <div className="flex items-center gap-2 min-w-0 truncate flex-1">
                    <FaShieldAlt size={13} className="text-emerald-500 shrink-0" />
                    <span className="truncate">Browser Security Audit</span>
                  </div>
                  <span className="claude-font-mono text-[9px] px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0 ml-2">
                    HUD
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Profile Card */}
          <div className="p-3 border-t border-[var(--border-color)] bg-[var(--card-bg)] shrink-0 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2.5 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--border-color)] shrink-0">
                  <img 
                    src="/1st.jpg" 
                    alt="Klint Morales Ruales" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "1st.jpg";
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white dark:border-[#22211E]" />
                </div>
                <div className="min-w-0 flex-1">
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
              className="flex items-center justify-center gap-1.5 w-full min-w-0 py-1.5 px-2 rounded-lg border border-[var(--border-color)] hover:border-[#D97757] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs claude-font-mono transition-colors"
            >
              <FaDownload size={10} className="shrink-0" />
              <span className="truncate">Download Official Resume</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ClaudeSidebar;
