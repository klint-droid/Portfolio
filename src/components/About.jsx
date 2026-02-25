import React from "react";
import { FaRegAddressCard } from "react-icons/fa";

const About = () => {
    return(
        <div className="card rounded-3xl h-full">
            
            <div className="flex items-center gap-2 mb-4">
                <FaRegAddressCard size={24} />
                
                
                <h2 className="text-lg font-bold">About Me</h2>
            </div>

           
            <div className="flex flex-col gap-4 leading-relaxed text-sm md:text-base">
                <p>
                    Hi, I'm 
                    <span className="font-semibold mx-1" style={{ color: 'var(--text-primary)' }}>
                        Klint M. Ruales
                    </span> 
                    - I have strong analytical and problem-solving skills with hands-on experience in programming and building user-centered applications. I enjoy turning ideas into practical, efficient digital solutions through clean code and thoughtful design.
                </p>
                <p>
                     I'm passionate about learning new technologies and staying up-to-date with industry trends, which helps me continuously improve and adapt in the fast-paced world of software development.
                </p>
                <p>
                    Currently seeking internship or entry-level opportunities where I can apply my technical skills, grow as a developer, and contribute to meaningful projects.
                </p>
                <p className="font-semibold mx-1" style={{ color: 'var(--text-primary)' }}>
                    Let's connect — I'd love to support your next project.
                </p>
            </div>
        </div>
    );
}

export default About;