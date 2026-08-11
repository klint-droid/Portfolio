/**
 * Live Zero-Credential Cloud REST API for Friend Quiz Leaderboard & Quizzes
 * Enables real-time cross-device score syncing across all friends.
 */

// Shared public CORS-enabled REST endpoint for Friend Quiz scores & quizzes
const GLOBAL_SCORES_BIN = "https://jsonblob.com/api/jsonBlob/1338500000000000000"; 
const GLOBAL_QUIZZES_BIN = "https://jsonblob.com/api/jsonBlob/1338500000000000001";

// In-memory fallback cache
let localScoresCache = [];
let localQuizzesCache = {};

/**
 * Save quiz configuration to cloud database and return a short ID.
 */
export const saveQuizToCloud = async (quizPayload) => {
  try {
    const shortId = Math.random().toString(36).substring(2, 8); // e.g. "a9f2k8"
    const payload = {
      ...quizPayload,
      shortId,
      createdAt: Date.now()
    };

    localQuizzesCache[shortId] = payload;

    // Fetch existing quizzes, append, and update
    try {
      const getRes = await fetch(GLOBAL_QUIZZES_BIN, { method: "GET" });
      let currentQuizzes = {};
      if (getRes.ok) {
        currentQuizzes = await getRes.json();
      }
      currentQuizzes[shortId] = payload;

      await fetch(GLOBAL_QUIZZES_BIN, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentQuizzes)
      });
    } catch (err) {
      console.warn("Could not sync quiz to cloud bin:", err.message);
    }

    return { success: true, shortId };
  } catch (error) {
    console.warn("Save quiz error:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch quiz configuration by short ID from cloud database.
 */
export const fetchQuizFromCloud = async (shortId) => {
  if (localQuizzesCache[shortId]) {
    return localQuizzesCache[shortId];
  }

  try {
    const response = await fetch(GLOBAL_QUIZZES_BIN, { method: "GET" });
    if (response.ok) {
      const quizzesMap = await response.json();
      if (quizzesMap && quizzesMap[shortId]) {
        localQuizzesCache[shortId] = quizzesMap[shortId];
        return quizzesMap[shortId];
      }
    }
  } catch (error) {
    console.warn("Fetch quiz from cloud error:", error.message);
  }
  return null;
};

/**
 * Save a friend's score to the live cloud database.
 */
export const saveScoreToCloud = async (scoreEntry) => {
  try {
    const payload = {
      ...scoreEntry,
      createdAt: Date.now()
    };

    // Add to in-memory cache
    localScoresCache.push(payload);

    // Fetch current scores from cloud bin, merge, and update PUT
    let currentList = [];
    try {
      const getRes = await fetch(GLOBAL_SCORES_BIN, { method: "GET" });
      if (getRes.ok) {
        const data = await getRes.json();
        if (Array.isArray(data)) currentList = data;
      }
    } catch (e) {
      console.warn("Could not fetch current cloud scores:", e.message);
    }

    // Deduplicate and append
    const filtered = currentList.filter(
      (item) => !(item.friendName?.toLowerCase() === payload.friendName?.toLowerCase() &&
                  item.creatorName?.toLowerCase() === payload.creatorName?.toLowerCase())
    );
    const updatedList = [payload, ...filtered];

    const putRes = await fetch(GLOBAL_SCORES_BIN, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList)
    });

    if (!putRes.ok) {
      throw new Error(`HTTP ${putRes.status}`);
    }

    return { success: true };
  } catch (error) {
    console.warn("Cloud score save error:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch live scores from cloud database.
 */
export const fetchScoresFromCloud = async () => {
  try {
    const response = await fetch(GLOBAL_SCORES_BIN, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      localScoresCache = data;
      return data;
    }
  } catch (error) {
    console.warn("Cloud score fetch error:", error.message);
  }

  return localScoresCache;
};
