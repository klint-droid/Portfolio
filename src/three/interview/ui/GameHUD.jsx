import React from "react";
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
} from "react-icons/fa";
import { STATIONS, getOverallScore } from "../interviewState";

const STATION_ICONS = {
  seated: FaUserTie,
  projects: FaLaptopCode,
  stack: FaLayerGroup,
  career: FaTrophy,
  resume: FaFileAlt,
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
  const overall = getOverallScore(scorecard);
  const inspectedStationCount = STATIONS.filter((s) =>
    discoveredClues.includes(s.clueId)
  ).length;

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

      {/* BOTTOM STATION WAYPOINT DOCK (hidden while seated in dialogue to keep view clean) */}
      {mode !== "seated" && (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-8.5rem)] sm:max-w-xl">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#181816]/88 backdrop-blur-xl border border-[#33312B] shadow-2xl overflow-x-auto scrollbar-none">
            <button
              onClick={() => onSelectMode("explore")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                mode === "explore"
                  ? "bg-[#D97757] text-white shadow-sm"
                  : "text-[#A09C92] hover:text-[#F3F1EC] hover:bg-[#2B2A26]"
              }`}
            >
              <FaCompass size={12} />
              <span>Roam</span>
            </button>

            <div className="w-px h-5 bg-[#33312B] shrink-0" />

            {STATIONS.map((station) => {
              const Icon = STATION_ICONS[station.id] || FaCompass;
              const isActive = mode === station.id;
              const discovered = discoveredClues.includes(station.clueId);

              return (
                <button
                  key={station.id}
                  onClick={() => onSelectMode(station.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#D97757] text-white shadow-sm"
                      : "text-[#A09C92] hover:text-[#F3F1EC] hover:bg-[#2B2A26]"
                  }`}
                >
                  <Icon size={12} />
                  <span>{station.shortLabel}</span>
                  {discovered && !isActive && (
                    <FaCheckCircle size={9} className="text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
