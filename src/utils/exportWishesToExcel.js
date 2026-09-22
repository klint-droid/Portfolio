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

// Default initial headers and structure
const headers = [
  "Wish ID",
  "Date & Time",
  "Sender Name",
  "Relationship",
  "Vibe / Sticker",
  "Birthday Message",
  "Status"
];

// Sample template or existing wishes
const initialWishes = [
  {
    id: "WISH-001",
    timestamp: new Date().toLocaleString(),
    name: "Sample Friend",
    relationship: "Friend",
    emoji: "🎂",
    message: "Happy Birthday Klint! Wishing you more success, happiness, and clean code ahead! 🚀",
    status: "Received"
  }
];

export function exportWishes(wishes = initialWishes) {
  const rows = wishes.map((w, index) => ({
    "Wish ID": w.id || `WISH-${String(index + 1).padStart(3, "0")}`,
    "Date & Time": w.timestamp || new Date().toLocaleString(),
    "Sender Name": w.name || "Anonymous",
    "Relationship": w.relationship || "Friend",
    "Vibe / Sticker": w.emoji || "🎂",
    "Birthday Message": w.message || "",
    "Status": "Received"
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });

  // Set column widths for readability in Excel
  worksheet["!cols"] = [
    { wch: 14 }, // Wish ID
    { wch: 22 }, // Date & Time
    { wch: 22 }, // Sender Name
    { wch: 18 }, // Relationship
    { wch: 15 }, // Vibe / Sticker
    { wch: 60 }, // Birthday Message
    { wch: 12 }  // Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Birthday Wishes");

  // Write Excel file (.xlsx)
  XLSX.writeFile(workbook, xlsxPath);
  console.log(`✅ Successfully generated Excel file at: ${xlsxPath}`);

  // Also write CSV file for convenience (.csv)
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);
  fs.writeFileSync(csvPath, csvContent, "utf8");
  console.log(`✅ Successfully generated CSV file at: ${csvPath}`);

  return { xlsxPath, csvPath };
}

// If executed directly via node
if (process.argv[1] === __filename) {
  exportWishes();
}
