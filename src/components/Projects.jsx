import React from "react";
import { FaArrowRight, FaCodeBranch, FaFolderOpen } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "Modern sticky-sidebar dark grid portfolio built with React, Vite, and Tailwind CSS.",
      link: "https://github.com/KlintM/Portfolio",
      year: "2026",
      tags: ["React", "Vite", "Tailwind CSS", "JavaScript"],
      status: "Live"
    },
    {
      title: "EvaTrack — Capstone System",
      description: "Comprehensive tracking & management system engineered for enterprise capstone workflow.",
      link: "https://github.com/KlintM",
      year: "2026",
      tags: ["Laravel", "PHP", "MySQL", "React", "REST API"],
      status: "Active"
    },
    {
      title: "RPG Java Swing Game",
      description: "Turn-based tactical RPG game with custom graphics & battle logic built on Java Swing.",
      link: "https://github.com/klint-droid/RPG",
      year: "2025",
      tags: ["Java", "Java Swing", "OOP", "Game Logic"],
      status: "GitHub"
    },
    {
      title: "AI Assistant & Web Chatbot",
      description: "Interactive AI search drawer & chat assistant integrated with client-side portfolio analytics.",
      link: "#",
      year: "2026",
      tags: ["React", "OpenAI / Claude API", "Tailwind"],
      status: "Featured"
    }
  ];

  return (
    <section id="projects" className="scroll-mt-20 bento-card">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number">03 // PROJECTS</span>
        </div>
        <Link
          to="/all-projects"
          className="font-mono text-xs text-gray-500 hover:text-blue-500 flex items-center gap-1.5 transition-colors group"
        >
          <span>all projects</span>
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-4 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50 hover:bg-gray-100 dark:hover:bg-[#1c1c21] hover:border-blue-500/50 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <FaFolderOpen className="text-blue-500" size={14} />
                  <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-[#27272a] text-gray-600 dark:text-gray-400">
                  {project.year}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tech-badge">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 dark:border-[#27272a]/60 text-[11px] font-mono text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{project.status}</span>
                </span>
                <span className="flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                  <span>view project</span>
                  <FiExternalLink size={12} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;