import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaCopy, 
  FaCheck, 
  FaTrophy, 
  FaShareAlt, 
  FaUser, 
  FaTrash, 
  FaPlus,
  FaWhatsapp,
  FaTelegram,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaUndo,
  FaSync
} from "react-icons/fa";
import { saveScoreToCloud, fetchScoresFromCloud, saveQuizToCloud, fetchQuizFromCloud } from "../services/quizCloudApi";

// Default Preset Questions
const DEFAULT_QUESTIONS = [
  {
    id: 1,
    question: "What is my absolute favorite food?",
    options: ["Pizza / Pasta 🍕", "Burgers & Fries 🍔", "Sushi / Asian Cuisine 🍣", "Home-cooked Comfort Food 🍲"]
  },
  {
    id: 2,
    question: "Am I a morning person or a night owl?",
    options: ["Extreme Night Owl 🌙", "Early Bird ☀️", "Depends on Coffee ☕", "Always Tired 😴"]
  },
  {
    id: 3,
    question: "What's my dream travel destination?",
    options: ["Tokyo, Japan 🇯🇵", "Tropical Beach Resort 🏝️", "European City Tour 🏰", "Camping in Nature 🏕️"]
  },
  {
    id: 4,
    question: "What genre of movies/shows do I love most?",
    options: ["Sci-Fi / Anime / Fantasy 🚀", "Action & Thrillers 💥", "Comedy & Sitcoms 😂", "Documentaries & Tech 📽️"]
  },
  {
    id: 5,
    question: "What is my go-to weekend activity?",
    options: ["Coding & Building Side Projects 💻", "Gaming / Binge Watching 🎮", "Hanging out with Friends 🍻", "Sleeping & Relaxing 💤"]
  },
  {
    id: 6,
    question: "What is my biggest pet peeve?",
    options: ["Slow Internet / Lag 📶", "Unpunctuality / Waiting ⏳", "Loud Chewing 🍕", "Messy Spaces 🧹"]
  },
  {
    id: 7,
    question: "If I won $1 Million, what's the first thing I'd do?",
    options: ["Buy a Dream House & Tech Setup 🏠", "Travel the World ✈️", "Invest & Save it All 📈", "Give to Family & Charity ❤️"]
  },
  {
    id: 8,
    question: "Which superpower would I choose?",
    options: ["Teleportation / Instant Travel ⚡", "Time Travel ⏳", "Invisibility 👻", "Mind Reading 🧠"]
  },
  {
    id: 9,
    question: "How do I handle stress?",
    options: ["Listen to Music & Chill 🎧", "Work Harder / Code it Out 💻", "Talk to Friends 🗣️", "Eat Snacks & Sleep 🍿"]
  },
  {
    id: 10,
    question: "What describes my personality best?",
    options: ["Creative & Ambitious ✨", "Logical & Analytical 🧠", "Chill & Easygoing 😎", "Energetic & Fun 🎉"]
  }
];

// Friendship Rating Tiers Helper
const getFriendshipRating = (percentage) => {
  if (percentage >= 90) {
    return {
      tier: "Soulmate / BFF",
      icon: "💖",
      badgeClass: "bg-pink-500/10 text-pink-500 border-pink-500/30",
      description: "Unbelievable! You know me better than I know myself!",
      gradient: "from-pink-500 to-rose-600"
    };
  } else if (percentage >= 70) {
    return {
      tier: "Best Friend",
      icon: "🌟",
      badgeClass: "bg-amber-500/10 text-amber-500 border-amber-500/30",
      description: "Super impressive! We are definitely super close friends.",
      gradient: "from-amber-500 to-yellow-600"
    };
  } else if (percentage >= 50) {
    return {
      tier: "Good Buddy",
      icon: "🤝",
      badgeClass: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      description: "Not bad! You know me pretty well.",
      gradient: "from-blue-500 to-cyan-600"
    };
  } else if (percentage >= 30) {
    return {
      tier: "Acquaintance",
      icon: "☕",
      badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
      description: "Room for improvement! We definitely need to hang out more.",
      gradient: "from-emerald-500 to-teal-600"
    };
  } else {
    return {
      tier: "Stranger Danger",
      icon: "😅",
      badgeClass: "bg-purple-500/10 text-purple-500 border-purple-500/30",
      description: "Do we even know each other?! Time for a coffee chat! 😂",
      gradient: "from-purple-500 to-indigo-600"
    };
  }
};

