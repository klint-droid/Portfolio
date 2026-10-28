import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaTimes,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaQuoteLeft,
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaHandshake,
} from "react-icons/fa";
import { triggerConfetti } from "../utils/confetti";
import {
  submitRecommendation,
  getInitials,
  getAvatarColor,
} from "../services/recommendationsApi";

const RELATIONSHIP_OPTIONS = [
  "Colleague / Teammate",
  "Classmate / University Peer",
  "Project Partner",
  "Client / Freelance",
  "Mentor / Advisor",
  "Friend / Professional Peer",
];

export default function WriteRecommendationModal({ isOpen, onClose, onSubmitted }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [relationship, setRelationship] = useState(RELATIONSHIP_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  const previewInitials = getInitials(name || "Your Name");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !role.trim() || !message.trim()) {
      setErrorMsg("Please fill in your name, role, and message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newRec = await submitRecommendation({
        name: name.trim(),
        role: role.trim(),
        company: company.trim(),
        relationship,
        text: message.trim(),
      });

      setIsSuccess(true);
      triggerConfetti();

      if (onSubmitted) {
        onSubmitted(newRec);
      }

      setTimeout(() => {
        setIsSuccess(false);
        setName("");
        setRole("");
        setCompany("");
        setMessage("");
        onClose();
      }, 2400);
    } catch (err) {
      setErrorMsg("Failed to submit recommendation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setIsSuccess(false);
    setErrorMsg("");
    onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-xl my-auto bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-[var(--sidebar-bg)] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="claude-font-mono text-xs font-semibold text-[#D97757] uppercase tracking-wider">
                Peer Endorsement
              </span>
            </div>
            <h2 className="claude-font-serif text-lg font-semibold text-[var(--text-primary)] mt-0.5">
              Write a Recommendation for Klint
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center text-3xl animate-bounce">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] claude-font-serif">
                Thank You So Much!
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
                Your recommendation has been recorded and will appear on the portfolio!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg text-xs claude-font-mono bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
                  {errorMsg}
                </div>
              )}

              {/* Name & Role Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs claude-font-mono font-medium text-[var(--text-secondary)] mb-1">
                    Your Name <span className="text-[#D97757]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--text-muted)]">
                      <FaUser size={12} />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--text-primary)] focus:outline-none focus:border-[#D97757] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs claude-font-mono font-medium text-[var(--text-secondary)] mb-1">
                    Your Role / Title <span className="text-[#D97757]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--text-muted)]">
                      <FaBriefcase size={12} />
                    </span>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Software Engineer / Lead"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--text-primary)] focus:outline-none focus:border-[#D97757] transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Company & Relationship Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs claude-font-mono font-medium text-[var(--text-secondary)] mb-1">
                    Company / School <span className="text-[var(--text-muted)] font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--text-muted)]">
                      <FaBuilding size={12} />
                    </span>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. USJ-R / Kyocera"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--text-primary)] focus:outline-none focus:border-[#D97757] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs claude-font-mono font-medium text-[var(--text-secondary)] mb-1">
                    Relationship
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--text-muted)]">
                      <FaHandshake size={12} />
                    </span>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--text-primary)] focus:outline-none focus:border-[#D97757] transition-colors cursor-pointer"
                    >
                      {RELATIONSHIP_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs claude-font-mono font-medium text-[var(--text-secondary)]">
                    Your Recommendation <span className="text-[#D97757]">*</span>
                  </label>
                  <span className="text-[10px] claude-font-mono text-[var(--text-muted)]">
                    {message.length}/500 chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share how Klint approached problem solving, teamwork, dedication, design, or technical accomplishments..."
                  className="w-full p-3 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--text-primary)] focus:outline-none focus:border-[#D97757] transition-colors resize-none leading-relaxed"
                  required
                />
              </div>

              {/* Live Card Preview Box */}
              <div className="pt-2">
                <span className="text-[11px] claude-font-mono text-[var(--text-muted)] block mb-1.5 flex items-center gap-1">
                  <FaQuoteLeft size={10} className="text-[#D97757]" /> Live Card Preview
                </span>
                <div className="p-3.5 rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--sidebar-bg)]/60">
                  <p className="claude-font-serif text-xs italic text-[var(--text-secondary)] leading-relaxed mb-3">
                    "{message.trim() ? message : "Your recommendation text will appear right here in this polished card format..."}"
                  </p>
                  <div className="flex items-center gap-2.5 pt-2.5 border-t border-[var(--border-subtle)]">
                    <div
                      className="w-7 h-7 rounded-full bg-[#D97757]/15 border border-[#D97757]/30 text-[#D97757] claude-font-mono text-[11px] font-bold flex items-center justify-center"
                    >
                      {previewInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="claude-font-serif text-xs font-semibold text-[var(--text-primary)] truncate">
                          {name.trim() || "Your Name"}
                        </h4>
                        <span className="text-[9px] claude-font-mono px-1.5 py-0.2 rounded bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20">
                          {relationship}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] truncate">
                        {role.trim() || "Your Role"}
                        {company.trim() ? ` • ${company.trim()}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs claude-font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs claude-font-mono font-medium rounded-lg bg-[#D97757] hover:bg-[#C26547] text-white flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" size={12} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={11} />
                      Publish Recommendation
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
