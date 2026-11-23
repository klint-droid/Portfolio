import React, { Component, Suspense, lazy, useState, useEffect, useCallback, useRef } from "react";
import { FaPlay, FaCompass, FaDownload, FaEnvelope, FaRedoAlt } from "react-icons/fa";
import InterviewScene from "../three/interview/InterviewScene";
import GameHUD from "../three/interview/ui/GameHUD";
import DialogueBox from "../three/interview/ui/DialogueBox";
import StationModal from "../three/interview/ui/StationModal";
import VerdictModal from "../three/interview/ui/VerdictModal";
import JobEvaluatorModal from "../three/interview/ui/JobEvaluatorModal";
import {
  STATIONS,
  INITIAL_SCORECARD,
  COFFEE_QUIPS,
  clampScore,
  buildSpokenSegments,
} from "../three/interview/interviewState";
import { getKlintResponse, KLINT_PROFILE } from "../data/klintKnowledge";
import { triggerConfetti } from "../utils/confetti";

const WriteRecommendationModal = lazy(() => import("../components/WriteRecommendationModal"));
const TelemetryModal = lazy(() => import("../components/TelemetryModal"));

const INITIAL_WELCOME_TEXT =
  "Hey, welcome to my studio! I'm Klint Morales Ruales — Software Engineer Intern at Kyocera Document Solutions and Full-Stack Developer based in Cebu City. You're in the interviewer's seat today, so ask me anything below or open the chat icon on the right!";

