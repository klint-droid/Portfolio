import React, { useEffect } from "react";
import { FaArrowLeft, FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";

const TechStackLists = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const techCategories = [
        {
            title: "Frontend",
            skills: [
                { name: "HTML & CSS", percentage: 95 },
                { name: "JavaScript", percentage: 85 },
                { name: "React", percentage: 80 },
                { name: "Tailwind CSS", percentage: 85 },
            ]
        },
        {
            title: "Backend & Database",
            skills: [
                { name: "Python", percentage: 85 },
                { name: "PHP & Laravel", percentage: 75 },
                { name: "SQL (MySQL & PostgreSQL)", percentage: 80 },
                { name: "C# & Java", percentage: 70 },
                { name: "Node.js", percentage: 70 },
            ]
        },
        {
            title: "Tools & DevOps",
            skills: [
                { name: "Git & GitHub", percentage: 85 },
                { name: "VS Code & Postman", percentage: 90 },
                { name: "Docker & Linux", percentage: 75 },
                { name: "Jenkins & npm", percentage: 75 },
                { name: "Burp Suite", percentage: 65 },
            ]
        },
        {
            title: "Design Tools",
            skills: [
                { name: "Figma", percentage: 80 },
                { name: "Adobe Photoshop", percentage: 75 },
                { name: "Canva", percentage: 90 },
            ]
        }
    ];

    return(
        <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full">

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techCategories.map((category, catIndex) => (

                        <div key={catIndex} className="p-6 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl shadow-sm animate-fade-in-up" style={{ animationDelay: `${catIndex * 150}ms` }}>

                            <h3 className="text-xs font-bold uppercase tracking-wider mb-5 opacity-60">
                                {category.title}
                            </h3>

                            <div className="flex flex-col gap-5">
                                {category.skills.map((tech, index) => (
                                    <div key={index} className="w-full group">
                                        
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-bold group-hover:text-blue-500 transition-colors">
                                                {tech.name}
                                            </span>
                                            <span className="text-xs font-semibold opacity-70">
                                                {tech.percentage}%
                                            </span>
                                        </div>
                                        
                                        <div className="w-full h-2.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full overflow-hidden shadow-inner">
                                            <div 
                                                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${tech.percentage}%` }}
                                            ></div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default TechStackLists;