import React, { useState } from "react";

const Recommendations = () => {
  const testimonials = [
    {
      text: "Klint is very dedicated and passionate about his work. He consistently goes above and beyond to deliver high-quality results.",
      name: "Kent John Navarro",
      role: "Software Developer | Student at USJ-R",
      initials: "KN"
    },
    {
      text: "Klint has a great eye for design and pays attention to detail. His creativity and problem-solving skills make him a valuable asset to any team.",
      name: "Milven Sabandal",
      role: "Computer Technology | Student at USJ-R",
      initials: "MS"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="recommendations" className="scroll-mt-20 bento-card">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number">06 // RECOMMENDATIONS</span>
        </div>
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          Peer Feedback
        </span>
      </div>

      <div className="flex flex-col justify-between min-h-[160px]">
        <div className="p-4 rounded-xl border border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#18181b]/50">
          <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            "{testimonials[activeIndex].text}"
          </p>

          <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-[#27272a]">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold flex items-center justify-center">
              {testimonials[activeIndex].initials}
            </div>
            <div>
              <h3 className="font-mono text-xs font-bold text-gray-900 dark:text-white">
                {testimonials[activeIndex].name}
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === index
                  ? "w-4 h-1.5 bg-blue-500"
                  : "w-1.5 h-1.5 bg-gray-300 dark:bg-[#27272a] hover:bg-gray-400"
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;