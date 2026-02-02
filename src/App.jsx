import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Certifications from "./components/Certifications";
import BeyondCoding from "./components/BeyondCoding";
import Recommendations from "./components/Recommendations";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-white p-6">
      <Header />
      <About />
      <Experience />
      <Projects />
      <BeyondCoding />
      <TechStack />
      <Certifications />
      <Recommendations />
      <Contact />
      <Footer />
    </div>
    
  );
}
