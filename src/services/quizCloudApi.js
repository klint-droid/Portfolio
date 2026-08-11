/**
 * Live Zero-Credential Cloud REST API for Friend Quiz Leaderboard
 * Enables real-time cross-device score syncing across all friends.
 */

const CLOUD_API_BASE = "https://friend-quiz-leaderboard-default-rtdb.firebaseio.com/scores";

/**
 * Save a friend's score to the live cloud database.
 */
export const saveScoreToCloud = async (scoreEntry) => {
  try {
    const payload = {
      ...scoreEntry,
      createdAt: Date.now()
    };

    const response = await fetch(`${CLOUD_API_BASE}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, id: data.name };
  } catch (error) {
    console.warn("Cloud sync save fallback to local storage:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch live scores from cloud database.
 */
export const fetchScoresFromCloud = async (quizId = null, creatorName = null) => {
  try {
    const response = await fetch(`${CLOUD_API_BASE}.json`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data) return [];

    // Convert object of objects to array
    const rawList = Object.values(data);

    // Filter by quizId or creatorName if provided
    let filteredList = rawList;
    if (quizId) {
      filteredList = rawList.filter((item) => item.quizId === quizId);
    } else if (creatorName) {
      filteredList = rawList.filter(
        (item) => item.creatorName?.toLowerCase() === creatorName.toLowerCase()
      );
    }

    // Sort descending by percentage
    return filteredList.sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
  } catch (error) {
    console.warn("Cloud sync fetch fallback to local storage:", error.message);
    return [];
  }
};
