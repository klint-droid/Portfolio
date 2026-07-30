import React from "react";
import { FaBriefcase, FaGraduationCap, FaBuilding, FaCode } from "react-icons/fa6";

const Experience = () => {
  const timelineData = [
    {
      role: "Software Engineer Intern",
      company: "Kyocera Document Solutions Philippines, Inc.",
      year: "2026",
      type: "Work",
      icon: <FaBriefcase className="text-blue-500" size={13} />,
      desc: "Engineered web services, software tools, and document management solutions."
    },
    {
      role: "Associate Degree in Computer Technology Major in Software Developer",
      company: "University of San Jose - Recoletos",
      year: "2026",
      type: "Education",
      icon: <FaGraduationCap className="text-purple-500" size={13} />,
      desc: "Specialized in software development, data structures, algorithms, & database systems."
    },
    {
      role: "Breakout Session Participant",
      company: "JP Morgan Chase & Co",
      year: "2025",
      type: "Program",
      icon: <FaBuilding className="text-emerald-500" size={13} />,
      desc: "Engaged in technology leadership, engineering practices, & financial tech workshops."
    },
    {
      role: "Youth Empowerment Session Participant",
      company: "Synchrony",
      year: "2025",
      type: "Program",
      icon: <FaBuilding className="text-amber-500" size={13} />,
      desc: "Collaborated in professional development, tech innovation, & leadership tracks."
    },
    {
      role: "Digital Designer",
      company: "Datawords Philippines",
      year: "2025",
      type: "Work",
      icon: <FaBriefcase className="text-cyan-500" size={13} />,
      desc: "Created digital assets, UI components, & localized digital media."
    },
    {
      role: "First Line of Code!",
      company: "Started Developer Journey",
      year: "2024",
      type: "Milestone",
      icon: <FaCode className="text-rose-500" size={13} />,
      desc: "Began full-stack programming, web design, & building custom applications."
    }
  ];

  return (
    <section id="experience" className="scroll-mt-20 bento-card">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number">02 // EXPERIENCE</span>
        </div>
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          Career & Milestones
        </span>
      </div>

      <div className="relative border-l border-gray-200 dark:border-[#27272a] ml-3 space-y-6 pt-2 pb-2">
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-6 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-gray-100 dark:bg-[#121215] border border-gray-300 dark:border-[#27272a] group-hover:border-blue-500 flex items-center justify-center transition-colors">
              {item.icon}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] text-blue-600 dark:text-blue-400">
                  {item.year}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">
                  {item.type}
                </span>
              </div>

              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-mono group-hover:text-blue-500 transition-colors">
                {item.role}
              </h3>

              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {item.company}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;