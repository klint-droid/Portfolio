import React from 'react';

const IncubationBanner = () => {
  return (
    <div className="w-full h-1/2 mb-6 rounded-[24px] overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
      <a href="https://www.datacamp.com/portfolio/thisisklint" target="_blank" rel="noopener noreferrer">
        <img 
          src="/Datacamp.png" 
          alt="Google Developer Groups Scholarship Certificate"
          className="w-full h-full object-cover block"
        />
      </a>
    </div>
  );
};

export default IncubationBanner;