import React, { useEffect } from "react";
import { FaArrowLeft, FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";

const TechStackLists = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const techStacks = [
        { name: "HTML & CSS", percentage: 95 },
        { name: "JavaScript", percentage: 85 },
        { name: "ReactJS", percentage: 80 },
        { name: "Python", percentage: 85 },
        { name: "PHP", percentage: 75 },
        { name: "SQL", percentage: 80 },
        { name: "C# & Java", percentage: 70 },
        { name: "Git & GitHub", percentage: 85 },
        { name: "UI/UX Design (Figma & Photoshop)", percentage: 80 },
    ];

    return(
        <div className="container max-w-3xl mx-auto py-12">
            <div className="card rounded-3xl">
                
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" 
                    className="p-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-full hover:border-[var(--text-secondary)] transition-colors">
                        <FaArrowLeft className="text-sm"/>
                    </Link>
                    <div className="flex items-center gap-2">
                        <FaCode className="text-2xl"/>
                        <h2 className="text-2xl font-bold">Tech Stack Proficiency</h2>
                    </div>
                </div>

                <div className="flex flex-col gap-6 p-2">
                    {techStacks.map((tech, index) => (
                        <div key={index} className="w-full group">
                            
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold group-hover:text-blue-500 transition-colors">
                                    {tech.name}
                                </span>
                                <span className="text-xs font-semibold opacity-70">
                                    {tech.percentage}%
                                </span>
                            </div>
                            
                            <div className="w-full h-2.5 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-full overflow-hidden shadow-inner">
                                <div 
                                    className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${tech.percentage}%` }}
                                ></div>
                            </div>

                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default TechStackLists;