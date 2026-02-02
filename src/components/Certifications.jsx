import React from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

const Certifications = () => {
  const certs = [
    {
      name: "Full Development Bootcamp",
      issuer: "Roman GUERRY",
      link: "https://example.com/bootcamp", 
    },
    {
      name: "Database Design & SQL Fundamentals",
      issuer: "Roman GUERRY",
      link: "https://example.com/database-sql",
    },
    {
      name: "Innovative Creator Award",
      issuer: "Datawords Philippines",
      link: "https://example.com/creator-award",
    },
    {
      name: "Youth Empowerment Session",
      issuer: "Synchrony Global",
      link: "#",
    },
    {
      name: "Using Python to Interact with the Operating System",
      issuer: "Coursera",
      link: "https://www.coursera.org/account/accomplishments/records/ZLQ3GCRJVF9R",
    },
    {
      name: "Crash Course on Python",
      issuer: "Coursera",
      link: "https://coursera.org/share/8eef1cc2b9b57f4bef89f5430b3ecbf7",
    },
    {
      name: "Foundations of Cybersecurity",
      issuer: "Coursera",
      link: "https://www.coursera.org/account/accomplishments/certificate/VNLK04AACGRC",
    },
    {
      name: "Tech Talk: Generative AI",
      issuer: "Accenture",
      link: "https://drive.google.com/file/d/11kBTU8gfx3j9-ru65cGBv2m4snc4unDH/view?usp=drive_link"
    }
  ]

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BiBadgeCheck className="text-xl text-gray-800"/>
          <h2 className="text-lg font-bold text-gray-900">Recent Certifications</h2>
        </div>
        <a href="#" className="text-xs font-semiboldtext-gray-400 hover:text-gray-900 flex items-center gap-1 transition-colors">
          View All <FaArrowRight className="text-[10px]"/>
        </a>
      </div>
      <div className="space-y-3">
        {certs.map((cert, index) => (
          <div
          key={index}
          className="group flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors cursor-default"
          >
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {cert.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {cert.issuer}
            </p>
            <a href={cert.link} className="text-xs text-blue-600 mt-0.5">
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certifications;