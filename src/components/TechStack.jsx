import React from "react";
import { BiLayer } from 'react-icons/bi'; 
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiBootstrap, 
  SiPhp, SiPython, SiMysql, 
  SiFigma,
  SiAdobe} from 'react-icons/si';
const TechStack = () => {
    
    const Badge = ({ icon: IconBase, name, colorClass }) => (
        <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <IconBase className={`${colorClass} text-sm`} />
            <span className="text-xs font-semibold text-gray-700">{name}</span>
        </div>
    );
    
    return(
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"> 
            <div className="flex items-center gap-2 mb-6">
                <BiLayer className="text-lg text-gray-800" />
                <h2 className="text-lg font-bold text-gray-900">Tech Stack</h2>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge icon={SiHtml5} name="HTML" colorClass="text-orange-500"/>
                        <Badge icon={SiCss3} name="CSS" colorClass="text-blue-500"/>
                        <Badge icon={SiJavascript} name="JavaScript" colorClass="text-yellow-500"/>
                        <Badge icon={SiReact} name="React" colorClass="text-cyan-500"/>
                        <Badge icon={SiBootstrap} name="Bootstrap" colorClass="text-purple-500"/>
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Backend & Database</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge icon={SiPhp} name="PHP" colorClass="text-purple-700"/>
                        <Badge icon={SiPython} name="Python" colorClass="text-yellow-600"/>
                        <Badge icon={SiMysql} name="MySQL" colorClass="text-blue-700"/>
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Design & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge icon={SiFigma} name="Figma" colorClass="text-purple-500"/>
                        <Badge icon={SiAdobe} name="Adobe" colorClass="text-blue-500"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechStack;