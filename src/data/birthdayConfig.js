import gcashQrImg from "../assets/qr-gcash.jpg";

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

  // Payment Options - GCash QR Only (Phone number removed for privacy & security)
  paymentMethods: [
    {
      id: "gcash",
      name: "GCash QR",
      badge: "Scan with GCash",
      accountName: "Klint Ruales",
      accountNumber: null, // Removed for privacy & security
      qrImage: gcashQrImg,
      color: "from-blue-600 to-indigo-600",
      accent: "#007dfe",
      note: "Scan using the GCash app camera or QR reader to send gifts safely without sharing phone numbers.",
    },
  ],

  // Initial wishes - empty for fresh launch
  sampleWishes: [],
};
