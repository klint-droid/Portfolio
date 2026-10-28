import React from "react";
import { FaArrowRight, FaCodeBranch, FaFolderOpen } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      title: "Friend Quiz & Leaderboard",
      description: "Interactive web app where users create custom quizzes about themselves, share links with friends, get friendship tier ratings & inspect live scoreboards.",
      link: "/friend-quiz",
      isInternal: true,
      year: "2026",
      tags: ["React", "Tailwind CSS", "LocalStorage", "Share API"],
      status: "Interactive App"
    },
    {
      title: "EvaTrack — Capstone System",
      description: "Comprehensive tracking & management system engineered for enterprise capstone workflows with role-based access control and analytics.",
      link: "https://github.com/klint-droid",
      isInternal: false,
      year: "2026",
      tags: ["Laravel", "PHP", "MySQL", "React", "REST API"],
      status: "Active System"
    },
    {
      title: "Task Tracker Mobile App",
      description: "Cross-platform mobile application developed with Ionic Framework + React.js to organize productivity and tasks.",
      link: "/TaskTracker.apk",
      isInternal: false,
      year: "2025",
      tags: ["Ionic", "React", "TypeScript", "Android Studio"],
      status: "Download APK"
    },
    {
      title: "RPG Java Swing Game",
      description: "Turn-based tactical RPG game with custom graphics & battle logic built on Java Swing with OOP state machine.",
      link: "https://github.com/klint-droid/RPG",
      isInternal: false,
      year: "2025",
      tags: ["Java", "Java Swing", "OOP", "Game Logic"],
      status: "GitHub"
    }
  ];

  return (
    <section id="projects" className="scroll-mt-20 bento-card bg-[var(--card-bg)] border-[var(--border-color)]">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number claude-font-mono text-xs text-[#D97757]">03 // PROJECTS</span>
        </div>
        <Link
          to="/all-projects"
          className="claude-font-mono text-xs text-[var(--text-muted)] hover:text-[#D97757] flex items-center gap-1.5 transition-colors group"
        >
          <span>all projects</span>
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => {
          const CardContent = (
            <>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <FaFolderOpen className="text-[#D97757]" size={14} />
                    <h3 className="claude-font-serif text-base font-semibold text-[var(--text-primary)] group-hover:text-[#D97757] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="claude-font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-muted)]">
                    {project.year}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
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

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-[11px] claude-font-mono text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{project.status}</span>
                  </span>
                  <span className="flex items-center gap-1 group-hover:text-[#D97757] transition-colors font-medium">
                    <span>explore</span>
                    <FiExternalLink size={12} />
                  </span>
                </div>
              </div>
            </>
          );

          if (project.isInternal) {
            return (
              <Link
                key={index}
                to={project.link}
                className="group flex flex-col justify-between p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] hover:border-[#D97757]/60 transition-all shadow-xs"
              >
                {CardContent}
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] hover:border-[#D97757]/60 transition-all shadow-xs"
            >
              {CardContent}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;