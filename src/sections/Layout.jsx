import React, { useState, useEffect } from "react";
import ClaudeNavbar from "../components/ClaudeNavbar";
import ClaudeSidebar from "../components/ClaudeSidebar";
import ClaudeChat from "../components/ClaudeChat";
import ClaudeArtifactPanel from "../components/ClaudeArtifactPanel";
import TelemetryModal from "../components/TelemetryModal";
import "../App.css";

export default function Layout({ initialOpenRecommend = false }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [viewMode, setViewMode] = useState(() => {
    // Default to split view on ultra-wide desktop screens, or chat on normal screens
    if (typeof window !== "undefined" && window.innerWidth >= 1280) {
      return "split";
    }
    return "chat";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeArtifactSection, setActiveArtifactSection] = useState("all");
  const [activePromptQuery, setActivePromptQuery] = useState(null);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);

  // Apply theme classes
  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Keyboard shortcut: Alt+K or Cmd+K to open chat or telemetry
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.altKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setViewMode((prev) => (prev === "chat" ? "artifacts" : "chat"));
      }
    };
    const handleOpenTelemetryEvent = () => setIsTelemetryOpen(true);
    const handleSwitchViewMode = (e) => {
      if (e.detail) setViewMode(e.detail);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-telemetry-scan", handleOpenTelemetryEvent);
    window.addEventListener("switch-view-mode", handleSwitchViewMode);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-telemetry-scan", handleOpenTelemetryEvent);
      window.removeEventListener("switch-view-mode", handleSwitchViewMode);
    };
  }, []);

  // Responsive check on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && viewMode === "split") {
        setViewMode("chat");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Called when user clicks a prompt in the sidebar or prompt chips
  const handleSelectPrompt = (promptText, sectionId) => {
    setActivePromptQuery(promptText);
    if (sectionId) {
      setActiveArtifactSection(sectionId);
    }
    // Switch to chat if in artifacts mode
    if (viewMode === "artifacts") {
      setViewMode("chat");
    }
  };

  // Called when user wants to view a specific artifact directly
  const handleSelectArtifact = (sectionId) => {
    setActiveArtifactSection(sectionId);
    if (viewMode === "chat") {
      if (window.innerWidth >= 1280) {
        setViewMode("split");
      } else {
        setViewMode("artifacts");
      }
    }
  };

  const handleStartNewChat = () => {
    setActivePromptQuery("");
    setViewMode("chat");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-primary)] transition-colors duration-200">
      
      {/* Top Claude Navbar */}
      <ClaudeNavbar
        theme={theme}
        toggleTheme={toggleTheme}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenNewChat={handleStartNewChat}
      />

      <div className="flex-1 flex w-full relative overflow-hidden">
        
        {/* Left Collapsible Claude Sidebar */}
        <ClaudeSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          theme={theme}
          toggleTheme={toggleTheme}
          onSelectPrompt={handleSelectPrompt}
          onSelectArtifact={handleSelectArtifact}
          onStartNewChat={handleStartNewChat}
          onOpenTelemetry={() => setIsTelemetryOpen(true)}
          activeSection={activeArtifactSection}
        />

        {/* Main Content Area (Dynamic based on View Mode) */}
        <div className={`flex-1 flex overflow-hidden w-full transition-all duration-300 ${isSidebarOpen ? "lg:pl-80" : "lg:pl-0"}`}>
          
          {/* VIEW 1: CHAT ONLY (Claude Conversation Canvas) */}
          {viewMode === "chat" && (
            <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
              <ClaudeChat
                onNavigateArtifact={(section) => {
                  setActiveArtifactSection(section);
                  if (window.innerWidth >= 1280) {
                    setViewMode("split");
                  } else {
                    setViewMode("artifacts");
                  }
                }}
                activePromptQuery={activePromptQuery}
                onClearActivePrompt={() => setActivePromptQuery(null)}
              />
            </main>
          )}

          {/* VIEW 2: ARTIFACTS ONLY (Full Traditional Portfolio Canvas) */}
          {viewMode === "artifacts" && (
            <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
              <ClaudeArtifactPanel
                activeSection={activeArtifactSection}
                onClose={() => setViewMode("chat")}
                initialOpenRecommend={initialOpenRecommend}
                isSplitView={false}
              />
            </main>
          )}

          {/* VIEW 3: SPLIT VIEW (Claude Chat on Left + Artifact Panel on Right) */}
          {viewMode === "split" && (
            <div className="flex-1 flex h-[calc(100vh-3.5rem)] overflow-hidden divide-x divide-[var(--border-color)]">
              {/* Left Column: Claude Chat */}
              <div className="w-1/2 flex flex-col overflow-hidden">
                <ClaudeChat
                  onNavigateArtifact={(section) => {
                    setActiveArtifactSection(section);
                  }}
                  activePromptQuery={activePromptQuery}
                  onClearActivePrompt={() => setActivePromptQuery(null)}
                />
              </div>

              {/* Right Column: Live Portfolio Canvas Artifact */}
              <div className="w-1/2 flex flex-col overflow-hidden">
                <ClaudeArtifactPanel
                  activeSection={activeArtifactSection}
                  onClose={() => setViewMode("chat")}
                  initialOpenRecommend={initialOpenRecommend}
                  isSplitView={true}
                />
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Telemetry Security Audit HUD Modal */}
      <TelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

    </div>
  );
}