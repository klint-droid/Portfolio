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
    }, 900);
  };

  const handleSelectSample = (qText) => {
    setQuestion(qText);
  };

  const handleReset = () => {
    setQuestion("");
    setAnswer(null);
  };

  return (
    <section id="book-of-answers" className="scroll-mt-20 bento-card relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number">08 // BOOK OF ANSWERS</span>
          <span className="font-mono text-xs font-bold text-blue-500 flex items-center gap-1">
            <FaBookOpen size={12} /> Oracle
          </span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-semibold">
          Developer Oracle 🔮
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-mono">
          Have a burning question about code, career, or hiring Klint? Type your question below and consult the mystical developer book of answers!
        </p>

        {/* Question Form */}
        <form onSubmit={handleConsult} className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything... e.g., Should I hire Klint Ruales?"
              className="w-full py-2.5 px-3.5 pr-10 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50 text-gray-900 dark:text-white font-mono text-xs focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
            {question && (
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-mono text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sample Chips */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="text-gray-400 font-medium">Try asking:</span>
            {sampleQuestions.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="px-2 py-0.5 rounded bg-gray-100 dark:bg-[#18181b] hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-gray-200 dark:border-[#27272a] text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all text-left truncate max-w-[200px]"
              >
                "{sample}"
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!question.trim() || isRevealing}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
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
          <div className="mt-2 p-4 rounded-xl border border-blue-500/40 bg-blue-50/30 dark:bg-blue-950/20 animate-fade-in-up flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <HiSparkles size={12} /> The Book Speaks
              </span>
              <span>Answer #{(history.length % 99) + 1}</span>
            </div>

            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white leading-relaxed">
              "{answer}"
            </p>

            <div className="pt-2 border-t border-blue-200 dark:border-blue-900/50 flex items-center justify-between text-[10px] font-mono text-gray-500 dark:text-gray-400">
              <span className="italic">Question: "{question}"</span>
              <button
                onClick={handleReset}
                className="text-blue-500 hover:underline font-semibold"
              >
                Ask another
              </button>
            </div>
          </div>
        )}

        {/* History log */}
        {history.length > 1 && (
          <div className="pt-3 border-t border-gray-200 dark:border-[#27272a] font-mono text-[11px]">
            <span className="text-gray-400 font-semibold mb-2 block text-[10px] uppercase">
              Recent Consultations
            </span>
            <div className="flex flex-col gap-1.5">
              {history.slice(1, 3).map((item, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-start justify-between gap-2 p-2 rounded bg-gray-50 dark:bg-[#18181b] border border-gray-200/50 dark:border-[#27272a]/50 text-gray-600 dark:text-gray-400"
                >
                  <span className="truncate">Q: "{item.q}"</span>
                  <span className="text-blue-500 font-semibold shrink-0">→ "{item.a}"</span>
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
