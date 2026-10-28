import React from "react";
import { ClaudeStarburst } from "./ClaudeIcons";

const Footer = () => {
  return (
    <footer className="py-6 mt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between claude-font-mono text-xs text-[var(--text-muted)] gap-2">
      <div className="flex items-center gap-1.5">
        <ClaudeStarburst size={13} className="text-[#D97757]" />
        <p>&copy; {new Date().getFullYear()} Klint Morales Ruales. All rights reserved.</p>
      </div>
      <p className="text-[11px] text-[var(--text-muted)]">
        KlintGPT • Inspired by Claude AI & MarufGPT
      </p>
    </footer>
  );
};

export default Footer;