import React, { useEffect, useRef } from "react";
import { ClaudeArtifactIcon } from "./ClaudeIcons";
import { 
  FaTimes, 
  FaDownload, 
  FaExternalLinkAlt, 
  FaCode, 
  FaBriefcase, 
  FaFolderOpen, 
  FaStar, 
  FaEnvelope,
  FaCertificate,
  FaBook,
  FaLink,
  FaCheck
} from "react-icons/fa";

import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import TechStack from "./TechStack";
import Certifications from "./Certifications";
import Recommendations from "./Recommendations";
import Courses from "./Courses";
import BookOfAnswers from "./BookOfAnswers";
import Contact from "./Contact";
import Footer from "./Footer";

const ClaudeArtifactPanel = ({
  activeSection,
  onClose,
  initialOpenRecommend = false,
  isSplitView = false
}) => {
  const [activeTab, setActiveTab] = React.useState(activeSection || "all");
  const [copiedLink, setCopiedLink] = React.useState(false);
  const scrollContainerRef = useRef(null);

  // Sync tab with activeSection prop
  useEffect(() => {
    if (activeSection) {
      setActiveTab(activeSection);
      // Scroll to that section element
      setTimeout(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [activeSection]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "all") {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(tabId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const tabs = [
    { id: "all", label: "Full Portfolio" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "techstack", label: "Tech Stack" },
    { id: "recommendations", label: "Reviews" },
    { id: "certifications", label: "Certs" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-color)] min-w-0 overflow-hidden">
      
      {/* Claude Artifact Top Header */}
      <div className="p-3 border-b border-[var(--border-color)] bg-[var(--card-bg)] flex items-center justify-between shrink-0">
        
        {/* Artifact Title & Icon */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#D97757]/15 flex items-center justify-center text-[#D97757] shrink-0">
            <ClaudeArtifactIcon size={14} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                Portfolio Artifact
              </span>
              <span className="claude-font-mono text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] truncate claude-font-mono">
              v2026 • Klint Morales Ruales
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg border border-[var(--border-color)] hover:border-[#D97757] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs transition-colors"
            title="Copy portfolio link"
          >
            {copiedLink ? <FaCheck size={12} className="text-emerald-500" /> : <FaLink size={12} />}
          </button>

          <a
            href="/Klint_Ruales_Resume.pdf"
            download="Klint_Morales_Ruales_Resume.pdf"
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs claude-font-mono transition-colors"
            title="Download resume"
          >
            <FaDownload size={10} />
            <span>CV</span>
          </a>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-colors"
              title="Close artifact"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

      </div>

      {/* Horizontal Category Nav Pills */}
      <div className="px-3 py-2 border-b border-[var(--border-subtle)] bg-[var(--sidebar-bg)] overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md text-xs claude-font-mono transition-all ${
              activeTab === tab.id
                ? "bg-[#D97757] text-white font-medium shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Artifact Content Body (Scrollable Stream) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8"
      >
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Certifications />
        <Recommendations initialOpen={initialOpenRecommend} />
        <Courses />
        <BookOfAnswers />
        <Contact />
        <Footer />
      </div>

    </div>
  );
};

export default ClaudeArtifactPanel;
