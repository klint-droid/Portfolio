import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowUp,
  FaCheck,
  FaWalking,
  FaAward,
  FaExternalLinkAlt,
  FaCommentDots,
  FaMinus,
  FaTimes,
} from "react-icons/fa";
import { INTERVIEW_ROUNDS } from "../interviewState";

function renderInline(line) {
  const clean = line.replace(/^###\s*/, "").replace(/^>\s*/, "");
  const parts = clean.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="text-[#F3F1EC] font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="claude-font-mono text-[10px] bg-[#2C2B27] px-1 py-0.5 rounded text-[#E28769]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[") && part.includes("](")) {
      const label = part.slice(1, part.indexOf("]("));
      const href = part.slice(part.indexOf("](") + 2, -1);
      return (
        <a
          key={idx}
          href={href}
          target={href.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="text-[#D97757] hover:underline font-medium inline-flex items-center gap-0.5"
        >
          {label}
          {href.startsWith("http") && <FaExternalLinkAlt size={8} className="opacity-75" />}
        </a>
      );
    }
    return part;
  });
}

function MessageContent({ content }) {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="space-y-1 text-xs leading-relaxed text-[#D8D3C8]">
      {lines.map((line, i) => {
        if (line.startsWith("### ")) {
          return (
            <div key={i} className="claude-font-serif text-sm font-semibold text-[#F3F1EC] pt-0.5">
              {line.replace("### ", "")}
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-[#D97757] pl-2.5 py-0.5 italic text-[#E2DDD3] bg-[#D97757]/10 rounded-r"
            >
              {renderInline(line)}
            </blockquote>
          );
        }
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-[#D97757] text-[9px] mt-1 shrink-0">●</span>
              <span>{renderInline(line.slice(2))}</span>
            </div>
          );
        }
        return <p key={i}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

/**
 * Minimal Messenger-style Chat Head + Pop-Up Drawer + slim bottom-edge seated controls.
 * Keeps Klint and his 3D in-world speech bubble completely unobstructed!
 */
export default function DialogueBox({
  mode,
  messages,
  klintMood,
  completedRounds,
  isChatOpen,
  onToggleChat,
  unreadCount,
  onAskQuestion,
  onStandUp,
  onOpenVerdict,
  onInputFocusChange,
}) {
  const [input, setInput] = useState("");
  const [quickInput, setQuickInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen, klintMood]);

  const handleDrawerSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || klintMood === "thinking") return;
    onAskQuestion(trimmed);
    setInput("");
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const trimmed = quickInput.trim();
    if (!trimmed || klintMood === "thinking") return;
    onAskQuestion(trimmed);
    setQuickInput("");
  };

  // Next suggested uncompleted round for the minimal bar
  const nextRound =
    INTERVIEW_ROUNDS.find((r) => !completedRounds.includes(r.id)) || INTERVIEW_ROUNDS[0];

  return (
    <>
      {/* ================================================================
          1. ULTRA-MINIMAL SEATED QUICK-BAR (Single compact row at very bottom)
             Leaves Klint & his 3D speech bubble 100% unobstructed!
      ================================================================ */}
      {mode === "seated" && !isChatOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[92vw] max-w-xl pr-14 sm:pr-0">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#181816]/84 backdrop-blur-xl border border-[#3B3832] shadow-2xl">
            <button
              onClick={onStandUp}
              className="px-3 py-1.5 rounded-full bg-[#242320] hover:bg-[#312F2A] text-[#D8D3C8] hover:text-white text-[11px] font-medium flex items-center gap-1.5 shrink-0 transition-colors"
              title="Stand up & roam studio (Esc)"
            >
              <FaWalking size={11} className="text-[#D97757]" />
              <span className="hidden sm:inline">Stand Up</span>
            </button>

            <form onSubmit={handleQuickSubmit} className="flex-1 flex items-center gap-1.5 min-w-0">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                onFocus={() => onInputFocusChange?.(true)}
                onBlur={() => onInputFocusChange?.(false)}
                placeholder={`Ask Klint... (or try "${nextRound.label}")`}
                className="flex-1 min-w-0 bg-transparent px-2.5 py-1 text-xs text-[#F3F1EC] placeholder-[#8A857B] focus:outline-none"
              />
              {quickInput.trim() ? (
                <button
                  type="submit"
                  disabled={klintMood === "thinking"}
                  className="w-7 h-7 rounded-full bg-[#D97757] hover:bg-[#C26547] text-white flex items-center justify-center shrink-0 transition-colors"
                  aria-label="Send question"
                >
                  <FaArrowUp size={10} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onAskQuestion(nextRound.prompt, nextRound)}
                  disabled={klintMood === "thinking"}
                  className="px-2.5 py-1 rounded-full bg-[#D97757]/18 hover:bg-[#D97757] border border-[#D97757]/45 text-[#E88B6C] hover:text-white text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors"
                >
                  {nextRound.label} →
                </button>
              )}
            </form>

            <button
              onClick={onOpenVerdict}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#D97757] hover:bg-[#C26547] text-white text-[11px] font-semibold shrink-0 transition-colors"
            >
              <FaAward size={11} />
              <span>Verdict</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          2. MESSENGER-STYLE POP-UP CHAT DRAWER (Anchored Right Side)
      ================================================================ */}
      {isChatOpen && (
        <aside className="fixed bottom-20 right-3 sm:right-5 z-40 w-[92vw] sm:w-[370px] h-[62vh] max-h-[540px] flex flex-col bg-[#181816]/94 backdrop-blur-xl border border-[#3B3832] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden animate-fade-in-up">
          {/* Messenger Drawer Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#201F1C] border-b border-[#33312B]">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#D97757] to-[#9E4E35] text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                K
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#201F1C]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-[#F3F1EC]">Klint Ruales</div>
                <div className="claude-font-mono text-[10px] text-emerald-400">
                  {klintMood === "thinking" ? "Typing..." : "Active in studio"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onOpenVerdict}
                className="px-2 py-1 rounded-lg bg-[#D97757]/15 hover:bg-[#D97757] text-[#E88B6C] hover:text-white text-[10px] claude-font-mono font-semibold transition-colors"
                title="Open Hiring Scorecard"
              >
                Verdict
              </button>
              <button
                onClick={onToggleChat}
                className="p-1.5 rounded-lg text-[#A09C92] hover:text-[#F3F1EC] hover:bg-[#2C2A26] transition-colors"
                title="Minimize to chat head"
                aria-label="Minimize chat"
              >
                <FaMinus size={11} />
              </button>
            </div>
          </div>

          {/* Scrollable Chat History */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] px-3 py-2 rounded-2xl ${
                      isUser
                        ? "bg-[#D97757] text-white rounded-br-sm text-xs leading-relaxed"
                        : "bg-[#242320] border border-[#33312B] text-[#F3F1EC] rounded-bl-sm"
                    }`}
                  >
                    {isUser ? msg.content : <MessageContent content={msg.content} />}

                    {!isUser && msg.quickActions?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-[#33312B]">
                        {msg.quickActions.map((qa, idx) =>
                          qa.prompt ? (
                            <button
                              key={idx}
                              onClick={() => onAskQuestion(qa.prompt)}
                              className="px-2 py-1 rounded-lg bg-[#1A1917] hover:bg-[#D97757] border border-[#3A3731] text-[10px] text-[#F3F1EC] transition-colors"
                            >
                              {qa.label}
                            </button>
                          ) : qa.link ? (
                            <a
                              key={idx}
                              href={qa.link}
                              target={qa.link.startsWith("http") ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="px-2 py-1 rounded-lg bg-[#1A1917] hover:bg-[#D97757] border border-[#3A3731] text-[10px] text-[#F3F1EC] inline-flex items-center gap-1 transition-colors"
                            >
                              <span>{qa.label}</span>
                              <FaExternalLinkAlt size={8} />
                            </a>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {klintMood === "thinking" && (
              <div className="flex items-start">
                <div className="px-3 py-2 rounded-2xl rounded-bl-sm bg-[#242320] border border-[#33312B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] animate-bounce [animation-delay:120ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] animate-bounce [animation-delay:240ms]" />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Compact Interview Rounds Strip */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1B19] border-t border-[#2E2C28] overflow-x-auto scrollbar-none">
            {INTERVIEW_ROUNDS.map((round) => {
              const done = completedRounds.includes(round.id);
              return (
                <button
                  key={round.id}
                  onClick={() => onAskQuestion(round.prompt, round)}
                  disabled={klintMood === "thinking"}
                  className={`flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] border transition-all shrink-0 ${
                    done
                      ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-300"
                      : "bg-[#23221F] border-[#33312B] text-[#D8D3C8] hover:border-[#D97757] hover:text-white"
                  }`}
                >
                  {done && <FaCheck size={8} className="text-emerald-400" />}
                  <span>{round.label}</span>
                </button>
              );
            })}
          </div>

          {/* Drawer Input */}
          <form
            onSubmit={handleDrawerSubmit}
            className="flex items-center gap-2 p-2.5 bg-[#151413] border-t border-[#2E2C28]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => onInputFocusChange?.(true)}
              onBlur={() => onInputFocusChange?.(false)}
              placeholder="Message Klint..."
              className="flex-1 bg-[#22211E] border border-[#35332D] focus:border-[#D97757] rounded-full px-3.5 py-1.5 text-xs text-[#F3F1EC] placeholder-[#7C786F] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || klintMood === "thinking"}
              className="w-8 h-8 rounded-full bg-[#D97757] hover:bg-[#C26547] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors"
              aria-label="Send message"
            >
              <FaArrowUp size={11} />
            </button>
          </form>
        </aside>
      )}

      {/* ================================================================
          3. MESSENGER-STYLE FLOATING CHAT HEAD ICON (Bottom-Right)
      ================================================================ */}
      <div className="fixed bottom-4 right-3 sm:right-5 z-40 flex items-center gap-2">
        {!isChatOpen && (
          <button
            onClick={onToggleChat}
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-[#181816]/88 border border-[#3B3832] hover:border-[#D97757]/70 text-[#F3F1EC] text-[11px] font-medium backdrop-blur-md shadow-lg transition-all"
          >
            Chat with Klint
          </button>
        )}

        <button
          onClick={onToggleChat}
          className={`relative w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(217,119,87,0.45)] border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${
            isChatOpen
              ? "bg-[#23221F] border-[#D97757] text-[#F3F1EC]"
              : "bg-gradient-to-br from-[#D97757] to-[#B8593B] border-[#F3C7A8]/60 text-white"
          }`}
          title={isChatOpen ? "Close Chat Drawer" : "Open Klint Chat Drawer"}
          aria-label="Toggle Messenger Chat Drawer"
        >
          {isChatOpen ? <FaTimes size={16} /> : <FaCommentDots size={19} />}

          {/* Online Presence Dot */}
          {!isChatOpen && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#181816]" />
          )}

          {/* Unread Notification Badge */}
          {!isChatOpen && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#181816] animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
