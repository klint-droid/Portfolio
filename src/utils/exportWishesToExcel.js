import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as XLSX from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target output files
const dataDir = path.resolve(__dirname, "../data");
const xlsxPath = path.join(dataDir, "birthday_wishes.xlsx");
const csvPath = path.join(dataDir, "birthday_wishes.csv");

// Table Columns for Excel
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

const BIRTHDAY_BIN_URL = "https://extendsclass.com/api/json-storage/bin/acaaeae";

/**
 * Fetch wishes from cloud storage or Firebase
 */
async function fetchRemoteWishes() {
  console.log("🔄 Fetching live birthday wishes from database...");
  try {
    const response = await fetch(`${BIRTHDAY_BIN_URL}?t=${Date.now()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        console.log(`📥 Retrieved ${data.length} wish(es) from cloud database.`);
        return data;
      }
    }
  } catch (err) {
    console.warn("⚠️ Could not fetch from cloud bin:", err.message);
  }

  // Fallback sample if database is fresh/empty
  console.log("ℹ️ No remote records found or empty, using current template structure.");
  return [
    {
      id: "WISH-001",
      timestamp: new Date().toLocaleString(),
      name: "Sample Friend",
      relationship: "Friend",
      emoji: "🎂",
      message: "Happy Birthday Klint! Wishing you more success, happiness, and clean code ahead! 🚀",
      likes: 1,
      status: "Received"
    }
  ];
}

/**
 * Export wishes into formatted .xlsx and .csv files
 */
export async function exportWishesToExcel(customWishes = null) {
  const wishes = customWishes || (await fetchRemoteWishes());

  const rows = wishes.map((w, index) => ({
    "Wish ID": w.id || `WISH-${String(index + 1).padStart(3, "0")}`,
    "Date & Time": w.timestamp || new Date().toLocaleString(),
    "Sender Name": w.name || "Anonymous",
    "Relationship": w.relationship || "Friend",
    "Vibe / Sticker": w.emoji || "🎂",
    "Birthday Message": w.message || "",
    "Likes": w.likes || 1,
    "Status": "Received"
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });

  // Set column widths for clean readability in Excel
  worksheet["!cols"] = [
    { wch: 14 }, // Wish ID
    { wch: 22 }, // Date & Time
    { wch: 22 }, // Sender Name
    { wch: 18 }, // Relationship
    { wch: 15 }, // Vibe / Sticker
    { wch: 60 }, // Birthday Message
    { wch: 10 }, // Likes
    { wch: 12 }  // Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Birthday Wishes");

  // Ensure target folder exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write Excel file (.xlsx)
  XLSX.writeFile(workbook, xlsxPath);
  console.log(`✅ Successfully exported ${rows.length} wish(es) to Excel: ${xlsxPath}`);

  // Write CSV file (.csv)
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);
  fs.writeFileSync(csvPath, csvContent, "utf8");
  console.log(`✅ Successfully exported CSV file: ${csvPath}`);

  return { xlsxPath, csvPath, count: rows.length };
}

// Auto-run if executed directly via Node
if (process.argv[1] === __filename) {
  exportWishesToExcel().catch((err) => {
    console.error("❌ Export failed:", err);
  });
}
