import React from "react";
import { FaCode, FaLaptopCode, FaCertificate, FaArrowUpRightFromSquare, FaFolderOpen } from "react-icons/fa6";

const About = () => {
  const metrics = [
    {
      value: "3+ Yrs",
      label: "FULL-STACK DEV",
      subtext: "Building modern web & cloud solutions",
      icon: <FaLaptopCode className="text-blue-500" size={16} />
    },
    {
      value: "10+ Projects",
      label: "SHIPPED & DEPLOYED",
      subtext: "Enterprise, capstone & client apps",
      icon: <FaFolderOpen className="text-purple-500" size={16} />
    },
    {
      value: "15+ Tech",
      label: "ACTIVE STACK",
      subtext: "React, Node, Laravel, Python, AWS",
      icon: <FaCode className="text-emerald-500" size={16} />
    },
    {
      value: "20+ Certs",
      label: "CONTINUOUS LEARNING",
      subtext: "Cloud, Full-Stack, & Security",
      icon: <FaCertificate className="text-amber-500" size={16} />
    }
  ];

  return (
    <section id="about" className="scroll-mt-20 flex flex-col gap-6">
      {/* Hero Bio Card */}
      <div className="bento-card relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="section-number font-mono">01 // ABOUT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </div>
          <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
            Cebu City, PH
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-mono font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
          Building practical, user-centered software & cloud architectures.
        </h2>

        <div className="flex flex-col gap-3 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>
            I'm <span className="font-semibold text-gray-900 dark:text-white font-mono">Klint Morales Ruales</span> — a Software Engineer and Full-Stack Developer with hands-on experience in building scalable web applications, backend APIs, and modern UI components.
          </p>
          <p>
            I focus on turning complex problem statements into clean, maintainable, and high-performance digital products. My core expertise spans React, Node.js, Laravel, PHP, Python, Java Springboot and cloud services.
          </p>
          <p className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
            ⚡ Open for Software Engineer, Full-Stack Developer, and DevOps positions.
          </p>
        </div>

        {/* Social Quick Links */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-[#27272a] font-mono text-xs">
          <a
            href="https://github.com/KlintM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            <span>github</span>
            <FaArrowUpRightFromSquare size={10} />
          </a>
          <a
            href="https://linkedin.com/in/klint-ruales"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            <span>linkedin</span>
            <FaArrowUpRightFromSquare size={10} />
          </a>
          <a
            href="mailto:klintruales11@gmail.com"
            className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            <span>email</span>
            <FaArrowUpRightFromSquare size={10} />
          </a>
        </div>
      </div>

      {/* Bento Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bento-card p-4 flex flex-col justify-between hover:border-blue-500/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              {metric.icon}
              <span className="font-mono text-[10px] tracking-wider font-semibold text-gray-400 dark:text-gray-500 uppercase">
                {metric.label}
              </span>
            </div>
            <div>
              <div className="font-mono text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-0.5">
                {metric.value}
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
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