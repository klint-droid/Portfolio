import React, { useState, useEffect } from "react";
import ClaudeNavbar from "../components/ClaudeNavbar";
import ClaudeSidebar from "../components/ClaudeSidebar";
import ClaudeChat from "../components/ClaudeChat";
import TelemetryModal from "../components/TelemetryModal";
import "../App.css";

export default function Layout() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  // Keyboard shortcut: Escape to close sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };
    const handleOpenTelemetryEvent = () => setIsTelemetryOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-telemetry-scan", handleOpenTelemetryEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-telemetry-scan", handleOpenTelemetryEvent);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Called when user clicks a prompt in the sidebar or prompt chips
  const handleSelectPrompt = (promptText) => {
    setActivePromptQuery(promptText);
  };

  const handleStartNewChat = () => {
    setActivePromptQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-primary)] transition-colors duration-200">
      
      {/* Top Claude Navbar */}
      <ClaudeNavbar
        theme={theme}
        toggleTheme={toggleTheme}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenNewChat={handleStartNewChat}
      />

      <div className="flex-1 flex w-full h-[calc(100vh-3.5rem)] relative overflow-hidden">
        
        {/* Left Collapsible Claude Sidebar */}
        <ClaudeSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          theme={theme}
          toggleTheme={toggleTheme}
          onSelectPrompt={handleSelectPrompt}
          onStartNewChat={handleStartNewChat}
          onOpenTelemetry={() => setIsTelemetryOpen(true)}
        />

        {/* Main Content Area - Full Interactive Interview Chat */}
        <main className="flex-1 min-w-0 h-full flex flex-col overflow-hidden">
          <ClaudeChat
            activePromptQuery={activePromptQuery}
            onClearActivePrompt={() => setActivePromptQuery(null)}
          />
        </main>

      </div>

      {/* Telemetry Security Audit HUD Modal */}
      <TelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

    </div>
  );
}