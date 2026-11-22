import React from "react";
import {
  FaTimes,
  FaCheckCircle,
  FaDownload,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaStamp,
} from "react-icons/fa";
import { getOverallScore } from "../interviewState";
import { KLINT_PROFILE } from "../../../data/klintKnowledge";

const METRIC_LABELS = [
  { key: "frontend", label: "Frontend & UI Craft", color: "#61DAFB" },
  { key: "backend", label: "Backend & Cloud Architecture", color: "#F59E0B" },
  { key: "velocity", label: "Shipping Velocity (10+ Apps)", color: "#D97757" },
  { key: "culture", label: "Team Leadership & Culture", color: "#4ADE80" },
];

export default function VerdictModal({
  isOpen,
  onClose,
  scorecard,
  discoveredClues,
  jdReport,
  isHired,
  onStampHired,
}) {
  if (!isOpen) return null;

  const overall = getOverallScore(scorecard);

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#1A1917] border border-[#3B3832] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#22211E] border-b border-[#33312B]">
          <div>
            <div className="claude-font-mono text-[10px] uppercase tracking-widest text-[#D97757] font-semibold">
              Interviewer Evaluation Clipboard
            </div>
            <h2 className="claude-font-serif text-xl font-semibold text-[#F3F1EC]">
              Candidate: Klint Morales Ruales
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#A09C92] hover:text-[#F3F1EC] hover:bg-[#2F2D28]"
            aria-label="Close scorecard"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Overall Score + Stamp */}
          <div className="relative flex items-center justify-between p-4 rounded-xl bg-[#141312] border border-[#2F2D28]">
            <div>
              <div className="claude-font-mono text-[10px] uppercase tracking-wider text-[#A09C92]">
                {jdReport ? `JD Match: ${jdReport.roleTitle}` : "Overall Hire Readiness"}
              </div>
              <div className="claude-font-serif text-3xl font-bold text-[#F3F1EC] mt-0.5">
                {isHired ? "100%" : `${jdReport ? jdReport.matchScore : overall}%`}
                <span className="text-xs claude-font-mono font-normal text-[#D97757] ml-2">
                  {jdReport ? jdReport.verdictTier : `${discoveredClues.length} evidence clues logged`}
                </span>
              </div>
            </div>

            {isHired && (
              <div className="px-3.5 py-1.5 border-2 border-emerald-400 text-emerald-400 rounded-lg claude-font-mono text-sm font-black tracking-widest -rotate-6 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                HIRED ✓
              </div>
            )}
          </div>

          {/* 4-Axis Breakdown */}
          <div className="space-y-3">
            {METRIC_LABELS.map(({ key, label, color }) => {
              const val = isHired ? Math.max(scorecard[key], 95) : scorecard[key];
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#D8D3C8] font-medium">{label}</span>
                    <span className="claude-font-mono text-[#F3F1EC] font-semibold">{val}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#272622] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${val}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Area */}
          {!isHired ? (
            <div className="pt-2 space-y-2.5">
              <button
                onClick={onStampHired}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D97757] to-[#E28769] hover:brightness-110 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(217,119,87,0.35)] transition-all cursor-pointer"
              >
                <FaStamp size={15} />
                <span>STAMP "HIRED!" & SEND OFFER</span>
              </button>
              <p className="text-[11px] text-center text-[#A09C92]">
                Tip: Explore more stations around the studio or ask Klint tough questions to raise his evaluation score!
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                <div className="text-xs text-[#E2DDD3] leading-relaxed">
                  <strong className="text-emerald-300">Klint is celebrating at his desk!</strong>{" "}
                  Ready to connect for real? Reach out directly or download his resume below.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${KLINT_PROFILE.email}?subject=Interview%20Follow-Up%20%E2%80%94%20Software%20Engineer%20Role`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D97757] hover:bg-[#C26547] text-white text-xs font-semibold transition-colors"
                >
                  <FaEnvelope size={11} />
                  <span>Email Klint</span>
                </a>
                <a
                  href={KLINT_PROFILE.resumeUrl}
                  download="Klint_Morales_Ruales_Resume.pdf"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#272622] hover:bg-[#32302B] border border-[#3B3832] text-[#F3F1EC] text-xs font-semibold transition-colors"
                >
                  <FaDownload size={11} />
                  <span>Download CV</span>
                </a>
                <a
                  href={KLINT_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#22211E] hover:bg-[#2F2D28] border border-[#33312B] text-[#D8D3C8] text-xs transition-colors"
                >
                  <FaLinkedin size={11} className="text-[#D97757]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={KLINT_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#22211E] hover:bg-[#2F2D28] border border-[#33312B] text-[#D8D3C8] text-xs transition-colors"
                >
                  <FaGithub size={11} className="text-[#D97757]" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
