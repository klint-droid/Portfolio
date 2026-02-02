import React from "react";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa6";

const Projects = () => {
    const projects = [
        {
            title: "Portfolio Website",
            description: "A personal portfolio website to showcase my projects and skills.",
            link: "#",
            year: "2026",
        }
    ]

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <FaFolderOpen className="text-lg text-gray-800"/>
                    <h2 className="text-lg font-bold text-gray-900">Projects</h2>
                </div>
                <a href="#" className="text-xs font-semibold text-gray-400 hover:text-gray-900 flex items-center gap-1 transition-colors duration-200">
                    View All <FaArrowRight className="text-[10px]"/>
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <a 
                    key={index}
                    href={`https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
                    > 
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                                {project.title}
                            </h3>
                            <span className="text-[10px] bg-white border-gray-200 px-1.5 py-0.5 rounded text-gray-500">{project.year}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                            {project.description}
                        </p>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <p className="font-mono text-[10px] text-gray-400 group-hover:text-gray-600 truncate">
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