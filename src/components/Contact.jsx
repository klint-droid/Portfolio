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
        <div className="footer-grid rounded-3xl">
            
            {/* COLUMN 1: Community */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <FaUserFriends className="text-lg"/>
                    <h3 className="font-bold">Community</h3>
                </div>
                <div className="space-y-3">
                    {memberships.map((membership, index) => (
                        <a
                        key={index}
                        href={membership.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        // 2. Inner Item Styling:
                        // - bg-[var(--bg-color)]: Gray-50 (Light) / Slate-900 (Dark)
                        // - border-[var(--border-color)]: Adapts to theme
                        className="flex items-center justify-between p-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl hover:border-[var(--text-secondary)] transition-all cursor-pointer group"
                        >
                            <span className="text-xs font-semibold">{membership.name}</span>
                            <FaExternalLinkAlt className="text-[10px] opacity-50 group-hover:opacity-100"/>
                        </a>
                    ))}
                </div>
            </div>

            {/* COLUMN 2: Social Links */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <FaPaperPlane className="text-lg"/>
                    <h3 className="font-bold">Social Links</h3>
                </div>
                <div className="space-y-3">
                    <a href="https://www.linkedin.com/in/klint-ruales-67865527b/" className="flex items-center gap-3 p-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl hover:border-[var(--text-secondary)] transition-colors">
                        <FaLinkedin className="text-xl text-blue-600"/>
                        <span className="text-sm font-semibold">LinkedIn</span>
                    </a>
                    <a href="https://github.com/klint-droid" className="flex items-center gap-3 p-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl hover:border-[var(--text-secondary)] transition-colors">
                        <FaGithub className="text-xl text-blue-600"/>
                        <span className="text-sm font-semibold">GitHub</span>
                    </a>
                    <a href="https://www.instagram.com/isklaynts/" className="flex items-center gap-3 p-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl hover:border-[var(--text-secondary)] transition-colors">
                        <FaInstagram className="text-xl text-blue-600"/>
                        <span className="text-sm font-semibold">Instagram</span>
                    </a>
                </div>
            </div>

            {/* COLUMN 3: Daily Verse */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <FaLightbulb className="text-lg"/>
                    <h3 className="font-bold">Daily Verse</h3>
                </div>
                {/* 3. Daily Verse Box */}
                <div className="p-4 border border-[var(--border-color)] rounded-xl flex-1 flex flex-col justify-center bg-[var(--bg-color)] h-50">
                    <p className="text-sm italic leading-relaxed mb-2 opacity-80">
                        "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
                    </p>
                    <p className="text-xs font-bold text-right">
                         - Jeremiah 29:11
                    </p>
                </div>
            </div>

            {/* COLUMN 4: Contact Actions */}
            <div className="space-y-3 pt-8 md:pt-0">
                
                {/* Email Box */}
                <div className="flex items-start gap-4 p-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl hover:shadow-sm transition-all text-left">
                    <div className="p-2 bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)]">
                        <FaEnvelope className="text-xl"/>
                    </div>
                    <div>
                        <p className="text-xs font-bold">Email</p>
                        <p className="text-xs opacity-70 break-all">klintruales11@gmail.com</p>
                    </div>
                </div>

                {/* Schedule Call */}
                <button className="w-full flex items-start gap-4 p-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl hover:border-[var(--text-secondary)] transition-all text-left">
                    <div className="p-2 bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)]">
                        <FaCalendarAlt className="text-xl"/> 
                    </div>
                    <div>
                        <p className="text-xs font-bold">Let's Talk</p>
                        <p className="text-xs opacity-70">Schedule a Call</p>
                    </div>
                </button>

                {/* Download CV */}
                <button className="w-full flex items-start gap-4 p-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl hover:border-[var(--text-secondary)] transition-all text-left">
                    <div className="p-2 bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)]">
                        <FaDownload/>
                    </div>
                    <div>
                        <p className="text-xs font-bold">Download CV</p>
                        <p className="text-xs opacity-70">Resume</p>
                    </div>
                </button>
            </div>

        </div>
    );
 };

 export default Contact;