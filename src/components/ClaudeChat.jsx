import React, { useState, useRef, useEffect } from "react";
import { ClaudeStarburst, ClaudeArtifactIcon } from "./ClaudeIcons";
import { STARTER_QUESTIONS, RECRUITER_PRESETS, getKlintResponse } from "../data/klintKnowledge";
import { 
  FaArrowUp, 
  FaUser, 
  FaRegCopy, 
  FaCheck, 
  FaExternalLinkAlt, 
  FaRedoAlt, 
  FaShieldAlt,
  FaCode,
  FaFilePdf,
  FaVolumeUp,
  FaVolumeMute,
  FaDownload,
  FaChevronDown,
  FaRobot
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const AVAILABLE_MODELS = [
  { id: "Klint 3.5 Sonnet", desc: "Best for deep technical architecture & project analysis" },
  { id: "Klint 3.5 Haiku", desc: "Fast concise 2-minute recruiter summaries" },
  { id: "Klint Opus", desc: "Creative systems design & career philosophy" }
];

const ClaudeChat = ({
  onNavigateArtifact,
  activePromptQuery,
  onClearActivePrompt
}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedModel, setSelectedModel] = useState("Klint 3.5 Sonnet");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [isCopiedTranscript, setIsCopiedTranscript] = useState(false);

  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const modelMenuRef = useRef(null);

  // Close model menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target)) {
        setIsModelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Adjust textarea height automatically
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  // Trigger search from parent (e.g. sidebar clicked prompt)
  useEffect(() => {
    if (activePromptQuery) {
      handleSendMessage(activePromptQuery);
      if (onClearActivePrompt) onClearActivePrompt();
    }
  }, [activePromptQuery]);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    // Stop ongoing speech
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsTyping(true);

    // Simulate conversational intelligence
    setTimeout(() => {
      const responseData = getKlintResponse(text, onNavigateArtifact);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseData.text,
        artifactSection: responseData.artifactSection,
        followUps: responseData.followUps,
        quickActions: responseData.quickActions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 550);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleToggleSpeech = (msgId, rawMarkdown) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown syntax for clear vocalization
    const plainText = rawMarkdown
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/`/g, "")
      .replace(/>/g, "")
      .replace(/[-•]/g, "")
      .replace(/\n\s*\n/g, ". ");

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleExportTranscript = () => {
    if (messages.length === 0) return;
    const header = `# KlintGPT Interview Transcript\nSession Date: ${new Date().toLocaleString()}\nCandidate: Klint Morales Ruales (Software Engineer)\n\n---\n\n`;
    const body = messages
      .map(
        (m) =>
          `### [${m.timestamp}] ${m.role === "user" ? "RECRUITER QUESTION" : "KLINTGPT"}\n\n${m.content}\n`
      )
      .join("\n---\n\n");

    const fullTranscript = header + body;

    // Trigger download
    const blob = new Blob([fullTranscript], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `KlintGPT_Recruiter_Interview_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);

    setIsCopiedTranscript(true);
    setTimeout(() => setIsCopiedTranscript(false), 2500);
  };

  const handleResetChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setMessages([]);
    setInputValue("");
  };

  // Helper to format basic markdown-like syntax cleanly
  const renderFormattedContent = (content) => {
    const lines = content.split("\n");
    return lines.map((line, lIdx) => {
      // H3 headers
      if (line.startsWith("### ")) {
        return (
          <h3 key={lIdx} className="claude-font-serif text-lg font-semibold text-[var(--text-primary)] mt-3 mb-1.5 flex items-center gap-1.5">
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Blockquote
      if (line.startsWith("> ")) {
        return (
          <blockquote key={lIdx} className="border-l-2 border-[#D97757] pl-3 py-1 my-2 italic text-sm text-[var(--text-secondary)] bg-[var(--accent-subtle)] rounded-r-lg">
            {line.replace("> ", "")}
          </blockquote>
        );
      }
      // Bullet point
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <div key={lIdx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] my-1 pl-1">
            <span className="text-[#D97757] text-xs mt-1 shrink-0">●</span>
            <span className="leading-relaxed">{parseInlineMarkdown(line.slice(2))}</span>
          </div>
        );
      }
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        const num = line.match(/^\d+/)[0];
        const rest = line.replace(/^\d+\.\s/, "");
        return (
          <div key={lIdx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] my-1.5 pl-1">
            <span className="claude-font-mono text-xs font-semibold text-[#D97757] mt-0.5 shrink-0 bg-[var(--accent-subtle)] px-1.5 py-0.5 rounded">
              {num}
            </span>
            <span className="leading-relaxed">{parseInlineMarkdown(rest)}</span>
          </div>
        );
      }
      // Empty line spacer
      if (!line.trim()) {
        return <div key={lIdx} className="h-2" />;
      }
      // Regular paragraph
      return (
        <p key={lIdx} className="text-sm text-[var(--text-secondary)] leading-relaxed my-1">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Helper to parse bold, links, inline code
  const parseInlineMarkdown = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|\`.*?\`)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pIdx} className="font-semibold text-[var(--text-primary)]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={pIdx} className="code-inline text-xs">{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("[") && part.includes("](")) {
        const label = part.substring(1, part.indexOf("]("));
        const url = part.substring(part.indexOf("](") + 2, part.length - 1);
        return (
          <a
            key={pIdx}
            href={url}
            target={url.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-[#D97757] hover:underline font-medium inline-flex items-center gap-0.5"
          >
            {label}
            {url.startsWith("http") && <FaExternalLinkAlt size={9} className="opacity-70 ml-0.5 inline" />}
          </a>
        );
      }
      return part;
    });
  };

  const isConversationEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-3 sm:px-6 relative">
      
      {/* CASE 1: WELCOME SCREEN (When chat is empty) */}
      {isConversationEmpty && (
        <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-10 animate-fade-in text-center overflow-y-auto">
          
          {/* Claude Starburst Mascot */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#D97757]/15 flex items-center justify-center text-[#D97757] mb-4 shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <ClaudeStarburst size={36} />
          </div>

          {/* Claude Serif Headline */}
          <h1 className="claude-font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] mb-2.5">
            Hi, I'm KlintGPT.
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mb-6 leading-relaxed">
            A developer portfolio you can <strong>interview</strong> instead of just reading. Ask questions like: <em>"What kind of projects has Klint built?"</em>, <em>"How strong is his React experience?"</em>, or <em>"Tell me about his experience with A/B testing"</em>.
          </p>

          {/* Recruiter Quick Filter Chips */}
          <div className="w-full max-w-2xl mb-4">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] claude-font-mono font-semibold">
                Recruiter Role Shortcuts
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                Instant answers
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {RECRUITER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSendMessage(preset.prompt)}
                  className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all font-medium shadow-2xs"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Claude Signature Prompt Input Box (Hero Version) */}
          <div className="w-full max-w-2xl mb-6">
            <div className="claude-prompt-box p-3 sm:p-4 text-left">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Ask me anything about Klint's experience, stack, or projects..."
                className="w-full bg-transparent resize-none text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] mt-2">
                
                {/* Model Selector Pill */}
                <div className="relative" ref={modelMenuRef}>
                  <button
                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                    className="claude-font-mono text-[11px] px-2.5 py-1 rounded-full bg-[var(--border-color)] hover:bg-[var(--card-hover)] text-[var(--text-secondary)] flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <IoSparkles className="text-[#D97757]" size={11} />
                    <span>{selectedModel}</span>
                    <FaChevronDown size={8} className="opacity-60" />
                  </button>

                  {/* Dropdown Menu */}
                  {isModelDropdownOpen && (
                    <div className="absolute left-0 bottom-full mb-2 w-64 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl p-1.5 z-30 animate-fade-in text-left">
                      <div className="px-2 py-1 text-[10px] uppercase font-semibold text-[var(--text-muted)] claude-font-mono">
                        Select Interview Persona
                      </div>
                      {AVAILABLE_MODELS.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedModel(model.id);
                            setIsModelDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col gap-0.5 ${
                            selectedModel === model.id
                              ? "bg-[#D97757]/10 text-[#D97757] font-semibold"
                              : "text-[var(--text-primary)] hover:bg-[var(--card-hover)]"
                          }`}
                        >
                          <span>{model.id}</span>
                          <span className="text-[10px] text-[var(--text-muted)] font-normal">
                            {model.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-[11px] text-[var(--text-muted)]">
                    Press <kbd className="claude-font-mono text-[10px] bg-[var(--border-color)] px-1 rounded">Enter ↵</kbd>
                  </span>

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-8 h-8 rounded-full bg-[#D97757] hover:bg-[#C26547] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-sm shrink-0"
                    aria-label="Send query"
                  >
                    <FaArrowUp size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Curated Starter Prompt Grid (MarufGPT Inspired) */}
          <div className="w-full max-w-2xl pb-4">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] claude-font-mono font-semibold">
                Suggested Interview Questions
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                Click any card to start
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STARTER_QUESTIONS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSendMessage(item.prompt)}
                  className="claude-chip group flex items-start gap-3 cursor-pointer text-left"
                >
                  <span className="text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[#D97757] transition-colors leading-snug">
                      {item.prompt}
                    </h2>
                    <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* CASE 2: ACTIVE CONVERSATION STREAM */}
      {!isConversationEmpty && (
        <div className="flex-1 overflow-y-auto py-6 space-y-6 pb-36">
          
          {/* Header Action Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <ClaudeStarburst size={16} className="text-[#D97757]" />
              <span className="font-medium text-[var(--text-secondary)]">Interview Session</span>
              <span className="claude-font-mono text-[10px] bg-[var(--border-color)] px-1.5 py-0.2 rounded">
                {selectedModel}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Export Transcript */}
              <button
                onClick={handleExportTranscript}
                className="flex items-center gap-1.5 hover:text-[#D97757] transition-colors"
                title="Download interview transcript as Markdown"
              >
                <FaDownload size={10} />
                <span>{isCopiedTranscript ? "Exported!" : "Export Transcript"}</span>
              </button>

              <span className="text-[var(--border-color)]">|</span>

              {/* Reset Chat */}
              <button
                onClick={handleResetChat}
                className="flex items-center gap-1.5 hover:text-[#D97757] transition-colors"
                title="Clear interview messages"
              >
                <FaRedoAlt size={10} />
                <span>Reset Chat</span>
              </button>
            </div>
          </div>

          {/* Messages List */}
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            const isSpeakingThis = speakingId === msg.id;

            return (
              <div
                key={msg.id || index}
                className={`flex gap-3 sm:gap-4 animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#D97757]/15 text-[#D97757] flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <ClaudeStarburst size={16} />
                  </div>
                )}

                {/* Message Content Container */}
                <div className={`flex flex-col ${isUser ? "items-end max-w-[85%] sm:max-w-[78%]" : "items-start w-full max-w-[95%] sm:max-w-[92%]"}`}>
                  
                  {/* Sender & Timestamp */}
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                      {isUser ? "You" : "KlintGPT"}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Message Body */}
                  {isUser ? (
                    <div className="claude-user-bubble text-sm leading-relaxed">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="claude-assistant-bubble w-full">
                      {/* Markdown rendered output */}
                      <div className="space-y-1">
                        {renderFormattedContent(msg.content)}
                      </div>

                      {/* Quick Interactive Actions */}
                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[var(--border-subtle)]">
                          {msg.quickActions.map((qa, qIdx) => (
                            qa.action ? (
                              <button
                                key={qIdx}
                                onClick={qa.action}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] hover:bg-[var(--card-hover)] text-xs text-[var(--text-primary)] font-medium transition-all shadow-xs"
                              >
                                <ClaudeArtifactIcon size={12} className="text-[#D97757]" />
                                <span>{qa.label}</span>
                              </button>
                            ) : (
                              <a
                                key={qIdx}
                                href={qa.link}
                                target={qa.link.startsWith("http") ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#D97757] hover:bg-[var(--card-hover)] text-xs text-[var(--text-primary)] font-medium transition-all shadow-xs"
                              >
                                <span>{qa.label}</span>
                                <FaExternalLinkAlt size={9} className="opacity-60" />
                              </a>
                            )
                          ))}
                        </div>
                      )}

                      {/* Assistant Footer Controls (Copy, Text-to-speech, Artifact link) */}
                      <div className="flex items-center flex-wrap gap-3 mt-3 pt-2 text-xs text-[var(--text-muted)]">
                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopyMessage(msg.content, index)}
                          className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
                          title="Copy response"
                        >
                          {copiedIndex === index ? (
                            <>
                              <FaCheck className="text-emerald-500" size={11} />
                              <span className="text-emerald-500 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <FaRegCopy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        {/* Audio Read Aloud */}
                        <button
                          onClick={() => handleToggleSpeech(msg.id, msg.content)}
                          className={`flex items-center gap-1 transition-colors ${
                            isSpeakingThis ? "text-[#D97757] font-semibold" : "hover:text-[var(--text-primary)]"
                          }`}
                          title={isSpeakingThis ? "Stop speaking" : "Listen to answer"}
                        >
                          {isSpeakingThis ? (
                            <>
                              <FaVolumeMute size={12} />
                              <span>Stop Audio</span>
                            </>
                          ) : (
                            <>
                              <FaVolumeUp size={12} />
                              <span>Listen</span>
                            </>
                          )}
                        </button>

                        {/* Artifact Canvas Link */}
                        {msg.artifactSection && (
                          <button
                            onClick={() => onNavigateArtifact && onNavigateArtifact(msg.artifactSection)}
                            className="flex items-center gap-1 text-[#D97757] hover:underline ml-auto"
                          >
                            <ClaudeArtifactIcon size={11} />
                            <span>Inspect {msg.artifactSection} in Canvas</span>
                          </button>
                        )}
                      </div>

                      {/* Follow-up Prompts */}
                      {msg.followUps && msg.followUps.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {msg.followUps.map((promptText, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => handleSendMessage(promptText)}
                              className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#D97757] bg-[var(--card-bg)] border border-[var(--border-color)] px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
                            >
                              <span>{promptText}</span>
                              <span className="text-[#D97757]">→</span>
                            </button>
                          ))}
                        </div>
                      )}

                    </div>
                  )}

                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--user-bubble)] text-[var(--text-secondary)] border border-[var(--border-color)] flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <FaUser size={12} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isTyping && (
            <div className="flex gap-3 sm:gap-4 items-start animate-fade-in">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#D97757]/15 text-[#D97757] flex items-center justify-center shrink-0 mt-1">
                <ClaudeStarburst size={16} />
              </div>
              <div className="p-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce delay-200" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      )}

      {/* PERSISTENT FLOATING BOTTOM PROMPT BAR (When conversation is active) */}
      {!isConversationEmpty && (
        <div className="sticky bottom-0 z-20 w-full pt-2 pb-3 sm:pb-4 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/90 to-transparent">
          <div className="w-full max-w-3xl mx-auto">
            
            {/* Horizontal quick prompts slider */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-1">
              {[
                "Tell me about EvaTrack Capstone",
                "How strong is his React experience?",
                "Tell me about his experience with A/B testing",
                "What technologies does he work with?",
                "Why should I consider him for a Software Engineer role?",
                "Tell me about his Cloud & DevOps architecture",
                "Download Klint's Resume PDF"
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap text-[11px] font-medium px-3 py-1 rounded-full bg-[var(--card-bg)]/95 backdrop-blur-md border border-[var(--border-color)] hover:border-[#D97757] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-xs"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Prompt Card */}
            <div className="claude-prompt-box p-2.5 sm:p-3 bg-[var(--card-bg)]/95 backdrop-blur-md">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask a follow-up question about Klint..."
                  className="flex-1 bg-transparent resize-none text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none max-h-32 py-1 leading-relaxed"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-8 h-8 rounded-full bg-[#D97757] hover:bg-[#C26547] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-sm shrink-0"
                  aria-label="Send message"
                >
                  <FaArrowUp size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ClaudeChat;
