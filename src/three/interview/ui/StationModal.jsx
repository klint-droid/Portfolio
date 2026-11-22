import React, { useState, useEffect } from "react";
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
  FaInstagram,
  FaCalendarAlt,
  FaPlus,
  FaLink,
  FaCheck,
  FaCheckCircle,
  FaUserFriends,
  FaLightbulb,
  FaBookOpen,
  FaMagic,
  FaSyncAlt,
  FaGraduationCap,
  FaShieldAlt,
} from "react-icons/fa";
import {
  FEATURED_PROJECTS,
  TECH_STACK_ITEMS,
  CAREER_MILESTONES,
  CERTIFICATIONS_HIGHLIGHTS,
  COMMUNITY_MEMBERSHIPS,
  BEYOND_CODING_ITEMS,
  GUIDING_VERSE,
  REACT_COURSE_DATA,
  ORACLE_ANSWERS,
  DATACAMP_BADGE,
} from "../interviewState";
import { KLINT_PROFILE } from "../../../data/klintKnowledge";
import {
  fetchRecommendations,
  DEFAULT_RECOMMENDATIONS,
} from "../../../services/recommendationsApi";

export default function StationModal({
  stationId,
  onClose,
  onAskKlint,
  onOpenWriteRec,
  onOpenTelemetry,
  latestSubmittedRec,
}) {
  const [recommendations, setRecommendations] = useState(DEFAULT_RECOMMENDATIONS);
  const [copiedInvite, setCopiedInvite] = useState(false);

  // Interactive Book of Answers Oracle state
  const [oracleQuestion, setOracleQuestion] = useState("");
  const [oracleAnswer, setOracleAnswer] = useState(null);
  const [isConsulting, setIsConsulting] = useState(false);

  // Fetch live recommendations from Google Sheets when opening Recommendations station
  useEffect(() => {
    if (stationId !== "recommendations") return;
    let active = true;
    fetchRecommendations()
      .then((list) => {
        if (active && list && list.length > 0) {
          setRecommendations(list);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [stationId]);

  // Prepend newly written recommendation immediately
  useEffect(() => {
    if (!latestSubmittedRec) return;
    setRecommendations((prev) => [
      latestSubmittedRec,
      ...prev.filter((r) => r.id !== latestSubmittedRec.id),
    ]);
  }, [latestSubmittedRec]);

  if (!stationId || stationId === "explore" || stationId === "seated" || stationId === "title") {
    return null;
  }

  const handleCopyInvite = () => {
    const url = `${window.location.origin}/recommend`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2200);
    });
  };

  const handleConsultOracle = (e, presetQ = null) => {
    if (e) e.preventDefault();
    const q = (presetQ ?? oracleQuestion).trim();
    if (!q || isConsulting) return;
    if (presetQ) setOracleQuestion(presetQ);
    setIsConsulting(true);
    setOracleAnswer(null);
    setTimeout(() => {
      const pick = ORACLE_ANSWERS[Math.floor(Math.random() * ORACLE_ANSWERS.length)];
      setOracleAnswer(pick);
      setIsConsulting(false);
    }, 650);
  };

  const stationMeta = {
    projects: {
      eyebrow: "Station 01 // Shipped Projects",
      title: "Production & Capstone Apps",
      prompt: "What kind of projects has Klint worked on?",
    },
    stack: {
      eyebrow: "Station 02 // Tech Stack Hologram",
      title: "Full-Stack & Cloud Mastery",
      prompt: "What technologies does he work with?",
    },
    career: {
      eyebrow: "Station 03 // Career, Certs & Badges",
      title: "Experience & Certifications",
      prompt: "What are his career milestones, internships, and education?",
    },
    resume: {
      eyebrow: "Station 04 // Official Dossier",
      title: "Klint Morales Ruales — CV",
      prompt: "How can I contact Klint or download his CV?",
    },
    recommendations: {
      eyebrow: "Station 05 // Recommendations Wall",
      title: "Live Peer Endorsements",
      prompt: "What do colleagues say about Klint in their recommendations?",
    },
    community: {
      eyebrow: "Station 06 // Community & Beyond Coding",
      title: "Communities, Life & Values",
      prompt: "Why should I consider him for a Software Engineer role?",
    },
    oracle: {
      eyebrow: "Station 07 // Courses, Oracle & Audit",
      title: "Book of Answers & React Path",
      prompt: "How strong is his React experience?",
    },
  };

  const currentMeta = stationMeta[stationId] || stationMeta.projects;

  return (
    <aside className="fixed top-20 right-3 sm:right-5 bottom-20 z-30 w-[92vw] max-w-md flex flex-col bg-[#181816]/92 backdrop-blur-xl border border-[#3B3832] rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#201F1C]/95 border-b border-[#33312B]">
        <div>
          <div className="claude-font-mono text-[10px] uppercase tracking-widest text-[#D97757] font-semibold">
            {currentMeta.eyebrow}
          </div>
          <h2 className="claude-font-serif text-lg font-semibold text-[#F3F1EC]">
            {currentMeta.title}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg text-[#A09C92] hover:text-[#F3F1EC] hover:bg-[#2C2A26] transition-colors cursor-pointer"
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

        {/* 3. CAREER, CERTS & DATACAMP BADGE */}
        {stationId === "career" && (
          <>
            {/* Official DataCamp SQL Associate Banner */}
            <a
              href={DATACAMP_BADGE.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden border border-[#33312B] hover:border-[#D97757] transition-all"
            >
              <img
                src={DATACAMP_BADGE.image}
                alt={DATACAMP_BADGE.title}
                className="w-full h-auto object-cover block"
              />
            </a>

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
          </>
        )}

        {/* 4. RESUME DOSSIER & CONTACT */}
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

            <a
              href="https://calendly.com/klintruales11"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#22211E] hover:bg-[#2E2C28] border border-[#D97757]/50 text-[#F3F1EC] text-xs font-semibold transition-colors"
            >
              <FaCalendarAlt className="text-[#D97757]" size={12} />
              <span>Schedule a Live Call (Calendly)</span>
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

        {/* 5. LIVE RECOMMENDATIONS WALL */}
        {stationId === "recommendations" && (
          <>
            <div className="flex items-center justify-between gap-2">
              <span className="claude-font-mono text-[11px] text-[#A09C92]">
                {recommendations.length} Verified Endorsement{recommendations.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyInvite}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#22211E] border border-[#33312B] hover:border-[#D97757] text-[11px] claude-font-mono text-[#D8D3C8] cursor-pointer transition-colors"
                >
                  {copiedInvite ? (
                    <>
                      <FaCheck size={10} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaLink size={10} />
                      <span>Invite Link</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onOpenWriteRec}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#D97757] hover:bg-[#C26547] text-white text-[11px] font-semibold cursor-pointer transition-colors"
                >
                  <FaPlus size={10} />
                  <span>Write Review</span>
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {recommendations.map((rec, idx) => (
                <div
                  key={rec.id || idx}
                  className="p-3.5 rounded-xl bg-[#22211E]/95 border border-[#33312B] space-y-2.5"
                >
                  <FaQuoteLeft size={13} className="text-[#D97757]/60" />
                  <p className="claude-font-serif text-sm italic text-[#F3F1EC] leading-relaxed">
                    "{rec.text}"
                  </p>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#2E2C28]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#D97757]/15 border border-[#D97757]/35 text-[#E88B6C] claude-font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                        {rec.initials || "PR"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#F3F1EC] truncate">
                          {rec.name}
                        </div>
                        <div className="text-[10px] text-[#A09C92] truncate">
                          {rec.role}
                          {rec.company ? ` • ${rec.company}` : ""}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] claude-font-mono text-emerald-400 shrink-0">
                      <FaCheckCircle size={9} />
                      <span>{rec.date || "Verified"}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 6. COMMUNITY, BEYOND CODING & GUIDING PRINCIPLE */}
        {stationId === "community" && (
          <>
            {/* Community Memberships */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 claude-font-mono text-[10px] uppercase tracking-wider text-[#5EEAD4] font-semibold">
                <FaUserFriends size={12} />
                <span>Tech Communities &amp; Memberships</span>
              </div>
              {COMMUNITY_MEMBERSHIPS.map((m) => (
                <a
                  key={m.name}
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#22211E] border border-[#33312B] hover:border-[#5EEAD4]/60 transition-all"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#F3F1EC]">{m.name}</div>
                    <div className="text-[10px] claude-font-mono text-[#A09C92]">{m.role}</div>
                  </div>
                  <FaExternalLinkAlt size={10} className="text-[#5EEAD4] shrink-0" />
                </a>
              ))}
            </div>

            {/* Beyond Coding */}
            <div className="space-y-2 pt-2 border-t border-[#2E2C28]">
              <div className="claude-font-mono text-[10px] uppercase tracking-wider text-[#D97757] font-semibold">
                Beyond Coding
              </div>
              {BEYOND_CODING_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-xl bg-[#22211E] border border-[#33312B]"
                >
                  <div className="text-xs font-semibold text-[#F3F1EC] flex items-center gap-1.5">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-[#A09C92] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Guiding Principle */}
            <div className="p-3.5 rounded-xl bg-amber-500/8 border border-amber-500/25">
              <div className="flex items-center gap-1.5 claude-font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold mb-1.5">
                <FaLightbulb size={11} />
                <span>Guiding Principle</span>
              </div>
              <p className="claude-font-serif text-xs italic text-[#F3F1EC] leading-relaxed">
                "{GUIDING_VERSE.quote}"
              </p>
              <div className="text-right claude-font-mono text-[11px] font-semibold text-[#D97757] mt-1.5">
                — {GUIDING_VERSE.ref}
              </div>
            </div>

            {/* Socials */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <a
                href={KLINT_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#22211E] border border-[#33312B] hover:border-[#D97757] text-[11px] text-[#F3F1EC]"
              >
                <FaLinkedin className="text-blue-400" size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href={KLINT_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#22211E] border border-[#33312B] hover:border-[#D97757] text-[11px] text-[#F3F1EC]"
              >
                <FaGithub size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.instagram.com/isklaynts/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#22211E] border border-[#33312B] hover:border-[#D97757] text-[11px] text-[#F3F1EC]"
              >
                <FaInstagram className="text-pink-400" size={14} />
                <span>Instagram</span>
              </a>
            </div>
          </>
        )}

        {/* 7. BOOK OF ANSWERS ORACLE, REACT COURSE & TELEMETRY AUDIT */}
        {stationId === "oracle" && (
          <>
            {/* Interactive Book of Answers */}
            <div className="p-3.5 rounded-xl bg-[#22211E] border border-amber-500/35 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 claude-font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  <FaBookOpen size={11} /> Book of Answers Oracle
                </span>
                <span className="text-[10px] claude-font-mono text-[#A09C92]">🔮 Interactive</span>
              </div>

              <form onSubmit={handleConsultOracle} className="space-y-2">
                <input
                  type="text"
                  value={oracleQuestion}
                  onChange={(e) => setOracleQuestion(e.target.value)}
                  placeholder="Ask the oracle... e.g., Should we hire Klint?"
                  className="w-full bg-[#151413] border border-[#35332D] focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-[#F3F1EC] placeholder-[#7C786F] focus:outline-none"
                />
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Should we hire Klint?",
                    "Will our prod build pass?",
                  ].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleConsultOracle(null, q)}
                      className="text-[10px] claude-font-mono px-2 py-0.5 rounded bg-[#181816] border border-[#33312B] text-[#A09C92] hover:text-amber-400 hover:border-amber-400/50 cursor-pointer"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={!oracleQuestion.trim() || isConsulting}
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-45 text-[#181816] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  {isConsulting ? (
                    <>
                      <FaSyncAlt size={11} className="animate-spin" />
                      <span>Consulting the Oracle...</span>
                    </>
                  ) : (
                    <>
                      <FaMagic size={11} />
                      <span>Consult the Book of Answers</span>
                    </>
                  )}
                </button>
              </form>

              {oracleAnswer && (
                <div className="p-3 rounded-xl bg-[#181816] border border-[#D97757]/50 animate-fade-in">
                  <div className="claude-font-mono text-[10px] text-[#D97757] uppercase mb-1">
                    ✨ The Book Speaks
                  </div>
                  <p className="claude-font-serif text-sm font-semibold text-[#F3F1EC]">
                    "{oracleAnswer}"
                  </p>
                </div>
              )}
            </div>

            {/* React Guided Learning Path */}
            <div className="p-3.5 rounded-xl bg-[#22211E] border border-[#33312B] space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="claude-font-mono text-[10px] uppercase tracking-wider text-[#61DAFB] flex items-center gap-1">
                    <FaGraduationCap size={12} /> Authored Bootcamp
                  </div>
                  <h3 className="claude-font-serif text-sm font-semibold text-[#F3F1EC] mt-0.5">
                    {REACT_COURSE_DATA.title}
                  </h3>
                </div>
                <span className="claude-font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                  {REACT_COURSE_DATA.status}
                </span>
              </div>
              <p className="text-[11px] text-[#A09C92]">{REACT_COURSE_DATA.subtitle}</p>
              <div className="space-y-1">
                {REACT_COURSE_DATA.topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-1.5 text-[11px] text-[#D8D3C8]">
                    <FaCheckCircle size={10} className="text-emerald-400 shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/react-course"
                className="block w-full text-center py-2 rounded-xl bg-[#181816] hover:bg-[#D97757] border border-[#33312B] hover:border-[#D97757] text-xs claude-font-mono text-[#F3F1EC] transition-colors"
              >
                Open Interactive React Syllabus →
              </Link>
            </div>

            {/* Browser Security & Telemetry Scanner */}
            <button
              type="button"
              onClick={onOpenTelemetry}
              className="w-full p-3 rounded-xl bg-[#1C2421] hover:bg-[#23302B] border border-emerald-500/35 text-left flex items-center justify-between gap-2 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FaShieldAlt className="text-emerald-400 shrink-0" size={16} />
                <div>
                  <div className="text-xs font-semibold text-[#F3F1EC]">
                    Browser Security &amp; Telemetry Scanner
                  </div>
                  <div className="text-[10px] text-[#A09C92]">
                    Live web privacy &amp; client footprint audit demo
                  </div>
                </div>
              </div>
              <span className="claude-font-mono text-[10px] text-emerald-400 shrink-0">Run →</span>
            </button>
          </>
        )}
      </div>

      {/* Footer CTA: Ask Klint directly */}
      <div className="p-3 bg-[#151413]/95 border-t border-[#2E2C28]">
        <button
          onClick={() => onAskKlint(currentMeta.prompt)}
          className="w-full py-2.5 px-3 rounded-xl bg-[#252420] hover:bg-[#D97757] border border-[#3A3731] hover:border-[#D97757] text-[#F3F1EC] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <FaCommentDots size={12} />
          <span>Ask Klint About This at the Desk</span>
        </button>
      </div>
    </aside>
  );
}
