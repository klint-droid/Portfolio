import React from "react";
import { 
  FaUserFriends, 
  FaPaperPlane, 
  FaLightbulb, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaExternalLinkAlt, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaDownload 
} from "react-icons/fa";
import { trackEvent } from "../analytics";

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
  ];

  return (
    <section id="contact" className="scroll-mt-20 bento-card">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number">09 // GET IN TOUCH</span>
        </div>
        <span className="font-mono text-xs text-blue-500 font-semibold">
          Say Hello 👋
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1: Community */}
        <div className="flex flex-col gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50 hover:border-blue-500/40 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <FaUserFriends className="text-blue-500" size={15} />
            <h3 className="font-mono text-xs font-bold text-gray-900 dark:text-white">Community</h3>
          </div>
          <div className="flex flex-col gap-2">
            {memberships.map((membership, index) => (
              <a
                key={index}
                href={membership.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121215] hover:border-blue-500 transition-colors text-xs font-mono text-gray-700 dark:text-gray-300"
              >
                <span className="truncate">{membership.name}</span>
                <FaExternalLinkAlt size={10} className="text-gray-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Social Links */}
        <div className="flex flex-col gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50 hover:border-blue-500/40 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <FaPaperPlane className="text-blue-500" size={15} />
            <h3 className="font-mono text-xs font-bold text-gray-900 dark:text-white">Socials</h3>
          </div>
          <div className="flex flex-col gap-2 font-mono text-xs">
            <a
              href="https://linkedin.com/in/klint-ruales"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Social Link", "Click", "LinkedIn")}
              className="flex items-center gap-2.5 p-2 rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121215] hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              <FaLinkedin className="text-blue-600" size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/KlintM"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Social Link", "Click", "GitHub")}
              className="flex items-center gap-2.5 p-2 rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121215] hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              <FaGithub className="text-gray-900 dark:text-white" size={16} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/isklaynts/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Social Link", "Click", "Instagram")}
              className="flex items-center gap-2.5 p-2 rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121215] hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              <FaInstagram className="text-pink-500" size={16} />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Column 3: Inspirational Verse */}
        <div className="flex flex-col gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50 hover:border-blue-500/40 transition-all justify-between">
          <div className="flex items-center gap-2">
            <FaLightbulb className="text-amber-500" size={15} />
            <h3 className="font-mono text-xs font-bold text-gray-900 dark:text-white">Daily Verse</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-xs italic text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </p>
            <span className="font-mono text-[11px] font-bold text-right text-blue-600 dark:text-blue-400">
              — Jeremiah 29:11
            </span>
          </div>
        </div>

        {/* Column 4: Quick Action CTA */}
        <div className="flex flex-col gap-2 font-mono text-xs">
          <a
            href="mailto:klintruales11@gmail.com?subject=Project Inquiry"
            className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#18181b] hover:border-blue-500 transition-colors"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <FaEnvelope size={14} />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-xs">Direct Email</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">klintruales11@gmail.com</p>
            </div>
          </a>

          <a
            href="https://calendly.com/klintruales11"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#18181b] hover:border-blue-500 transition-colors"
          >
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <FaCalendarAlt size={14} />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-xs">Schedule Call</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Calendly Meeting</p>
            </div>
          </a>

          <a
            href="/Klint_Ruales_Resume.pdf"
            download="Klint_Ruales_Resume.pdf"
            className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#18181b] hover:border-blue-500 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <FaDownload size={14} />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-xs">Download CV</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Official Resume PDF</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;