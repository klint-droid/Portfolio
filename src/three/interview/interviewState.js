import * as THREE from "three";

export const CAMERA_PRESETS = {
  title: {
    position: [2.6, 2.05, 3.2],
    target: [0, 1.25, -1.85],
  },
  explore: {
    position: [0.2, 1.72, 3.1],
    target: [0, 1.25, -1.6],
  },
  seated: {
    position: [-0.08, 1.46, 0.22],
    target: [0.14, 1.34, -2.05],
  },
  seatedThird: {
    position: [-1.05, 1.72, 1.78],
    target: [0.18, 1.28, -1.95],
  },
  projects: {
    position: [-2.6, 1.65, -0.4],
    target: [-5.6, 1.45, -1.0],
  },
  stack: {
    position: [2.35, 1.75, 0.9],
    target: [4.65, 1.15, -0.25],
  },
  career: {
    position: [-2.85, 1.78, -2.15],
    target: [-3.35, 1.75, -5.1],
  },
  resume: {
    position: [0.85, 1.52, -0.1],
    target: [0.82, 0.86, -1.12],
  },
};

export const STATION_STAND_SPOTS = {
  projects: { pos: [-3.6, 0, -0.9], yaw: -Math.PI / 2 },
  stack: { pos: [3.2, 0, -0.1], yaw: Math.PI / 2 },
  career: { pos: [-3.35, 0, -3.5], yaw: Math.PI },
  resume: { pos: [0.95, 0, 0.35], yaw: Math.PI + 0.15 },
};

export const STATIONS = [
  {
    id: "seated",
    label: "Interview Klint",
    shortLabel: "Desk",
    hint: "Sit across from Klint",
    clueId: "met-klint",
    clueTitle: "Face-to-Face Interview",
    scoreBoost: { culture: 20, frontend: 10 },
    position: [0, 1.85, -1.8],
  },
  {
    id: "projects",
    label: "Projects Monitor",
    shortLabel: "Projects",
    hint: "Inspect 11 shipped apps",
    clueId: "inspected-projects",
    clueTitle: "10+ Shipped Products",
    scoreBoost: { velocity: 35, frontend: 20 },
    position: [-5.5, 2.25, -1.0],
  },
  {
    id: "stack",
    label: "Tech Stack Console",
    shortLabel: "Stack",
    hint: "Explore full-stack skills",
    clueId: "inspected-stack",
    clueTitle: "Full-Stack & AWS Cloud",
    scoreBoost: { backend: 35, frontend: 20 },
    position: [4.65, 2.05, -0.25],
  },
  {
    id: "career",
    label: "Career & Awards Wall",
    shortLabel: "Career",
    hint: "Kyocera, JP Morgan, Certs",
    clueId: "inspected-career",
    clueTitle: "Enterprise & Awards Track",
    scoreBoost: { culture: 30, velocity: 20 },
    position: [-3.35, 2.55, -4.9],
  },
  {
    id: "resume",
    label: "Resume Dossier",
    shortLabel: "Resume",
    hint: "Inspect & download CV",
    clueId: "inspected-resume",
    clueTitle: "Official Resume Verified",
    scoreBoost: { velocity: 15, backend: 15 },
    position: [0.82, 1.18, -1.12],
  },
];

export const INTERVIEW_ROUNDS = [
  {
    id: "intro",
    round: "Round 01",
    label: "2-Min Recruiter Brief",
    prompt: "Give me the 2-minute recruiter summary of Klint's experience and strengths",
    scoreBoost: { culture: 20, velocity: 15 },
    clueId: "q-intro",
    clueTitle: "Executive Pitch",
  },
  {
    id: "frontend",
    round: "Round 02",
    label: "React & Design Craft",
    prompt: "How strong is his React experience?",
    scoreBoost: { frontend: 30, velocity: 10 },
    clueId: "q-react",
    clueTitle: "React & UI Mastery",
  },
  {
    id: "projects",
    round: "Round 03",
    label: "Shipped Projects",
    prompt: "What kind of projects has Klint worked on?",
    scoreBoost: { velocity: 30, frontend: 15 },
    clueId: "q-projects",
    clueTitle: "Production Architecture",
  },
  {
    id: "backend",
    round: "Round 04",
    label: "Backend, AWS & DevOps",
    prompt: "Tell me about his Cloud & DevOps architecture",
    scoreBoost: { backend: 35 },
    clueId: "q-cloud",
    clueTitle: "Cloud & Backend Depth",
  },
  {
    id: "abtesting",
    round: "Round 05",
    label: "A/B Testing & Perf",
    prompt: "Tell me about his experience with A/B testing and performance optimization",
    scoreBoost: { frontend: 20, backend: 15 },
    clueId: "q-perf",
    clueTitle: "Data-Driven Optimization",
  },
  {
    id: "whyhire",
    round: "Final Round",
    label: "Why Hire Klint?",
    prompt: "Why should I consider him for a Software Engineer role?",
    scoreBoost: { culture: 30, velocity: 20 },
    clueId: "q-whyhire",
    clueTitle: "Hiring Case Closed",
  },
];

