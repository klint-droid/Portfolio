import React from "react";
import { SiReact, SiTailwindcss, SiVite, SiDjango, SiMysql, SiPrisma, SiGithub, SiAboutdotme } from "react-icons/si";

const Projects = () => {
    const projects = [
        {
            title: "Portfolio Website",
            description: "A personal portfolio built with React and Tailwind CSS to showcase my skills, projects, and achievements.",
            tech: [
                { name: "React", icon: <SiReact className="text-sky-400 text-xl" /> },
                { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500 text-xl" /> },
                { name: "Vite", icon: <SiVite className="text-purple-500 text-xl" /> },
            ],
            icon: <SiReact className="text-sky-400 text-3xl" />,
            github: "https://github.com/klint-droid",
            link: "klint-ruales.vercel.app",
        },
        {
            title: "Attendance Checker",
            description: "A student attendance tracking system with role-based access and data stored in MySQL + Django ORM.",
            tech: [
                { name: "Django", icon: <SiDjango className="text-green-600 text-xl" /> },
                { name: "React", icon: <SiReact className="text-sky-400 text-xl" /> },
                { name: "MySQL", icon: <SiMysql className="text-blue-600 text-xl" /> },
            ],
            icon: <SiDjango className="text-green-600 text-3xl" />,
            github: "https://github.com/klint-droid",
            link: "#",
        },
    ]

    return(
        <section className="bg-gray-800 p-6 rounded-xl shadow mt-6">
            <h2 className="text-2xl font-bold mb-3">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {projects.map((proj, index) => (
                    <div 
                    key={index}
                    className="relative bg-gray-700 p-6 rounded-2xl shadow-lg transform hover:translate-x-1 transition duration-300"
                    >
                        <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 left-4 text-white hover:text-black"
                        >
                           <SiGithub className="text-2xl" /> 
                        </a>
                        <div className="flex items-center gap-3 mt-6">
                            {proj.icon}
                            <h3 className="text-xl font-semibold"><a href={proj.link}>{proj.title}</a></h3>
                        </div>
                        <p className="text-sm mt-3">{proj.description}</p>

                        <div className="flex gap-3 mt-4">
                            {proj.tech.map((tech, index) => (
                                <div 
                                key={index}
                                className="flex items-center gap-1">
                                    {tech.icon}
                                    <span className="text-sm text-gray-500">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
        </section>
    );
}

export default Projects;