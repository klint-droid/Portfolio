import React, { useState } from "react";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaAward,
  FaCompass,
  FaUserTie,
  FaLaptopCode,
  FaLayerGroup,
  FaTrophy,
  FaFileAlt,
  FaCheckCircle,
  FaEye,
  FaUser,
  FaClipboardCheck,
  FaQuoteLeft,
  FaUserFriends,
  FaBookOpen,
} from "react-icons/fa";
import { STATIONS, getOverallScore } from "../interviewState";

const DOCK_STYLES = {
  explore: {
    icon: FaCompass,
    label: "Roam Studio",
    gradient: "from-[#D97757] to-[#B65637]",
  },
  seated: {
    icon: FaUserTie,
    label: "Interview Desk",
    gradient: "from-[#E08264] to-[#C25D3F]",
  },
  projects: {
    icon: FaLaptopCode,
    label: "Shipped Projects",
    gradient: "from-[#3B82F6] to-[#1D4ED8]",
  },
  stack: {
    icon: FaLayerGroup,
    label: "Tech Stack",
    gradient: "from-[#F59E0B] to-[#D97706]",
  },
  career: {
    icon: FaTrophy,
    label: "Career & Awards",
    gradient: "from-[#EAB308] to-[#B45309]",
  },
  resume: {
    icon: FaFileAlt,
    label: "Resume & CV",
    gradient: "from-[#64748B] to-[#334155]",
  },
  recommendations: {
    icon: FaQuoteLeft,
    label: "Recommendations",
    gradient: "from-[#10B981] to-[#047857]",
  },
  community: {
    icon: FaUserFriends,
    label: "Community & Life",
    gradient: "from-[#14B8A6] to-[#0F766E]",
  },
  oracle: {
    icon: FaBookOpen,
    label: "Oracle & Course",
    gradient: "from-[#A855F7] to-[#6D28D9]",
  },
};

