// Comprehensive knowledge base for KlintGPT / Claude AI Portfolio Assistant

export const KLINT_PROFILE = {
  name: "Klint Morales Ruales",
  title: "Software Engineer & Full-Stack Developer",
  location: "Cebu City, Philippines",
  email: "klintruales11@gmail.com",
  linkedin: "https://www.linkedin.com/in/klint-ruales-67865527b/",
  github: "https://github.com/klint-droid",
  resumeUrl: "/Klint_Ruales_Resume.pdf",
  currentRole: "Software Engineer Intern @ Kyocera Document Solutions Philippines, Inc.",
  education: "Associate Degree in Computer Technology Major in Software Development @ University of San Jose - Recoletos (USJ-R, 2026)",
  availability: "Open for Software Engineer, Full-Stack Developer, and DevOps roles (Remote, Hybrid, or On-site)"
};

export const RECRUITER_PRESETS = [
  {
    id: "recruiter-brief",
    label: "⚡ 2-Minute Recruiter Brief",
    prompt: "Give me the 2-minute recruiter summary of Klint's experience and strengths"
  },
  {
    id: "projects",
    label: "🚀 Featured Projects",
    prompt: "What kind of projects has Klint worked on?"
  },
  {
    id: "react",
    label: "⚛️ React & Frontend",
    prompt: "How strong is his React experience?"
  },
  {
    id: "ab-testing",
    label: "🧪 A/B Testing & Optimization",
    prompt: "Tell me about his experience with A/B testing and performance optimization"
  },
  {
    id: "technologies",
    label: "🛠️ Technologies & Stack",
    prompt: "What technologies does he work with?"
  },
  {
    id: "why-senior",
    label: "⭐ Why Consider Him?",
    prompt: "Why should I consider him for a Software Engineer role?"
  },
  {
    id: "cloud-devops",
    label: "☁️ Cloud & DevOps",
    prompt: "Tell me about his Cloud & DevOps architecture"
  },
  {
    id: "contact-cv",
    label: "📬 CV & Contact Info",
    prompt: "How can I contact Klint or download his CV?"
  }
];

export const STARTER_QUESTIONS = [
  {
    id: "projects",
    label: "Projects & Architecture",
    prompt: "What kind of projects has Klint worked on?",
    desc: "EvaTrack Capstone, Friend Quiz, Task Tracker & POSify",
    icon: "🚀"
  },
  {
    id: "react",
    label: "React & Modern UI",
    prompt: "How strong is his React experience?",
    desc: "React 19, TypeScript, Tailwind, custom hooks & design systems",
    icon: "⚛️"
  },
  {
    id: "ab-testing",
    label: "A/B Testing & Optimization",
    prompt: "Tell me about his experience with A/B testing",
    desc: "Datawords UX experiments, web vitals, GA4 & viral growth",
    icon: "🧪"
  },
  {
    id: "technologies",
    label: "Technologies & Tools",
    prompt: "What technologies does he work with?",
    desc: "React, Laravel, Node.js, Python, Java, MySQL, AWS & Docker",
    icon: "🛠️"
  },
  {
    id: "why-hire",
    label: "Candidate Value",
    prompt: "Why should I consider him for a Software Engineer role?",
    desc: "Rapid shipping velocity, Kyocera internship & design acumen",
    icon: "⭐"
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    prompt: "Tell me about his Cloud & DevOps architecture",
    desc: "AWS EC2, S3, RDS, Lambda, Docker, Linux & CI/CD pipelines",
    icon: "☁️"
  },
  {
    id: "experience-edu",
    label: "Experience & Timeline",
    prompt: "What are his career milestones, internships, and education?",
    desc: "Kyocera, Datawords, JP Morgan, Synchrony & USJ-R degree",
    icon: "💼"
  },
  {
    id: "contact-hire",
    label: "Download CV & Hire",
    prompt: "How can I contact Klint or download his CV?",
    desc: "Official resume PDF, direct email, LinkedIn & schedule",
    icon: "📬"
  }
];