export const FEATURED_PROJECTS = [
  {
    name: "DoseDay",
    tagline: "Daily Medication & Health Adherence Platform",
    description:
      "Mobile platform built to help patients stay consistent with dosage schedules, reminders, and prescription tracking.",
    tech: ["Dart", "Flutter", "Mobile UX"],
    link: "https://getdoseday.vercel.app",
    isInternal: false,
    accent: "#D97757",
  },
  {
    name: "EvaTrack Capstone",
    tagline: "Enterprise Workflow & Evaluation Platform",
    description:
      "Full-stack institutional tracking and evaluation platform with role-based access control, automated reports, and REST APIs.",
    tech: ["Laravel", "PHP", "MySQL", "React"],
    link: "https://github.com/klint-droid",
    isInternal: false,
    accent: "#E2A055",
  },
  {
    name: "Friend Quiz & Leaderboard",
    tagline: "Viral Interactive Social Web App",
    description:
      "Interactive quiz platform with shareable encoded URLs, friendship tier scoring, and a live ranked leaderboard.",
    tech: ["React", "Tailwind CSS", "Web Storage API"],
    link: "/friend-quiz",
    isInternal: true,
    accent: "#5EEAD4",
  },
  {
    name: "POSify",
    tagline: "Full-Stack POS & Customer Debt Analytics",
    description:
      "Point-of-Sale and credit (utang) management system with real-time order processing, profit margins, and dashboard insights.",
    tech: ["C#", "ASP.NET MVC", "EF Core", "SQL Server"],
    link: "https://github.com/klint-droid/simple-pos",
    isInternal: false,
    accent: "#A78BFA",
  },
  {
    name: "Evacuation Assistant AI",
    tagline: "Disaster Preparedness Generator (PH)",
    description:
      "AI-powered preparedness tool generating household evacuation plans, supply quantities, and urgency assessments for typhoons & floods.",
    tech: ["AWS PartyRock", "LLM", "AWS"],
    link: "https://partyrock.aws/u/thisisklint/APJz77mmS/new-app-APJz77mmS",
    isInternal: false,
    accent: "#F59E0B",
  },
  {
    name: "Student Grade Predictor",
    tagline: "Machine Learning Academic Forecaster",
    description:
      "Predictive ML web app forecasting student grades from study habits, historical performance, and attendance patterns.",
    tech: ["Python", "Streamlit", "Scikit-learn"],
    link: "https://grade-predict.streamlit.app/",
    isInternal: false,
    accent: "#38BDF8",
  },
];

export const TECH_STACK_ITEMS = [
  { name: "React 19", category: "Frontend", level: 92, color: "#61DAFB" },
  { name: "TypeScript / JS", category: "Frontend", level: 88, color: "#F59E0B" },
  { name: "Tailwind CSS", category: "Design", level: 94, color: "#38BDF8" },
  { name: "Three.js / R3F", category: "WebGL", level: 78, color: "#D97757" },
  { name: "Laravel / PHP", category: "Backend", level: 84, color: "#F97316" },
  { name: "Node.js", category: "Backend", level: 82, color: "#4ADE80" },
  { name: "Python & ML", category: "Backend / AI", level: 86, color: "#FACC15" },
  { name: "C# / ASP.NET", category: "Enterprise", level: 80, color: "#A78BFA" },
  { name: "SQL / MySQL", category: "Database", level: 86, color: "#60A5FA" },
  { name: "AWS & Docker", category: "Cloud / DevOps", level: 80, color: "#FB923C" },
];

export const CAREER_MILESTONES = [
  {
    year: "2026",
    role: "Software Engineer Intern",
    org: "Kyocera Document Solutions Philippines, Inc.",
    type: "Work",
    desc: "Engineering web services, document workflow tools, and enterprise software solutions.",
  },
  {
    year: "2026",
    role: "Associate Degree in Computer Technology (Software Dev)",
    org: "University of San Jose - Recoletos (USJ-R)",
    type: "Education",
    desc: "Major in Software Development — DSA, OOP, Database Systems, and Web Architecture.",
  },
  {
    year: "2025",
    role: "Breakout Session Participant",
    org: "JP Morgan Chase & Co",
    type: "Immersion",
    desc: "Financial technology architecture, enterprise engineering practices, and leadership.",
  },
  {
    year: "2025",
    role: "Youth Empowerment Participant",
    org: "Synchrony",
    type: "Immersion",
    desc: "Agile team delivery, tech innovation workshops, and career acceleration.",
  },
  {
    year: "2025",
    role: "Digital Designer",
    org: "Datawords Philippines",
    type: "Work",
    desc: "Multi-variant localized UI assets and media layouts for international clients.",
  },
  {
    year: "2024",
    role: "3rd Place — Wakuworks Social Innovation",
    org: "First Line of Code & Hackathon Win",
    type: "Award",
    desc: "Started coding and shipped 10+ web, mobile, and ML apps in under two years.",
  },
];