// Safe Base64 Helper
const encodeData = (obj) => {
  try {
    return btoa(encodeURIComponent(JSON.stringify(obj)));
  } catch (e) {
    console.error("Encoding error", e);
    return "";
  }
};

const decodeData = (str) => {
  try {
    let cleanStr = str;
    if (cleanStr.includes("%")) {
      cleanStr = decodeURIComponent(cleanStr);
    }
    return JSON.parse(decodeURIComponent(atob(cleanStr)));
  } catch (e) {
    try {
      return JSON.parse(atob(str));
    } catch (err) {
      console.error("Decoding error", err);
      return null;
    }
  }
};

const FriendQuizPage = () => {
  const [searchParams] = useSearchParams();
  
  // Views: 'create' | 'take' | 'result' | 'leaderboard'
  const [view, setView] = useState("create");

  // Creator state
  const [creatorName, setCreatorName] = useState("");
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [creatorAnswers, setCreatorAnswers] = useState({}); // { [qId]: optionIndex }
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Quiz Taker (Friend) state
  const [activeQuiz, setActiveQuiz] = useState(null); // decoded quiz payload
  const [friendName, setFriendName] = useState("");
  const [friendAnswers, setFriendAnswers] = useState({}); // { [qIndex]: optionIndex }
  const [currentStep, setCurrentStep] = useState(0);

  // Result State
  const [finalScore, setFinalScore] = useState(null); // { score, total, percentage, rating, friendName, creatorName }

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [importInput, setImportInput] = useState("");
  const [resultCopied, setResultCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Load Leaderboard from localStorage and fetch Cloud DB
  useEffect(() => {
    window.scrollTo(0, 0);
    const savedLb = localStorage.getItem("friend_quiz_leaderboard");
    if (savedLb) {
      try {
        setLeaderboard(JSON.parse(savedLb));
      } catch (e) {
        console.error("Error loading leaderboard", e);
      }
    }
  }, []);

  // Sync with Cloud Database and merge entries
  const syncCloudLeaderboard = async (isManual = false) => {
    setIsSyncing(true);
    try {
      const cloudScores = await fetchScoresFromCloud();
      setLeaderboard((prevLocal) => {
        const scoreMap = new Map();

        // Load local scores
        (prevLocal || []).forEach((item) => {
          if (item && item.friendName && item.creatorName) {
            const key = `${item.creatorName.toLowerCase().trim()}_${item.friendName.toLowerCase().trim()}`;
            scoreMap.set(key, item);
          }
        });

        // Merge cloud scores, updating if newer or higher percentage
        if (Array.isArray(cloudScores)) {
          cloudScores.forEach((cloudItem) => {
            if (cloudItem && cloudItem.friendName && cloudItem.creatorName) {
              const key = `${cloudItem.creatorName.toLowerCase().trim()}_${cloudItem.friendName.toLowerCase().trim()}`;
              const existing = scoreMap.get(key);
              if (!existing || (cloudItem.percentage || 0) >= (existing.percentage || 0)) {
                scoreMap.set(key, cloudItem);
              }
            }
          });
        }

        const sorted = Array.from(scoreMap.values()).sort(
          (a, b) => (b.percentage || 0) - (a.percentage || 0)
        );
        localStorage.setItem("friend_quiz_leaderboard", JSON.stringify(sorted));
        return sorted;
      });
      setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if (isManual) showToast("🟢 Leaderboard synced live with Cloud DB!");
    } catch (e) {
      console.error("Cloud sync error:", e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-poll cloud database every 8 seconds when viewing leaderboard
  useEffect(() => {
    syncCloudLeaderboard();

    let intervalId;
    if (view === "leaderboard") {
      intervalId = setInterval(() => {
        syncCloudLeaderboard();
      }, 8000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [view]);

  // Save Leaderboard to localStorage and trigger cloud save
  const saveToLeaderboard = (newEntry) => {
    setLeaderboard((prev) => {
      const filtered = prev.filter(
        (item) => !(item.friendName?.toLowerCase() === newEntry.friendName?.toLowerCase() && item.creatorName?.toLowerCase() === newEntry.creatorName?.toLowerCase())
      );
      const updated = [newEntry, ...filtered].sort((a, b) => b.percentage - a.percentage);
      localStorage.setItem("friend_quiz_leaderboard", JSON.stringify(updated));
      return updated;
    });

    // Also push to cloud DB asynchronously
    saveScoreToCloud(newEntry);
  };

  // Import score manually from pasted result link or code
  const handleImportScore = (e) => {
    if (e) e.preventDefault();
    if (!importInput.trim()) {
      showToast("Please paste a result link or code first!");
      return;
    }

    let rawData = importInput.trim();
    if (rawData.includes("res=")) {
      try {
        const urlObj = new URL(rawData);
        rawData = urlObj.searchParams.get("res") || urlObj.searchParams.get("result") || rawData;
      } catch (err) {
        const match = rawData.match(/[?&](?:res|result)=([^&]+)/);
        if (match) rawData = match[1];
      }
    }

    const decodedRes = decodeData(rawData);
    if (decodedRes && decodedRes.friendName && decodedRes.creatorName && decodedRes.percentage !== undefined) {
      saveToLeaderboard(decodedRes);
      setImportInput("");
      showToast(`🎉 Recorded score for ${decodedRes.friendName} (${decodedRes.percentage}%)!`);
    } else {
      showToast("❌ Invalid result link or code. Please check and try again.");
    }
  };

  // Delete individual entry
  const deleteLeaderboardEntry = (entryToDelete) => {
    setLeaderboard((prev) => {
      const updated = prev.filter(
        (item) => !(item.friendName === entryToDelete.friendName && item.creatorName === entryToDelete.creatorName && item.timestamp === entryToDelete.timestamp)
      );
      localStorage.setItem("friend_quiz_leaderboard", JSON.stringify(updated));
      return updated;
    });
    showToast(`Removed ${entryToDelete.friendName}'s score.`);
  };

  // Parse URL search params on mount
  useEffect(() => {
    const qParam = searchParams.get("q") || searchParams.get("quiz");
    const resParam = searchParams.get("res") || searchParams.get("result");

    if (resParam) {
      const decodedRes = decodeData(resParam);
      if (decodedRes && decodedRes.friendName && decodedRes.creatorName) {
        saveToLeaderboard(decodedRes);
        showToast(`🎉 Recorded result for ${decodedRes.friendName} (${decodedRes.percentage}%)!`);
        setView("leaderboard");
        return;
      }
    }

    if (qParam) {
      if (qParam.length <= 15) {
        fetchQuizFromCloud(qParam).then((cloudQuiz) => {
          if (cloudQuiz && cloudQuiz.creatorName && cloudQuiz.questions) {
            setActiveQuiz(cloudQuiz);
            setView("take");
          } else {
            const decodedQuiz = decodeData(qParam);
            if (decodedQuiz && decodedQuiz.creatorName) {
              setActiveQuiz(decodedQuiz);
              setView("take");
            }
          }
        });
      } else {
        const decodedQuiz = decodeData(qParam);
        if (decodedQuiz && decodedQuiz.creatorName && decodedQuiz.questions) {
          setActiveQuiz(decodedQuiz);
          setView("take");
        }
      }
    }
  }, [searchParams]);

  // Question & Choice Customization Handlers
  const handleSelectAnswer = (questionId, optionIdx) => {
    setCreatorAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleEditQuestionTitle = (qId, newTitle) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, question: newTitle } : q))
    );
  };

  const handleEditOptionText = (qId, optIdx, newText) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          const updatedOpts = [...q.options];
          updatedOpts[optIdx] = newText;
          return { ...q, options: updatedOpts };
        }
        return q;
      })
    );
  };

  const handleAddOption = (qId) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          if (q.options.length >= 6) {
            showToast("Maximum 6 choices per question.");
            return q;
          }
          return { ...q, options: [...q.options, `Option ${q.options.length + 1}`] };
        }
        return q;
      })
    );
  };

  const handleDeleteOption = (qId, optIdx) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          if (q.options.length <= 2) {
            showToast("Question must have at least 2 choices.");
            return q;
          }
          const updatedOpts = q.options.filter((_, idx) => idx !== optIdx);
          return { ...q, options: updatedOpts };
        }
        return q;
      })
    );

    // Reset answer if selected option was deleted
    if (creatorAnswers[qId] === optIdx) {
      setCreatorAnswers((prev) => {
        const updated = { ...prev };
        delete updated[qId];
        return updated;
      });
    } else if (creatorAnswers[qId] > optIdx) {
      setCreatorAnswers((prev) => ({
        ...prev,
        [qId]: prev[qId] - 1
      }));
    }
  };

  const handleAddCustomQuestion = () => {
    const newId = Date.now();
    const newQ = {
      id: newId,
      question: "Type your custom question here...",
      options: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      isCustom: true
    };
    setQuestions((prev) => [...prev, newQ]);
    setCreatorAnswers((prev) => ({ ...prev, [newId]: 0 }));
    setEditingQuestionId(newId);
    showToast("✨ Added new custom question! Click choices to edit text and select your answer.");
  };

  const handleDeleteQuestion = (qId) => {
    if (questions.length <= 3) {
      showToast("Quiz must have at least 3 questions.");
      return;
    }
    setQuestions((prev) => prev.filter((q) => q.id !== qId));
    setCreatorAnswers((prev) => {
      const updated = { ...prev };
      delete updated[qId];
      return updated;
    });
    showToast("Question deleted.");
  };

  const handleResetQuestions = () => {
    if (window.confirm("Reset all questions and choices back to default?")) {
      setQuestions(DEFAULT_QUESTIONS);
      setCreatorAnswers({});
      setEditingQuestionId(null);
      showToast("Questions reset to default.");
    }
  };

  const handleGenerateQuiz = async () => {
    if (!creatorName.trim()) {
      showToast("Please enter your name to create the quiz!");
      return;
    }

    if (questions.length < 3) {
      showToast("Quiz must have at least 3 questions!");
      return;
    }

    const quizPayload = {
      creatorName: creatorName.trim(),
      questions: questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        answer: creatorAnswers[q.id] !== undefined ? creatorAnswers[q.id] : 0
      }))
    };

    showToast("Generating short quiz link...");
    const cloudRes = await saveQuizToCloud(quizPayload);

    let fullLink = "";
    if (cloudRes.success && cloudRes.shortId) {
      fullLink = `${window.location.origin}/friend-quiz?q=${cloudRes.shortId}`;
    } else {
      const encoded = encodeData(quizPayload);
      fullLink = `${window.location.origin}/friend-quiz?q=${encoded}`;
    }

    setGeneratedLink(fullLink);
    showToast("✨ Short quiz link generated! Share it with your friends.");
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    showToast("Link copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2500);
  };

  // Handle Friend taking quiz
  const handleFriendAnswerSelect = (optionIdx) => {
    setFriendAnswers((prev) => ({
      ...prev,
      [currentStep]: optionIdx
    }));
  };

  const handleNextQuestion = () => {
    if (currentStep < activeQuiz.questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      finishFriendQuiz();
    }
  };

  const finishFriendQuiz = () => {
    if (!friendName.trim()) {
      showToast("Please enter your name first!");
      return;
    }

    let score = 0;
    const total = activeQuiz.questions.length;

    activeQuiz.questions.forEach((q, idx) => {
      if (friendAnswers[idx] === q.answer) {
        score += 1;
      }
    });

    const percentage = Math.round((score / total) * 100);
    const rating = getFriendshipRating(percentage);

    const resultObj = {
      creatorName: activeQuiz.creatorName,
      friendName: friendName.trim(),
      score,
      total,
      percentage,
      tier: rating.tier,
      icon: rating.icon,
      timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    setFinalScore({
      ...resultObj,
      questions: activeQuiz.questions,
      friendAnswers,
      rating
    });

    saveToLeaderboard(resultObj);
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getResultShareLink = () => {
    if (!finalScore) return "";
    const encodedRes = encodeData({
      creatorName: finalScore.creatorName,
      friendName: finalScore.friendName,
      score: finalScore.score,
      total: finalScore.total,
      percentage: finalScore.percentage,
      tier: finalScore.tier,
      icon: finalScore.icon,
      timestamp: finalScore.timestamp
    });
    return `${window.location.origin}/friend-quiz?res=${encodedRes}`;
  };

  const handleShareResultToCreator = (platform = "whatsapp") => {
    const link = getResultShareLink();
    const text = `Hey ${finalScore.creatorName}! I just took your Friend Quiz and scored ${finalScore.score}/${finalScore.total} (${finalScore.percentage}% - ${finalScore.tier})! Check out your updated leaderboard here: ${link}`;

    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
    } else if (platform === "telegram") {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  const handleCopyResultLink = () => {
    const link = getResultShareLink();
    if (!link) return;
    navigator.clipboard.writeText(link);
    setResultCopied(true);
    showToast("Result sync link copied to clipboard! 📋");
    setTimeout(() => setResultCopied(false), 2500);
  };

  const clearLeaderboard = () => {
    if (window.confirm("Are you sure you want to clear the leaderboard?")) {
      setLeaderboard([]);
      localStorage.removeItem("friend_quiz_leaderboard");
      showToast("Leaderboard cleared.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-gray-900 dark:text-[#f4f4f5] transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <FaCheckCircle className="text-emerald-400 dark:text-emerald-600 text-sm" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* App Header & Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-[#27272a]">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#121215] hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition-colors"
              title="Return to Portfolio"
            >
              <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h1 className="font-mono text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Friend Quiz & Leaderboard
                </h1>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-sans">
                Create & customize quizzes about yourself, share with friends & track scores!
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#121215] p-1.5 rounded-xl border border-gray-200 dark:border-[#27272a]">
            <button
              onClick={() => setView("create")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                view === "create"
                  ? "bg-white dark:bg-[#1f1f24] text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              📝 Create Quiz
            </button>
            <button
              onClick={() => setView("leaderboard")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 ${
                view === "leaderboard"
                  ? "bg-white dark:bg-[#1f1f24] text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaTrophy className="text-amber-500" />
              <span>Leaderboard</span>
              {leaderboard.length > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-blue-500 text-white font-bold">
                  {leaderboard.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* VIEW 1: QUIZ CREATOR */}
        {view === "create" && (
          <div className="space-y-6 animate-fade-in">
            {/* Creator Name Input Card */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#121215]/60 backdrop-blur-md shadow-sm">
              <label className="block font-mono text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                1. Your Name (Quiz Creator)
              </label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Klint Ruales"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#18181b] text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Questions Selection Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-mono text-base font-bold text-gray-900 dark:text-white">
                  2. Customize Questions & Select Correct Answers
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  You can edit any question or choice text, add custom questions, and pick your answer!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetQuestions}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-[#27272a] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-mono text-xs flex items-center gap-1 transition-colors"
                  title="Reset to default preset"
                >
                  <FaUndo size={10} />
                  <span>Reset Default</span>
                </button>
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 font-semibold shrink-0">
                  {Object.keys(creatorAnswers).length} / {questions.length} Answered
                </span>
              </div>
            </div>

            {/* Questions & Custom Choices List */}
            <div className="space-y-5">
              {questions.map((q, qIndex) => {
                const selectedIdx = creatorAnswers[q.id];
                const isAnswered = selectedIdx !== undefined;
                const isEditing = editingQuestionId === q.id;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isAnswered
                        ? "border-blue-500/40 bg-blue-50/20 dark:bg-blue-950/10 shadow-sm"
                        : "border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121215]"
                    }`}
                  >
                    {/* Question Card Header */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-mono text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md shrink-0">
                          Q{qIndex + 1}
                        </span>

                        {isEditing ? (
                          <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleEditQuestionTitle(q.id, e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-blue-500 bg-white dark:bg-[#18181b] text-gray-900 dark:text-white font-mono text-xs focus:outline-none"
                            placeholder="Type question title..."
                          />
                        ) : (
                          <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                            {q.question}
                          </h3>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setEditingQuestionId(isEditing ? null : q.id)}
                          className={`p-1.5 rounded-lg font-mono text-xs transition-colors ${
                            isEditing
                              ? "bg-blue-600 text-white"
                              : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-[#18181b]"
                          }`}
                          title={isEditing ? "Done editing" : "Edit question text"}
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Delete question"
                        >
                          <FaTrash size={12} />
                        </button>
                        {isAnswered && (
                          <FaCheckCircle className="text-emerald-500 shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* Choice Options List */}
                    <div className="space-y-2.5 mt-4">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedIdx === optIdx;

                        return (
                          <div key={optIdx} className="flex items-center gap-2">
                            {/* Answer Selector Button */}
                            <button
                              type="button"
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`flex-1 p-2.5 rounded-xl border text-left text-xs font-sans transition-all flex items-center justify-between ${
                                isSelected
                                  ? "bg-blue-600 text-white border-blue-600 font-medium shadow-md shadow-blue-500/20"
                                  : "bg-gray-50 dark:bg-[#18181b] border-gray-200 dark:border-[#27272a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202025]"
                              }`}
                            >
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={opt}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => handleEditOptionText(q.id, optIdx, e.target.value)}
                                  className="w-full bg-transparent border-none outline-none text-xs font-sans focus:ring-0 text-inherit"
                                />
                              ) : (
                                <span>{opt}</span>
                              )}
                              {isSelected && <FaCheck className="text-white text-xs shrink-0 ml-2" />}
                            </button>

                            {/* Delete Choice Option Button (in edit mode) */}
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => handleDeleteOption(q.id, optIdx)}
                                className="p-2 rounded-xl border border-gray-200 dark:border-[#27272a] text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0"
                                title="Delete choice option"
                              >
                                <FaTrash size={11} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Add Choice Option button in Edit Mode */}
                    {isEditing && (
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#1f1f24]">
                        <button
                          type="button"
                          onClick={() => handleAddOption(q.id)}
                          className="font-mono text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1 font-medium"
                        >
                          <FaPlus size={10} />
                          <span>Add Another Choice Option</span>
                        </button>
                        <span className="text-[11px] text-gray-400">
                          Click any choice to set your true answer
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add Custom Question Button */}
            <button
              type="button"
              onClick={handleAddCustomQuestion}
              className="w-full py-3.5 rounded-xl border border-dashed border-blue-500/40 bg-blue-50/10 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold hover:bg-blue-50/30 dark:hover:bg-blue-950/30 transition-all flex items-center justify-center gap-2"
            >
              <FaPlus />
              <span>Add Custom Question & Choices</span>
            </button>

            {/* Create Quiz Button & Link Modal Card */}
            <div className="pt-4 pb-8">
              {!generatedLink ? (
                <button
                  type="button"
                  onClick={handleGenerateQuiz}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-mono text-sm font-bold shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <FaShareAlt />
                  <span>Generate My Friend Quiz Link</span>
                </button>
              ) : (
                <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/20 space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold">
                    <FaCheckCircle className="text-lg" />
                    <span>Your Customized Friend Quiz is Ready to Share!</span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Send this secret link to your friends. When they answer, their scores will automatically sync to your Leaderboard!
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-[#27272a] bg-white dark:bg-[#18181b] text-gray-900 dark:text-white font-mono text-xs"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-2 shadow-md"
                    >
                      {copied ? <FaCheck /> : <FaCopy />}
                      <span>{copied ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs font-mono text-gray-500">Quick Share:</span>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `Hey! Take my Friend Quiz to see how well you really know me: ${generatedLink}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-mono text-xs hover:bg-emerald-700 transition-colors"
                    >
                      <FaWhatsapp />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(generatedLink)}&text=${encodeURIComponent(
                        "Take my Friend Quiz!"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 text-white font-mono text-xs hover:bg-sky-600 transition-colors"
                    >
                      <FaTelegram />
                      <span>Telegram</span>
                    </a>
                    <button
                      onClick={() => {
                        const decoded = decodeData(encodeData({
                          creatorName,
                          questions: questions
                            .filter((q) => creatorAnswers[q.id] !== undefined)
                            .map((q) => ({
                              id: q.id,
                              question: q.question,
                              options: q.options,
                              answer: creatorAnswers[q.id]
                            }))
                        }));
                        setActiveQuiz(decoded);
                        setView("take");
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-[#27272a] bg-gray-100 dark:bg-[#18181b] text-gray-700 dark:text-gray-300 font-mono text-xs hover:bg-gray-200 dark:hover:bg-[#222227] transition-colors"
                    >
                      <span>🧪 Test My Quiz Now</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: QUIZ TAKER (FRIEND PLAYING) */}
        {view === "take" && activeQuiz && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            {/* Quiz Banner */}
            <div className="p-6 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 font-mono text-xs font-semibold">
                ✨ Friend Knowledge Challenge
              </div>
              <h2 className="font-mono text-2xl font-bold text-gray-900 dark:text-white">
                How well do you know <span className="text-blue-500">{activeQuiz.creatorName}</span>?
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Answer these {activeQuiz.questions.length} questions guessing what {activeQuiz.creatorName} selected!
              </p>
            </div>

            {/* Friend Name Input */}
            {currentStep === 0 && (
              <div className="p-5 rounded-2xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#121215]/60 space-y-2">
                <label className="block font-mono text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Enter Your Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. Alex Smith"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#18181b] text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-gray-500">
                <span>Question {currentStep + 1} of {activeQuiz.questions.length}</span>
                <span>{Math.round(((currentStep + 1) / activeQuiz.questions.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-[#1f1f24] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / activeQuiz.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Question Card */}
            {activeQuiz.questions[currentStep] && (
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121215] space-y-5 shadow-sm">
                <h3 className="font-mono text-base font-bold text-gray-900 dark:text-white leading-snug">
                  {currentStep + 1}. {activeQuiz.questions[currentStep].question}
                </h3>

                <div className="space-y-2.5">
                  {activeQuiz.questions[currentStep].options.map((opt, optIdx) => {
                    const isSelected = friendAnswers[currentStep] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleFriendAnswerSelect(optIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-sm font-sans transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 font-medium shadow-md shadow-blue-500/20"
                            : "bg-gray-50 dark:bg-[#18181b] border-gray-200 dark:border-[#27272a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202025]"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <FaCheck className="text-white shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-[#27272a]">
                  <button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#27272a] font-mono text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-[#18181b] transition-colors"
                  >
                    Previous
                  </button>

                  <button
                    disabled={friendAnswers[currentStep] === undefined || !friendName.trim()}
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-mono text-xs font-bold transition-all shadow-md"
                  >
                    {currentStep < activeQuiz.questions.length - 1 ? "Next Question →" : "See Friendship Rating 🏆"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: QUIZ RESULT & RATING */}
        {view === "result" && finalScore && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            {/* Score & Rating Hero Card */}
            <div className="p-8 rounded-3xl border border-gray-200 dark:border-[#27272a] bg-gradient-to-b from-gray-50 to-white dark:from-[#121215] dark:to-[#09090b] text-center space-y-4 shadow-lg relative overflow-hidden">
              <div className="text-5xl mb-2">{finalScore.rating.icon}</div>

              <span className={`inline-block px-4 py-1.5 rounded-full font-mono text-xs font-bold border ${finalScore.rating.badgeClass}`}>
                {finalScore.rating.tier}
              </span>

              <h2 className="font-mono text-3xl font-extrabold text-gray-900 dark:text-white">
                {finalScore.friendName}, you scored <span className="text-blue-500">{finalScore.percentage}%</span>!
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                {finalScore.rating.description}
              </p>

              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-gray-100 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] font-mono text-sm">
                <div>
                  <span className="text-gray-400 text-xs block">Correct Answers</span>
                  <span className="font-bold text-emerald-500 text-base">{finalScore.score} / {finalScore.total}</span>
                </div>
                <div className="h-8 w-px bg-gray-300 dark:bg-[#27272a]" />
                <div>
                  <span className="text-gray-400 text-xs block">Tested On</span>
                  <span className="font-bold text-gray-900 dark:text-white text-xs">{finalScore.creatorName}</span>
                </div>
              </div>

              {/* Action Buttons to send score to creator */}
              <div className="p-5 rounded-2xl border border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/30 space-y-3 text-center">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                  <FaCheckCircle /> Score Automatically Saved & Synced to Live Leaderboard!
                </div>
                <p className="text-xs font-sans text-gray-600 dark:text-gray-300">
                  {finalScore.creatorName} will see your score on their leaderboard automatically! Want to share your score badge directly with {finalScore.creatorName}?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                  <button
                    onClick={() => handleShareResultToCreator("whatsapp")}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>Share on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShareResultToCreator("telegram")}
                    className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <FaTelegram className="text-sm" />
                    <span>Share on Telegram</span>
                  </button>
                  <button
                    onClick={handleCopyResultLink}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-[#27272a] bg-white dark:bg-[#18181b] text-gray-900 dark:text-white font-mono text-xs font-bold hover:bg-gray-100 dark:hover:bg-[#202025] transition-all flex items-center gap-2"
                  >
                    {resultCopied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
                    <span>{resultCopied ? "Link Copied!" : "Copy Result Link"}</span>
                  </button>
                  <button
                    onClick={() => setView("leaderboard")}
                    className="px-4 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
                  >
                    <FaTrophy className="text-amber-500" />
                    <span>View Live Leaderboard</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Answer Breakdown Details */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121215] space-y-4">
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                Detailed Answers Breakdown:
              </h3>

              <div className="space-y-3">
                {finalScore.questions.map((q, idx) => {
                  const friendAnsIdx = finalScore.friendAnswers[idx];
                  const isCorrect = friendAnsIdx === q.answer;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                        isCorrect
                          ? "border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/10"
                          : "border-rose-500/30 bg-rose-50/10 dark:bg-rose-950/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono font-bold text-gray-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-emerald-500 font-mono text-[11px] font-bold">
                            <FaCheckCircle /> Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-500 font-mono text-[11px] font-bold">
                            <FaTimesCircle /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="font-sans text-gray-600 dark:text-gray-300 pt-1 space-y-1">
                        <div>
                          Your answer: <span className="font-medium text-gray-900 dark:text-white">{q.options[friendAnsIdx] || "None"}</span>
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {finalScore.creatorName}'s actual answer: {q.options[q.answer]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                setView("create");
                setGeneratedLink("");
                setCreatorAnswers({});
              }}
              className="w-full py-3.5 rounded-xl border border-dashed border-gray-300 dark:border-[#27272a] font-mono text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#121215] transition-all flex items-center justify-center gap-2"
            >
              <FaPlus />
              <span>Create Your Own Custom Friend Quiz Now</span>
            </button>
          </div>
        )}

        {/* VIEW 4: LIVE RANKED LEADERBOARD */}
        {view === "leaderboard" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-amber-500 font-mono text-xs font-bold uppercase tracking-wider">
                    <FaTrophy /> Live Scoreboard
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-mono text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Live Auto-Syncing</span>
                  </span>
                </div>
                <h2 className="font-mono text-2xl font-bold text-gray-900 dark:text-white">
                  Friends Leaderboard 🏆
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Scores automatically update in real-time as your friends complete your quiz!
                  {lastSynced && <span className="text-gray-400 font-mono ml-2">Last synced at {lastSynced}</span>}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => syncCloudLeaderboard(true)}
                  disabled={isSyncing}
                  className="px-3.5 py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  title="Manually fetch latest cloud scores"
                >
                  <FaSync className={isSyncing ? "animate-spin" : ""} size={12} />
                  <span>{isSyncing ? "Syncing..." : "Sync Now"}</span>
                </button>

                {leaderboard.length > 0 && (
                  <button
                    onClick={clearLeaderboard}
                    className="px-3 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-mono text-xs transition-colors flex items-center gap-1.5"
                  >
                    <FaTrash size={12} />
                    <span>Clear Board</span>
                  </button>
                )}
              </div>
            </div>

            {/* Optional Backup Import Box */}
            <form onSubmit={handleImportScore} className="p-4 rounded-2xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#121215]/50 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  📥 (Optional Backup) Import Offline Score Link
                </label>
                <span className="text-[10px] text-emerald-500 font-semibold">✨ All friend scores auto-sync live</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste offline score link (optional)"
                  value={importInput}
                  onChange={(e) => setImportInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-[#27272a] bg-white dark:bg-[#18181b] text-gray-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gray-200 dark:bg-[#202025] hover:bg-gray-300 dark:hover:bg-[#282830] text-gray-800 dark:text-gray-200 font-mono text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5"
                >
                  <FaPlus size={11} />
                  <span>Import</span>
                </button>
              </div>
            </form>

            {/* Leaderboard Table / List */}
            {leaderboard.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-dashed border-gray-300 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#121215]/50 space-y-3">
                <div className="text-4xl text-gray-400">🏆</div>
                <h3 className="font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
                  No Leaderboard Entries Yet
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Create a custom quiz, send the link to your friends, and when they send back their score link, paste it above or open it to see them here!
                </p>
                <button
                  onClick={() => setView("create")}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 mt-2"
                >
                  <FaPlus />
                  <span>Create A Quiz</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((item, idx) => {
                  let medal = null;
                  let cardBorder = "border-gray-200 dark:border-[#27272a]";

                  if (idx === 0) {
                    medal = "🥇";
                    cardBorder = "border-amber-500/50 bg-amber-500/5 shadow-amber-500/10 shadow-md";
                  } else if (idx === 1) {
                    medal = "🥈";
                    cardBorder = "border-slate-400/50 bg-slate-400/5";
                  } else if (idx === 2) {
                    medal = "🥉";
                    cardBorder = "border-amber-700/40 bg-amber-700/5";
                  }

                  const ratingInfo = getFriendshipRating(item.percentage);

                  return (
                    <div
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl border ${cardBorder} bg-white dark:bg-[#121215] flex items-center justify-between gap-4 transition-all hover:scale-[1.005]`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="font-mono text-lg font-bold min-w-[28px] text-center">
                          {medal ? medal : `#${idx + 1}`}
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-mono text-sm font-bold text-gray-900 dark:text-white truncate">
                              {item.friendName}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border ${ratingInfo.badgeClass}`}>
                              {ratingInfo.icon} {item.tier}
                            </span>
                          </div>

                          <div className="text-[11px] text-gray-500 dark:text-gray-400 font-sans mt-0.5 flex items-center gap-2">
                            <span>Quiz for {item.creatorName}</span>
                            <span>•</span>
                            <span>{item.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="font-mono text-xl font-extrabold text-blue-500">
                            {item.percentage}%
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                            {item.score} / {item.total} correct
                          </div>
                        </div>
                        <button
                          onClick={() => deleteLeaderboardEntry(item)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Remove score entry"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendQuizPage;
