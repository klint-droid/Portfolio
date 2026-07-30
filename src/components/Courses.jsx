import React from "react";
import { FaGraduationCap, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";

const Courses = () => {
  const reactCourse = {
    title: "React Guided Learning Path",
    subtitle: "From Node.js Setup to Building & Deploying Production React Apps",
    status: "Active Course",
    category: "Frontend Engineering",
    topics: [
      "Node.js & Vite Setup",
      "JSX, Components & Props",
      "State Management (useState, useReducer)",
      "Effects & REST API Data Fetching",
      "Context API & Custom Hooks",
      "React Router & Vitest Testing"
    ],
    tech: ["React", "Vite", "JavaScript", "Node.js", "React Router", "Vitest"]
  };

  return (
    <section id="courses" className="scroll-mt-20 bento-card">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number">07 // COURSES</span>
        </div>
        <Link
          to="/react-course"
          className="font-mono text-xs text-gray-500 hover:text-blue-500 flex items-center gap-1.5 transition-colors group"
        >
          <span>view course</span>
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="p-4 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {reactCourse.category}
            </span>
            <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white leading-snug">
              {reactCourse.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold shrink-0">
            {reactCourse.status}
          </span>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
          {reactCourse.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {reactCourse.topics.map((topic, index) => (
            <div key={index} className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300">
              <FaCheckCircle className="text-emerald-500 text-[11px] shrink-0" />
              <span className="truncate">{topic}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200 dark:border-[#27272a]">
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
