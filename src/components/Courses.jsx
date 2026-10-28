import React from "react";
import { FaGraduationCap, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Courses = () => {
  const reactCourse = {
    title: "React Guided Learning Path",
    subtitle: "From Node.js Setup to Building & Deploying Production React Apps",
    status: "Active Curriculum",
    category: "Frontend Engineering",
    topics: [
      "Node.js & Vite Modern Tooling",
      "JSX, Components & Props Composition",
      "State Management (useState, useReducer)",
      "Effects & REST API Integration",
      "Context API & Reusable Custom Hooks",
      "React Router v7 & Automated Vitest Testing"
    ],
    tech: ["React 19", "Vite", "JavaScript", "Node.js", "React Router", "Vitest"]
  };

  return (
    <section id="courses" className="scroll-mt-20 bento-card bg-[var(--card-bg)] border-[var(--border-color)]">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number claude-font-mono text-xs text-[#D97757]">07 // COURSES & BOOTCAMPS</span>
        </div>
        <Link
          to="/react-course"
          className="claude-font-mono text-xs text-[var(--text-muted)] hover:text-[#D97757] flex items-center gap-1.5 transition-colors group"
        >
          <span>interactive syllabus</span>
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="claude-font-mono text-[10px] font-semibold text-[#D97757] uppercase tracking-wider">
              {reactCourse.category}
            </span>
            <h3 className="claude-font-serif text-base font-semibold text-[var(--text-primary)] leading-snug">
              {reactCourse.title}
            </h3>
          </div>
          <span className="claude-font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold shrink-0">
            {reactCourse.status}
          </span>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
          {reactCourse.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {reactCourse.topics.map((topic, index) => (
            <div key={index} className="flex items-center gap-2 claude-font-mono text-xs text-[var(--text-secondary)]">
              <FaCheckCircle className="text-emerald-500 text-[11px] shrink-0" />
              <span className="truncate">{topic}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-subtle)]">
          {reactCourse.tech.map((t, idx) => (
            <span key={idx} className="tech-badge">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
