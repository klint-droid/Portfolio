import { FEATURED_PROJECTS, clampScore } from "./interviewState";

/**
 * Sample Job Descriptions so interviewers/visitors can test instant JD evaluation in 1 click
 */
export const SAMPLE_JDS = [
  {
    id: "frontend",
    title: "Frontend / React Engineer",
    text: `We are hiring a Frontend Software Engineer to build fast, responsive web applications using React, TypeScript, and Tailwind CSS. You will collaborate closely with product designers, run A/B experiments to improve conversion, optimize Core Web Vitals, integrate REST APIs, and work with Git in an agile team. Bonus: Three.js / WebGL or design systems experience.`,
  },
  {
    id: "fullstack",
    title: "Full-Stack Software Engineer",
    text: `Seeking a Full-Stack Developer proficient in React, JavaScript/TypeScript, and backend frameworks such as Node.js, Laravel (PHP), Python, or C# ASP.NET. Must be comfortable designing relational SQL databases (MySQL/SQL Server), building REST APIs, containerizing with Docker, and deploying to AWS (EC2, S3, RDS, Lambda). Strong ownership and shipping velocity required.`,
  },
  {
    id: "mobile-ai",
    title: "Product Engineer (Mobile & AI)",
    text: `Looking for a versatile Software Engineer who can ship cross-platform mobile apps (Flutter, Dart, or Ionic), prototype AI / LLM features, analyze data with Python / Machine Learning, and craft clean user interfaces with strong attention to detail and cybersecurity awareness.`,
  },
];

/**
 * Klint's verified skill catalog with regex matchers, category axis, proof evidence, and matched project names
 */
