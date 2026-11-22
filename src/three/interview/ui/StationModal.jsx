import React from "react";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaExternalLinkAlt,
  FaDownload,
  FaCommentDots,
  FaQuoteLeft,
  FaCertificate,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import {
  FEATURED_PROJECTS,
  TECH_STACK_ITEMS,
  CAREER_MILESTONES,
  CERTIFICATIONS_HIGHLIGHTS,
  PEER_QUOTES,
} from "../interviewState";
import { KLINT_PROFILE } from "../../../data/klintKnowledge";

export default function StationModal({ stationId, onClose, onAskKlint }) {
  if (!stationId || stationId === "explore" || stationId === "seated" || stationId === "title") {
    return null;
  }

  return (
    <aside className="fixed top-20 right-3 sm:right-5 bottom-20 z-30 w-[92vw] max-w-md flex flex-col bg-[#181816]/90 backdrop-blur-xl border border-[#3B3832] rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#201F1C]/95 border-b border-[#33312B]">
        <div>
          <div className="claude-font-mono text-[10px] uppercase tracking-widest text-[#D97757] font-semibold">
            {stationId === "projects" && "Station 01 // Shipped Projects"}
            {stationId === "stack" && "Station 02 // Tech Stack Hologram"}
            {stationId === "career" && "Station 03 // Career, Certs & Peers"}
            {stationId === "resume" && "Station 04 // Official Dossier"}
          </div>
          <h2 className="claude-font-serif text-lg font-semibold text-[#F3F1EC]">
            {stationId === "projects" && "Production & Capstone Apps"}
            {stationId === "stack" && "Full-Stack & Cloud Mastery"}
            {stationId === "career" && "Experience & Endorsements"}
            {stationId === "resume" && "Klint Morales Ruales — CV"}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg text-[#A09C92] hover:text-[#F3F1EC] hover:bg-[#2C2A26] transition-colors"
          aria-label="Close station panel"
        >
          <FaTimes size={14} />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* 1. PROJECTS */}
        {stationId === "projects" && (
          <>
            {FEATURED_PROJECTS.map((proj) => (
              <div
                key={proj.name}
                className="p-3.5 rounded-xl bg-[#22211E]/90 border border-[#33312B] hover:border-[#D97757]/60 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="claude-font-serif text-sm font-semibold text-[#F3F1EC]">
                      {proj.name}
                    </h3>
                    <p className="text-[11px] text-[#D97757] font-medium">{proj.tagline}</p>
                  </div>
                  {proj.isInternal ? (
                    <Link
                      to={proj.link}
                      className="text-[11px] claude-font-mono px-2 py-1 rounded-md bg-[#D97757]/15 text-[#E88B6C] hover:bg-[#D97757] hover:text-white transition-colors shrink-0"
                    >
                      Launch →
                    </Link>
                  ) : (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] claude-font-mono px-2 py-1 rounded-md bg-[#2C2A26] text-[#F3F1EC] hover:bg-[#D97757] transition-colors inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Open</span>
                      <FaExternalLinkAlt size={9} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-[#A09C92] mt-2 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="claude-font-mono text-[10px] px-2 py-0.5 rounded bg-[#181816] border border-[#33312B] text-[#D8D3C8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <Link
              to="/all-projects"
              className="block w-full text-center py-2.5 rounded-xl border border-[#33312B] hover:border-[#D97757] text-xs claude-font-mono text-[#D97757] bg-[#201F1C] transition-colors"
            >
              Browse All 11 Shipped Projects →
            </Link>
          </>
        )}

        {/* 2. TECH STACK */}
        {stationId === "stack" && (
          <>
            <p className="text-xs text-[#A09C92] leading-relaxed">
              End-to-end engineering across React 19 interfaces, Laravel / Node / Python / ASP.NET APIs, relational SQL databases, and AWS + Docker deployments.
            </p>
            <div className="space-y-2.5">
              {TECH_STACK_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl bg-[#22211E]/90 border border-[#33312B]"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#F3F1EC]">{item.name}</span>
                    <span className="claude-font-mono text-[10px] text-[#A09C92]">
                      {item.category} •{" "}
                      <strong className="text-[#D97757]">{item.level}%</strong>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#151413] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.level}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/all-techstack"
              className="block w-full text-center py-2.5 rounded-xl border border-[#33312B] hover:border-[#D97757] text-xs claude-font-mono text-[#D97757] bg-[#201F1C] transition-colors"
            >
              View Full Tech Stack Page →
            </Link>
          </>
        )}

        {/* 3. CAREER, CERTS & QUOTES */}
        {stationId === "career" && (
          <>
            <div className="space-y-2.5">
              {CAREER_MILESTONES.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#22211E]/90 border border-[#33312B]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="claude-font-mono text-[10px] px-2 py-0.5 rounded bg-[#D97757]/15 text-[#E88B6C]">
                      {m.year} • {m.type}
                    </span>
                  </div>
                  <h3 className="claude-font-serif text-sm font-semibold text-[#F3F1EC]">
                    {m.role}
                  </h3>
                  <p className="text-[11px] text-[#D97757] font-medium">{m.org}</p>
                  <p className="text-xs text-[#A09C92] mt-1 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#2F2D28]">
              <div className="flex items-center justify-between mb-2">
                <span className="claude-font-mono text-[10px] uppercase tracking-wider text-[#D97757] flex items-center gap-1.5">
                  <FaCertificate size={11} /> Featured Certifications
                </span>
                <Link to="/all-certifications" className="text-[11px] text-[#A09C92] hover:text-[#D97757]">
                  View 20+ →
                </Link>
              </div>
              <div className="space-y-1.5">
                {CERTIFICATIONS_HIGHLIGHTS.map((c, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#201F1C] border border-[#2F2D28] text-xs">
                    <div className="text-[#F3F1EC] font-medium">{c.name}</div>
                    <div className="text-[10px] claude-font-mono text-[#A09C92]">{c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#2F2D28] space-y-2">
              <div className="claude-font-mono text-[10px] uppercase tracking-wider text-[#D97757]">
                Peer Endorsements
              </div>
              {PEER_QUOTES.map((q, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#201F1C] border border-[#2F2D28]">
                  <FaQuoteLeft size={12} className="text-[#D97757]/60 mb-1" />
                  <p className="text-xs italic text-[#E2DDD3] leading-relaxed">"{q.quote}"</p>
                  <div className="mt-2 text-[11px] font-semibold text-[#F3F1EC]">
                    {q.author} <span className="font-normal text-[#A09C92]">— {q.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 4. RESUME DOSSIER */}
        {stationId === "resume" && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#22211E] border border-[#33312B]">
              <div className="claude-font-serif text-base font-semibold text-[#F3F1EC]">
                {KLINT_PROFILE.name}
              </div>
              <div className="text-xs text-[#D97757] font-medium mt-0.5">{KLINT_PROFILE.title}</div>
              <div className="text-xs text-[#A09C92] mt-2 space-y-1">
                <p>📍 {KLINT_PROFILE.location}</p>
                <p>💼 {KLINT_PROFILE.currentRole}</p>
                <p>🎓 {KLINT_PROFILE.education}</p>
                <p className="text-emerald-400 font-medium pt-1">● {KLINT_PROFILE.availability}</p>
              </div>
            </div>

            <a
              href={KLINT_PROFILE.resumeUrl}
              download="Klint_Morales_Ruales_Resume.pdf"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#D97757] hover:bg-[#C26547] text-white text-xs font-semibold transition-colors shadow-md"
            >
              <FaDownload size={12} />
              <span>Download Official Resume (PDF)</span>
            </a>

            <div className="grid grid-cols-3 gap-2">
              <a
                href={`mailto:${KLINT_PROFILE.email}`}
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#22211E] border border-[#33312B] hover:border-[#D97757] text-xs text-[#F3F1EC] transition-colors"
              >
                <FaEnvelope className="text-[#D97757]" size={14} />
                <span className="text-[11px]">Email</span>
              </a>
              <a
                href={KLINT_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#22211E] border border-[#33312B] hover:border-[#D97757] text-xs text-[#F3F1EC] transition-colors"
              >
                <FaLinkedin className="text-[#D97757]" size={14} />
                <span className="text-[11px]">LinkedIn</span>
              </a>
              <a
                href={KLINT_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#22211E] border border-[#33312B] hover:border-[#D97757] text-xs text-[#F3F1EC] transition-colors"
              >
                <FaGithub className="text-[#D97757]" size={14} />
                <span className="text-[11px]">GitHub</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA: Ask Klint directly */}
      <div className="p-3 bg-[#151413]/95 border-t border-[#2E2C28]">
        <button
          onClick={() => {
            const prompts = {
              projects: "What kind of projects has Klint worked on?",
              stack: "What technologies does he work with?",
              career: "What are his career milestones, internships, and education?",
              resume: "Why should I consider him for a Software Engineer role?",
            };
            onAskKlint(prompts[stationId] || "Give me the 2-minute recruiter summary");
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-[#252420] hover:bg-[#D97757] border border-[#3A3731] hover:border-[#D97757] text-[#F3F1EC] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <FaCommentDots size={12} />
          <span>Ask Klint About This at the Desk</span>
        </button>
      </div>
    </aside>
  );
}
