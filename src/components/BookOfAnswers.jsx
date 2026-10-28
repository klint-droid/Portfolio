import React, { useState } from "react";
import { FaBookOpen, FaMagic, FaSyncAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const BookOfAnswers = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [history, setHistory] = useState([]);

  const answersList = [
    "Yes — but make sure to push to a feature branch first.",
    "Without a doubt. The compiler smiles upon you today.",
    "Hire Klint immediately — your engineering team will thank you.",
    "Outlook good. 100% test coverage lies ahead.",
    "Signs point to YES. Merging directly without conflicts.",
    "Refactor your code, drink coffee, and ask again.",
    "It is certain. Success is in the next commit.",
    "404 Error: Doubt not found. Proceed with confidence!",
    "The stars align — your pull request will be approved in record time.",
    "Definitely. Clean architecture brings eternal peace.",
    "Deploying on Friday? The Book says GO FOR IT!",
    "All indicators say YES. Klint is the developer you need.",
    "Better not tell you now... clear your cache first.",
    "Concentrate and ask again after a short git pull.",
    "My sources say YES. High performance is guaranteed."
  ];

  const sampleQuestions = [
    "Should I hire Klint Ruales for our team?",
    "Will my code build without bugs today?",
    "Is dark mode superior to light mode?"
  ];

  const handleConsult = (e) => {
    if (e) e.preventDefault();
    if (!question.trim()) return;

    setIsRevealing(true);
    setAnswer(null);

    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * answersList.length);
      const chosenAnswer = answersList[randomIdx];
      setAnswer(chosenAnswer);
      setIsRevealing(false);

      setHistory((prev) => [
        { q: question, a: chosenAnswer },
        ...prev.slice(0, 4)
      ]);
    }, 800);
  };

  const handleSelectSample = (qText) => {
    setQuestion(qText);
  };

  const handleReset = () => {
    setQuestion("");
    setAnswer(null);
  };

  return (
    <section id="book-of-answers" className="scroll-mt-20 bento-card relative overflow-hidden bg-[var(--card-bg)] border-[var(--border-color)]">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number claude-font-mono text-xs text-[#D97757]">08 // BOOK OF ANSWERS</span>
          <span className="claude-font-mono text-xs font-semibold text-[#D97757] flex items-center gap-1">
            <FaBookOpen size={12} /> Oracle
          </span>
        </div>
        <span className="claude-font-mono text-[10px] px-2 py-0.5 rounded bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20 font-semibold">
          Developer Oracle 🔮
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Have a question about code, architecture, or hiring Klint? Type your question below and consult the developer oracle!
        </p>

        {/* Question Form */}
        <form onSubmit={handleConsult} className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything... e.g., Should I hire Klint Ruales?"
              className="w-full py-2.5 px-3.5 pr-10 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[#D97757] transition-all placeholder:text-[var(--text-muted)]"
            />
            {question && (
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] claude-font-mono text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sample Chips */}
          <div className="flex flex-wrap items-center gap-1.5 claude-font-mono text-[10px]">
            <span className="text-[var(--text-muted)] font-medium">Try asking:</span>
            {sampleQuestions.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="px-2 py-0.5 rounded bg-[var(--sidebar-bg)] hover:bg-[var(--card-hover)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#D97757] transition-all text-left truncate max-w-[200px]"
              >
                "{sample}"
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!question.trim() || isRevealing}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#D97757] hover:bg-[#C26547] disabled:opacity-50 text-white claude-font-mono text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            {isRevealing ? (
              <>
                <FaSyncAlt size={12} className="animate-spin" />
                <span>Consulting the Book of Answers...</span>
              </>
            ) : (
              <>
                <FaMagic size={12} />
                <span>Seek Answer from the Book</span>
              </>
            )}
          </button>
        </form>

        {/* Answer Display */}
        {answer && (
          <div className="mt-2 p-4 rounded-xl border border-[#D97757]/40 bg-[#D97757]/5 animate-fade-in flex flex-col gap-2">
            <div className="flex items-center justify-between claude-font-mono text-[10px] text-[#D97757] font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <HiSparkles size={12} /> The Book Speaks
              </span>
              <span>Answer #{(history.length % 99) + 1}</span>
            </div>

            <p className="claude-font-serif text-base font-semibold text-[var(--text-primary)] leading-relaxed">
              "{answer}"
            </p>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] claude-font-mono text-[var(--text-muted)]">
              <span className="italic truncate max-w-[240px]">Question: "{question}"</span>
              <button
                onClick={handleReset}
                className="text-[#D97757] hover:underline font-semibold"
              >
                Ask another
              </button>
            </div>
          </div>
        )}

        {/* History log */}
        {history.length > 1 && (
          <div className="pt-3 border-t border-[var(--border-subtle)] claude-font-mono text-[11px]">
            <span className="text-[var(--text-muted)] font-semibold mb-2 block text-[10px] uppercase">
              Recent Consultations
            </span>
            <div className="flex flex-col gap-1.5">
              {history.slice(1, 3).map((item, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-start justify-between gap-2 p-2 rounded bg-[var(--sidebar-bg)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                >
                  <span className="truncate">Q: "{item.q}"</span>
                  <span className="text-[#D97757] font-semibold shrink-0">→ "{item.a}"</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookOfAnswers;
