import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 mt-6 border-t border-gray-200 dark:border-[#27272a] flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-gray-500 dark:text-gray-400 gap-2">
      <p>&copy; {new Date().getFullYear()} Klint Morales Ruales. All rights reserved.</p>
      <p className="text-[11px] text-gray-400 dark:text-gray-500">
        Designed & Built with React, Vite & Tailwind CSS
      </p>
    </footer>
  );
};

export default Footer;