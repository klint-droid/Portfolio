import React, { useState, useEffect } from "react";
import { 
  FaCalendarAlt, 
  FaDownload, 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaMoon, 
  FaSun,
  FaRobot,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { trackEvent } from "../analytics";

const Sidebar = ({ theme, toggleTheme, onOpenAIChat }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "about", label: "01 — about" },
    { id: "experience", label: "02 — experience" },
    { id: "projects", label: "03 — projects" },
    { id: "techstack", label: "04 — stack" },
    { id: "certifications", label: "05 — certifications" },
    { id: "recommendations", label: "06 — recommendations" },
    { id: "courses", label: "07 — courses" },
    { id: "book-of-answers", label: "08 — book of answers" },
    { id: "contact", label: "09 — contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. If reached bottom of page, highlight the last section (contact)
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      // 2. Determine section based on top position in viewport
      const scrollPosition = window.scrollY + 250;
      let currentSection = navItems[0].id;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          if (element.offsetTop <= scrollPosition) {
            currentSection = item.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadCV = () => {
    trackEvent("Resume", "Download", "User downloaded resume from sidebar");
  };

  const isDark = theme === "dark";

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#27272a] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
            <img src="1st.jpg" alt="Klint Ruales" className="w-full h-full object-cover" />
          </div>
          <span className="font-mono text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
            Klint Ruales
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-[#18181b] text-gray-700 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun size={14} className="text-amber-400" /> : <FaMoon size={14} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-[#18181b] text-gray-700 dark:text-gray-300"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm pt-16 px-6 pb-8 flex flex-col justify-between">
          <nav className="flex flex-col gap-3 py-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-base py-2 transition-colors ${
                  activeSection === item.id
                    ? "text-blue-500 font-bold"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAIChat();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm font-medium transition-colors"
            >
              <FaRobot size={15} />
              <span>Ask AI Assistant (Alt + K)</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-80 h-screen sticky top-0 p-6 border-r border-gray-200 dark:border-[#27272a] bg-white/50 dark:bg-[#09090b]/80 backdrop-blur-md overflow-y-auto shrink-0">
        <div className="flex flex-col">
          {/* Profile Card */}
          <div className="mb-6">
            <div className="relative w-36 h-36 mb-4 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#27272a] group cursor-pointer shadow-sm">
              <img
                src="1st.jpg"
                alt="Klint Morales Ruales"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
              />
              <img
                src="2nd.jpg"
                alt="Klint Morales Ruales hover"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
              />
            </div>

            <div className="flex items-center gap-1.5 mb-1">
              <h1 className="font-mono text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Klint Ruales
              </h1>
              <MdVerified className="text-blue-500" size={18} title="Verified Engineer" />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
              <FaMapMarkerAlt size={11} className="text-gray-400" />
              <span>Cebu City, Philippines</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
              Software Engineer & Full-Stack Developer specializing in web apps, cloud architectures, & AI integrations.
            </p>
          </div>

          {/* AI Search & Assistant Trigger */}
          <button
            onClick={onOpenAIChat}
            className="w-full flex items-center justify-between py-2.5 px-3 mb-6 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#121215] hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-left text-xs font-mono transition-all group"
          >
            <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FaRobot className="text-blue-500 group-hover:scale-110 transition-transform" size={14} />
              <span>Ask AI Assistant</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-200 dark:bg-[#27272a] text-gray-600 dark:text-gray-400">
              Alt + K
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 mb-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`font-mono text-xs py-1.5 px-2.5 rounded-lg transition-all flex items-center justify-between ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 font-semibold border-l-2 border-blue-500"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#18181b]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </a>
              );
            })}
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex flex-col gap-2 mb-6">
            <a
              href="https://calendly.com/klintruales11"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono text-xs font-medium hover:bg-black dark:hover:bg-gray-100 transition-colors"
            >
              <FaCalendarAlt size={12} />
              <span>Schedule a Call</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="mailto:klintruales11@gmail.com?subject=Project Inquiry"
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#121215] hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-gray-700 dark:text-gray-300 font-mono text-[11px] font-medium transition-colors"
              >
                <FaEnvelope size={11} />
                <span>Email</span>
              </a>

              <a
                onClick={handleDownloadCV}
                href="/Klint_Ruales_Resume.pdf"
                download="Klint_Ruales_Resume.pdf"
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#121215] hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-gray-700 dark:text-gray-300 font-mono text-[11px] font-medium transition-colors"
              >
                <FaDownload size={11} />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-[#27272a] flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/KlintM"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
              title="GitHub"
            >
              <FaGithub size={15} />
            </a>
            <a
              href="https://linkedin.com/in/klint-ruales"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin size={15} />
            </a>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#121215] hover:bg-gray-100 dark:hover:bg-[#1c1c21] font-mono text-[11px] transition-colors"
          >
            {isDark ? (
              <>
                <FaSun size={11} className="text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <FaMoon size={11} className="text-gray-600" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
