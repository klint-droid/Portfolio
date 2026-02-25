import React from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Certifications = () => {
    const certs = [
      {
        name: "Using Python to Interact with the Operating System",
        issuer: "Coursera",
      },
      {
        name: "Crash Course on Python",
        issuer: "Coursera",
      },
      {
        name: "Foundations of Cybersecurity",
        issuer: "Coursera",
      },
      {
        name: "Tech Talk: Generative AI",
        issuer: "Accenture",
      }
    ]

    return (

      <div className="card rounded-3xl h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <BiBadgeCheck className="text-xl"/>
            <h2 className="text-lg font-bold">Recent Certifications</h2>
          </div>
          <Link to="/all-certifications" className="text-xs font-semibold opacity-60 hover:opacity-100 flex items-center gap-1 transition-opacity">
            View All <FaArrowRight className="text-[10px]"/>
          </Link>
        </div>
        
        <div className="space-y-3">
          {certs.slice(0, 4).map((cert, index) => (
            <div
              key={index}
              className="group flex flex-col p-2 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] hover:border-[var(--text-secondary)] transition-all cursor-default"
            >
              <h3 className="text-sm font-bold group-hover:text-blue-500 transition-colors">
                {cert.name}
              </h3>
              <p className="text-xs mt-1 opacity-70">
                {cert.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default Certifications;