import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FaQuoteLeft,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
  FaCheckCircle,
  FaLink,
  FaCheck,
} from "react-icons/fa";
import {
  fetchRecommendations,
  DEFAULT_RECOMMENDATIONS,
} from "../services/recommendationsApi";
import WriteRecommendationModal from "./WriteRecommendationModal";

export default function Recommendations({ initialOpen = false }) {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState(DEFAULT_RECOMMENDATIONS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const autoPlayRef = useRef(null);

  // Auto-open modal if navigated via direct URL (/recommend, /write-recommendation, ?recommend=true)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shouldOpen =
      initialOpen ||
      location.pathname === "/recommend" ||
      location.pathname === "/write-recommendation" ||
      params.get("recommend") === "true" ||
      params.get("write") === "true" ||
      location.hash === "#recommend" ||
      location.hash === "#write-recommendation";

    if (shouldOpen) {
      setIsModalOpen(true);
      setTimeout(() => {
        const el = document.getElementById("recommendations");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  }, [location, initialOpen]);

  // Copy direct review invite link to clipboard
  const handleCopyInviteLink = () => {
    const url = `${window.location.origin}/recommend`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    });
  };

  // Load recommendations from Google Sheet
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
        className="scroll-mt-20 bento-card relative group/section bg-[var(--card-bg)] border-[var(--border-color)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Bento Header */}
        <div className="bento-card-header flex-wrap gap-2">
          <div className="bento-card-title">
            <span className="section-number claude-font-mono text-xs text-[#D97757]">06 // RECOMMENDATIONS</span>
            <span className="text-[10px] claude-font-mono px-2 py-0.5 rounded-full bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20">
              {recommendations.length} Endorsement{recommendations.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Controls: Copy Invite Link, Refresh & Add */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyInviteLink}
              title="Copy direct invite URL"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs claude-font-mono text-[var(--text-secondary)] hover:text-[#D97757] rounded-lg border border-[var(--border-color)] hover:border-[#D97757]/50 bg-[var(--sidebar-bg)] transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <FaCheck size={10} className="text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <FaLink size={10} />
                  <span>Invite Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => loadData(true)}
              title="Refresh recommendations"
              className="p-1.5 text-xs text-[var(--text-muted)] hover:text-[#D97757] rounded-md hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
              aria-label="Refresh recommendations"
            >
              <FaSyncAlt className={isRefreshing ? "animate-spin text-[#D97757]" : ""} size={12} />
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs claude-font-mono font-medium rounded-lg bg-[#D97757] hover:bg-[#C26547] text-white transition-all shadow-xs cursor-pointer"
            >
              <FaPlus size={10} />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative min-h-[175px] flex flex-col justify-between p-5 rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] transition-all duration-300">
          {/* Decorative subtle quotation icon */}
          <div className="absolute top-3 right-4 text-[var(--border-color)] pointer-events-none opacity-40">
            <FaQuoteLeft size={36} />
          </div>

          {/* Recommendation Text */}
          <div className="relative z-10 mb-4">
            <p className="claude-font-serif text-base italic text-[var(--text-primary)] leading-relaxed font-normal">
              "{current?.text}"
            </p>
          </div>

          {/* Author Details & Badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 min-w-0">
              {/* Initials Avatar */}
              <div
                className="w-9 h-9 rounded-full bg-[#D97757]/15 border border-[#D97757]/30 text-[#D97757] claude-font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-xs"
              >
                {current?.initials || "??"}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="claude-font-serif text-sm font-semibold text-[var(--text-primary)] truncate">
                    {current?.name}
                  </h3>
                  {current?.relationship && (
                    <span className="text-[10px] claude-font-mono px-1.5 py-0.2 rounded bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20 shrink-0">
                      {current.relationship}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[var(--text-muted)] truncate">
                  {current?.role}
                  {current?.company ? ` • ${current.company}` : ""}
                </p>
              </div>
            </div>

            {/* Verification / Source Pill */}
            <div className="flex items-center gap-1.5 text-[11px] claude-font-mono text-[var(--text-muted)]">
              <FaCheckCircle className="text-emerald-500" size={11} />
              <span>{current?.date || "Verified Peer"}</span>
            </div>
          </div>
        </div>

        {/* Navigation Footer: Prev/Next and Dots */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
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
                    ? "w-5 h-1.5 bg-[#D97757]"
                    : "w-1.5 h-1.5 bg-[var(--border-color)] hover:bg-[#D97757]/50"
                }`}
                aria-label={`View recommendation ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
            aria-label="Next recommendation"
          >
            <FaChevronRight size={11} />
          </button>
        </div>
      </section>

      {/* Write Recommendation Modal */}
      <WriteRecommendationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={handleSubmitted}
      />
    </>
  );
}