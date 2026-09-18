import Papa from "papaparse";

// Default curated recommendations so the section is never empty
export const DEFAULT_RECOMMENDATIONS = [
  {
    id: "def-1",
    name: "Kent John Navarro",
    role: "Software Developer",
    company: "Student at USJ-R",
    relationship: "Colleague",
    text: "Klint is very dedicated and passionate about his work. He consistently goes above and beyond to deliver high-quality results.",
    initials: "KN",
    date: "Verified Peer",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-500",
  },
  {
    id: "def-2",
    name: "Milven Sabandal",
    role: "Computer Technology",
    company: "Student at USJ-R",
    relationship: "Classmate",
    text: "Klint has a great eye for design and pays attention to detail. His creativity and problem-solving skills make him a valuable asset to any team.",
    initials: "MS",
    date: "Verified Peer",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-500",
  },
];

const LOCAL_STORAGE_KEY = "klint_local_recommendations_v1";

const CSV_URL =
  import.meta.env.VITE_RECOMMENDATIONS_SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4OlW_kTFMThEUAIV2oeJXkbOPjtXgbqfYG-Bc4ESwoBnWCnoli1xm8Za5SQEP6g5M9b6_Jds3nOe6/pub?output=csv";

const POST_URL = import.meta.env.VITE_RECOMMENDATIONS_POST_URL || "";

// Avatar color accents
const AVATAR_COLORS = [
  "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-500 dark:text-blue-400",
  "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-500 dark:text-purple-400",
  "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-500 dark:text-emerald-400",
  "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-500 dark:text-amber-400",
  "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-500 dark:text-cyan-400",
];

export const getAvatarColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

export const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "??";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Retrieve recommendations stored locally in this browser.
 */
export const getStoredLocalRecommendations = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Could not read local recommendations:", e);
  }
  return [];
};

/**
 * Save a newly written recommendation to localStorage.
 */
const saveLocalRecommendation = (item) => {
  try {
    const current = getStoredLocalRecommendations();
    const updated = [item, ...current.filter((x) => x.id !== item.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
    return [];
  }
};

/**
 * Normalizes a raw CSV object row by checking multiple possible column aliases.
 */
const normalizeRow = (row, index) => {
  const findValue = (aliases) => {
    for (const key of Object.keys(row)) {
      const cleanKey = key.trim().toLowerCase();
      if (aliases.some((alias) => cleanKey === alias || cleanKey.includes(alias))) {
        const val = row[key];
        if (val && typeof val === "string" && val.trim() !== "") {
          return val.trim();
        }
      }
    }
    return "";
  };

  const name = findValue(["name", "author", "full name", "person"]);
  const role = findValue(["role", "title", "position", "occupation", "headline"]);
  const company = findValue(["company", "organization", "school", "institution", "org"]);
  const message = findValue([
    "message",
    "recommendation",
    "testimonial",
    "feedback",
    "text",
    "review",
  ]);
  const relationship =
    findValue(["relationship", "relation", "category", "connection"]) || "Peer";
  const timestamp = findValue(["timestamp", "date", "time", "createdat"]);

  if (!name && !message) {
    return null;
  }

  let formattedDate = "Verified Peer";
  if (timestamp) {
    try {
      const parsedDate = new Date(timestamp);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      }
    } catch {
      formattedDate = timestamp;
    }
  }

  return {
    id: `sheet-${index}-${name.replace(/\s+/g, "").toLowerCase()}`,
    name: name || "Anonymous Peer",
    role: role || (company ? `Member at ${company}` : "Colleague"),
    company: company || "",
    relationship: relationship,
    text: message,
    initials: getInitials(name),
    date: formattedDate,
    color: getAvatarColor(name),
    isFromSheet: true,
  };
};

/**
 * Fetch recommendations from the published Google Sheets CSV.
 * Merges with local submissions and default fallback testimonials.
 */
export const fetchRecommendations = async () => {
  const localList = getStoredLocalRecommendations();
  let sheetList = [];

  if (CSV_URL) {
    try {
      // Add timestamp query parameter to bust browser/CDN caching
      const cacheBustUrl = `${CSV_URL}${CSV_URL.includes("?") ? "&" : "?"}_t=${Date.now()}`;
      const response = await fetch(cacheBustUrl, {
        method: "GET",
        headers: {
          Accept: "text/csv, text/plain, */*",
        },
      });

      if (response.ok) {
        const csvText = await response.text();
        if (csvText && csvText.trim().length > 0) {
          const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: "greedy",
            transformHeader: (header) => header.trim(),
          });

          if (parsed.data && Array.isArray(parsed.data)) {
            sheetList = parsed.data
              .map((row, idx) => normalizeRow(row, idx))
              .filter(Boolean);
          }
        }
      }
    } catch (err) {
      console.warn("Could not fetch Google Sheet CSV:", err.message);
    }
  }

  // Combine: [local unsynced/recent submissions] + [live Google Sheet rows]
  // Deduplicate by name + text
  const combined = [...localList];

  for (const item of sheetList) {
    const exists = combined.some(
      (c) =>
        c.name.toLowerCase() === item.name.toLowerCase() &&
        c.text.toLowerCase() === item.text.toLowerCase()
    );
    if (!exists) {
      combined.push(item);
    }
  }

  // If we still have few or zero items, merge default testimonials
  for (const def of DEFAULT_RECOMMENDATIONS) {
    const exists = combined.some(
      (c) => c.name.toLowerCase() === def.name.toLowerCase()
    );
    if (!exists) {
      combined.push(def);
    }
  }

  return combined;
};

/**
 * Submit a new recommendation.
 * - Stores optimistically in localStorage.
 * - If Google Apps Script URL is provided, posts to it.
 */
export const submitRecommendation = async ({
  name,
  role,
  company,
  relationship,
  message,
}) => {
  const newId = `rec-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const newRecommendation = {
    id: newId,
    name: name.trim(),
    role: role.trim(),
    company: (company || "").trim(),
    relationship: relationship || "Peer / Colleague",
    text: message.trim(),
    initials: getInitials(name),
    date: dateFormatted,
    color: getAvatarColor(name),
    isLocal: true,
    timestamp: now.toISOString(),
  };

  // 1. Save locally for instant optimistic UI update
  saveLocalRecommendation(newRecommendation);

  // 2. Dispatch custom event so Recommendations component updates immediately
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("recommendation-added", { detail: newRecommendation })
    );
  }

  // 3. Post to Google Apps Script Web App if URL is available
  let cloudPosted = false;
  if (POST_URL && POST_URL.trim().length > 0) {
    try {
      const payload = {
        timestamp: now.toISOString(),
        name: newRecommendation.name,
        role: newRecommendation.role,
        company: newRecommendation.company,
        message: newRecommendation.text,
        relationship: newRecommendation.relationship,
      };

      // Google Apps Script requires 'no-cors' mode from browser
      await fetch(POST_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      cloudPosted = true;
    } catch (err) {
      console.warn("Could not POST recommendation to Apps Script:", err.message);
    }
  }

  return {
    success: true,
    item: newRecommendation,
    cloudPosted,
  };
};
