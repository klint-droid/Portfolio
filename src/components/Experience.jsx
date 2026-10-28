import React from "react";
import { FaBriefcase, FaGraduationCap, FaBuilding, FaCode } from "react-icons/fa6";

const Experience = () => {
  const timelineData = [
    {
      role: "Software Engineer Intern",
      company: "Kyocera Document Solutions Philippines, Inc.",
      year: "2026",
      type: "Work",
      icon: <FaBriefcase className="text-[#D97757]" size={13} />,
      desc: "Engineered web services, software tools, and document management solutions."
    },
    {
      role: "Associate Degree in Computer Technology Major in Software Development",
      company: "University of San Jose - Recoletos",
      year: "2026",
      type: "Education",
      icon: <FaGraduationCap className="text-[#D97757]" size={13} />,
      desc: "Specialized in software development, data structures, algorithms, & database systems."
    },
    {
      role: "Breakout Session Participant",
      company: "JP Morgan Chase & Co",
      year: "2025",
      type: "Program",
      icon: <FaBuilding className="text-[#D97757]" size={13} />,
      desc: "Engaged in technology leadership, engineering practices, & financial tech workshops."
    },
    {
      role: "Youth Empowerment Session Participant",
      company: "Synchrony",
      year: "2025",
      type: "Program",
      icon: <FaBuilding className="text-[#D97757]" size={13} />,
      desc: "Collaborated in professional development, tech innovation, & leadership tracks."
    },
    {
      role: "Digital Designer",
      company: "Datawords Philippines",
      year: "2025",
      type: "Work",
      icon: <FaBriefcase className="text-[#D97757]" size={13} />,
      desc: "Created digital assets, UI components, & localized digital media."
    },
    {
      role: "First Line of Code!",
      company: "Started Developer Journey",
      year: "2024",
      type: "Milestone",
      icon: <FaCode className="text-[#D97757]" size={13} />,
      desc: "Began full-stack programming, web design, & building custom applications."
    }
  ];

  return (
    <section id="experience" className="scroll-mt-20 bento-card bg-[var(--card-bg)] border-[var(--border-color)]">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number claude-font-mono text-xs text-[#D97757]">02 // EXPERIENCE</span>
        </div>
        <span className="claude-font-mono text-xs text-[var(--text-muted)]">
          Career & Milestones
        </span>
      </div>

      <div className="relative border-l border-[var(--border-color)] ml-3 space-y-6 pt-2 pb-2">
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-6 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] group-hover:border-[#D97757] flex items-center justify-center transition-colors shadow-xs">
              {item.icon}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 claude-font-mono">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--sidebar-bg)] border border-[var(--border-color)] text-[#D97757]">
                  {item.year}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                  {item.type}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[#D97757] transition-colors claude-font-serif text-base">
                {item.role}
              </h3>

              <p className="text-xs font-medium text-[var(--text-secondary)]">
                {item.company}
              </p>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-0.5">
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