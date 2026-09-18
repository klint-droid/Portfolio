import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FaQuoteLeft,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
  FaCheckCircle,
} from "react-icons/fa";
import {
  fetchRecommendations,
  DEFAULT_RECOMMENDATIONS,
} from "../services/recommendationsApi";
import WriteRecommendationModal from "./WriteRecommendationModal";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState(DEFAULT_RECOMMENDATIONS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const autoPlayRef = useRef(null);

  // Load recommendations from Google Sheet and LocalStorage
  const loadData = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const list = await fetchRecommendations();
      if (list && list.length > 0) {
        setRecommendations(list);
      }
    } catch (e) {
      console.warn("Could not load recommendations:", e);
    } finally {
      if (showRefreshIndicator) {
        setTimeout(() => setIsRefreshing(false), 600);
      }
    }
  }, []);

  useEffect(() => {
    loadData();

    // Listen for locally added recommendations from modal or other components
    const handleRecAdded = (event) => {
      const newRec = event.detail;
      if (newRec) {
        setRecommendations((prev) => [newRec, ...prev.filter((x) => x.id !== newRec.id)]);
        setActiveIndex(0);
      }
    };

    window.addEventListener("recommendation-added", handleRecAdded);
    return () => window.removeEventListener("recommendation-added", handleRecAdded);
  }, [loadData]);

  // Ensure activeIndex is within bounds if an item was deleted
  useEffect(() => {
    if (activeIndex >= recommendations.length && recommendations.length > 0) {
      setActiveIndex(0);
    }
  }, [recommendations.length, activeIndex]);

  // Autoplay carousel every 7 seconds when not hovered
  useEffect(() => {
    if (recommendations.length <= 1 || isPaused || isModalOpen) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % recommendations.length);
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [recommendations.length, isPaused, isModalOpen]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % recommendations.length);
  };

  const handleSubmitted = (newRec) => {
    setRecommendations((prev) => [newRec, ...prev.filter((x) => x.id !== newRec.id)]);
    setActiveIndex(0);
  };

  const current = recommendations[activeIndex] || recommendations[0];

  return (
    <>
      <section
        id="recommendations"
        className="scroll-mt-20 bento-card relative group/section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Bento Header */}
        <div className="bento-card-header flex-wrap gap-2">
          <div className="bento-card-title">
            <span className="section-number">06 // RECOMMENDATIONS</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {recommendations.length} Endorsement{recommendations.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Controls: Refresh & Add */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadData(true)}
              title="Sync latest from Google Sheets"
              className="p-1.5 text-xs text-gray-400 hover:text-blue-500 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Refresh recommendations"
            >
              <FaSyncAlt className={isRefreshing ? "animate-spin text-blue-500" : ""} size={12} />
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm shadow-blue-500/20 cursor-pointer"
            >
              <FaPlus size={10} />
              <span>Write One</span>
            </button>
          </div>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative min-h-[175px] flex flex-col justify-between p-5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50 backdrop-blur-sm transition-all duration-300">
          {/* Decorative subtle quotation icon */}
          <div className="absolute top-3 right-4 text-gray-200 dark:text-zinc-800 pointer-events-none">
            <FaQuoteLeft size={36} />
          </div>

          {/* Recommendation Text */}
          <div className="relative z-10 mb-4">
            <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
              "{current?.text}"
            </p>
          </div>

          {/* Author Details & Badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200 dark:border-[#27272a]">
            <div className="flex items-center gap-3 min-w-0">
              {/* Initials Avatar */}
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${
                  current?.color || "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-500"
                } border font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-sm`}
              >
                {current?.initials || "??"}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-mono text-xs font-bold text-gray-900 dark:text-white truncate">
                    {current?.name}
                  </h3>
                  {current?.relationship && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                      {current.relationship}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {current?.role}
                  {current?.company ? ` • ${current.company}` : ""}
                </p>
              </div>
            </div>

            {/* Verification / Source Pill */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400 dark:text-zinc-500">
              <FaCheckCircle className="text-emerald-500" size={11} />
              <span>{current?.date || "Verified Peer"}</span>
            </div>
          </div>
        </div>

        {/* Navigation Footer: Prev/Next and Dots */}
        <div className="flex items-center justify-between mt-4">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Previous recommendation"
          >
            <FaChevronLeft size={11} />
          </button>

          {/* Carousel Dots */}
          <div className="flex items-center gap-1.5">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === index
                    ? "w-5 h-1.5 bg-blue-500"
                    : "w-1.5 h-1.5 bg-gray-300 dark:bg-[#27272a] hover:bg-gray-400 dark:hover:bg-zinc-600"
                }`}
                aria-label={`View recommendation ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Next recommendation"
          >
            <FaChevronRight size={11} />
          </button>
        </div>
      </section>

      {/* Write Recommendation Modal rendered as sibling / via createPortal */}
      <WriteRecommendationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={handleSubmitted}
      />
    </>
  );
}