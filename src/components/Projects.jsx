import React from "react";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Projects = () => {
    const projects = [
        {
            title: "Portfolio Website",
            description: "A personal portfolio website to showcase my projects and skills.",
            link: "klintruales.com", 
            year: "2026",
        }
    ]

    return (
    
        <div className="card rounded-3xl">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    
                    <FaFolderOpen className="text-lg"/>
                    <h2 className="text-lg font-bold">Projects</h2>
                </div>
               
                <Link to="/all-projects" className="text-xs font-semibold opacity-60 hover:opacity-100 flex items-center gap-1 transition-opacity">
                    View All <FaArrowRight className="text-[10px]"/>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <a 
                    key={index}
                    href={`https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                   
                    className="group block bg-[var(--bg-color)] rounded-xl p-4 border border-[var(--border-color)] hover:border-[var(--text-secondary)] transition-all"
                    > 
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-sm group-hover:text-blue-500 transition-colors">
                                {project.title}
                            </h3>
                            
                            
                            <span className="text-[10px] bg-[var(--card-bg)] border border-[var(--border-color)] px-1.5 py-0.5 rounded opacity-70">
                                {project.year}
                            </span>
                        </div>
                        
                        <p className="text-xs mb-3 line-clamp-1 opacity-70">
                            {project.description}
                        </p>
                        
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <p className="font-mono text-[10px] opacity-50 group-hover:opacity-100 truncate transition-opacity">
                                {project.link}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Projects;