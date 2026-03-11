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
        name: "Crash Course on Python",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/records/ZLQ3GCRJVF9R"
      },
      {
        name: "Using Python to Interact with the Operating System",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/verify/Y0EHUNB69CP8"
      },
      {
        name: "Introduction to Git and GitHub",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/verify/O5U5QGJ0ZP79"
      },
      {
        name: "Troubleshooting and Debugging Techniques",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/verify/934ZJZPNAK1Y"
      },
      {
        name: "Configuration Management and the Cloud",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/verify/PLDKR3UZBLZP"
      },
      {
        name: "Accelerate Your Job Search with AI",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/records/QUHNCZ9VW3VM"
      },
      {
        name: "Automating Real-World Tasks with Python",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/records/QJZHNLC1PDWX"
      },
      {
        name: "Google IT Automation with Python Professional Certificate",
        issuer: "Coursera",
        link: "https://www.credly.com/badges/1f934110-13c0-4d34-8c2c-76e1be132fd1/linked_in_profile"
      },
      {
        name: "Foundations: Data, Data, Everywhere",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/records/5EDRKGRWQSBK"
      },
      {
        name: "Ask Questions to Make Data-Driven Decisions",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/records/33E199N2LWO2"
      },
      {
        name: "Prepare Data for Exploration",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/records/AP87DAVZXV9N"
      },
      {
        name: "Process Data from Dirty to Clean",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/records/QLMBCRRY7DAO"
      },
      {
        name: "Analyze Data to Answer Questions",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/records/13X64ZLS2J27"
      },
      {
        name: "SQL Associate",
        issuer: "DataCamp",
        link: "https://www.datacamp.com/certificate/SQA0012000674391"
      },
      {
        name: "Advent of Cyber 2025 Certification",
        issuer: "tryHackMe",
        link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-MUOEHIBUHB.pdf"
      },
      {
        name: "Tech Talk in Navigating the Digital Age: Cloud, Generative AI & Cybersecurity",
        issuer: "Accenture",
        link: "https://drive.google.com/drive/u/0/folders/1Y8v0HIpmUh3KPUWkYwSLaKOBryFDY8bQ"
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