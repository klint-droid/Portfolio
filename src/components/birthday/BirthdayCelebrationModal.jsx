import React, { useState, useEffect, useRef } from "react";
import {
  FaBirthdayCake,
  FaTimes,
  FaHeart,
  FaGift,
  FaCheck,
  FaPaperPlane,
  FaQrcode,
  FaSmile,
  FaInfoCircle,
  FaUserShield,
} from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { BIRTHDAY_CONFIG } from "../../data/birthdayConfig";
import { triggerConfetti } from "../../utils/confetti";
import {
  subscribeToBirthdayWishes,
  sendBirthdayWish,
} from "../../services/firebase";

const WISHES_STORAGE_KEY = "klint_birthday_wishes_v2";

export default function BirthdayCelebrationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("wishes"); // 'wishes' | 'gift'
  const [wishes, setWishes] = useState([]);

  // Form state
  const [formName, setFormName] = useState("");
  const [formRelation, setFormRelation] = useState("Friend");
  const [formEmoji, setFormEmoji] = useState("🎂");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedWish, setSubmittedWish] = useState(null);
  const [qrImageError, setQrImageError] = useState(false);

  const modalRef = useRef(null);

  // Load initial wishes from localStorage or fall back to sample config
  useEffect(() => {
    try {
      localStorage.removeItem("klint_birthday_wishes_list");
      const cached = localStorage.getItem(WISHES_STORAGE_KEY);
      if (cached) {
        setWishes(JSON.parse(cached));
      }
    } catch {
      setWishes([]);
    }
  }, []);

  // Real-time Firebase listener (stores wishes in memory/cache for Excel export without public display)
  useEffect(() => {
    if (isOpen) {
      triggerConfetti({ count: 50 });
      document.body.style.overflow = "hidden";

      const unsubscribe = subscribeToBirthdayWishes(
        (liveWishes) => {
          setWishes(liveWishes);
        },
        (error) => {
          console.warn("Firebase wishes sync:", error);
        }
      );

      return () => {
        document.body.style.overflow = "";
        if (typeof unsubscribe === "function") unsubscribe();
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // ESC key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Submit new wish to Firebase / Storage
  const handlePostWish = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: formName.trim(),
        relationship: formRelation,
        emoji: formEmoji,
        message: formMessage.trim(),
      };

      await sendBirthdayWish(payload);

      setSubmittedWish({
        ...payload,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });

      setFormMessage("");
      setFormName("");
      setIsSubmitting(false);
      triggerConfetti({ count: 80 });
    } catch (err) {
      console.error("Post wish error:", err);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentPayment = BIRTHDAY_CONFIG.paymentMethods[0];

  const relationOptions = [
    "Friend",
    "Dev Buddy",
    "Colleague",
    "Schoolmate",
    "Family",
    "Recruiter",
    "Supporter",
  ];

  const emojiOptions = ["🎂", "🎉", "🚀", "❤️", "🍻", "🍕", "✨", "🔥"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in-up"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl my-auto rounded-2xl bg-white dark:bg-[#121215] border border-amber-500/30 dark:border-amber-400/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Decorative Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 pb-4 border-b border-gray-100 dark:border-zinc-800/80 bg-gradient-to-b from-amber-500/5 to-transparent shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-lg shadow-amber-500/20 shrink-0">
                <img
                  src="1st.jpg"
                  alt={BIRTHDAY_CONFIG.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "2nd.jpg";
                  }}
                />
                <span className="absolute bottom-0 right-0 text-xs bg-amber-500 text-black px-1 font-mono font-bold">
                  🎂
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-gray-900 dark:text-white tracking-tight">
                    {BIRTHDAY_CONFIG.name}'s Birthday Hub
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    <MdCelebration /> Level Up
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5 max-w-md">
                  {BIRTHDAY_CONFIG.subheading}
                </p>
              </div>
            </div>

            {/* Action Buttons (Confetti + Close) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerConfetti({ count: 70 })}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-colors"
                title="Trigger Confetti Blast"
              >
                <span>🎉</span>
                <span>Confetti</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-800/80 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-gray-100 dark:border-zinc-800/60 font-mono text-xs">
            <button
              onClick={() => setActiveTab("wishes")}
              className={`flex-1 py-2.5 px-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "wishes"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/25"
                  : "bg-gray-100 dark:bg-zinc-800/60 text-gray-700 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
              }`}
            >
              <FaHeart className={activeTab === "wishes" ? "text-rose-900" : "text-rose-500"} />
              <span>Send Birthday Wish 💌</span>
            </button>

            <button
              onClick={() => setActiveTab("gift")}
              className={`flex-1 py-2.5 px-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "gift"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/25"
                  : "bg-gray-100 dark:bg-zinc-800/60 text-gray-700 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
              }`}
            >
              <FaGift className={activeTab === "gift" ? "text-indigo-900" : "text-amber-500"} />
              <span>Send a Gift / QR 🎁</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-rose-500 text-white font-bold tracking-wider uppercase">
                Twist
              </span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: SEND BIRTHDAY WISH */}
          {activeTab === "wishes" && (
            <div className="space-y-6">
              {/* Privacy Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <FaUserShield size={16} />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-gray-900 dark:text-zinc-200">
                    Private & Secure Birthday Greetings
                  </p>
                  <p className="text-gray-600 dark:text-zinc-400 text-[11px] mt-0.5">
                    Your wish will be sent directly and privately stored in Klint's birthday records.
                  </p>
                </div>
              </div>

              {/* Submitted Confirmation Card */}
              {submittedWish && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 border border-emerald-500/30 animate-fade-in-up">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <FaCheck size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-sm text-emerald-800 dark:text-emerald-300">
                        Thank You, {submittedWish.name}! 🎉
                      </h4>
                      <p className="text-xs text-gray-700 dark:text-zinc-300 mt-1 leading-relaxed">
                        Your birthday wish was successfully sent and safely stored for Klint. Thank you for celebrating!
                      </p>
                      <div className="mt-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-500/20 text-xs text-gray-800 dark:text-zinc-200 italic font-sans flex items-center gap-2">
                        <span>{submittedWish.emoji}</span>
                        <span className="truncate">"{submittedWish.message}"</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Leave a Wish Form */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900/70 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-zinc-200 flex items-center gap-2">
                    <FaPaperPlane className="text-amber-500" /> Leave a Birthday Wish
                  </h4>
                </div>

                <form onSubmit={handlePostWish} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Name Input */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-gray-500 dark:text-zinc-400 mb-1">
                        Your Name / Nickname *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={50}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Alex (or Dev Friend)"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-800/90 border border-gray-200 dark:border-zinc-700/80 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans"
                      />
                    </div>

                    {/* Relationship Badge */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-gray-500 dark:text-zinc-400 mb-1">
                        Relationship Tag
                      </label>
                      <select
                        value={formRelation}
                        onChange={(e) => setFormRelation(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-800/90 border border-gray-200 dark:border-zinc-700/80 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans cursor-pointer"
                      >
                        {relationOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Reaction Emoji Picker */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-500 dark:text-zinc-400 mb-1.5 flex items-center gap-1">
                      <FaSmile className="text-amber-500" /> Choose Your Vibe / Sticker
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {emojiOptions.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setFormEmoji(emoji)}
                          className={`w-9 h-9 text-base rounded-xl flex items-center justify-center transition-all ${
                            formEmoji === emoji
                              ? "bg-amber-500/20 border-2 border-amber-500 scale-110 shadow-sm"
                              : "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-mono uppercase text-gray-500 dark:text-zinc-400">
                        Birthday Wish / Greeting *
                      </label>
                    </div>
                    <textarea
                      required
                      rows={3}
                      maxLength={350}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Write your heartfelt birthday greeting, funny memory, or good wishes for Klint..."
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-zinc-800/90 border border-gray-200 dark:border-zinc-700/80 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-gray-400 dark:text-zinc-500">
                      {350 - formMessage.length} characters remaining
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formName.trim() || !formMessage.trim()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-sans font-semibold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                    >
                      <FaPaperPlane size={11} />
                      <span>{isSubmitting ? "Sending..." : "Send Birthday Wish"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: SEND A GIFT & BANK QR ("THE TWIST") */}
          {activeTab === "gift" && (
            <div className="space-y-6">
              {/* Friendly Intro Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                    <FaGift size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-gray-900 dark:text-white">
                      The Birthday Twist ☕🍕🍺
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 mt-1 leading-relaxed">
                      {BIRTHDAY_CONFIG.giftMessage}
                    </p>
                  </div>
                </div>
              </div>

              {/* GCash QR Card (Secure & Private - No Phone Number Exposed) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* QR Visual Container */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative p-3.5 rounded-2xl bg-white border-2 border-blue-500/50 shadow-lg text-center">
                      <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-blue-500" />
                      <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-blue-500" />
                      <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-blue-500" />
                      <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-blue-500" />

                      {!qrImageError && currentPayment.qrImage ? (
                        <img
                          src={currentPayment.qrImage}
                          alt="GCash QR Code"
                          onError={() => setQrImageError(true)}
                          className="w-48 sm:w-56 max-w-full h-auto max-h-72 object-contain rounded-xl"
                        />
                      ) : (
                        <div className="w-48 h-48 sm:w-52 sm:h-52 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-950 to-blue-950 rounded-xl p-4 text-white text-center">
                          <FaQrcode size={64} className="text-blue-400 mb-2 drop-shadow-md" />
                          <span className="font-mono text-xs font-bold tracking-wider text-blue-300">
                            GCash QR Code
                          </span>
                          <span className="font-mono text-[9px] text-zinc-300 mt-1">
                            Scan with GCash App
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 mt-2.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                            QRPh Ready
                          </span>
                        </div>
                      )}

                      <span className="block font-mono text-[10px] text-gray-700 mt-2 font-semibold">
                        Scan via GCash App
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-gray-400 dark:text-zinc-500 mt-2 text-center flex items-center gap-1">
                      <FaInfoCircle size={10} /> Supports camera & GCash scanner
                    </span>
                  </div>

                  {/* Account Information & Instructions */}
                  <div className="flex-1 w-full space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
                        Verified GCash Account
                      </span>
                      <h5 className="font-sans font-bold text-lg text-gray-900 dark:text-white mt-1.5">
                        {currentPayment.accountName}
                      </h5>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-2 text-xs">
                      <p className="font-mono text-gray-700 dark:text-zinc-300 text-[11px] leading-relaxed">
                        🔒 <strong>Privacy Protected:</strong> Direct QR scanning avoids sharing phone numbers across public networks.
                      </p>
                      <p className="text-gray-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                        {currentPayment.note}
                      </p>
                    </div>

                    {/* How to pay steps */}
                    <div className="space-y-1.5 font-mono text-[11px] text-gray-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] font-bold">1</span>
                        <span>Open GCash app & tap <strong>QR / Scan</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] font-bold">2</span>
                        <span>Point camera at the QR code above or upload screenshot</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] font-bold">3</span>
                        <span>Input any celebratory amount & confirm 🎉</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800/80 bg-gray-50/50 dark:bg-zinc-900/30 flex items-center justify-between text-xs text-gray-500 dark:text-zinc-500 shrink-0">
          <div className="flex items-center gap-2">
            <FaBirthdayCake className="text-amber-500" />
            <span>Celebrating Klint's Birthday</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-sans font-medium text-xs text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white bg-gray-200/70 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
