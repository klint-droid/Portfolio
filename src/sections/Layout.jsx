import React, { useState, useEffect } from 'react';
import '../App.css';

import Sidebar from '../components/Sidebar';
import About from '../components/About';
import Experience from '../components/Experience';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Courses from '../components/Courses';
import Recommendations from '../components/Recommendations';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AIChatButton from '../components/AIChatButton';

export default function Layout() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenAIChat = () => {
    window.dispatchEvent(new CustomEvent('toggle-ai-chat'));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#09090b] text-gray-900 dark:text-[#f4f4f5] transition-colors duration-300">
      {/* Sticky Left Sidebar */}
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAIChat={handleOpenAIChat}
      />

      {/* Main Content Stream */}
      <main className="flex-1 px-4 py-8 lg:py-10 lg:px-12 max-w-5xl mx-auto w-full space-y-12 overflow-x-hidden pt-20 lg:pt-10">
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Certifications />
        <Recommendations />
        <Courses />
        <Contact />
        <Footer />
      </main>

      {/* Floating AI Chat Assistant */}
      <AIChatButton />
    </div>
  );
}