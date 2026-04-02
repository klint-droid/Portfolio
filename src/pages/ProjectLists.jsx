import React, { use, useEffect } from "react";
import { BiBadge } from "react-icons/bi";
import { FaArrowLeft, FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectLists = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const projects = [
        {
            name: "Personal Portfolio Website",
            description: "A responsive portfolio website built with React and Tailwind CSS to showcase my projects, skills, and experience.",
            tech: "React, Tailwind CSS",
            link: "https://klint-ruales.vercel.app/",
        },
        {
            name: "Evacuation Assistant App",
            description: "An AI-powered disaster preparedness app designed for households in the Philippines that generates personalized evacuation guidance for floods, typhoons, and earthquakes. Users input household size, disaster type, and risk level, and the app produces a tailored evacuation plan, emergency supplies checklist with recommended quantities, safety tips specific to each disaster, and a priority level assessment with urgency and next steps.",
            tech: "PartyRock (Amazon AWS), Large Language Model (LLM), Amazon Web Services (AWS)",
            link: "https://partyrock.aws/u/thisisklint/APJz77mmS/new-app-APJz77mmS"
        },
        {
            name: "Task Tracker Mobile App",
            description: "A mobile app developed using Ionic Framework + React.js to help users manage their tasks and improve productivity.",
            tech: "Ionic Framework, TypeScript, Android Studio",
            link: "/TaskTracker.apk"
        },
        {
            name: "Student Grade Prediction App",
            description: "A web application that predicts student grades based on their study time, failures, absecences, and test scores.",
            tech: "Streamlit, Python, Machine Learning",
            link: "https://grade-predict.streamlit.app/"
        },
        {
            name: "Smart Home Management System (Java Swing GUI)",
            description: "A desktop application built with Java Swing to manage and control smart home devices and systems.",
            tech: "Java, Swing",
            link: "/SmartHome-1.0.0.exe"
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
                        <FaFolderOpen className="text-2xl"/>
                        <h2 className="text-lg font-bold">Projects</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((projects, index) => (
                        <div
                        key={index}
                        className="group flex flex-col p-4 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] hover:border-[var(--text-secondary)] transition-all"
                        >
                            <h3 className="text-sm font-bold group-hover:text-blue-500 transition-colors">
                                {projects.name}
                            </h3>
                            <p className="text-xs mt-1 opacity-70 mb-3">
                                {projects.description}
                            </p>
                            <p className="text-xs text-yellow-600 mt-1 opacity-70 mb-3">
                                {projects.tech}
                            </p>
                            <a href={projects.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 mt-auto hover:underline w-fit">
                                View Project
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectLists;