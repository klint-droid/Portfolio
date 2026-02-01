import React from "react";
import { FaRegAddressCard } from "react-icons/fa";

const About = () => {
    return(
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-4">
                <FaRegAddressCard className="text-gray-700" size={24} />
                <h2 className="text-lg font-bold text-gray-900">About Me</h2>
            </div>
            <div className="text-gray-800 text-[20px] leading-relaxed flex flex-col gap-4">
                <p>
                    Hi, I'm <span className="font-semibold text-gray-800">Klint M. Ruales</span> - a Software Developer from Cebu City specializing in full-stack development, digital design, technical support, and data-driven solutions. I help businesses strengthen their digital presence by building responsive websites, creating high-converting funnels, designing user-centered interfaces, and providing reliable technical support.
                </p>
                <p>
                    My core skills include Junior Full-Stack Development, UI/UX Design (Figma), Digital & Graphic Design, and Technical Support. Adaptable, detail-oriented, and results-driven, I enjoy using tech, design, and data to solve business needs. I'm open to freelance, contract, and full-time opportunities.
                </p>
                <p>
                    Let's connect — I'd love to support your next project.
                </p>
            </div>
        </div>
    );
}

export default About;