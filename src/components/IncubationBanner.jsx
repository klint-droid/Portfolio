import React from 'react';

const IncubationBanner = () => {
  return (
    <div className="w-full h-20 mb-6 rounded-[24px] overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
      <a href="https://example.com/program-link" target="_blank" rel="noopener noreferrer">
        <img 
          src="/banner.jpg" 
          alt="" 
          className="w-full h-auto object-cover block"
        />
      </a>
    </div>
  );
};

export default IncubationBanner;