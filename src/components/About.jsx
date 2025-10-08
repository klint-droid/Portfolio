import React from "react";

const About = () => {
    return(
        <section className="bg-gray-800 p-6 rounded-xl shadow mt-6">
            <h2 className="text-2xl font-bold mb-3">Objective</h2>
            <p className="text-gray-600 leading-relaxed">Aspiring Full Stack Developer skilled in building scalable web applications using React, Node.js, and SQL/NoSQL databases. 
                Passionate about creating responsive user interfaces, developing RESTful APIs, and deploying 
                cloud-based solutions with a focus on performance, usability, and continuous learning.</p>
            <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm transform hover:translate-x-1 transition duration-300">
                    React Expertise & REST Api
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm transform hover:translate-x-1 transition duration-300">
                    Performance Optimization
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm transform hover:translate-x-1 transition duration-300">
                    HTML5, CSS & JavaScript
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm transform hover:translate-x-1 transition duration-300">
                    Python/Django
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm transform hover:translate-x-1 transition duration-300">
                    Scalable Applications
                </span>
            </div>
        </section>
    );
}

export default About;