export const CERTIFICATIONS_HIGHLIGHTS = [
  {
    name: "Using Python to Interact with the Operating System",
    issuer: "Google / Coursera",
  },
  {
    name: "Crash Course on Python",
    issuer: "Google / Coursera",
  },
  {
    name: "Foundations of Cybersecurity",
    issuer: "Google / Coursera",
  },
  {
    name: "Tech Talk: Generative AI & Innovation",
    issuer: "Accenture",
  },
];

export const PEER_QUOTES = [
  {
    quote:
      "Klint is very dedicated and passionate about his work. He consistently goes above and beyond to deliver high-quality results.",
    author: "Kent John Navarro",
    role: "Software Developer • USJ-R",
  },
  {
    quote:
      "Klint has a great eye for design and pays attention to detail. His creativity and problem-solving skills make him a valuable asset to any team.",
    author: "Milven Sabandal",
    role: "Computer Technology Specialist • USJ-R",
  },
];

export const COFFEE_QUIPS = [
  "Ah, iced Americano fuel! That mug is directly responsible for at least four production deployments.",
  "Careful, still warm! I usually brew a fresh cup right before diving into React performance profiling.",
  "Fun fact: my best debugging breakthroughs happen right after sip #3.",
  "Coffee + dark mode + clean TypeScript types — that's the Cebu late-night shipping formula.",
];

export const INITIAL_SCORECARD = {
  frontend: 28,
  backend: 24,
  velocity: 30,
  culture: 26,
};

export function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function getOverallScore(scorecard) {
  const vals = Object.values(scorecard);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

/**
 * Converts a full KlintGPT markdown response into an ordered array of crisp,
 * natural spoken segments so Klint voices out the ENTIRE answer sentence-by-sentence
 * without ever cutting off or overflowing the 3D speech bubble.
 */
export function buildSpokenSegments(rawMarkdown = "") {
  const cleanedLines = rawMarkdown
    .split("\n")
    .map((line) =>
      line
        .replace(/^###\s*/, "")
        .replace(/^>\s*/, "")
        .replace(/^[-•]\s*/, "")
        .replace(/^\d+\.\s*/, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/[`*_]/g, "")
        // Strip leading emojis/symbols so TTS doesn't read "rocket" or "sparkles" awkwardly
        .replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F⚡⭐🚀⚛️🧪🛠️☁️💼🎓📬💡🛡️👋🎉☕]+\s*/gu, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean);

  const segments = [];

  for (const line of cleanedLines) {
    // Split long paragraphs by sentence boundaries (. ! ?) while keeping short lines intact
    const sentences = line.match(/[^.!?]+(?:[.!?]+|$)/g) || [line];
    let buffer = "";

    for (const rawSentence of sentences) {
      const s = rawSentence.trim();
      if (!s) continue;

      if (!buffer) {
        buffer = s;
      } else if ((buffer + " " + s).length <= 155) {
        buffer = `${buffer} ${s}`;
      } else {
        segments.push(buffer);
        buffer = s;
      }
    }

    if (buffer) {
      // If a single sentence is still super long, split gently at a comma/colon/dash
      if (buffer.length > 185) {
        const subParts = buffer.split(/(?<=[,;—–:])\s+/);
        let subBuf = "";
        for (const sp of subParts) {
          if (!subBuf) subBuf = sp;
          else if ((subBuf + " " + sp).length <= 165) subBuf = `${subBuf} ${sp}`;
          else {
            segments.push(subBuf);
            subBuf = sp;
          }
        }
        if (subBuf) segments.push(subBuf);
      } else {
        segments.push(buffer);
      }
    }
  }

  return segments.length > 0 ? segments : ["I'm ready whenever you are!"];
}

export const ROOM_BOUNDS = {
  minX: -4.8,
  maxX: 4.8,
  minZ: -3.2,
  maxZ: 4.2,
};

export const DESK_COLLIDER = new THREE.Box2(
  new THREE.Vector2(-1.85, -2.55),
  new THREE.Vector2(1.85, -0.45)
);
