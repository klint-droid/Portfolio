import React from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Certifications = () => {
  const certs = [
    {
      name: "Using Python to Interact with the Operating System",
      issuer: "Google / Coursera",
      category: "Python / Automation"
    },
    {
      name: "Crash Course on Python",
      issuer: "Google / Coursera",
      category: "Programming"
    },
    {
      name: "Foundations of Cybersecurity",
      issuer: "Google / Coursera",
      category: "Security"
    },
    {
      name: "Tech Talk: Generative AI",
      issuer: "Accenture",
      category: "AI & Innovation"
    }
  ];

  return (
    <section id="certifications" className="scroll-mt-20 bento-card">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number">05 // CERTIFICATIONS</span>
        </div>
        <Link
          to="/all-certifications"
          className="font-mono text-xs text-gray-500 hover:text-blue-500 flex items-center gap-1.5 transition-colors group"
        >
          <span>view all</span>
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {certs.map((cert, index) => (
          <div
            key={index}
            className="group flex flex-col justify-between p-3.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition-all cursor-default"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                  {cert.category}
                </span>
                <BiBadgeCheck className="text-blue-500" size={16} />
              </div>
              <h3 className="font-mono text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {cert.name}
              </h3>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 font-mono">
              {cert.issuer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;