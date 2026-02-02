import React from "react";
import { RiLayoutMasonryLine } from "react-icons/ri";

const Experience = () => {
    const timelineData = [
        {
            role: "Associate Degree in Computer Technology Major in Software Developer",
            company: "University of San Jose - Recoletos",
            year: "2026",
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
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
                <RiLayoutMasonryLine className="text-lg text-gray-800"/>
                <h2 className="text-lg font-bold text-gray-900">Experience</h2>
            </div>
            <div className="relative border-l border-gray-200 ml-2 space-y-8 pb-2">
                {timelineData.map((item, index) => (
                <div key={index} className="relative pl-6">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-gray-900 rounded-full border-white box-content"></div>
                    <span className="text-xs font-semibold text-gray-400 mb-0.5 block">
                        {item.year}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                        {item.role}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {item.company}
                    </p>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Experience;