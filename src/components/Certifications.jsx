import React from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Certifications = () => {
  const certs = [
    {
      name: "Using Python to Interact with the Operating System",
      issuer: "Google / Coursera",
      category: "Python & System Automation"
    },
    {
      name: "Crash Course on Python",
      issuer: "Google / Coursera",
      category: "Scripting & OOP"
    },
    {
      name: "Foundations of Cybersecurity",
      issuer: "Google / Coursera",
      category: "Web & InfoSec"
    },
    {
      name: "Tech Talk: Generative AI & Innovation",
      issuer: "Accenture",
      category: "AI & Modern Engineering"
    }
  ];

  return (
    <section id="certifications" className="scroll-mt-20 bento-card bg-[var(--card-bg)] border-[var(--border-color)]">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number claude-font-mono text-xs text-[#D97757]">05 // CERTIFICATIONS</span>
        </div>
        <Link
          to="/all-certifications"
          className="claude-font-mono text-xs text-[var(--text-muted)] hover:text-[#D97757] flex items-center gap-1.5 transition-colors group"
        >
          <span>view all 20+</span>
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {certs.map((cert, index) => (
          <div
            key={index}
            className="group flex flex-col justify-between p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] hover:bg-[var(--card-hover)] hover:border-[#D97757]/60 transition-all cursor-default shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="claude-font-mono text-[10px] text-[#D97757] font-semibold uppercase tracking-wider">
                  {cert.category}
                </span>
                <BiBadgeCheck className="text-[#D97757]" size={17} />
              </div>
              <h3 className="claude-font-serif text-sm font-semibold text-[var(--text-primary)] group-hover:text-[#D97757] transition-colors leading-snug">
                {cert.name}
              </h3>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-2 claude-font-mono">
              {cert.issuer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;