export default function GameHUD({
  mode,
  cameraPerspective,
  onTogglePerspective,
  onSelectMode,
  scorecard,
  discoveredClues,
  voiceEnabled,
  onToggleVoice,
  onOpenVerdict,
  onOpenJDEvaluator,
  jdReport,
  isHired,
  toast,
}) {
  const [hoveredDockIdx, setHoveredDockIdx] = useState(null);
  const overall = getOverallScore(scorecard);
  const inspectedStationCount = STATIONS.filter((s) =>
    discoveredClues.includes(s.clueId)
  ).length;

  const dockItems = [
    { id: "explore", clueId: null },
    ...STATIONS.map((s) => ({ id: s.id, clueId: s.clueId })),
  ];

  const getDockTransform = (idx) => {
    if (hoveredDockIdx === null) return "scale-100 translate-y-0";
    const dist = Math.abs(hoveredDockIdx - idx);
    if (dist === 0) return "scale-[1.32] -translate-y-2.5 z-20";
    if (dist === 1) return "scale-[1.14] -translate-y-1 z-10";
    return "scale-100 translate-y-0";
  };

  return (
    <>
      {/* TOP GAME BAR */}
      <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none px-3 sm:px-5 py-3 flex items-center justify-between gap-2">
        {/* Left: Studio Identity + Controls Hint */}
        <div className="pointer-events-auto flex items-center gap-2.5 bg-[#181816]/82 backdrop-blur-md border border-[#33312B] rounded-xl px-3 py-2 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D97757] animate-pulse shadow-[0_0_10px_#D97757]" />
          <div className="leading-tight">
            <div className="claude-font-serif text-sm font-semibold text-[#F3F1EC] tracking-tight">
              Interview Klint
            </div>
            <div className="claude-font-mono text-[10px] text-[#A09C92] hidden sm:block">
              {mode === "explore"
                ? "WASD move • Drag look • V switch 1P/3P"
                : mode === "seated"
                ? "Interview Mode • V switch 1P/3P • Esc stand"
                : "Inspecting Station • Esc step back"}
            </div>
          </div>
        </div>

        {/* Right: 1P/3P Perspective Toggle, Scorecard Pill, Voice */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* 1P / 3P Perspective Switcher */}
          <div
            className="flex items-center p-0.5 rounded-xl bg-[#181816]/85 border border-[#33312B] backdrop-blur-md shadow-lg"
            title="Switch Camera View (Shortcut: V)"
          >
            <button
              onClick={() => onTogglePerspective("first")}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg claude-font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                cameraPerspective === "first"
                  ? "bg-[#D97757] text-white shadow-xs"
                  : "text-[#A09C92] hover:text-[#F3F1EC]"
              }`}
              aria-label="First-Person View"
            >
              <FaEye size={10} />
              <span>1P</span>
            </button>
            <button
              onClick={() => onTogglePerspective("third")}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg claude-font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                cameraPerspective === "third"
                  ? "bg-[#D97757] text-white shadow-xs"
                  : "text-[#A09C92] hover:text-[#F3F1EC]"
              }`}
              aria-label="Third-Person View"
            >
              <FaUser size={10} />
              <span>3P</span>
            </button>
          </div>

          {/* Evaluate Job Description Button */}
          <button
            onClick={onOpenJDEvaluator}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border backdrop-blur-md text-xs font-medium transition-all shadow-lg cursor-pointer ${
              jdReport
                ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/25"
                : "bg-[#D97757]/18 hover:bg-[#D97757] border-[#D97757]/60 text-[#F3F1EC]"
            }`}
            title="Submit a Job Description to automatically evaluate Klint"
          >
            <FaClipboardCheck size={12} />
            <span className="hidden md:inline">
              {jdReport ? `JD: ${jdReport.matchScore}%` : "Match JD"}
            </span>
          </button>

          {/* Live Evaluation Meter */}
          <button
            onClick={onOpenVerdict}
            className="flex items-center gap-2 bg-[#181816]/85 hover:bg-[#23221F] backdrop-blur-md border border-[#33312B] hover:border-[#D97757]/70 rounded-xl px-2.5 sm:px-3.5 py-2 transition-all shadow-lg group"
            title="Open Interviewer Scorecard & Make Decision"
          >
            <FaAward className="text-[#D97757] shrink-0" size={14} />
            <div className="text-left leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="claude-font-mono text-[11px] font-bold text-[#F3F1EC]">
                  {isHired ? "HIRED!" : `${overall}% Match`}
                </span>
                <span className="hidden md:inline text-[10px] claude-font-mono text-[#A09C92]">
                  • {inspectedStationCount}/{STATIONS.length} Clues
                </span>
              </div>
              <div className="w-20 sm:w-24 h-1.5 bg-[#2B2A26] rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHired
                      ? "bg-emerald-400"
                      : "bg-gradient-to-r from-[#D97757] to-amber-400"
                  }`}
                  style={{ width: `${isHired ? 100 : overall}%` }}
                />
              </div>
            </div>
          </button>

          {/* Voice Toggle */}
          <button
            onClick={onToggleVoice}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all shadow-lg ${
              voiceEnabled
                ? "bg-[#D97757]/20 border-[#D97757] text-[#F3F1EC]"
                : "bg-[#181816]/85 border-[#33312B] text-[#A09C92] hover:text-[#F3F1EC]"
            }`}
            title={voiceEnabled ? "Mute Klint's Voice" : "Enable Klint's Voice (TTS)"}
            aria-label="Toggle voice synthesis"
          >
            {voiceEnabled ? <FaVolumeUp size={13} /> : <FaVolumeMute size={13} />}
          </button>
        </div>
      </header>

      {/* TOAST / CLUE DISCOVERY NOTIFICATION */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-fade-in">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#181816]/94 border border-[#D97757]/70 text-[#F3F1EC] shadow-[0_8px_30px_rgba(217,119,87,0.28)] backdrop-blur-md max-w-md">
            <span className="text-base">{toast.icon || "✨"}</span>
            <div className="text-xs leading-snug">
              <div className="claude-font-mono text-[10px] uppercase tracking-wider text-[#D97757] font-semibold">
                {toast.title}
              </div>
              <div className="text-[#F3F1EC]">{toast.message}</div>
            </div>
          </div>
        </div>
      )}

      {/* MACBOOK / macOS STYLE FLOATING DOCK (hidden while seated in dialogue to keep view clean) */}
      {mode !== "seated" && (
        <nav
          aria-label="Studio Dock"
          onMouseLeave={() => setHoveredDockIdx(null)}
          className="fixed bottom-3.5 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="flex items-end gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-[22px] bg-[#1C1B19]/75 backdrop-blur-2xl border border-white/15 shadow-[0_14px_45px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)]">
            {dockItems.map((item, idx) => {
              const style = DOCK_STYLES[item.id] || DOCK_STYLES.explore;
              const Icon = style.icon;
              const isActive = mode === item.id;
              const discovered = item.clueId && discoveredClues.includes(item.clueId);
              const isHovered = hoveredDockIdx === idx;

              return (
                <React.Fragment key={item.id}>
                  {/* Subtle macOS Dock vertical divider between Roam & Studio Stations */}
                  {idx === 1 && (
                    <div className="w-[1px] h-8 bg-white/15 mx-0.5 self-center shrink-0" />
                  )}

                  <div className="relative flex flex-col items-center">
                    {/* Floating macOS Hover Tooltip Pill */}
                    {isHovered && (
                      <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#181816]/95 border border-white/15 text-[#F3F1EC] text-[11px] font-medium whitespace-nowrap shadow-xl backdrop-blur-md">
                        {style.label}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#181816] border-r border-b border-white/15 rotate-45" />
                      </div>
                    )}

                    {/* Squircle App Icon */}
                    <button
                      type="button"
                      onClick={() => onSelectMode(item.id)}
                      onMouseEnter={() => setHoveredDockIdx(idx)}
                      onFocus={() => setHoveredDockIdx(idx)}
                      onBlur={() => setHoveredDockIdx(null)}
                      aria-label={style.label}
                      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] flex items-center justify-center bg-gradient-to-br ${style.gradient} text-white shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.28)] border transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer origin-bottom ${
                        isActive
                          ? "border-white/75 ring-2 ring-white/25"
                          : "border-white/15 opacity-90 hover:opacity-100"
                      } ${getDockTransform(idx)}`}
                    >
                      <Icon className="text-[15px] sm:text-[17px] drop-shadow-xs" />

                      {/* Discovered Evidence Corner Badge */}
                      {discovered && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#181816] flex items-center justify-center shadow-sm">
                          <FaCheckCircle size={10} className="text-emerald-400" />
                        </span>
                      )}
                    </button>

                    {/* macOS Active Running Indicator Dot */}
                    <span
                      className={`mt-1 w-1 h-1 rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-[#F3F1EC] scale-100 shadow-[0_0_6px_rgba(255,255,255,0.85)]"
                          : "bg-transparent scale-0"
                      }`}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