export const getKlintResponse = (query) => {
  const text = query.trim().toLowerCase();

  // 1. RECRUITER 2-MINUTE BRIEF
  if (text.includes("2-minute") || text.includes("two minute") || text.includes("brief") || text.includes("summary") || text.includes("overview") || text.includes("tldr") || text.includes("elevator pitch")) {
    return {
      text: `### ⚡ 2-Minute Executive Summary: Klint Morales Ruales\n\nIf you have only 2 minutes, here is what makes Klint an outstanding engineering hire:\n\n- **Current Role & Location:** Software Engineer Intern at **Kyocera Document Solutions Philippines, Inc.**, based in Cebu City (open to Remote, Hybrid, or On-site worldwide).\n- **High Shipping Velocity:** Started coding in 2024 and in under two years has architected and shipped **10+ production web, mobile, and machine learning applications**.\n- **Full-Stack Proficiency:**\n  - **Frontend:** React 19, TypeScript, Tailwind CSS, Vite, responsive UI, micro-animations.\n  - **Backend & Cloud:** Laravel (PHP), Node.js, Python, Java, MySQL, PostgreSQL, Docker, and AWS (EC2, S3, RDS, Lambda).\n- **Dual Superpower (Code + Design):** Prior experience as a **Digital Designer at Datawords Philippines** means he crafts pixel-perfect, accessible user interfaces without needing constant designer supervision.\n- **Proven Team Success:** Selected for elite leadership immersion programs with **JP Morgan Chase & Co** and **Synchrony**; praised by peers for collaborative dedication and high velocity.`,
      artifactSection: "about",
      followUps: [
        "What kind of projects has Klint worked on?",
        "How strong is his React experience?",
        "Why should I consider him for a Software Engineer role?"
      ],
      quickActions: [
        { label: "Download Resume (PDF)", link: "/Klint_Ruales_Resume.pdf" },
        { label: "Ask about Shipped Projects", prompt: "What kind of projects has Klint built and shipped?" },
        { label: "Email Klint (klintruales11@gmail.com)", link: "mailto:klintruales11@gmail.com" }
      ]
    };
  }

  // 2. A/B TESTING & PERFORMANCE OPTIMIZATION
  if (text.includes("a/b") || text.includes("ab test") || text.includes("testing") || text.includes("experiment") || text.includes("optimization") || text.includes("conversion") || text.includes("performance") || text.includes("vitals") || text.includes("analytics")) {
    return {
      text: `### 🧪 A/B Testing, Web Performance & Data-Driven Optimization\n\nKlint treats code not just as syntax, but as a lever to improve user engagement, conversion rates, and runtime efficiency:\n\n1. **Datawords Multi-Variant Asset Testing:**\n   - As a **Digital Designer at Datawords Philippines**, Klint created localized digital assets and multi-variant landing page layouts for international corporate clients.\n   - Iteratively evaluated visual hierarchy, button placement, copy length, and call-to-action (CTA) contrast to maximize click-through rate (CTR) and reduce bounce rates.\n\n2. **Viral Engagement Dynamics (Friend Quiz Project):**\n   - In his viral **[Friend Quiz Platform](/friend-quiz)**, Klint designed iterative behavioral loops to test completion rates and referral virality.\n   - Monitored drop-off funnels between question creation and final leaderboard sharing, optimizing the quiz authoring UX to achieve high retention and organic peer invites.\n\n3. **Frontend Runtime & Core Web Vitals:**\n   - **Bundle Optimization:** Enforces strict tree-shaking, code-splitting with dynamic \`import()\`, and chunking in Vite to ensure load times stay sub-second.\n   - **Asset & Memory Profiling:** Implements lazy-loaded images, SVG optimization, and clean React hook dependencies to eliminate redundant re-renders.\n\n4. **Telemetry & Client Analytics:**\n   - Uses **Google Analytics 4 (\`react-ga4\`)** with custom event logging and author-level telemetry to measure feature usage and user paths.\n   - Built an interactive **Client Security & Footprint Scanner** in this portfolio to demonstrate client-side web APIs and telemetry auditing in action.`,
      artifactSection: "about",
      followUps: [
        "How strong is his React experience?",
        "What kind of projects has Klint worked on?",
        "Show me his Cloud & DevOps architecture"
      ],
      quickActions: [
        { label: "Try Friend Quiz (Viral Demo)", link: "/friend-quiz" },
        { label: "Explore 3D Stack Cosmos", link: "/3d" },
        { label: "Open Browser Telemetry Scanner", action: () => window.dispatchEvent(new CustomEvent("open-telemetry-scan")) }
      ]
    };
  }

  // 3. WHAT TECHNOLOGIES DOES HE WORK WITH?
  if (text.includes("technolog") || text.includes("tech stack") || text.includes("stack") || text.includes("tools") || text.includes("languages") || text.includes("skills") || text.includes("framework")) {
    return {
      text: `### 🛠️ Technologies, Frameworks & Tooling\n\nKlint works with a modern, production-tested technology stack spanning the entire software delivery lifecycle:\n\n- **Frontend Development:**\n  - **Languages & Frameworks:** React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3.\n  - **Styling & Animation:** Tailwind CSS, PostCSS, responsive mobile-first layouts, glassmorphism, Framer Motion principles.\n  - **Build & 3D:** Vite, Webpack, Three.js, React Three Fiber (R3F), Drei.\n\n- **Backend & APIs:**\n  - **Frameworks:** Laravel (PHP), Node.js (Express), Python (FastAPI, Streamlit), Java (Spring Boot), C# (ASP.NET Core).\n  - **Architectures:** RESTful APIs, MVC design pattern, Object-Oriented Programming (OOP), Authentication & Middleware.\n\n- **Databases & Data Modeling:**\n  - MySQL, PostgreSQL, Microsoft SQL Server, Firebase / Firestore, LocalStorage caching.\n\n- **Cloud & DevOps (Amazon Web Services):**\n  - **AWS:** EC2 instances, S3 buckets, RDS managed databases, Lambda serverless, CloudFront CDN, PartyRock GenAI.\n  - **Containers & Operations:** Docker, Linux terminal (Debian/Ubuntu), Bash & PowerShell scripting, Git & GitHub Actions, Postman, Jenkins CI/CD.\n\n- **Mobile & Desktop:**\n  - Ionic Framework (React), Android Studio, Java Swing.`,
      artifactSection: "techstack",
      followUps: [
        "How strong is his React experience?",
        "Tell me about his Cloud & DevOps architecture",
        "What projects showcase these technologies?"
      ],
      quickActions: [
        { label: "Explore 3D Stack Cosmos", link: "/3d" },
        { label: "View All Projects Page", link: "/all-projects" },
        { label: "View All Tech Stack Page", link: "/all-techstack" }
      ]
    };
  }

  // 4. WHY CONSIDER HIM FOR A SOFTWARE ENGINEER / SENIOR ROLE?
  if (text.includes("why should") || text.includes("why consider") || text.includes("why hire") || text.includes("hire") || text.includes("senior") || text.includes("consider him") || text.includes("value") || text.includes("strengths")) {
    return {
      text: `### ⭐ Why Consider Klint for a Software Engineer Role?\n\nHere is why Klint stands out among engineering candidates:\n\n1. **Proven High-Output Shipping Velocity:**\n   - While many candidates understand syntax, Klint builds and finishes complete products. In under two years, he has conceived, designed, coded, and deployed 10+ real-world applications across web, mobile, and AI.\n\n2. **Enterprise Software Discipline:**\n   - Currently engineering document workflow tools and enterprise web services at **Kyocera Document Solutions**.\n   - Trained in large-scale system patterns and financial technology at **JP Morgan Chase & Co** and agile product innovation at **Synchrony**.\n\n3. **Hybrid Frontend + Design Precision:**\n   - His background as a **Digital Designer at Datawords** means he produces production UIs with immaculate typography, spacing, accessibility (a11y), and responsive mobile parity — drastically cutting down design review cycles.\n\n4. **End-to-End Ownership:**\n   - From normalizing SQL schemas and writing Laravel API endpoints, to orchestrating AWS S3/EC2 hosting and fine-tuning React component state, Klint owns features end-to-end.\n\n5. **Exceptional Learning Velocity & Mentorship:**\n   - Authored the **React Guided Learning Path** to train other developers, demonstrating strong communication and leadership potential.`,
      artifactSection: "about",
      followUps: [
        "Can I read what colleagues say about him?",
        "What kind of projects has Klint worked on?",
        "How can I contact Klint or download his CV?"
      ],
      quickActions: [
        { label: "Ask about Recommendations", prompt: "What do colleagues say about Klint in their recommendations?" },
        { label: "Download Official Resume", link: "/Klint_Ruales_Resume.pdf" },
        { label: "Send Email (klintruales11@gmail.com)", link: "mailto:klintruales11@gmail.com" }
      ]
    };
  }

  // 5. PROJECTS QUERY
  if (text.includes("project") || text.includes("built") || text.includes("portfolio") || text.includes("app") || text.includes("work")) {
    return {
      text: `### 🚀 Shipped Projects & Applications\n\nKlint has architected and delivered **10+ production, capstone, and client applications**, bridging polished user interfaces with robust backend architectures:\n\n1. **[DoseDay — Mobile Platform](https://getdoseday.vercel.app)** *(Dart, Flutter)*\n   - Daily medication platform designed for prescription adherence, dosage schedules, and health tracking.\n\n2. **[EvaTrack — Capstone System](https://github.com/klint-droid)** *(Laravel, PHP, MySQL, React, REST API)*\n   - Enterprise-grade tracking and evaluation platform engineered for complex institutional workflows with automated reporting and role-based permissions.\n\n3. **[Friend Quiz & Live Leaderboard](/friend-quiz)** *(React, Tailwind CSS, LocalStorage, Web Share API)*\n   - High-engagement viral web application allowing users to author custom quizzes, challenge friends, calculate friendship tier scores, and inspect real-time rankings.\n\n4. **[Task Tracker Mobile App](/TaskTracker.apk)** *(Ionic Framework, React.js, TypeScript, Android Studio)*\n   - Cross-platform productivity application with offline task management, priority tags, and clean mobile UX (available as downloadable APK).\n\n5. **[Student Grade Prediction Platform](https://grade-predict.streamlit.app/)** *(Python, Streamlit, Scikit-learn Machine Learning)*\n   - Predictive analytics tool forecasting student academic performance based on study habits, past evaluations, and absences.\n\n6. **[Smart Home Management & POSify](https://github.com/klint-droid/simple-pos)** *(C#, ASP.NET MVC, Entity Framework Core, SQL Server, Java Swing)*\n   - Full-stack point-of-sale inventory system with real-time profit margins and customer credit management.`,
      artifactSection: "projects",
      followUps: [
        "Tell me more about EvaTrack Capstone",
        "How strong is his React experience?",
        "Where can I see his GitHub repositories?"
      ],
      quickActions: [
        { label: "View All Projects Page", link: "/all-projects" },
        { label: "Try Interactive Friend Quiz", link: "/friend-quiz" },
        { label: "DoseDay Mobile App Demo", link: "https://getdoseday.vercel.app" }
      ]
    };
  }

  // 6. REACT & FRONTEND EXPERIENCE
  if (text.includes("react") || text.includes("frontend") || text.includes("ui") || text.includes("css") || text.includes("tailwind") || text.includes("javascript") || text.includes("typescript")) {
    return {
      text: `### ⚛️ React & Modern Frontend Engineering\n\nKlint has deep, hands-on experience building reactive, high-performance web applications in **React 19, TypeScript, JavaScript (ESNext), and Tailwind CSS**:\n\n- **Core React Architecture:** Extensive proficiency with modern functional components, advanced hooks (\`useState\`, \`useEffect\`, \`useReducer\`, \`useCallback\`, \`useRef\`), custom hooks, and React Router v7.\n- **State Management & Data Fetching:** Efficient handling of local storage synchronization, RESTful API data fetching, optimistic updates, and clean state distribution.\n- **Design & Performance:** Mobile-first responsive layouts, CSS-in-JS, Tailwind CSS 3.4/4, glassmorphism, fluid micro-animations, and fast Vite-driven build pipelines.\n- **Design Background:** Prior experience as a **Digital Designer at Datawords Philippines** equips Klint with an exceptional eye for typography, spacing, accessibility (a11y), and design systems that few engineers possess.\n- **Teaching & Curriculum:** Created a comprehensive **React Guided Learning Path** bootcamp spanning component architecture, state machines, and automated testing.`,
      artifactSection: "techstack",
      followUps: [
        "What backend technologies does he pair with React?",
        "What projects showcase his React skills?",
        "Tell me about the React Course he built"
      ],
      quickActions: [
        { label: "Explore Guided React Course", link: "/react-course" },
        { label: "Try Interactive Friend Quiz", link: "/friend-quiz" },
        { label: "View All Shipped Projects", link: "/all-projects" }
      ]
    };
  }

  // 7. BACKEND & CLOUD / AWS
  if (text.includes("backend") || text.includes("cloud") || text.includes("aws") || text.includes("laravel") || text.includes("node") || text.includes("python") || text.includes("database") || text.includes("sql") || text.includes("docker") || text.includes("devops")) {
    return {
      text: `### ☁️ Backend Architecture & Cloud Infrastructure\n\nKlint is an agile full-stack engineer who designs and deploys scalable backend services and cloud environments:\n\n- **Backend Frameworks:**\n  - **Laravel & PHP:** Built enterprise workflow APIs, authentication middleware, Eloquent relationships, and transaction safety.\n  - **Node.js & Express:** Lightweight microservices, REST endpoints, and asynchronous processing.\n  - **Python & FastAPI/Streamlit:** Rapid prototyping, data processing scripts, machine learning pipelines, and OS automation.\n  - **Java & Spring Boot / C# ASP.NET Core:** Object-oriented enterprise architecture, MVC patterns, and Entity Framework.\n- **Databases & Data Modeling:**\n  - **Relational:** MySQL, PostgreSQL, Microsoft SQL Server (normalization, indexing, query optimization, foreign key constraints).\n- **Cloud & DevOps (AWS):**\n  - **Amazon Web Services (AWS):** EC2 instances, S3 object storage, RDS database clusters, Lambda serverless, CloudFront CDN, and PartyRock GenAI.\n  - **Containerization & CI/CD:** Docker containerization, Linux terminal management (Debian/Ubuntu), Git/GitHub actions, Postman API testing, and Jenkins pipelines.`,
      artifactSection: "techstack",
      followUps: [
        "What projects use AWS or Laravel?",
        "How does he handle database design?",
        "What are his certifications in cloud & automation?"
      ],
      quickActions: [
        { label: "View 3D Tech Cosmos", link: "/3d" },
        { label: "View All Shipped Projects", link: "/all-projects" }
      ]
    };
  }

  // 8. EXPERIENCE & TIMELINE
  if (text.includes("experience") || text.includes("kyocera") || text.includes("job") || text.includes("intern") || text.includes("career") || text.includes("timeline") || text.includes("history")) {
    return {
      text: `### 💼 Career Experience & Professional Milestones\n\n- **2026 — Software Engineer Intern**\n  *Kyocera Document Solutions Philippines, Inc.*\n  Engineering web services, document automation pipelines, and internal software tools.\n\n- **2026 — Associate Degree in Computer Technology (Software Development)**\n  *University of San Jose - Recoletos (USJ-R)*\n  Graduating December 2026 with specialization in data structures, algorithms, databases, and software engineering.\n\n- **2025 — Breakout Session Participant**\n  *JP Morgan Chase & Co*\n  Engaged in financial technology architecture, software engineering leadership, and large-scale enterprise workshops.\n\n- **2025 — Youth Empowerment Participant**\n  *Synchrony*\n  Collaborative tracks on innovation, agile team delivery, and tech career acceleration.\n\n- **2025 — Digital Designer**\n  *Datawords Philippines*\n  Created localized digital assets, UI layouts, and media components for multinational clients.\n\n- **2024 — First Line of Code!**\n  *Started Developer Journey*\n  Began programming with relentless passion, participating in hackathons, and winning 3rd place in the Wakuworks Social Innovation Competition.`,
      artifactSection: "experience",
      followUps: [
        "What projects did he build during this time?",
        "What are his certifications?",
        "Why should I consider him for a full-stack role?"
      ],
      quickActions: [
        { label: "Ask about Shipped Projects", prompt: "What kind of projects has Klint built and shipped?" },
        { label: "Download Official CV", link: "/Klint_Ruales_Resume.pdf" }
      ]
    };
  }

  // 9. EDUCATION & CERTIFICATIONS
  if (text.includes("education") || text.includes("school") || text.includes("college") || text.includes("university") || text.includes("usjr") || text.includes("degree") || text.includes("cert") || text.includes("course") || text.includes("learn")) {
    return {
      text: `### 🎓 Education & Professional Certifications\n\n- **University Education:**\n  - **University of San Jose - Recoletos (USJ-R):** Associate Degree in Computer Technology Major in Software Development (2024 – Dec 2026).\n  - Focused coursework: Data Structures, Object-Oriented Programming (Java/C#), Database Systems (SQL), Web Systems, Software Engineering Life Cycle.\n\n- **Professional Certifications (Coursera, Google, Accenture, Cisco):**\n  - **Google / Coursera:** *Using Python to Interact with the Operating System* (Process automation, subprocesses, regular expressions, system administration).\n  - **Google / Coursera:** *Crash Course on Python* (OOP, data structures, scripting).\n  - **Google / Coursera:** *Foundations of Cybersecurity* (Threat modeling, network security, risk assessment).\n  - **Accenture:** *Tech Talk: Generative AI & Innovation*.\n  - Cisco Networking & Web Development Badges.\n\n- **Continuous Learning:**\n  Authored the **React Guided Learning Path** to mentor aspiring developers in state management, custom hooks, and production deployments.`,
      artifactSection: "certifications",
      followUps: [
        "View all certifications",
        "What kind of projects has Klint built?",
        "How strong is his React knowledge?"
      ],
      quickActions: [
        { label: "View All Certifications Page", link: "/all-certifications" },
        { label: "View Guided React Course", link: "/react-course" }
      ]
    };
  }

  // 10. RECOMMENDATIONS
  if (text.includes("recommend") || text.includes("testimonial") || text.includes("feedback") || text.includes("review") || text.includes("peer") || text.includes("colleague")) {
    return {
      text: `### ⭐ Peer & Colleague Recommendations\n\nKlint is recognized by mentors, peers, and collaborators for his work ethic and collaborative mindset:\n\n> *"Klint is very dedicated and passionate about his work. He consistently goes above and beyond to deliver high-quality results."*\n> — **Kent John Navarro**, Software Developer (USJ-R)\n\n> *"Klint has a great eye for design and pays attention to detail. His creativity and problem-solving skills make him a valuable asset to any team."*\n> — **Milven Sabandal**, Computer Technology Specialist (USJ-R)\n\nYou can also submit a live recommendation directly on this portfolio! It connects seamlessly with Google Sheets and displays in real-time.`,
      artifactSection: "recommendations",
      followUps: [
        "How do I write a recommendation for Klint?",
        "What projects has he worked on?",
        "How can I get in touch with him?"
      ],
      quickActions: [
        { label: "Write a Recommendation", link: "/recommend" },
        { label: "Email Klint directly", link: "mailto:klintruales11@gmail.com" }
      ]
    };
  }

  // 11. CONTACT & HIRE
  if (text.includes("contact") || text.includes("email") || text.includes("reach") || text.includes("linkedin") || text.includes("github") || text.includes("cv") || text.includes("resume") || text.includes("download") || text.includes("schedule") || text.includes("interview")) {
    return {
      text: `### 📬 Get in Touch / Hire Klint\n\nKlint is actively open for **Software Engineer, Full-Stack Developer, and DevOps roles**:\n\n- 📧 **Direct Email:** [klintruales11@gmail.com](mailto:klintruales11@gmail.com)\n- 💼 **LinkedIn Profile:** [linkedin.com/in/klint-ruales-67865527b/](https://www.linkedin.com/in/klint-ruales-67865527b/)\n- 🐙 **GitHub Repositories:** [github.com/klint-droid](https://github.com/klint-droid)\n- 📄 **Official Resume:** [Download Klint's Resume (PDF)](/Klint_Ruales_Resume.pdf)\n- 📍 **Location:** Cebu City, Philippines (Available for Remote, Hybrid, or On-site roles)\n\nFeel free to send an email or message on LinkedIn to discuss project opportunities, technical positions, or engineering collaborations!`,
      artifactSection: "contact",
      followUps: [
        "Download Klint's Resume PDF",
        "What kind of projects has he worked on?",
        "Why should I consider him for our team?"
      ],
      quickActions: [
        { label: "Download Resume (PDF)", link: "/Klint_Ruales_Resume.pdf" },
        { label: "Send Email (klintruales11@gmail.com)", link: "mailto:klintruales11@gmail.com" }
      ]
    };
  }

  // 12. PHILOSOPHY BEHIND KLINTGPT & MARUFGPT
  if (text.includes("maruf") || text.includes("claude") || text.includes("interview") || text.includes("concept") || text.includes("idea") || text.includes("why ai") || text.includes("gpt")) {
    return {
      text: `### 💡 The Philosophy Behind KlintGPT\n\nMost developer portfolios work identically:\n> *Open website → Read About Me → Browse Projects → Check Skills → Download CV → Leave.*\n\nInspired by **MarufGPT** and the clean, thoughtful conversational interface of **Anthropic's Claude AI**, Klint built this experience so recruiters and hiring managers can **interview the portfolio directly**:\n\n- **A CV tells you what an engineer did.**\n- **A portfolio shows what they built.**\n- **KlintGPT allows you to have an intelligent conversation about both.**`,
      artifactSection: "about",
      followUps: [
        "What kind of projects has Klint worked on?",
        "Why should our team hire him?",
        "What technologies does he work with?"
      ],
      quickActions: [
        { label: "Ask about Shipped Projects", prompt: "What kind of projects has Klint built and shipped?" },
        { label: "Download Resume (PDF)", link: "/Klint_Ruales_Resume.pdf" }
      ]
    };
  }

  // 13. BROWSER TELEMETRY & SECURITY
  if (text.includes("security") || text.includes("telemetry") || text.includes("privacy") || text.includes("browser") || text.includes("ip") || text.includes("scan")) {
    return {
      text: `### 🛡️ Web Safety & Browser Telemetry\n\nAs a software engineer mindful of cybersecurity and web protocols, Klint integrated an interactive **Client Footprint Scanner** in this portfolio:\n\n⚠️ **Web Safety Reminder:** Every time you visit ANY website on the web, your browser automatically transmits telemetry metadata including your IP address, browser build, operating system, display dimensions, GPU renderer, and language settings.\n\nKlint built this scanner to demonstrate client-side web APIs and encourage proactive web privacy awareness!`,
      artifactSection: "about",
      followUps: [
        "Tell me about Klint's cybersecurity certification",
        "What kind of projects has Klint built?",
        "Contact Klint"
      ],
      quickActions: [
        { label: "Open Browser Security Scanner", action: () => window.dispatchEvent(new CustomEvent("open-telemetry-scan")) }
      ]
    };
  }

  // DEFAULT INTELLIGENT FALLBACK
  return {
    text: `That is a thoughtful question! Klint Morales Ruales is a **Software Engineer and Full-Stack Developer** based in Cebu City, Philippines, currently working as a **Software Engineer Intern at Kyocera Document Solutions**.\n\nHis core toolkit spans **React 19, TypeScript, Node.js, Laravel, Python, Java, MySQL, and AWS cloud infrastructure**.\n\nFeel free to ask me:\n- 🚀 *"What kind of projects has Klint worked on?"*\n- ⚛️ *"How strong is his React experience?"*\n- 🧪 *"Tell me about his experience with A/B testing & optimization"*\n- 🛠️ *"What technologies does he work with?"*\n- ⭐ *"Why should I consider him for a Software Engineer role?"*\n- ☁️ *"Tell me about his Cloud & DevOps architecture"*\n- 📬 *"How can I contact Klint or download his CV?"*\n\nOr email Klint directly at **[klintruales11@gmail.com](mailto:klintruales11@gmail.com)**!`,
    artifactSection: "about",
    followUps: [
      "What kind of projects has Klint worked on?",
      "Why should I consider him for a Software Engineer role?",
      "Download his CV (PDF)"
    ],
    quickActions: [
      { label: "Ask about Shipped Projects", prompt: "What kind of projects has Klint built and shipped?" },
      { label: "Download Resume (PDF)", link: "/Klint_Ruales_Resume.pdf" },
      { label: "Email Klint (klintruales11@gmail.com)", link: "mailto:klintruales11@gmail.com" }
    ]
  };
};
