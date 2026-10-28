import React from "react";
import { FaCode, FaLaptopCode, FaCertificate, FaArrowUpRightFromSquare, FaFolderOpen } from "react-icons/fa6";
import { ClaudeStarburst } from "./ClaudeIcons";

const About = () => {
  const metrics = [
    {
      value: "3+ Yrs",
      label: "FULL-STACK DEV",
      subtext: "Building modern web & cloud solutions",
      icon: <FaLaptopCode className="text-[#D97757]" size={16} />
    },
    {
      value: "10+ Projects",
      label: "SHIPPED & DEPLOYED",
      subtext: "Enterprise, capstone & client apps",
      icon: <FaFolderOpen className="text-[#D97757]" size={16} />
    },
    {
      value: "15+ Tech",
      label: "ACTIVE STACK",
      subtext: "React, Node, Laravel, Python, AWS",
      icon: <FaCode className="text-[#D97757]" size={16} />
    },
    {
      value: "20+ Certs",
      label: "CONTINUOUS LEARNING",
      subtext: "Cloud, Full-Stack, & Security",
      icon: <FaCertificate className="text-[#D97757]" size={16} />
    }
  ];

  return (
    <section id="about" className="scroll-mt-20 flex flex-col gap-6">
      {/* Hero Bio Card */}
      <div className="bento-card relative overflow-hidden bg-[var(--card-bg)] border-[var(--border-color)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="section-number claude-font-mono text-xs text-[#D97757]">01 // ABOUT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] animate-pulse" />
          </div>
          <span className="claude-font-mono text-xs text-[var(--text-muted)]">
            Cebu City, Philippines
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl claude-font-serif font-medium tracking-tight mb-4 text-[var(--text-primary)]">
          Building practical, user-centered software & cloud architectures.
        </h2>

        <div className="flex flex-col gap-3 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          <p>
            I'm <strong className="font-semibold text-[var(--text-primary)]">Klint Morales Ruales</strong> — a Software Engineer and Full-Stack Developer with hands-on experience in building scalable web applications, backend APIs, and modern UI components.
          </p>
          <p>
            I focus on turning complex problem statements into clean, maintainable, and high-performance digital products. My core expertise spans React, Node.js, Laravel, PHP, Python, Java Spring Boot, and AWS cloud services.
          </p>
          <p className="claude-font-mono text-xs text-[#D97757] font-semibold pt-1">
            Open for Software Engineer, Full-Stack Developer, and DevOps positions.
          </p>
        </div>

        {/* MarufGPT / KlintGPT Interview Banner */}
        <div className="mt-4 p-3.5 rounded-xl border border-[#D97757]/30 bg-[#D97757]/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D97757]/15 text-[#D97757] flex items-center justify-center shrink-0">
              <ClaudeStarburst size={18} />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--text-primary)]">
                Try Interviewing this Portfolio
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">
                Ask questions like <em>"What kind of projects has Klint worked on?"</em> or <em>"Tell me about his experience with A/B testing"</em>.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const chatTab = document.querySelector('button:has(span:contains("Interview")), button[title*="Interview"]');
              window.dispatchEvent(new CustomEvent("switch-view-mode", { detail: "chat" }));
            }}
            className="hidden sm:inline-flex whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-lg bg-[#D97757] hover:bg-[#C26547] text-white transition-colors shrink-0 shadow-2xs"
          >
            Start Interview →
          </button>
        </div>

        {/* Social Quick Links */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-[var(--border-color)] claude-font-mono text-xs">
          <a
            href="https://github.com/klint-droid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[#D97757] transition-colors"
          >
            <span>github</span>
            <FaArrowUpRightFromSquare size={10} />
          </a>
          <a
            href="https://www.linkedin.com/in/klint-ruales-67865527b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[#D97757] transition-colors"
          >
            <span>linkedin</span>
            <FaArrowUpRightFromSquare size={10} />
          </a>
          <a
            href="mailto:klintruales11@gmail.com"
            className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[#D97757] transition-colors"
          >
            <span>email</span>
            <FaArrowUpRightFromSquare size={10} />
          </a>
          <a
            href="/Klint_Ruales_Resume.pdf"
            download="Klint_Morales_Ruales_Resume.pdf"
            className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[#D97757] transition-colors ml-auto"
          >
            <span>download cv (pdf)</span>
            <FaArrowUpRightFromSquare size={10} />
          </a>
        </div>
      </div>

      {/* Bento Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bento-card p-4 flex flex-col justify-between hover:border-[#D97757]/40 transition-all bg-[var(--card-bg)] border-[var(--border-color)]"
          >
            <div className="flex items-center justify-between mb-2">
              {metric.icon}
              <span className="claude-font-mono text-[10px] tracking-wider font-semibold text-[var(--text-muted)] uppercase">
                {metric.label}
              </span>
            </div>
            <div>
              <div className="claude-font-serif text-xl font-medium tracking-tight text-[var(--text-primary)] mb-0.5">
                {metric.value}
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">
                {metric.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;