const INITIAL_MESSAGES = [
  {
    id: "welcome-1",
    role: "assistant",
    content: `### Welcome to my studio! 👋\n\nI'm **Klint Morales Ruales** — Software Engineer Intern at **Kyocera Document Solutions** and Full-Stack Developer based in Cebu City.\n\nPick any **Interview Round** below, type your own question, or stand up to inspect my shipped projects, tech stack console, and career wall!`,
    quickActions: [
      {
        label: "⚡ 2-Min Recruiter Brief",
        prompt: "Give me the 2-minute recruiter summary of Klint's experience and strengths",
      },
      { label: "🚀 Featured Projects", prompt: "What kind of projects has Klint worked on?" },
      { label: "📄 Download Resume (PDF)", link: "/Klint_Ruales_Resume.pdf" },
    ],
  },
];

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.error("WebGL Scene Error:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-[#181816] text-[#F3F1EC] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="claude-font-serif text-3xl font-semibold">
              3D WebGL Unavailable on This Device
            </h1>
            <p className="text-sm text-[#A09C92]">
              Your browser couldn&apos;t initialize hardware WebGL rendering. You can still download Klint&apos;s resume or reach out directly below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={KLINT_PROFILE.resumeUrl}
                download="Klint_Morales_Ruales_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D97757] hover:bg-[#C26547] text-white font-semibold text-sm transition-colors"
              >
                <FaDownload />
                <span>Download CV (PDF)</span>
              </a>
              <a
                href={`mailto:${KLINT_PROFILE.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#242320] hover:bg-[#312F2A] border border-[#3B3832] text-[#F3F1EC] font-semibold text-sm transition-colors"
              >
                <FaEnvelope />
                <span>Email Klint</span>
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ThreePortfolio({ initialOpenRecommend = false }) {
  const [hasEntered, setHasEntered] = useState(initialOpenRecommend);
  const [mode, setMode] = useState(initialOpenRecommend ? "recommendations" : "title");
  const [cameraPerspective, setCameraPerspective] = useState("third");
  const [klintMood, setKlintMood] = useState("idle");
  const [hoveredStation, setHoveredStation] = useState(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  // Synchronized live sentence-by-sentence speech bubble + TTS state
  const [speechSegments, setSpeechSegments] = useState(() =>
    buildSpokenSegments(INITIAL_WELCOME_TEXT)
  );
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scorecard, setScorecard] = useState(INITIAL_SCORECARD);
  const [discoveredClues, setDiscoveredClues] = useState([]);
  const [completedRounds, setCompletedRounds] = useState([]);
  const [isVerdictOpen, setIsVerdictOpen] = useState(false);
  const [isJDEvalOpen, setIsJDEvalOpen] = useState(false);
  const [isWriteRecOpen, setIsWriteRecOpen] = useState(initialOpenRecommend);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [latestSubmittedRec, setLatestSubmittedRec] = useState(null);
  const [jdReport, setJdReport] = useState(null);
  const [isHired, setIsHired] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [toast, setToast] = useState(null);
  const [isTypingInput, setIsTypingInput] = useState(false);

  const toastTimerRef = useRef(null);
  const segmentTimerRef = useRef(null);
  const coffeeIdxRef = useRef(0);
  const isChatOpenRef = useRef(isChatOpen);
  const voiceEnabledRef = useRef(voiceEnabled);
  const isHiredRef = useRef(isHired);
  const speechSessionRef = useRef(0);
  const currentSegmentsRef = useRef(speechSegments);
  const currentIndexRef = useRef(0);
  const lastSpokenRawRef = useRef(INITIAL_WELCOME_TEXT);

  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
    if (isChatOpen) setUnreadCount(0);
  }, [isChatOpen]);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  useEffect(() => {
    isHiredRef.current = isHired;
  }, [isHired]);

  const showToast = useCallback((title, message, icon = "✨") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ title, message, icon });
    toastTimerRef.current = setTimeout(() => setToast(null), 3800);
  }, []);

  const stopSpeech = useCallback(() => {
    speechSessionRef.current += 1;
    if (segmentTimerRef.current) {
      clearTimeout(segmentTimerRef.current);
      segmentTimerRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setKlintMood(isHiredRef.current ? "celebrating" : "idle");
  }, []);

  /**
   * Plays all spoken segments sequentially without ever cutting off.
   * Each segment drives both the Web Speech voice AND Klint's animated 3D speech bubble!
   */
  const playSegmentAt = useCallback((segments, idx, sessionId, overrideMood = null) => {
    if (sessionId !== speechSessionRef.current) return;

    if (idx >= segments.length) {
      setIsSpeaking(false);
      setKlintMood(isHiredRef.current ? "celebrating" : "idle");
      return;
    }

    currentSegmentsRef.current = segments;
    currentIndexRef.current = idx;
    setSpeechSegments(segments);
    setSpeechIndex(idx);
    setIsSpeaking(true);
    setKlintMood(overrideMood || (isHiredRef.current ? "celebrating" : "talking"));

    const text = segments[idx];
    const hasTTS =
      voiceEnabledRef.current &&
      typeof window !== "undefined" &&
      "speechSynthesis" in window;

    // Estimated reading fallback duration (ensures silent mode or TTS hiccups still flow smoothly)
    const fallbackMs = Math.max(2400, Math.min(7200, text.length * 46 + 900));

    if (hasTTS) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1.02;
        utter.pitch = 1.0;

        let advanced = false;
        const advanceOnce = () => {
          if (advanced || sessionId !== speechSessionRef.current) return;
          advanced = true;
          if (segmentTimerRef.current) {
            clearTimeout(segmentTimerRef.current);
            segmentTimerRef.current = null;
          }
          // Brief natural breath pause between sentences
          segmentTimerRef.current = setTimeout(() => {
            playSegmentAt(segments, idx + 1, sessionId, overrideMood);
          }, 220);
        };

        utter.onend = advanceOnce;
        utter.onerror = () => {
          // If browser blocks TTS or errors, gracefully animate on visual reading timer
          if (advanced || sessionId !== speechSessionRef.current) return;
          if (segmentTimerRef.current) clearTimeout(segmentTimerRef.current);
          segmentTimerRef.current = setTimeout(advanceOnce, fallbackMs);
        };

        // Safety watchdog in case a browser speech engine hangs without firing onend
        segmentTimerRef.current = setTimeout(advanceOnce, Math.max(fallbackMs + 4500, 12000));
        window.speechSynthesis.speak(utter);
        return;
      } catch {
        // Fall through to timed reading mode
      }
    }

    // Muted / visual-only reading cadence so Klint STILL animates up to the end!
    segmentTimerRef.current = setTimeout(() => {
      playSegmentAt(segments, idx + 1, sessionId, overrideMood);
    }, fallbackMs);
  }, []);

  const startSpokenResponse = useCallback(
    (rawText, overrideMood = null) => {
      lastSpokenRawRef.current = rawText;
      speechSessionRef.current += 1;
      const sessionId = speechSessionRef.current;

      if (segmentTimerRef.current) {
        clearTimeout(segmentTimerRef.current);
        segmentTimerRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      const segments = buildSpokenSegments(rawText);
      playSegmentAt(segments, 0, sessionId, overrideMood);
    },
    [playSegmentAt]
  );

  const handleSkipNextSegment = useCallback(() => {
    const nextIdx = currentIndexRef.current + 1;
    const segments = currentSegmentsRef.current;
    if (nextIdx >= segments.length) {
      stopSpeech();
      return;
    }
    speechSessionRef.current += 1;
    const sessionId = speechSessionRef.current;
    if (segmentTimerRef.current) clearTimeout(segmentTimerRef.current);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    playSegmentAt(segments, nextIdx, sessionId);
  }, [playSegmentAt, stopSpeech]);

  const handleReplaySpeech = useCallback(() => {
    if (lastSpokenRawRef.current) {
      startSpokenResponse(lastSpokenRawRef.current);
    }
  }, [startSpokenResponse]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (segmentTimerRef.current) clearTimeout(segmentTimerRef.current);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const applyScoreBoost = useCallback((boost) => {
    if (!boost) return;
    setScorecard((prev) => ({
      frontend: clampScore(prev.frontend + (boost.frontend || 0)),
      backend: clampScore(prev.backend + (boost.backend || 0)),
      velocity: clampScore(prev.velocity + (boost.velocity || 0)),
      culture: clampScore(prev.culture + (boost.culture || 0)),
    }));
  }, []);

  const registerClue = useCallback(
    (clueId, clueTitle, boost) => {
      if (!clueId) return;
      setDiscoveredClues((prev) => {
        if (prev.includes(clueId)) return prev;
        applyScoreBoost(boost);
        showToast("Evidence Unlocked", clueTitle, "🔎");
        return [...prev, clueId];
      });
    },
    [applyScoreBoost, showToast]
  );

  const handleSelectStation = useCallback(
    (nextMode) => {
      if (!hasEntered) setHasEntered(true);
      setMode(nextMode);
      setHoveredStation(null);

      if (nextMode !== "seated" && nextMode !== "explore") {
        setIsChatOpen(false);
      }

      const station = STATIONS.find((s) => s.id === nextMode);
      if (station) {
        registerClue(station.clueId, station.clueTitle, station.scoreBoost);
      }
    },
    [hasEntered, registerClue]
  );

  const handleAskQuestion = useCallback(
    (promptText, roundMeta = null) => {
      if (!promptText?.trim()) return;
      stopSpeech();
      setHasEntered(true);
      setMode("seated");
      setKlintMood("thinking");

      const userMsg = {
        id: `u-${Date.now()}`,
        role: "user",
        content: promptText,
      };
      setMessages((prev) => [...prev, userMsg]);

      setTimeout(() => {
        const res = getKlintResponse(promptText);
        const botMsg = {
          id: `a-${Date.now() + 1}`,
          role: "assistant",
          content: res.text,
          quickActions: res.quickActions || [],
        };

        setMessages((prev) => [...prev, botMsg]);

        if (!isChatOpenRef.current) {
          setUnreadCount((c) => c + 1);
        }

        // Start voicing out & animating the FULL response segment-by-segment!
        startSpokenResponse(res.text);

        if (roundMeta) {
          setCompletedRounds((prev) =>
            prev.includes(roundMeta.id) ? prev : [...prev, roundMeta.id]
          );
          registerClue(roundMeta.clueId, roundMeta.clueTitle, roundMeta.scoreBoost);
        } else {
          applyScoreBoost({ culture: 6, frontend: 4, backend: 4 });
        }
      }, 420);
    },
    [stopSpeech, startSpokenResponse, registerClue, applyScoreBoost]
  );

  const handleCoffeeClick = useCallback(() => {
    const quip = COFFEE_QUIPS[coffeeIdxRef.current % COFFEE_QUIPS.length];
    coffeeIdxRef.current += 1;
    showToast("Klint's Coffee Mug", quip, "☕");
    registerClue("coffee-egg", "Cebu Coffee Fuel Easter Egg", { culture: 10 });
    startSpokenResponse(quip, "coffee");
  }, [showToast, registerClue, startSpokenResponse]);

  const handleStampHired = useCallback(() => {
    setIsHired(true);
    isHiredRef.current = true;
    triggerConfetti({
      count: 130,
      colors: ["#D97757", "#F59E0B", "#4ADE80", "#61DAFB", "#F3F1EC"],
    });
    showToast(
      "Offer Accepted!",
      "Klint is celebrating! Download his CV or send him an email to connect.",
      "🎉"
    );
    startSpokenResponse(
      "Woohoo! Offer accepted! Thank you so much — let's build something awesome together. Grab my resume or send me an email anytime!",
      "celebrating"
    );
  }, [showToast, startSpokenResponse]);

  const handleToggleVoice = useCallback(() => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      voiceEnabledRef.current = next;
      if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      showToast(
        next ? "Voice Enabled" : "Voice Muted",
        next ? "Klint will voice out all his answers aloud." : "Voice muted (speech bubble still animates).",
        next ? "🔊" : "🔇"
      );
      return next;
    });
  }, [showToast]);

  const handleJDEvaluationComplete = useCallback(
    (result) => {
      setJdReport(result);
      setScorecard(result.scorecard);
      setHasEntered(true);
      setMode("seated");
      setDiscoveredClues((prev) =>
        prev.includes("jd-evaluated") ? prev : [...prev, "jd-evaluated"]
      );

      // Log evaluation into Messenger Chat Drawer history
      setMessages((prev) => [
        ...prev,
        {
          id: `jd-u-${Date.now()}`,
          role: "user",
          content: `Submitted Job Description: ${result.roleTitle}`,
        },
        {
          id: `jd-a-${Date.now() + 1}`,
          role: "assistant",
          content: result.markdownSummary,
          quickActions: [
            { label: "📄 Download Resume (PDF)", link: "/Klint_Ruales_Resume.pdf" },
            { label: "📧 Email Klint", link: `mailto:${KLINT_PROFILE.email}` },
          ],
        },
      ]);

      showToast(
        `JD Evaluated — ${result.matchScore}% Match`,
        `${result.roleTitle}: ${result.verdictTier}`,
        "📋"
      );

      // Have Klint immediately voice out his tailored pitch live!
      startSpokenResponse(result.spokenPitch);
    },
    [showToast, startSpokenResponse]
  );

  const handleTogglePerspective = useCallback(
    (next) => {
      setCameraPerspective((prev) => {
        const resolved = next || (prev === "first" ? "third" : "first");
        if (resolved !== prev) {
          showToast(
            resolved === "first" ? "First-Person View (1P)" : "Third-Person View (3P)",
            resolved === "first"
              ? "Looking directly through the Interviewer's eyes."
              : "Controlling your Interviewer avatar in 3rd-person.",
            resolved === "first" ? "👁️" : "🎥"
          );
        }
        return resolved;
      });
    },
    [showToast]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || isTypingInput;

      if (e.key === "Escape") {
        if (isWriteRecOpen) {
          setIsWriteRecOpen(false);
        } else if (isTelemetryOpen) {
          setIsTelemetryOpen(false);
        } else if (isJDEvalOpen) {
          setIsJDEvalOpen(false);
        } else if (isVerdictOpen) {
          setIsVerdictOpen(false);
        } else if (isChatOpen) {
          setIsChatOpen(false);
        } else if (hasEntered && mode !== "explore") {
          setMode("explore");
          stopSpeech();
        }
      } else if (
        !inField &&
        hasEntered &&
        !isJDEvalOpen &&
        !isWriteRecOpen &&
        !isTelemetryOpen &&
        e.key.toLowerCase() === "v"
      ) {
        handleTogglePerspective();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    hasEntered,
    mode,
    isWriteRecOpen,
    isTelemetryOpen,
    isJDEvalOpen,
    isVerdictOpen,
    isChatOpen,
    isTypingInput,
    stopSpeech,
    handleTogglePerspective,
  ]);

  const handleEnterStudio = (initialMode) => {
    setHasEntered(true);
    handleSelectStation(initialMode);
    if (initialMode === "seated") {
      startSpokenResponse(INITIAL_WELCOME_TEXT);
    }
  };

  const currentSpeechText = speechSegments[speechIndex] || "";

  // Show Klint's live speech bubble while seated, or whenever Klint is actively speaking/reacting!
  const showSpeechBubble =
    hasEntered &&
    !isVerdictOpen &&
    !isJDEvalOpen &&
    !isWriteRecOpen &&
    !isTelemetryOpen &&
    ((mode === "seated" && !isChatOpen) || isSpeaking || klintMood === "coffee");

  if (contextLost) {
    return (
      <div className="w-screen h-screen bg-[#181816] text-[#F3F1EC] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="claude-font-serif text-3xl font-semibold">
            3D Graphics Context Paused
          </h1>
          <p className="text-sm text-[#A09C92]">
            Your device freed WebGL graphics memory. Tap below to reload the 3D studio or grab Klint&apos;s resume directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D97757] hover:bg-[#C26547] text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              <FaRedoAlt size={12} />
              <span>Reload 3D Studio</span>
            </button>
            <a
              href={KLINT_PROFILE.resumeUrl}
              download="Klint_Morales_Ruales_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#242320] hover:bg-[#312F2A] border border-[#3B3832] text-[#F3F1EC] font-semibold text-sm transition-colors"
            >
              <FaDownload size={12} />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WebGLErrorBoundary>
      <div className="relative w-screen h-screen overflow-hidden bg-[#121110] text-[#F3F1EC] select-none">
        {/* LIVE 3D WEBGL INTERVIEW STUDIO */}
        <InterviewScene
          mode={mode}
          cameraPerspective={cameraPerspective}
          hasEntered={hasEntered}
          klintMood={klintMood}
          speechText={currentSpeechText}
          speechSegmentIndex={speechIndex}
          speechTotalSegments={speechSegments.length}
          isSpeaking={isSpeaking}
          showSpeechBubble={showSpeechBubble}
          onSkipNext={handleSkipNextSegment}
          onReplaySpeech={handleReplaySpeech}
          onExpandChat={() => setIsChatOpen(true)}
          isCelebrating={isHired}
          hoveredStation={hoveredStation}
          setHoveredStation={setHoveredStation}
          onSelectStation={handleSelectStation}
          onCoffeeClick={handleCoffeeClick}
          discoveredClues={discoveredClues}
          isTypingInput={isTypingInput}
          onContextLost={() => setContextLost(true)}
        />

        {/* CINEMATIC TITLE OVERLAY (Before Entering) */}
        {!hasEntered && (
          <div className="fixed inset-0 z-40 bg-gradient-to-t from-[#121110]/92 via-[#121110]/45 to-[#121110]/65 flex flex-col items-center justify-end sm:justify-center p-6 text-center">
            <div className="max-w-xl space-y-5 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181816]/85 border border-[#D97757]/50 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#D97757] animate-pulse" />
                <span className="claude-font-mono text-[11px] uppercase tracking-widest text-[#E88B6C]">
                  Interactive WebGL Interview Experience
                </span>
              </div>

              <h1 className="claude-font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-[#F3F1EC] drop-shadow-md">
                Interview Klint.
              </h1>

              <p className="text-sm sm:text-base text-[#D8D3C8] max-w-md mx-auto leading-relaxed">
                Step into the interviewer&apos;s seat inside Klint&apos;s 3D studio. Talk to him face-to-face, inspect his shipped apps &amp; tech stack, and decide if he&apos;s your next Software Engineer.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => handleEnterStudio("seated")}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D97757] hover:bg-[#C26547] text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(217,119,87,0.4)] transition-all cursor-pointer"
                >
                  <FaPlay size={11} />
                  <span>Take Your Seat &amp; Interview</span>
                </button>

                <button
                  onClick={() => handleEnterStudio("explore")}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#181816]/88 hover:bg-[#272622] border border-[#3B3832] hover:border-[#D97757]/60 text-[#F3F1EC] font-medium text-sm flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
                >
                  <FaCompass size={13} className="text-[#D97757]" />
                  <span>Explore Studio First</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-[#A09C92]">
                <a
                  href="/Klint_Ruales_Resume.pdf"
                  download="Klint_Morales_Ruales_Resume.pdf"
                  className="inline-flex items-center gap-1.5 hover:text-[#D97757] transition-colors"
                >
                  <FaDownload size={11} />
                  <span>Download CV (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* IN-GAME HUD */}
        {hasEntered && (
          <GameHUD
            mode={mode}
            cameraPerspective={cameraPerspective}
            onTogglePerspective={handleTogglePerspective}
            onSelectMode={handleSelectStation}
            scorecard={scorecard}
            discoveredClues={discoveredClues}
            voiceEnabled={voiceEnabled}
            onToggleVoice={handleToggleVoice}
            onOpenVerdict={() => setIsVerdictOpen(true)}
            onOpenJDEvaluator={() => setIsJDEvalOpen(true)}
            jdReport={jdReport}
            isHired={isHired}
            toast={toast}
          />
        )}

        {/* MESSENGER CHAT HEAD + POP-UP DRAWER + MINIMAL SEATED BAR */}
        {hasEntered && (
          <DialogueBox
            mode={mode}
            messages={messages}
            klintMood={klintMood}
            completedRounds={completedRounds}
            isChatOpen={isChatOpen}
            onToggleChat={() => setIsChatOpen((o) => !o)}
            unreadCount={unreadCount}
            onAskQuestion={handleAskQuestion}
            onStandUp={() => {
              stopSpeech();
              setIsChatOpen(false);
              setMode("explore");
            }}
            onOpenVerdict={() => setIsVerdictOpen(true)}
            onInputFocusChange={setIsTypingInput}
          />
        )}

        {/* STATION INSPECTION SIDE DRAWER */}
        {hasEntered && (
          <StationModal
            stationId={mode}
            onClose={() => setMode("explore")}
            onAskKlint={(prompt) => handleAskQuestion(prompt)}
            onOpenWriteRec={() => setIsWriteRecOpen(true)}
            onOpenTelemetry={() => setIsTelemetryOpen(true)}
            latestSubmittedRec={latestSubmittedRec}
          />
        )}

        {/* WRITE RECOMMENDATION MODAL (Live Google Sheets Sync, lazy-loaded) */}
        {isWriteRecOpen && (
          <Suspense fallback={null}>
            <WriteRecommendationModal
              isOpen={isWriteRecOpen}
              onClose={() => setIsWriteRecOpen(false)}
              onSubmitted={(newRec) => {
                setLatestSubmittedRec(newRec);
                showToast(
                  "Recommendation Posted!",
                  `Thank you ${newRec?.name || ""}! Your endorsement is now live on the studio wall.`,
                  "⭐"
                );
              }}
            />
          </Suspense>
        )}

        {/* BROWSER TELEMETRY & SECURITY AUDIT MODAL (lazy-loaded) */}
        {isTelemetryOpen && (
          <Suspense fallback={null}>
            <TelemetryModal
              isOpen={isTelemetryOpen}
              onClose={() => setIsTelemetryOpen(false)}
            />
          </Suspense>
        )}

        {/* FINAL VERDICT / HIRED MODAL */}
        <VerdictModal
          isOpen={isVerdictOpen}
          onClose={() => setIsVerdictOpen(false)}
          scorecard={scorecard}
          discoveredClues={discoveredClues}
          jdReport={jdReport}
          isHired={isHired}
          onStampHired={handleStampHired}
        />

        {/* AUTOMATED JOB DESCRIPTION EVALUATOR MODAL */}
        <JobEvaluatorModal
          isOpen={isJDEvalOpen}
          onClose={() => setIsJDEvalOpen(false)}
          existingReport={jdReport}
          onEvaluationComplete={handleJDEvaluationComplete}
          onOpenVerdict={() => setIsVerdictOpen(true)}
        />
      </div>
    </WebGLErrorBoundary>
  );
}
