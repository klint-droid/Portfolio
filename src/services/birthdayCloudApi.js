/**
 * Live Zero-Credential Cloud REST API for Birthday Wishes
 * Enables real-time cross-device syncing across all visitors without Firebase keys.
 */

const BIRTHDAY_BIN_URL = "https://extendsclass.com/api/json-storage/bin/acaaeae";
const LOCAL_STORAGE_KEY = "klint_birthday_wishes_v2";

/**
 * Fetch all live birthday wishes from the cloud.
 * Falls back seamlessly to localStorage cache if offline.
 */
export const fetchCloudWishes = async () => {
  try {
    const response = await fetch(`${BIRTHDAY_BIN_URL}?t=${Date.now()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Cloud returned status ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      // Sync to localStorage as offline cache
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn("Could not cache wishes to localStorage:", e);
      }
      return data;
    }
  } catch (error) {
    console.warn("Could not fetch wishes from cloud, falling back to local cache:", error.message);
  }

  // Fallback to local cache
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn("Local cache read error:", e);
  }

  return [];
};

/**
 * Save a new birthday wish to the cloud database.
 * Syncs across all devices so Klint and other visitors can see it.
 */
export const saveWishToCloud = async (newWish) => {
  try {
    // 1. Get current list
    let currentWishes = await fetchCloudWishes();
    if (!Array.isArray(currentWishes)) {
      currentWishes = [];
    }

    // 2. Prepend the new wish
    const updatedList = [newWish, ...currentWishes];

    // 3. Update localStorage immediately for fast local response
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {}

    // 4. Update the cloud bin
    const response = await fetch(BIRTHDAY_BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedList),
    });

    if (!response.ok) {
      throw new Error(`Cloud update returned status ${response.status}`);
    }

    return { success: true, wishes: updatedList };
  } catch (error) {
    console.warn("Failed to update cloud wish:", error.message);
    // Even if cloud write fails, local copy is saved
    return { success: false, error: error.message };
  }
};

/**
 * Like a wish and synchronize the like counter in the cloud.
 */
export const likeWishInCloud = async (wishId) => {
  try {
    let currentWishes = await fetchCloudWishes();
    if (!Array.isArray(currentWishes)) return;

    const updatedList = currentWishes.map((w) =>
      w.id === wishId ? { ...w, likes: (w.likes || 0) + 1 } : w
    );

    // Save locally
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {}

    // Push to cloud in background
    fetch(BIRTHDAY_BIN_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    }).catch((err) => console.warn("Like sync error:", err));

    return updatedList;
  } catch (err) {
    console.warn("Like wish error:", err);
  }
};
