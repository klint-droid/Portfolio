import React, { useState, useEffect } from "react";
import { FaBirthdayCake, FaTimes, FaGift, FaHeart, FaClock } from "react-icons/fa";
import { BIRTHDAY_CONFIG } from "../../data/birthdayConfig";

const STORAGE_KEY = "klint_birthday_popup_dismissed_at";

export default function BirthdayAdPopup({ onOpenCelebration }) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false, isToday: false });

  // Calculate remaining time
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(BIRTHDAY_CONFIG.targetDate);
      const diff = target - now;

      if (diff <= 0) {
        // Check if today is the birthday (within 24 hours of target)
        if (Math.abs(diff) < 24 * 60 * 60 * 1000) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false, isToday: true });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isToday: false });
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false, isToday: false });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check if dismissed within the last 24 hours
  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      // If dismissed less than 24 hours ago, do not automatically show
      if (elapsed < 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // Gentle 1.2s delay for delightful entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e) => {
    e?.stopPropagation();
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Birthday Announcement"
      className="fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 animate-fade-in-up"
    >
      <div className="relative group overflow-hidden rounded-2xl bg-white/95 dark:bg-[#121215]/95 backdrop-blur-xl border border-amber-500/40 dark:border-amber-400/30 p-5 shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500" />
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close / Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white bg-gray-100 dark:bg-zinc-800/80 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
          title="Dismiss for 24h"
          aria-label="Dismiss birthday announcement"
        >
          <FaTimes size={13} />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold tracking-wide uppercase bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <FaBirthdayCake className="text-amber-500" />
            Special Announcement
          </span>
        </div>

        {/* Headline & Body */}
        <div className="flex items-start gap-3.5 mt-1">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400/60 shrink-0 shadow-md">
            <img
              src="1st.jpg"
              alt={BIRTHDAY_CONFIG.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "2nd.jpg";
              }}
            />
            <span className="absolute bottom-0 right-0 text-[10px] bg-black/80 text-amber-300 px-1 font-mono">
              🎂
            </span>
          </div>

          <div className="flex-1 min-w-0 pr-3">
            <h4 className="font-sans font-bold text-base text-gray-900 dark:text-white tracking-tight leading-snug">
              {BIRTHDAY_CONFIG.name}'s Birthday is Coming!
            </h4>
            <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 mt-0.5">
              Leveling up another year! Drop a wish on my live wall or check out the birthday twist.
            </p>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800/90 flex items-center justify-between text-center font-mono">
          {timeLeft.isToday ? (
            <div className="w-full text-center py-1 text-sm font-bold text-amber-500 animate-pulse">
              🎉 TODAY IS THE BIG DAY! HAPPY BIRTHDAY! 🎂
            </div>
          ) : (
            <>
              <div className="flex-1">
                <span className="block text-base font-bold text-gray-900 dark:text-amber-400 leading-tight">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] uppercase text-gray-500 dark:text-zinc-500">Days</span>
              </div>
              <span className="text-gray-400 dark:text-zinc-600 font-bold">:</span>
              <div className="flex-1">
                <span className="block text-base font-bold text-gray-900 dark:text-amber-400 leading-tight">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase text-gray-500 dark:text-zinc-500">Hours</span>
              </div>
              <span className="text-gray-400 dark:text-zinc-600 font-bold">:</span>
              <div className="flex-1">
                <span className="block text-base font-bold text-gray-900 dark:text-amber-400 leading-tight">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase text-gray-500 dark:text-zinc-500">Mins</span>
              </div>
              <span className="text-gray-400 dark:text-zinc-600 font-bold">:</span>
              <div className="flex-1">
                <span className="block text-base font-bold text-gray-900 dark:text-amber-400 leading-tight">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase text-gray-500 dark:text-zinc-500">Secs</span>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-3.5 flex items-center gap-2">
          <button
            onClick={() => {
              onOpenCelebration();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-sans font-semibold text-xs text-white bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-600 hover:to-rose-600 shadow-md shadow-amber-500/25 active:scale-[0.98] transition-all duration-200"
          >
            <FaGift className="text-sm" />
            <span>Celebrate With Me</span>
          </button>
          <button
            onClick={handleDismiss}
            className="px-3 py-2.5 rounded-xl font-sans font-medium text-xs text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-800/80 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
