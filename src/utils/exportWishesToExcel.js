import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as XLSX from "xlsx";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const rootDir = path.resolve(__dirname, "../../");
const envPath = path.join(rootDir, ".env");
const dataDir = path.resolve(__dirname, "../data");
const xlsxPath = path.join(dataDir, "birthday_wishes.xlsx");
const csvPath = path.join(dataDir, "birthday_wishes.csv");

// Helper to manually parse .env if present
function parseEnv(filePath) {
  const env = {};
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        let val = trimmed.substring(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        env[key] = val;
      }
    }
  }
  return env;
}

const envVars = { ...process.env, ...parseEnv(envPath) };

const firebaseConfig = {
  apiKey: envVars.VITE_FIREBASE_API_KEY,
  authDomain: envVars.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envVars.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.VITE_FIREBASE_APP_ID,
};

const headers = [
  "Wish ID",
  "Date & Time",
  "Sender Name",
  "Relationship",
  "Vibe / Sticker",
  "Birthday Message",
  "Likes",
  "Status"
];

async function fetchWishesFromFirestore() {
  console.log("🔥 Connecting to Firebase Firestore Database...");
  console.log(`📌 Project ID: ${firebaseConfig.projectId || "Not specified"}`);

  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || firebaseConfig.apiKey === "YOUR_FIREBASE_API_KEY") {
    console.warn("⚠️ Firebase credentials not found or incomplete in .env. Checking fallback sources...");
    return null;
  }

  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);

    const q = query(
      collection(db, "birthday_wishes"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    console.log(`📥 Fetched ${snapshot.docs.length} document(s) from Firebase Firestore 'birthday_wishes' collection.`);

    const wishes = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      let formattedDate = "Recently";
      if (data.createdAt?.toDate) {
        formattedDate = data.createdAt.toDate().toLocaleString();
      } else if (data.createdAt && typeof data.createdAt === "number") {
        formattedDate = new Date(data.createdAt).toLocaleString();
      } else if (data.timestamp) {
        formattedDate = data.timestamp;
      }

      return {
        id: docSnap.id,
        timestamp: formattedDate,
        name: data.name || "Anonymous",
        relationship: data.relationship || "Friend",
        emoji: data.emoji || "🎂",
        message: data.message || "",
        likes: data.likes || 1,
        status: "Received in Firebase"
      };
    });

    return wishes;
  } catch (err) {
    console.error("❌ Firebase Firestore query error:", err.message);
    return null;
  }
}

export async function exportWishesToExcel() {
  let wishes = await fetchWishesFromFirestore();

  if (!wishes || wishes.length === 0) {
    console.log("ℹ️ No wishes found in Firebase. Checking local template...");
    wishes = [
      {
        id: "WISH-SAMPLE",
        timestamp: new Date().toLocaleString(),
        name: "Sample Friend",
        relationship: "Friend",
        emoji: "🎂",
        message: "No wishes found in database yet.",
        likes: 1,
        status: "Template"
      }
    ];
  }

  const rows = wishes.map((w, index) => ({
    "Wish ID": w.id || `WISH-${String(index + 1).padStart(3, "0")}`,
    "Date & Time": w.timestamp || new Date().toLocaleString(),
    "Sender Name": w.name || "Anonymous",
    "Relationship": w.relationship || "Friend",
    "Vibe / Sticker": w.emoji || "🎂",
    "Birthday Message": w.message || "",
    "Likes": w.likes || 1,
    "Status": w.status || "Received in Firebase"
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });

  // Column widths
  worksheet["!cols"] = [
    { wch: 24 }, // Wish ID
    { wch: 24 }, // Date & Time
    { wch: 22 }, // Sender Name
    { wch: 18 }, // Relationship
    { wch: 15 }, // Vibe / Sticker
    { wch: 60 }, // Birthday Message
    { wch: 10 }, // Likes
    { wch: 24 }  // Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Firebase Birthday Wishes");

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Attempt to write Excel file (.xlsx)
  let savedXlsxPath = xlsxPath;
  try {
    XLSX.writeFile(workbook, xlsxPath);
    console.log(`✅ Excel file written: ${xlsxPath}`);
  } catch (e) {
    if (e.code === "EBUSY") {
      console.warn(`⚠️ '${xlsxPath}' is currently open in Excel. Writing to backup file...`);
      savedXlsxPath = path.join(dataDir, "birthday_wishes_firebase.xlsx");
      XLSX.writeFile(workbook, savedXlsxPath);
      console.log(`✅ Excel file written to: ${savedXlsxPath}`);
    } else {
      throw e;
    }
  }

  // Attempt to write CSV file (.csv)
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);
  try {
    fs.writeFileSync(csvPath, csvContent, "utf8");
    console.log(`✅ CSV file written:   ${csvPath}`);
  } catch (e) {
    if (e.code === "EBUSY") {
      const altCsvPath = path.join(dataDir, "birthday_wishes_firebase.csv");
      fs.writeFileSync(altCsvPath, csvContent, "utf8");
      console.log(`✅ CSV file written to: ${altCsvPath}`);
    } else {
      throw e;
    }
  }

  console.log(`\n🎉 SUCCESS! Exported ${rows.length} Firebase wish(es) to Excel!`);
  return { xlsxPath: savedXlsxPath, count: rows.length, rows };
}

// Execute
exportWishesToExcel()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Fatal export error:", err);
    process.exit(1);
  });
