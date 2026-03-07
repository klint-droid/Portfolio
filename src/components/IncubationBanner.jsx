import React from 'react';

const IncubationBanner = () => {
  return (
    <div className="w-full h-auto mb-6 rounded-[10px] overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
      <a href="https://www.datacamp.com/certificate/SQA0012000674391" target="_blank" rel="noopener noreferrer">
        <img 
          src="/badge/SQL Associate - LinkedIn.png" 
          alt="DataCamp SQL Associate Badge"
          className="w-full h-full object-cover block"
        />
      </a>
    </div>
  );
};

export default IncubationBanner;