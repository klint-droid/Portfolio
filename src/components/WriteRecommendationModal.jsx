import React, { useState } from "react";
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

  if (!isOpen) return null;

  const previewInitials = getInitials(name || "Your Name");
  const previewColor = getAvatarColor(name || "Preview");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!role.trim()) {
      setErrorMsg("Please enter your role or title (e.g. Software Engineer, Student).");
      return;
    }
    if (!message.trim() || message.trim().length < 15) {
      setErrorMsg("Please write at least 15 characters for your recommendation.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitRecommendation({
        name,
        role,
        company,
        relationship,
        message,
      });

      if (result.success) {
        setIsSuccess(true);
        triggerConfetti({ count: 90 });
        if (onSubmitted) {
          onSubmitted(result.item);
        }
        setTimeout(() => {
          handleClose();
        }, 2200);
      }
    } catch {
      setErrorMsg("Failed to submit recommendation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setRole("");
    setCompany("");
    setRelationship(RELATIONSHIP_OPTIONS[0]);
    setMessage("");
    setIsSuccess(false);
    setErrorMsg("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-[#121215] border border-gray-200 dark:border-[#27272a] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#27272a] bg-gray-50/70 dark:bg-[#18181b]/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Peer Endorsement
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Google Sheets Live Sync
              </span>
            </div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
              Write a Recommendation for Klint
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-mono">
                Thank You So Much!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
                Your recommendation has been recorded and added to the portfolio. It is also synced with the live Google Sheet!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
                  {errorMsg}
                </div>
              )}

              {/* Name & Role Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <FaUser size={12} />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#18181b] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Role / Title <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <FaBriefcase size={12} />
                    </span>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Software Engineer / Student"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#18181b] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Company & Relationship Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company / School <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <FaBuilding size={12} />
                    </span>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. USJ-R / Tech Co."
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#18181b] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Relationship
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <FaHandshake size={12} />
                    </span>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#18181b] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                    >
                      {RELATIONSHIP_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-[#18181b]">
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
                  <label className="block text-xs font-mono font-medium text-gray-700 dark:text-gray-300">
                    Your Recommendation <span className="text-blue-500">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-gray-400">
                    {message.length}/500 chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share how Klint approached problem solving, teamwork, dedication, design, or technical accomplishments..."
                  className="w-full p-3 text-xs rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#18181b] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                  required
                />
              </div>

              {/* Live Card Preview Box */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-gray-400 block mb-1.5 flex items-center gap-1">
                  <FaQuoteLeft size={10} className="text-blue-500" /> Live Card Preview
                </span>
                <div className="p-3.5 rounded-xl border border-dashed border-gray-200 dark:border-[#27272a] bg-gray-50/40 dark:bg-[#18181b]/40">
                  <p className="text-xs italic text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    "{message.trim() ? message : "Your recommendation text will appear right here in this polished card format..."}"
                  </p>
                  <div className="flex items-center gap-2.5 pt-2.5 border-t border-gray-200 dark:border-[#27272a]">
                    <div
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${previewColor} border font-mono text-[11px] font-bold flex items-center justify-center`}
                    >
                      {previewInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-mono text-xs font-bold text-gray-900 dark:text-white truncate">
                          {name.trim() || "Your Name"}
                        </h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          {relationship}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
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
                  className="px-4 py-2 text-xs font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-mono font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
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
    </div>
  );
}
