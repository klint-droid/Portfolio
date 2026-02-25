import React, { useEffect } from "react";
import { BiBadge } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CertificationLists = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const certs = [
        {
        name: "Using Python to Interact with the Operating System",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/certificate/9Z5K7Z6K8Z3C"
      },
      {
        name: "Crash Course on Python",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/certificate/9Z5K7Z6K8Z3C"
      },
      {
        name: "Foundations of Cybersecurity",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/certificate/9Z5K7Z6K8Z3C"
      },
      {
        name: "Tech Talk: Generative AI",
        issuer: "Accenture",
        link: "https://www.coursera.org/account/accomplishments/certificate/9Z5K7Z6K8Z3C"
      }
    ]

    return(
        <div className="container max-w-3xl mx-auto py-12">
            <div className="card rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" 
                    className="p-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-full hover:border-[var(--text-secondary)] transition-colors">
                        <FaArrowLeft className="text-sm"/>
                    </Link>
                    <div className="flex items-center gap-2">
                        <BiBadge className="text-2xl"/>
                        <h1 className="text-2xl font-bold">All Certifications</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certs.map((cert, index) => (
                        <div
                        key={index}
                        className="group flex flex-col p-4 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] hover:border-[var(--text-secondary)] transition-all"
                        >
                            <h3 className="text-sm font-bold group-hover:text-blue-500 transition-colors">
                                {cert.name}
                            </h3>
                            <p className="text-xs mt-1 opacity-70 mb-3">
                                {cert.issuer}
                            </p>
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 mt-auto hover:underline w-fit">
                                View Certificate
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CertificationLists;