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
    <div className="card rounded-3xl h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-xl text-blue-500" />
            <h2 className="text-lg font-bold">Featured Course</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1">
            <HiSparkles className="text-xs" /> Featured
          </span>
        </div>

        <div className="p-4 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)] hover:border-blue-500/50 transition-all">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-blue-500 uppercase">
                {reactCourse.category}
              </span>
              <h3 className="text-base font-extrabold leading-snug mt-0.5">
                {reactCourse.title}
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {reactCourse.status}
            </span>
          </div>

          <p className="text-xs opacity-75 mb-3 leading-relaxed">
            {reactCourse.subtitle}
          </p>

          <div className="space-y-1.5 mb-3">
            {reactCourse.topics.slice(0, 4).map((topic, index) => (
              <div key={index} className="flex items-center gap-2 text-xs opacity-90">
                <FaCheckCircle className="text-emerald-500 text-[11px] shrink-0" />
                <span>{topic}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-color)]">
            {reactCourse.tech.map((t, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--card-bg)] border border-[var(--border-color)] opacity-80"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex justify-end">
        <Link
          to="/react-course"
          className="text-xs font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 group transition-colors"
        >
          View Full Course Guide <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default Courses;
