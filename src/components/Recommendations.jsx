import { useState } from "react";
import { GoCommentDiscussion } from "react-icons/go";

const Recommendations = () => {

    const testimonials = [
        {
            text: "Klint is very dedicated and passionate about his work. He consistently goes above and beyond to deliver high-quality results.",
            name: "Kent John Navarro",
            role: "Student at University of San Jose - Recoletos",
        },
        {
            text: "Klint has a great eye for design and pays attention to detail. His creativity and problem-solving skills make him a valuable asset to any team.",
            name: "Maria Lopez",
            role: "Student at University of San Jose - Recoletos",
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="card rounded-3xl h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    
                    <GoCommentDiscussion className="text-xl"/>
                    <h2 className="text-lg font-bold">Recommendations</h2>
                </div>
                <div className="flex-1">
                   
                    <p className="text-sm italic leading-relaxed mb-6 opacity-70">
                        "{testimonials[activeIndex].text}"
                    </p>
                    <div className="w-full bg-gray-500 h-px my-4"></div>
                    <div>
                        <h3 className="text-sm font-bold">
                            {testimonials[activeIndex].name}
                        </h3>
                        <p className="text-xs opacity-60">
                            {testimonials[activeIndex].role}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`transition-all duration-300 rounded-full ${
                            activeIndex === index 
                            ? 'w-3 h-3 bg-[var(--text-primary)]' 
                            : 'w-2 h-2 bg-[var(--border-color)] hover:bg-[var(--text-secondary)]'   
                        }`}
                        aria-label={`View testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Recommendations;