import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";

// Firebase credentials from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Verify if the environment variables are provided
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY"
  );
};

// Initialize Firebase app if configured
let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firebase initialization error:", err);
  }
}

export { db };

const COLLECTION_NAME = "birthday_wishes";
const LOCAL_STORAGE_KEY = "klint_birthday_wishes_v2";

/**
 * Subscribe to live birthday wishes in real time using Firebase onSnapshot.
 * When a visitor posts a wish, Firebase pushes it live to all connected devices.
 */
export const subscribeToBirthdayWishes = (onUpdate, onError) => {
  // If Firebase is not configured yet, fallback to localStorage
  if (!db) {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list = cached ? JSON.parse(cached) : [];
      onUpdate(list);
    } catch {
      onUpdate([]);
    }
    return () => {}; // No-op unsubscribe
  }

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const wishes = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            // Format timestamp nicely if available
            timestamp: data.createdAt?.toDate
              ? formatTimeAgo(data.createdAt.toDate())
              : "Recently",
          };
        });

        // Update local cache
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishes));
        } catch {
          // Ignore cache write error
        }

        onUpdate(wishes);
      },
      (error) => {
        console.warn("Firestore onSnapshot subscription error:", error.message);
        if (onError) onError(error);
        // Fallback to cache on error
        try {
          const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (cached) onUpdate(JSON.parse(cached));
        } catch {
          // Ignore fallback error
        }
      }
    );

    return unsubscribe;
  } catch (error) {
    console.warn("Could not set up Firestore listener:", error);
    return () => {};
  }
};

/**
 * Send a new birthday wish to Firestore.
 */
export const sendBirthdayWish = async ({ name, relationship, emoji, message }) => {
  const newWish = {
    name: name.trim(),
    relationship: relationship || "Friend",
    emoji: emoji || "🎂",
    message: message.trim(),
    likes: 1,
  };

  if (!db) {
    // Local fallback if Firebase keys are not provided yet
    const localWish = {
      id: `local-${Date.now()}`,
      ...newWish,
      timestamp: "Just now",
      createdAt: Date.now(),
    };
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list = cached ? JSON.parse(cached) : [];
      const updated = [localWish, ...list];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { success: true, wish: localWish };
    } catch {
      return { success: true, wish: localWish };
    }
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...newWish,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      wish: {
        id: docRef.id,
        ...newWish,
        timestamp: "Just now",
      },
    };
  } catch (error) {
    console.error("Error saving wish to Firestore:", error);
    throw error;
  }
};

/**
 * Like a wish in Firestore.
 */
export const likeBirthdayWish = async (wishId) => {
  if (!db || wishId.startsWith("local-")) {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const list = JSON.parse(cached);
        const updated = list.map((w) =>
          w.id === wishId ? { ...w, likes: (w.likes || 0) + 1 } : w
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {
      // Ignore cache error
    }
    return;
  }

  try {
    const wishRef = doc(db, COLLECTION_NAME, wishId);
    await updateDoc(wishRef, {
      likes: increment(1),
    });
  } catch (error) {
    console.warn("Could not increment wish like in Firestore:", error.message);
  }
};

// Helper to format timestamps (e.g., "5m ago", "2h ago")
function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
