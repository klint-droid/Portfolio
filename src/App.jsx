import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Summary from "./components/Summary";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Certifications from "./components/Certifications";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header />
      <Summary />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Certifications />
    </div>
  );
}
