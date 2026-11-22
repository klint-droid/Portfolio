import React, { useState } from "react";
import {
  FaTimes,
  FaClipboardCheck,
  FaCheckCircle,
  FaBolt,
  FaInfoCircle,
  FaCopy,
  FaCheck,
  FaAward,
  FaVolumeUp,
  FaRedoAlt,
} from "react-icons/fa";
import { SAMPLE_JDS, evaluateJobDescription } from "../jdEvaluator";

export default function JobEvaluatorModal({
  isOpen,
  onClose,
  existingReport,
  onEvaluationComplete,
  onOpenVerdict,
}) {
  const [roleTitle, setRoleTitle] = useState(existingReport?.roleTitle || "");
  const [jdText, setJdText] = useState("");
  const [report, setReport] = useState(existingReport || null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRunEvaluation = (textToEval, titleToEval) => {
    const text = (textToEval ?? jdText).trim();
    if (!text) return;
    const result = evaluateJobDescription(text, titleToEval ?? roleTitle);
    setReport(result);
    onEvaluationComplete?.(result);
  };

  const handleSelectSample = (sample) => {
    setRoleTitle(sample.title);
    setJdText(sample.text);
    handleRunEvaluation(sample.text, sample.title);
  };

  const handleCopySummary = () => {
    if (!report) return;
    navigator.clipboard.writeText(report.markdownSummary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#1A1917] border border-[#3B3832] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#22211E] border-b border-[#33312B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D97757]/15 border border-[#D97757]/40 text-[#D97757] flex items-center justify-center">
              <FaClipboardCheck size={14} />
            </div>
            <div>
              <div className="claude-font-mono text-[10px] uppercase tracking-widest text-[#D97757] font-semibold">
                Automated Candidate Fit Engine
              </div>
              <h2 className="claude-font-serif text-lg font-semibold text-[#F3F1EC]">
                Evaluate Klint Against Your Job Description
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#A09C92] hover:text-[#F3F1EC] hover:bg-[#2F2D28]"
            aria-label="Close JD Evaluator"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {!report ? (
            <>
              {/* Quick 1-Click Sample JDs */}
              <div>
                <div className="claude-font-mono text-[10px] uppercase tracking-wider text-[#A09C92] mb-2">
                  Try a Sample Job Description (1-Click)
                </div>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_JDS.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className="px-3 py-1.5 rounded-full bg-[#242320] hover:bg-[#D97757]/20 border border-[#38352F] hover:border-[#D97757] text-xs text-[#F3F1EC] transition-all cursor-pointer"
                    >
                      ✨ {sample.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Title Input */}
              <div>
                <label className="block claude-font-mono text-[10px] uppercase tracking-wider text-[#A09C92] mb-1.5">
                  Role Title (Optional)
                </label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Junior Full-Stack Software Engineer"
                  className="w-full bg-[#141312] border border-[#35332D] focus:border-[#D97757] rounded-xl px-3.5 py-2.5 text-sm text-[#F3F1EC] placeholder-[#737067] focus:outline-none"
                />
              </div>

              {/* Paste JD Textarea */}
              <div>
                <label className="block claude-font-mono text-[10px] uppercase tracking-wider text-[#A09C92] mb-1.5">
                  Paste Job Description / Requirements
                </label>
                <textarea
                  rows={6}
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste requirements, tech stack, responsibilities, or qualifications here... Klint will automatically evaluate his fit, highlight matching shipped projects, and pitch himself live!"
                  className="w-full bg-[#141312] border border-[#35332D] focus:border-[#D97757] rounded-xl p-3.5 text-sm text-[#F3F1EC] placeholder-[#737067] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRunEvaluation()}
                disabled={!jdText.trim()}
                className="w-full py-3 rounded-xl bg-[#D97757] hover:bg-[#C26547] disabled:opacity-40 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(217,119,87,0.35)] transition-all cursor-pointer"
              >
                <FaClipboardCheck size={14} />
                <span>Evaluate Klint &amp; Hear Live Pitch</span>
              </button>
            </>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {/* Top Match Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#141312] border border-[#33312B]">
                <div>
                  <div className="claude-font-mono text-[10px] uppercase tracking-wider text-[#A09C92]">
                    Role Evaluated
                  </div>
                  <div className="claude-font-serif text-lg font-semibold text-[#F3F1EC]">
                    {report.roleTitle}
                  </div>
                  <div
                    className="claude-font-mono text-xs font-semibold mt-0.5"
                    style={{ color: report.verdictColor }}
                  >
                    ● {report.verdictTier}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className="claude-font-serif text-4xl font-bold leading-none"
                    style={{ color: report.verdictColor }}
                  >
                    {report.matchScore}%
                  </div>
                  <div className="claude-font-mono text-[10px] text-[#A09C92] mt-1">
                    Overall JD Match
                  </div>
                </div>
              </div>

              {/* Strong Direct Matches with Proof */}
              {report.strongMatches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 claude-font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                    <FaCheckCircle size={11} />
                    <span>Direct Skill Matches ({report.strongMatches.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {report.strongMatches.map((m) => (
                      <div
                        key={m.id}
                        className="p-2.5 rounded-xl bg-[#22211E] border border-emerald-500/25"
                      >
                        <div className="text-xs font-semibold text-[#F3F1EC]">{m.label}</div>
                        <p className="text-[11px] text-[#A09C92] mt-1 leading-snug">{m.proof}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transferable / Fast Ramp-Up */}
              {report.transferable.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 claude-font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                    <FaBolt size={11} />
                    <span>Transferable / Fast Ramp-Up ({report.transferable.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {report.transferable.map((t) => (
                      <div
                        key={t.label}
                        className="p-2.5 rounded-xl bg-[#22211E] border border-amber-500/25 text-xs"
                      >
                        <span className="font-semibold text-[#F3F1EC]">{t.label}: </span>
                        <span className="text-[#A09C92]">{t.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Honest Growth Notes */}
              {report.growthAreas.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 claude-font-mono text-[10px] uppercase tracking-wider text-[#E88B6C] font-semibold">
                    <FaInfoCircle size={11} />
                    <span>Honest Transparency Notes</span>
                  </div>
                  <div className="space-y-1.5">
                    {report.growthAreas.map((g) => (
                      <div
                        key={g.label}
                        className="p-2.5 rounded-xl bg-[#22211E] border border-[#D97757]/30 text-xs"
                      >
                        <span className="font-semibold text-[#F3F1EC]">{g.label}: </span>
                        <span className="text-[#A09C92]">{g.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Most Relevant Shipped Projects */}
              <div className="space-y-2">
                <div className="claude-font-mono text-[10px] uppercase tracking-wider text-[#D97757] font-semibold">
                  Top Matching Shipped Projects
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {report.matchedProjects.map((p) => (
                    <div
                      key={p.name}
                      className="p-2.5 rounded-xl bg-[#201F1C] border border-[#33312B]"
                    >
                      <div className="claude-font-serif text-xs font-semibold text-[#F3F1EC]">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-[#A09C92] mt-0.5 line-clamp-2">
                        {p.tagline}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#2E2C28]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setReport(null)}
                    className="px-3 py-2 rounded-xl bg-[#242320] hover:bg-[#312F2A] border border-[#38352F] text-xs text-[#D8D3C8] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FaRedoAlt size={10} />
                    <span>Evaluate Another JD</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="px-3 py-2 rounded-xl bg-[#242320] hover:bg-[#312F2A] border border-[#38352F] text-xs text-[#D8D3C8] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <FaCheck size={10} className="text-emerald-400" /> : <FaCopy size={10} />}
                    <span>{copied ? "Copied!" : "Copy Report"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 rounded-xl bg-[#242320] hover:bg-[#312F2A] border border-[#D97757]/50 text-xs text-[#E88B6C] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FaVolumeUp size={11} />
                    <span>Watch Klint Pitch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenVerdict?.();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#D97757] hover:bg-[#C26547] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FaAward size={11} />
                    <span>Make Verdict</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
