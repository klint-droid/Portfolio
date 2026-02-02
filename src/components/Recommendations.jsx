import React, { useState } from "react";
import { GoCommentDiscussion } from "react-icons/go";  

const Recommendations = () => {

    const testimonials = [
        {
            id: 1,
            text: "Klint is very dedicated and passionate about his work. He consistently goes above and beyond to deliver high-quality results.",
            name: "Kent John Navarro",
            role: "Student at University of San Jose - Recoletos",
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-4">
                <GoCommentDiscussion className="text-xl text-gray-800"/>
                <h2 className="text-lg font-bold text-gray-900">Recommendations</h2>
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-600 italic leading-relaxed mb-6">
                    "{testimonials[activeIndex].text}"
                </p>
                <div>
                    <h3 className="text-sm font-bold text-gray-900">
                        {testimonials[activeIndex].name}
                    </h3>
                    <p className="text-xs text-gray-500">
                        {testimonials[activeIndex].role}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                    <button
                    key={index}
                    onClick = {() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-gray-800 w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`View testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Recommendations;