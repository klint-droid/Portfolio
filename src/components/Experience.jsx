import React from "react";
import { RiLayoutMasonryLine } from "react-icons/ri";

const Experience = () => {
    const timelineData = [
        {
            role: "Software Engineer Intern",
            company: "Kyocera Document Solutions Philippines, Inc.",
            year: "2026",
        },
        {
            role: "Associate Degree in Computer Technology Major in Software Developer",
            company: "University of San Jose - Recoletos",
            year: "2026",
        },
        {
            role: "Breakout Session Participant",
            company: "JP Morgan Chase & Co",
            year: "2025",
        },
        {
            role: "Youth Empowerment Session Participant",
            company: "Synchrony",
            year: "2025",
        },
        {
            role: "Digital Designer",
            company: "Datawords Philippines",
            year: "2025",
        },
        {
            role: "Hello World!",
            company: "Write my first line of code!",
            year: "2024",
        },
    ]

    return(
        <div className="card rounded-3xl h-fit">
            <div className="flex items-center gap-2 mb-6">
                <RiLayoutMasonryLine className="text-lg"/>
                <h2 className="text-lg font-bold">Experience</h2>
            </div>
            
            <div className="relative border-l border-[var(--border-color)] ml-4 space-y-8 pb-2">
                {timelineData.map((item, index) => (

                <div key={index} className="relative pl-8 group cursor-default">
                    
                    <div 
                        className={`absolute -left-[10px] top-1.5 w-4 h-4 rounded-full border-2 border-[var(--card-bg)] box-content transition-colors duration-300
                        ${index === 0 
                            ? 'bg-[var(--text-primary)]' 
                            : 'bg-[var(--border-color)] group-hover:bg-[var(--text-primary)]' 
                        }`}
                    ></div>
                    
                    <span className={`text-xs font-semibold mb-0.5 block transition-opacity duration-300 ${index === 0 ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                        {item.year}
                    </span>
                    <h3 className={`text-sm font-bold leading-tight mb-1 transition-colors duration-300 ${index === 0 ? 'text-[var(--text-primary)]' : 'group-hover:text-[var(--text-primary)]'}`}>
                        {item.role}
                    </h3>
                    <p className="text-xs opacity-70">
                        {item.company}
                    </p>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Experience;