/**
 * Birthday Celebration Configuration
 * Customize your birthday date, profile details, payment accounts, and QR codes here.
 */

// Target date for the birthday celebration countdown
// Tip: Format as "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss"
export const BIRTHDAY_CONFIG = {
  // Set your upcoming birthday date here (e.g. October 15, 2026)
  targetDate: "2026-09-23T00:00:00",
  
  name: "Klint Ruales",
  nickname: "Klint",
  ageOrMilestone: "Another Year of Code & Innovation",
  tagline: "Leveling up another year in the tech realm! 🚀",
  subheading:
    "Thanks for visiting my portfolio! Since my birthday is approaching, I put together this fun corner where you can drop a birthday wish on my live wall or send a celebratory treat!",
  
  // The Gift / Payment QR Twist Section
  giftMessage:
    "No pressure at all! Your wishes and visit are the best gift. But if you want to fuel the celebration with a birthday coffee, beer, or pizza, feel free to scan below! ☕🍺🍕",

  // Payment Options & Bank / QR details
  // Note: If qrImage is left as null or an image isn't found, an aesthetic QR visual will be generated automatically!
  // To use your real QR code, place your image (e.g., 'gcash-qr.png') inside the /public folder and set qrImage: '/gcash-qr.png'
  paymentMethods: [
    {
      id: "gcash",
      name: "GCash",
      badge: "E-Wallet (PH)",
      accountName: "Klint Ruales",
      accountNumber: "09363488084", // Replace with your GCash number
      qrImage: null, // e.g. "/gcash-qr.png"
      color: "from-blue-600 to-indigo-600",
      accent: "#007dfe",
      note: "Instant transfer via GCash Express Send or QR",
    },
    {
      id: "bank",
      name: "Bank Transfer / QRPh",
      badge: "Any PH Bank",
      bankName: "BPI / BDO / UnionBank", // Replace with your bank name
      accountName: "Klint Ruales",
      accountNumber: "#", // Replace with your Bank account number
      qrImage: null, // e.g. "/qrph.png"
      color: "from-purple-600 to-pink-600",
      accent: "#a855f7",
      note: "Universal QRPh scan supported by BPI, BDO, UnionBank, RCBC, etc.",
    }
  ],

  // Initial wishes - empty for fresh launch
  sampleWishes: [],
};
