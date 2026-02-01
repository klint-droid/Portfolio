import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Certifications from "./components/Certifications";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-white p-6">
      <Header />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Certifications />
    </div>
    
  );
}
