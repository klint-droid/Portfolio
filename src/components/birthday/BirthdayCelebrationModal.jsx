import React, { useState, useEffect, useRef } from "react";
import {
  FaBirthdayCake,
  FaTimes,
  FaHeart,
  FaGift,
  FaCopy,
  FaCheck,
  FaPaperPlane,
  FaQrcode,
  FaExternalLinkAlt,
  FaSmile,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { BIRTHDAY_CONFIG } from "../../data/birthdayConfig";
import { triggerConfetti } from "../../utils/confetti";
import {
  isFirebaseConfigured,
  subscribeToBirthdayWishes,
  sendBirthdayWish,
  likeBirthdayWish,
} from "../../services/firebase";

const WISHES_STORAGE_KEY = "klint_birthday_wishes_v2";

export default function BirthdayCelebrationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("wishes"); // 'wishes' | 'gift'
  const [selectedPaymentId, setSelectedPaymentId] = useState("gcash");
  const [copiedField, setCopiedField] = useState(null);
  const [wishes, setWishes] = useState([]);
  const [hasLiked, setHasLiked] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formRelation, setFormRelation] = useState("Friend");
  const [formEmoji, setFormEmoji] = useState("🎂");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const modalRef = useRef(null);

  // Load initial wishes from localStorage or fall back to sample config
  useEffect(() => {
    try {
      // Clear legacy sample wishes if present
      localStorage.removeItem("klint_birthday_wishes_list");

      const cached = localStorage.getItem(WISHES_STORAGE_KEY);
      if (cached) {
        setWishes(JSON.parse(cached));
      } else {
        setWishes(BIRTHDAY_CONFIG.sampleWishes || []);
      }
    } catch {
      setWishes(BIRTHDAY_CONFIG.sampleWishes || []);
    }
  }, []);

  // Real-time Firebase Firestore listener & confetti when modal opens
  useEffect(() => {
    if (isOpen) {
      triggerConfetti({ count: 60 });
      document.body.style.overflow = "hidden";

      setIsSyncing(true);
      const unsubscribe = subscribeToBirthdayWishes(
        (liveWishes) => {
          setWishes(liveWishes);
          setIsSyncing(false);
        },
        (error) => {
          console.warn("Firebase live wishes listener:", error);
          setIsSyncing(false);
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

  // Copy to clipboard helper
  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2200);
  };

  // Submit new wish to Firebase Firestore
  const handlePostWish = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    setIsSubmitting(true);

    try {
      await sendBirthdayWish({
        name: formName,
        relationship: formRelation,
        emoji: formEmoji,
        message: formMessage,
      });

      setFormMessage("");
      setFormName("");
      setIsSubmitting(false);
      setSubmitSuccess(true);
      triggerConfetti({ count: 80 });
      setTimeout(() => setSubmitSuccess(false), 3500);
    } catch (err) {
      console.error("Post wish error:", err);
      setIsSubmitting(false);
    }
  };

  // Like a wish in Firebase Firestore
  const handleToggleLike = async (wishId) => {
    if (hasLiked[wishId]) return;

    setHasLiked((prev) => ({ ...prev, [wishId]: true }));
    triggerConfetti({ count: 25 });
    await likeBirthdayWish(wishId);
  };

  if (!isOpen) return null;

  const currentPayment =
    BIRTHDAY_CONFIG.paymentMethods.find((p) => p.id === selectedPaymentId) ||
    BIRTHDAY_CONFIG.paymentMethods[0];

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
              <span>Wishes Wall ({wishes.length})</span>
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
              <span>Send a Gift / QR</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-rose-500 text-white font-bold tracking-wider uppercase">
                Twist
              </span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: WISHES WALL */}
          {activeTab === "wishes" && (
            <div className="space-y-6">
              {/* Leave a Wish Form */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/70 border border-gray-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-zinc-200 flex items-center gap-2">
                    <FaPaperPlane className="text-amber-500" /> Leave a Birthday Wish
                  </h4>
                  {submitSuccess && (
                    <span className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1 animate-pulse">
                      <FaCheck /> Wish Posted to Wall!
                    </span>
                  )}
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
                        placeholder="e.g. Alex (or Secret Fan)"
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
                    <label className="block text-[11px] font-mono uppercase text-gray-500 dark:text-zinc-400 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={3}
                      maxLength={350}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Write a warm birthday wish, funny memory, or good vibes..."
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
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-sans font-semibold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                    >
                      <FaPaperPlane size={11} />
                      <span>{isSubmitting ? "Posting..." : "Post Birthday Wish"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Live Wishes Feed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-zinc-300">
                      Live Wishes Wall ({wishes.length})
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSyncing ? "bg-amber-400 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
                      {isSyncing ? "Connecting..." : isFirebaseConfigured() ? "Firebase Realtime" : "Firebase Ready"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-gray-400 dark:text-zinc-500">
                      Click ❤️ to like
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {wishes.length === 0 ? (
                    <div className="p-8 sm:p-10 rounded-2xl bg-gray-50/70 dark:bg-zinc-900/40 border border-dashed border-gray-200 dark:border-zinc-800 text-center flex flex-col items-center justify-center animate-fade-in-up">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl mb-3 shadow-inner">
                        🎂
                      </div>
                      <h5 className="font-sans font-bold text-sm text-gray-900 dark:text-white">
                        The Wishes Wall is Fresh & Clean!
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 max-w-sm leading-relaxed">
                        No wishes posted yet. Be the very first friend to write a warm birthday wish for Klint above! 🚀
                      </p>
                    </div>
                  ) : (
                    wishes.map((wish) => (
                      <div
                        key={wish.id}
                        className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800/80 hover:border-amber-500/40 transition-colors shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg shrink-0">
                              {wish.emoji || "🎂"}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-sans font-bold text-xs text-gray-900 dark:text-white">
                                  {wish.name}
                                </span>
                                {wish.relationship && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700">
                                    {wish.relationship}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-gray-400 dark:text-zinc-500 flex items-center gap-1 mt-0.5">
                                <FaClock size={9} /> {wish.timestamp || "Recently"}
                              </span>
                            </div>
                          </div>

                          {/* Like / Heart Reaction */}
                          <button
                            onClick={() => handleToggleLike(wish.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono transition-all ${
                              hasLiked[wish.id]
                                ? "bg-rose-500/20 text-rose-500 border border-rose-500/30"
                                : "bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 border border-gray-200 dark:border-zinc-700"
                            }`}
                            title="Like this wish"
                          >
                            <FaHeart
                              size={12}
                              className={hasLiked[wish.id] ? "text-rose-500 animate-bounce" : ""}
                            />
                            <span>{wish.likes || 1}</span>
                          </button>
                        </div>

                        <p className="text-xs text-gray-700 dark:text-zinc-300 mt-2.5 leading-relaxed font-sans pl-1">
                          "{wish.message}"
                        </p>
                      </div>
                    ))
                  )}
                </div>
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

              {/* Payment Method Switcher */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase text-gray-500 dark:text-zinc-400">
                  Select Payment / E-Wallet Option
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BIRTHDAY_CONFIG.paymentMethods.map((method) => {
                    const isSelected = selectedPaymentId === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPaymentId(method.id)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 dark:border-amber-400 shadow-sm"
                            : "bg-gray-50 dark:bg-zinc-900/60 border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <span className="block font-sans font-bold text-xs text-gray-900 dark:text-white">
                          {method.name}
                        </span>
                        <span className="block text-[10px] font-mono text-gray-500 dark:text-zinc-400 mt-0.5">
                          {method.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QR Code & Account Details Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* QR Visual Container */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative p-3.5 rounded-2xl bg-white border-2 border-amber-500/40 shadow-lg text-center">
                      {/* Corner viewfinder accents */}
                      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-500" />
                      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-500" />
                      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-500" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-500" />

                      {/* Actual QR Image or Aesthetic Fallback Pattern */}
                      {currentPayment.qrImage ? (
                        <img
                          src={currentPayment.qrImage}
                          alt={`${currentPayment.name} QR Code`}
                          className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-lg"
                        />
                      ) : (
                        <div className="w-44 h-44 sm:w-48 sm:h-48 flex flex-col items-center justify-center bg-gray-900 rounded-lg p-3 text-white">
                          <FaQrcode size={64} className="text-amber-400 mb-2" />
                          <span className="font-mono text-[11px] font-bold tracking-wider text-amber-300">
                            {currentPayment.name}
                          </span>
                          <span className="font-mono text-[9px] text-zinc-400 mt-1">
                            Scan via {currentPayment.name} App
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 mt-2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            QRPh Ready
                          </span>
                        </div>
                      )}

                      <span className="block font-mono text-[10px] text-gray-600 mt-2 font-semibold">
                        Scan to Send Love
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-gray-400 dark:text-zinc-500 mt-2 text-center flex items-center gap-1">
                      <FaInfoCircle size={10} /> Supports camera scan
                    </span>
                  </div>

                  {/* Account Information & Copy Buttons */}
                  <div className="flex-1 w-full space-y-3.5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                        {currentPayment.badge}
                      </span>
                      <h4 className="text-base font-bold font-sans text-gray-900 dark:text-white">
                        {currentPayment.name}
                      </h4>
                      {currentPayment.bankName && (
                        <span className="text-xs font-mono text-gray-500 dark:text-zinc-400">
                          Bank: {currentPayment.bankName}
                        </span>
                      )}
                    </div>

                    {/* Account Name */}
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-gray-500 dark:text-zinc-400">
                            Account Name
                          </span>
                          <span className="font-sans font-bold text-xs text-gray-900 dark:text-white">
                            {currentPayment.accountName}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(currentPayment.accountName, "name")}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white dark:bg-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-600 border border-gray-200 dark:border-zinc-600 text-gray-700 dark:text-zinc-200 transition-colors flex items-center gap-1"
                        >
                          {copiedField === "name" ? (
                            <>
                              <FaCheck className="text-emerald-500" />
                              <span className="text-emerald-500 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <FaCopy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Account Number / Handle */}
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-gray-500 dark:text-zinc-400">
                            Account / Mobile Number
                          </span>
                          <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400 tracking-wider">
                            {currentPayment.accountNumber}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(currentPayment.accountNumber, "number")}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-amber-500 hover:bg-amber-600 text-black shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                        >
                          {copiedField === "number" ? (
                            <>
                              <FaCheck className="text-black" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <FaCopy size={12} />
                              <span>Copy Number</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Note */}
                    <p className="text-xs text-gray-500 dark:text-zinc-400 font-sans italic">
                      💡 {currentPayment.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-zinc-800/80 bg-gray-50/50 dark:bg-zinc-900/50 flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-gray-500 dark:text-zinc-500 flex items-center gap-1.5">
            <FaBirthdayCake className="text-amber-500" />
            <span>Celebrating Klint's Birthday</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-sans font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