const KLINT_SKILLS = [
  {
    id: "react",
    label: "React / Modern Frontend",
    axis: "frontend",
    patterns: [/\breact(\.js|js| 18| 19)?\b/i, /\bfrontend\b/i, /\bfront-end\b/i, /\bspa\b/i],
    proof: "Built React 19 apps (Friend Quiz, 3D Studio Portfolio) + authored the React Guided Learning Path.",
    projects: ["Friend Quiz & Leaderboard", "EvaTrack Capstone"],
  },
  {
    id: "typescript",
    label: "TypeScript / JavaScript",
    axis: "frontend",
    patterns: [/\btypescript\b/i, /\bjavascript\b/i, /\bes6\b/i, /\bjs\/ts\b/i, /\bts\b/i],
    proof: "Production TypeScript & ES6+ across React, Ionic mobile, and client portfolio builds.",
    projects: ["Friend Quiz & Leaderboard"],
  },
  {
    id: "tailwind-css",
    label: "Tailwind CSS & Responsive UI",
    axis: "frontend",
    patterns: [/\btailwind\b/i, /\bcss3?\b/i, /\bhtml5?\b/i, /\bresponsive\b/i, /\bui\/ux\b/i, /\bdesign system/i, /\bfigma\b/i, /\bui\b/i],
    proof: "Former Digital Designer at Datawords Philippines — strong typography, accessibility & Tailwind UI craft.",
    projects: ["Friend Quiz & Leaderboard", "DoseDay"],
  },
  {
    id: "threejs",
    label: "Three.js / WebGL / 3D",
    axis: "frontend",
    patterns: [/\bthree\.?js\b/i, /\bwebgl\b/i, /\b3d\b/i, /\bcanvas\b/i, /\bgraphics\b/i],
    proof: "Built this interactive Three.js / React Three Fiber 3D Interview Studio & Canvas games.",
    projects: ["Friend Quiz & Leaderboard"],
  },
  {
    id: "ab-testing",
    label: "A/B Testing, Analytics & Perf",
    axis: "frontend",
    patterns: [/\ba\/b\b/i, /\bab test/i, /\bexperiment/i, /\bweb vitals\b/i, /\bperformance\b/i, /\banalytics\b/i, /\bga4\b/i, /\bconversion\b/i, /\boptimi[zs]/i],
    proof: "Ran multi-variant localized landing page tests at Datawords + Vite code-splitting & GA4 telemetry.",
    projects: ["Friend Quiz & Leaderboard"],
  },
  {
    id: "laravel-php",
    label: "Laravel / PHP",
    axis: "backend",
    patterns: [/\blaravel\b/i, /\bphp\b/i],
    proof: "Architected EvaTrack Capstone enterprise workflow APIs with Laravel, Eloquent ORM, and RBAC.",
    projects: ["EvaTrack Capstone"],
  },
  {
    id: "nodejs",
    label: "Node.js / Express",
    axis: "backend",
    patterns: [/\bnode(\.js|js)?\b/i, /\bexpress(\.js)?\b/i, /\bbackend\b/i, /\bback-end\b/i, /\bfull-?stack\b/i],
    proof: "Full-stack Node.js & REST API delivery alongside modern React frontends.",
    projects: ["EvaTrack Capstone", "POSify"],
  },
  {
    id: "python-ml",
    label: "Python / Machine Learning",
    axis: "backend",
    patterns: [/\bpython\b/i, /\bmachine learning\b/i, /\bml\b/i, /\bscikit\b/i, /\bstreamlit\b/i, /\bfastapi\b/i, /\bautomation\b/i],
    proof: "Google-certified in Python OS automation & shipped the Student Grade Predictor ML app.",
    projects: ["Student Grade Predictor"],
  },
  {
    id: "csharp-dotnet",
    label: "C# / ASP.NET / Java",
    axis: "backend",
    patterns: [/\bc#\b/i, /\basp\.net\b/i, /\b\.net\b/i, /\bdotnet\b/i, /\bentity framework\b/i, /\bjava\b/i, /\bspring\b/i, /\bmvc\b/i, /\boop\b/i],
    proof: "Built POSify full-stack POS & analytics dashboard in C# ASP.NET MVC + Java enterprise/desktop apps.",
    projects: ["POSify"],
  },
  {
    id: "rest-api",
    label: "REST APIs & Architecture",
    axis: "backend",
    patterns: [/\brest(ful)?\b/i, /\bapis?\b/i, /\bweb services?\b/i, /\bmiddleware\b/i, /\bauth(entication)?\b/i],
    proof: "Engineering enterprise web services at Kyocera Document Solutions & REST backends across capstones.",
    projects: ["EvaTrack Capstone", "POSify"],
  },
  {
    id: "sql-db",
    label: "SQL & Relational Databases",
    axis: "backend",
    patterns: [/\bsql\b/i, /\bmysql\b/i, /\bpostgres(ql)?\b/i, /\bsql server\b/i, /\bdatabase/i, /\bfirebase\b/i, /\bfirestore\b/i],
    proof: "Normalized relational schema design across MySQL, PostgreSQL, SQL Server, and Firebase.",
    projects: ["EvaTrack Capstone", "POSify"],
  },
  {
    id: "aws-cloud",
    label: "AWS Cloud Infrastructure",
    axis: "backend",
    patterns: [/\baws\b/i, /\bamazon web services\b/i, /\bec2\b/i, /\bs3\b/i, /\brds\b/i, /\blambda\b/i, /\bcloud\b/i, /\bserverless\b/i],
    proof: "Hands-on AWS EC2, S3, RDS, Lambda, CloudFront & AWS PartyRock GenAI deployment.",
    projects: ["Evacuation Assistant AI"],
  },
  {
    id: "docker-devops",
    label: "Docker, Linux & CI/CD",
    axis: "backend",
    patterns: [/\bdocker\b/i, /\bcontainer/i, /\bdevops\b/i, /\blinux\b/i, /\bci\/cd\b/i, /\bgit(hub)?\b/i, /\bjenkins\b/i],
    proof: "Docker containerization, Debian/Ubuntu Linux workflows, Git/GitHub Actions, and Jenkins CI/CD.",
    projects: ["EvaTrack Capstone"],
  },
  {
    id: "mobile",
    label: "Mobile Dev (Flutter / Ionic)",
    axis: "velocity",
    patterns: [/\bflutter\b/i, /\bdart\b/i, /\bionic\b/i, /\bmobile\b/i, /\bandroid\b/i, /\bios\b/i, /\bcross-platform\b/i],
    proof: "Shipped DoseDay (Dart/Flutter medication platform) and Task Tracker Android APK (Ionic + React).",
    projects: ["DoseDay"],
  },
  {
    id: "ai-llm",
    label: "Generative AI & LLMs",
    axis: "velocity",
    patterns: [/\bllm\b/i, /\bgen(erative)? ?ai\b/i, /\bai\b/i, /\bprompt\b/i, /\bchatbot\b/i],
    proof: "Built Evacuation Assistant AI (AWS PartyRock LLM) + Accenture GenAI certified + conversational portfolio.",
    projects: ["Evacuation Assistant AI", "Student Grade Predictor"],
  },
  {
    id: "security",
    label: "Cybersecurity & Web Privacy",
    axis: "culture",
    patterns: [/\bsecurity\b/i, /\bcybersecurity\b/i, /\bprivacy\b/i, /\bowasp\b/i, /\binfosec\b/i],
    proof: "Google Foundations of Cybersecurity certified + built a live Browser Telemetry & Footprint Scanner.",
    projects: ["EvaTrack Capstone"],
  },
  {
    id: "agile-team",
    label: "Agile Delivery & Leadership",
    axis: "culture",
    patterns: [/\bagile\b/i, /\bscrum\b/i, /\bcollaborat/i, /\bteam\b/i, /\bcommunicat/i, /\bleadership\b/i, /\bmentor/i, /\bownership\b/i, /\bshipping\b/i, /\bfast-paced\b/i],
    proof: "JP Morgan & Synchrony immersion participant, Kyocera SWE Intern, and Wakuworks hackathon winner.",
    projects: ["EvaTrack Capstone", "DoseDay"],
  },
];

/**
 * Adjacent / transferable technologies Klint can ramp up on quickly
 */
const TRANSFERABLE_SKILLS = [
  {
    label: "Next.js / Remix",
    pattern: /\bnext(\.js|js)?\b|\bremix\b/i,
    note: "Strong React 19, TypeScript & Vite foundation makes Next.js SSR/App Router an easy ramp-up.",
  },
  {
    label: "Vue / Angular / Svelte",
    pattern: /\bvue(\.js)?\b|\bangular\b|\bsvelte\b/i,
    note: "Deep component-driven architecture experience in React transfers rapidly to other SPA frameworks.",
  },
  {
    label: "GraphQL",
    pattern: /\bgraphql\b/i,
    note: "Strong REST API & schema modeling skills; straightforward transition to GraphQL queries/mutations.",
  },
  {
    label: "React Native",
    pattern: /\breact native\b/i,
    note: "Combines React 19 fluency with shipped mobile app experience (Flutter & Ionic).",
  },
  {
    label: "Kubernetes / Terraform",
    pattern: /\bkubernetes\b|\bk8s\b|\bterraform\b/i,
    note: "Solid Docker, Linux & AWS cloud base; ready to scale into orchestration & IaC.",
  },
  {
    label: "MongoDB / NoSQL",
    pattern: /\bmongodb\b|\bnosql\b|\bredis\b|\bdynamodb\b/i,
    note: "Experienced with Firebase/Firestore document stores alongside relational SQL systems.",
  },
  {
    label: "Go / Rust / Ruby",
    pattern: /\bgolang\b|\brust\b|\bruby\b|\brails\b/i,
    note: "Polyglot track record (JS/TS, PHP, Python, Java, C#, Dart in <2 years) shows fast language onboarding.",
  },
  {
    label: "Automated Testing (Jest / Cypress / Playwright)",
    pattern: /\bjest\b|\bcypress\b|\bplaywright\b|\bunit test/i,
    note: "Teaches automated testing concepts in his React Learning Path and uses Postman API validation.",
  },
];

/**
 * Seniority / Niche requirements to flag honestly if requested
 */
const GROWTH_FLAGS = [
  {
    label: "5+ Years Senior Experience",
    pattern: /\b([5-9]|1\d)\+?\s*years?\b|\bstaff engineer\b|\bprincipal engineer\b/i,
    note: "Klint is an early-career high-velocity engineer (started 2024, graduating Dec 2026) — best suited for Junior/Mid SWE, Product Engineer, or New-Grad roles.",
  },
  {
    label: "Native Swift / Kotlin",
    pattern: /\bswift(ui)?\b|\bkotlin\b|\bobjective-c\b/i,
    note: "Mobile background is cross-platform (Flutter/Dart & Ionic/React) rather than native Swift/Kotlin.",
  },
  {
    label: "SAP / Salesforce / Legacy ERP",
    pattern: /\bsap\b|\bsalesforce\b|\bapex\b|\bcobol\b/i,
    note: "Specializes in modern open-source web, mobile, and AWS stacks rather than proprietary ERP platforms.",
  },
];

function extractRoleTitle(roleInput, jdText) {
  if (roleInput && roleInput.trim()) return roleInput.trim();
  const firstLine = jdText.split("\n").map((l) => l.trim()).find(Boolean) || "";
  if (firstLine.length >= 4 && firstLine.length <= 58) return firstLine;
  const roleMatch = jdText.match(
    /(?:hiring|seeking|looking for)\s+(?:an?\s+)?([A-Z][A-Za-z0-9/&\-\s]{3,42}?(?:Engineer|Developer|Designer|Architect|Intern|Specialist))/i
  );
  if (roleMatch) return roleMatch[1].trim();
  return "Software Engineer Role";
}

export function evaluateJobDescription(jdText, roleTitleInput = "") {
  const cleanText = (jdText || "").trim();
  const roleTitle = extractRoleTitle(roleTitleInput, cleanText);

  const strongMatches = KLINT_SKILLS.filter((skill) =>
    skill.patterns.some((re) => re.test(cleanText))
  );

  const transferable = TRANSFERABLE_SKILLS.filter((item) => item.pattern.test(cleanText));
  const growthAreas = GROWTH_FLAGS.filter((item) => item.pattern.test(cleanText));

  // Score calculation: grounded, transparent, and reactive to what's actually in the JD
  const totalDetected = strongMatches.length + transferable.length + growthAreas.length;

  let matchScore;
  if (totalDetected === 0) {
    // Generic / short JD fallback
    matchScore = 82;
  } else {
    const weightedPoints = strongMatches.length * 1.0 + transferable.length * 0.62;
    const rawRatio = weightedPoints / (totalDetected + 0.35);
    const bonusBreadth = Math.min(12, strongMatches.length * 2.2);
    const seniorityPenalty = growthAreas.length * 7;
    matchScore = clampScore(54 + rawRatio * 40 + bonusBreadth - seniorityPenalty);
  }

  // Axis breakdown scores for the HUD Scorecard
  const countByAxis = { frontend: 0, backend: 0, velocity: 0, culture: 0 };
  strongMatches.forEach((m) => {
    countByAxis[m.axis] = (countByAxis[m.axis] || 0) + 1;
  });

  const scorecard = {
    frontend: clampScore(68 + countByAxis.frontend * 9 + (strongMatches.length > 0 ? 6 : 0)),
    backend: clampScore(64 + countByAxis.backend * 8 + (transferable.length > 0 ? 4 : 0)),
    velocity: clampScore(78 + countByAxis.velocity * 9 + Math.min(12, strongMatches.length * 2)),
    culture: clampScore(76 + countByAxis.culture * 10 + (growthAreas.length === 0 ? 8 : 0)),
  };

  // Tier label
  let verdictTier = "Strong Fit";
  let verdictColor = "#4ADE80";
  if (matchScore >= 86) {
    verdictTier = "Strong Hire Match";
    verdictColor = "#4ADE80";
  } else if (matchScore >= 74) {
    verdictTier = "Great Fit";
    verdictColor = "#D97757";
  } else {
    verdictTier = "Promising Fit • Fast Ramp-Up";
    verdictColor = "#F59E0B";
  }

  // Rank most relevant shipped projects for this JD
  const projectScores = new Map();
  strongMatches.forEach((m) => {
    m.projects.forEach((pName) => {
      projectScores.set(pName, (projectScores.get(pName) || 0) + 1);
    });
  });

  const matchedProjects = [...FEATURED_PROJECTS]
    .sort((a, b) => (projectScores.get(b.name) || 0) - (projectScores.get(a.name) || 0))
    .slice(0, 3);

  // Build Klint's live spoken pitch tailored specifically to this JD!
  const topSkillNames = strongMatches.slice(0, 4).map((s) => s.label);
  const topProjectNames = matchedProjects.slice(0, 2).map((p) => p.name);

  let spokenPitch = `I just reviewed your ${roleTitle} description — it's a ${matchScore}% match (${verdictTier})! `;
  if (topSkillNames.length > 0) {
    spokenPitch += `I directly align with your needs in ${topSkillNames.join(", ")}. `;
  } else {
    spokenPitch += `My full-stack background across React 19, TypeScript, Laravel, Node.js, Python, and AWS maps cleanly to what your team needs. `;
  }
  spokenPitch += `For proof, check out ${topProjectNames.join(" and ")} from my shipped projects, plus my Software Engineer internship at Kyocera Document Solutions and design experience at Datawords. `;
  if (transferable.length > 0) {
    spokenPitch += `For ${transferable
      .slice(0, 2)
      .map((t) => t.label)
      .join(" and ")}, my existing stack gives me a fast ramp-up. `;
  }
  if (growthAreas.length > 0) {
    spokenPitch += `I'll also be upfront: ${growthAreas[0].note} `;
  }
  spokenPitch += `Feel free to inspect the full match breakdown or stamp HIRED whenever you're ready!`;

  // Markdown summary for Messenger Chat Drawer & clipboard copy
  const markdownSummary = [
    `### 📋 JD Evaluation: ${roleTitle} (${matchScore}% — ${verdictTier})`,
    strongMatches.length > 0
      ? `- **Direct Matches (${strongMatches.length}):** ${strongMatches.map((m) => m.label).join(", ")}`
      : `- **Core Alignment:** Full-stack shipping velocity across web, mobile, and cloud.`,
    transferable.length > 0
      ? `- **Fast Ramp-Up:** ${transferable.map((t) => t.label).join(", ")}`
      : null,
    growthAreas.length > 0
      ? `- **Honest Notes:** ${growthAreas.map((g) => g.label).join(", ")}`
      : null,
    `- **Most Relevant Projects:** ${matchedProjects.map((p) => p.name).join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    roleTitle,
    matchScore,
    verdictTier,
    verdictColor,
    scorecard,
    strongMatches,
    transferable,
    growthAreas,
    matchedProjects,
    spokenPitch,
    markdownSummary,
  };
}
