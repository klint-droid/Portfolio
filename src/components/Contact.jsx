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
      name: "Passerelles Numériques Philippines",
      link: "https://www.facebook.com/passerellesnumeriques.philippines",
    },
    {
      name: "DEP X DataCamp",
      link: "#",
    }
  ];

  return (
    <section id="contact" className="scroll-mt-20 bento-card bg-[var(--card-bg)] border-[var(--border-color)]">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number claude-font-mono text-xs text-[#D97757]">09 // GET IN TOUCH</span>
        </div>
        <span className="claude-font-mono text-xs text-[#D97757] font-semibold">
          Say Hello 👋
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {/* Column 1: Community */}
        <div className="flex flex-col gap-3 p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] hover:border-[#D97757]/40 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <FaUserFriends className="text-[#D97757]" size={15} />
            <h3 className="claude-font-serif text-sm font-semibold text-[var(--text-primary)]">Community</h3>
          </div>
          <div className="flex flex-col gap-2">
            {memberships.map((membership, index) => (
              <a
                key={index}
                href={membership.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] transition-colors text-xs claude-font-mono text-[var(--text-secondary)]"
              >
                <span className="truncate">{membership.name}</span>
                <FaExternalLinkAlt size={10} className="text-[var(--text-muted)] shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Social Links */}
        <div className="flex flex-col gap-3 p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] hover:border-[#D97757]/40 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <FaPaperPlane className="text-[#D97757]" size={15} />
            <h3 className="claude-font-serif text-sm font-semibold text-[var(--text-primary)]">Socials</h3>
          </div>
          <div className="flex flex-col gap-2 claude-font-mono text-xs">
            <a
              href="https://www.linkedin.com/in/klint-ruales-67865527b/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Social Link", "Click", "LinkedIn")}
              className="flex items-center gap-2.5 p-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] transition-colors text-[var(--text-secondary)] hover:text-[#D97757]"
            >
              <FaLinkedin className="text-blue-600" size={15} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/klint-droid"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Social Link", "Click", "GitHub")}
              className="flex items-center gap-2.5 p-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] transition-colors text-[var(--text-secondary)] hover:text-[#D97757]"
            >
              <FaGithub size={15} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/isklaynts/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Social Link", "Click", "Instagram")}
              className="flex items-center gap-2.5 p-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] transition-colors text-[var(--text-secondary)] hover:text-[#D97757]"
            >
              <FaInstagram className="text-pink-500" size={15} />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Column 3: Inspirational Verse */}
        <div className="flex flex-col gap-3 p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] hover:border-[#D97757]/40 transition-all justify-between">
          <div className="flex items-center gap-2">
            <FaLightbulb className="text-amber-500" size={15} />
            <h3 className="claude-font-serif text-sm font-semibold text-[var(--text-primary)]">Guiding Principle</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="claude-font-serif text-xs italic text-[var(--text-secondary)] leading-relaxed mb-2">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </p>
            <span className="claude-font-mono text-[11px] font-semibold text-right text-[#D97757]">
              — Jeremiah 29:11
            </span>
          </div>
        </div>

        {/* Column 4: Quick Action CTA */}
        <div className="flex flex-col gap-2 claude-font-mono text-xs">
          <a
            href="mailto:klintruales11@gmail.com?subject=Project Inquiry"
            className="flex items-center gap-3 p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] hover:border-[#D97757] hover:bg-[var(--card-hover)] transition-colors shadow-2xs"
          >
            <div className="p-2 rounded-lg bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20 shrink-0">
              <FaEnvelope size={14} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[var(--text-primary)] text-xs truncate">Direct Email</p>
              <p className="text-[10px] text-[var(--text-muted)] truncate">klintruales11@gmail.com</p>
            </div>
          </a>

          <a
            href="https://calendly.com/klintruales11"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] hover:border-[#D97757] hover:bg-[var(--card-hover)] transition-colors shadow-2xs"
          >
            <div className="p-2 rounded-lg bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20 shrink-0">
              <FaCalendarAlt size={14} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[var(--text-primary)] text-xs truncate">Schedule Call</p>
              <p className="text-[10px] text-[var(--text-muted)] truncate">Calendly Meeting</p>
            </div>
          </a>

          <a
            href="/Klint_Ruales_Resume.pdf"
            download="Klint_Morales_Ruales_Resume.pdf"
            className="flex items-center gap-3 p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] hover:border-[#D97757] hover:bg-[var(--card-hover)] transition-colors cursor-pointer shadow-2xs"
          >
            <div className="p-2 rounded-lg bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20 shrink-0">
              <FaDownload size={14} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[var(--text-primary)] text-xs truncate">Download CV</p>
              <p className="text-[10px] text-[var(--text-muted)] truncate">Official Resume PDF</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;