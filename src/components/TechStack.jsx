import React from "react";
import { Link } from "react-router-dom";
import { BiLayer } from 'react-icons/bi'; 
import { FaJava, FaNodeJs, FaLaravel, FaArrowRight } from "react-icons/fa";
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiBootstrap, 
  SiPhp, SiPython, SiMysql, 
  SiFigma, SiBurpsuite,
  SiAdobe, SiCanva,
  SiTailwindcss,
  SiGit, SiGithub, SiPostman, SiDocker, SiLinux, SiJenkins, SiNpm
} from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { BiLogoPostgresql } from "react-icons/bi";

const TechStack = () => {
    
    const Badge = ({ icon: IconBase, name, colorClass }) => (

        <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-color)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:shadow-md transition-shadow">
            <IconBase className={`${colorClass} text-sm`} />
            <span className="text-xs font-semibold">{name}</span>
        </div>
    );
    
    return(
        <div className="card rounded-3xl h-full"> 
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <BiLayer className="text-lg" />
                    <h2 className="text-lg font-bold">Tech Stack</h2>
                </div>

                <Link to="/all-techstack" className="text-xs font-semibold opacity-60 hover:opacity-100 flex items-center gap-1 transition-opacity">
                    View Level of Proficiency<FaArrowRight className="text-[10px]"/>
                </Link>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-60">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge icon={SiHtml5} name="HTML" colorClass="text-orange-500"/>
                        <Badge icon={SiCss3} name="CSS" colorClass="text-blue-500"/>
                        <Badge icon={SiJavascript} name="JavaScript" colorClass="text-yellow-500"/>
                        <Badge icon={SiReact} name="React" colorClass="text-cyan-500"/>
                        <Badge icon={SiTailwindcss} name="Tailwind CSS" colorClass="text-purple-500"/>
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-60">Backend & Database</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge icon={FaNodeJs} name="Node.js" colorClass="text-green-500"/>
                        <Badge icon={SiPhp} name="PHP" colorClass="text-purple-700"/>
                        <Badge icon={FaLaravel} name="Laravel" colorClass="text-red-500"/>
                        <Badge icon={SiPython} name="Python" colorClass="text-yellow-600"/>
                        <Badge icon={FaJava} name="Java" colorClass="text-orange-500"/>
                        <Badge icon={TbBrandCSharp} name="C#" colorClass="text-blue-600"/>
                        <Badge icon={SiMysql} name="MySQL" colorClass="text-blue-700"/>
                        <Badge icon={BiLogoPostgresql} name="PostgreSQL" colorClass="text-blue-500"/>
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-60">Tools & DevOps</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge icon={VscVscode} name="VS Code" colorClass="text-blue-500"/>
                        <Badge icon={SiGit} name="Git" colorClass="text-orange-600"/>
                        <Badge icon={SiGithub} name="GitHub" colorClass="text-gray-800 dark:text-white"/>
                        <Badge icon={SiPostman} name="Postman" colorClass="text-orange-500"/>
                        <Badge icon={SiBurpsuite} name="Burp Suite" colorClass="text-green-500"/>
                        <Badge icon={SiDocker} name="Docker" colorClass="text-blue-500"/>
                        <Badge icon={SiLinux} name="Linux" colorClass="text-yellow-500"/>
                        <Badge icon={SiJenkins} name="Jenkins" colorClass="text-red-500"/>
                        <Badge icon={SiNpm} name="npm" colorClass="text-red-600"/>
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-60">Design Tools</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge icon={SiFigma} name="Figma" colorClass="text-purple-500"/>
                        <Badge icon={SiAdobe} name="Adobe" colorClass="text-blue-500"/>
                        <Badge icon={SiCanva} name="Canva" colorClass="text-blue-600"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechStack;