import React, { useState, useEffect } from 'react';
import '../App.css'; 

import Header from '../components/Header';
import About from '../components/About';
import Experience from '../components/Experience';
import TechStack from '../components/TechStack';
import BeyondCoding from '../components/BeyondCoding';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Recommendations from '../components/Recommendations';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import IncubationBanner from '../components/IncubationBanner';

export default function Layout() {

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="container">
      
      <div className="header-card">
        <Header theme={theme} toggleTheme={toggleTheme}/>
      </div>
      
      <div className="main-grid">
        <div className="left-column">
          <About />
          <TechStack />
        </div>

        <div className="right-column h-full flex flex-col">
          <IncubationBanner />
          <Experience />
        </div>
      </div>

      <div className="split-grid mb-6"> 
         <BeyondCoding />
         <Projects />
      </div>

      <div className="bottom-grid">
        <Certifications />
        <Recommendations />
      </div>

      <div className="footer-section"> 
        <Contact />
        <Footer />
      </div>
    </div>
  );
}