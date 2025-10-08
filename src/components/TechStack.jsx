import React from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiDjango, SiFirebase, SiJavascript, SiPostman } from "react-icons/si";

const TechStack = () => {
    const techs = [
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500 text-3xl" /> },
        { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-3xl" /> },
        { name: "React", icon: <FaReact className="text-sky-400 text-3xl" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400 text-3xl" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-3xl" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl" /> },
        { name: "MySQL", icon: <SiMysql className="text-blue-600 text-3xl" /> },
        { name: "Python", icon: <FaPython className="text-yellow-500 text-3xl" /> },
        { name: "Django", icon: <SiDjango className="text-green-700 text-3xl" /> },
        { name: "Firebase", icon: <SiFirebase className="text-amber-500 text-3xl" /> },
        { name: "GIT", icon: <FaGitAlt className="text-red-500 text-3xl" /> },
        { name: "GitHub", icon: <FaGithub className="text-gray-300 text-3xl" /> },
        { name: "REST APIs", icon: <SiPostman className="text-orange-400 text-3xl" /> },
    ]
    return(
        <section className="bg-gray-800 p-6 rounded-xl shadow mt-6">
            <h2 className="text-2xl font-bold mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
                {techs.map((tech, index) => (
                    <div 
                    key={index}
                    className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transform hover:translate-x-1 transition duration-300"
                    >
                        {tech.icon}
                    <span className="mt-2 text-sm font-medium">{tech.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TechStack;