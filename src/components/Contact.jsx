import React from "react";
import { FaUserFriends, FaPaperPlane,
    FaLightbulb, FaLinkedin, FaGithub,
    FaInstagram, FaExternalLinkAlt, FaEnvelope,
    FaCalendarAlt, FaDownload
 } from "react-icons/fa";

 const Contact = () => {

    const memberships = [
        {
            name: "Data Analytics Philippines",
            link: "https://www.facebook.com/groups/dataanalyticsphilippines",  
        },
        {
            name: "DEP X DataCamp",
            link: "#", 
        },
        {
            name: "Passerelles Numériques Philippines",
            link: "https://www.facebook.com/passerellesnumeriques.philippines",
        }
    ]

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FaUserFriends className="text-lg text-gray-800"/>
                        <h3 className="font-bold text-gray-900">Community</h3>
                    </div>
                    <div className="space-y-3">
                        {memberships.map((membership, index) => (
                            <div
                            key={index}
                            className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-wait group"
                            >
                                <span className="text-xs font-semibold text-gray-700">{membership.name}</span>
                                <FaExternalLinkAlt className="text-[10px] text-gray-400 group-hover:text-gray-600"/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FaPaperPlane className="text-lg text-gray-800"/>
                        <h3 className="font-bold text-gray-900">Social Links</h3>
                    </div>
                    <div className="space-y-3">
                        <a href="#" className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                            <FaLinkedin className="text-xl text-blue-600"/>
                            <span className="text-sm font-semibold text-gray-700">LinkedIn</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                            <FaGithub className="text-xl text-blue-600"/>
                            <span className="text-sm font-semibold text-gray-700">GitHub</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                            <FaInstagram className="text-xl text-blue-600"/>
                            <span className="text-sm font-semibold text-gray-700">Instagram</span>
                        </a>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FaLightbulb className="text-lg text-gray-800"/>
                        <h3 className="font-bold text-gray-900">Daily Verse</h3>
                    </div>
                    <div className="p-4 border border-gray-100 rounded-xl flex-1 flex flex-col justify-center bg-gray-50/50">
                        <p className="text-sm text-gray-600 italic leading-relaxed mb-1">
                            "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
                        </p>
                        <p className="text-xs font-bold text-gray-900 text-right">
                             - Jeremiah 29:11
                        </p>
                    </div>
                </div>
                <div className="space-y-3 pt-8 md:pt-0">
                    <div className="flex items-start gap-4 p-3 bg-white border border-gray-300 rounded-xl hover:shadow-sm hover:bg-gray-50 transition-all text-left">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <FaEnvelope className="text-xl text-gray-800"/>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-900">Email</p>
                            <p className="text-xs text-gray-500 break-all">klintruales11@gmail.com</p>
                        </div>
                    </div>
                    <button className="w-full flex items-start gap-4 p-3 bg-white border border-gray-300 rounded-xl hover:shadow-sm hover:bg-gray-50 transition-all text-left">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <FaCalendarAlt className="text-xl text-gray-800"/> 
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-900">Let's Talk</p>
                            <p className="text-xs text-gray-500">Schedule a Call</p>
                        </div>
                    </button>
                    <button className="w-full flex items-start gap-4 p-3 bg-white border border-gray-300 rounded-xl hover:shadow-sm hover:bg-gray-50 transition-all text-left">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <FaDownload className="text-gray-800"/>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-900">Download CV</p>
                            <p className="text-xs text-gray-500">Resume</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
 };

 export default Contact;