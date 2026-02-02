import React from 'react';
import '../App.css'; 
import Header from '../components/Header';
import About from '../components/About';
import Experience from '../components/Experience';
import TechStack from '../components/TechStack';
import BeyondCoding from '../components/BeyondCoding';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Recommendations from '../components/Recommendations';
import FooterGrid from '../components/Footer'; 
import Contact from '../components/Contact';

export default function App() {
  return (
    <div className="container">
      
      <div className="header-card">
        <Header />
      </div>

      <div className="main-grid">
        
        <div className="left-column">
          
          <About />
          
          <div className="split-grid">
             <TechStack />
             <BeyondCoding />
          </div>

          <Projects />
          
        </div>

        <div className="right-column">
          <Experience />
        </div>
        
      </div>

      <div className="bottom-grid">
        <Certifications />
        <Recommendations />
      </div>

      <div className="footer-grid-wrapper"> 
        <Contact />
        <FooterGrid />
      </div>
    </div>
  );
}