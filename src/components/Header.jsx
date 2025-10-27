import React, { useEffect, useState } from "react";

const Header = () => {
  
  
  const text = "Klint Morales Ruales"
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 100 : 150;

    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, index));

      if(!isDeleting && index < text.length){
        setIndex(index + 1);
      } else if(isDeleting && index > 0){
        setIndex(index - 1);
      } else if(index === text.length){
        setTimeout(() => setIsDeleting(true), 1000);
      } else if(index === 0 && isDeleting){
        setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
            <img 
            src="src\assets\profile.png"
            alt="profile"
            className="w-20 h-20 rounded-full border-2 border-blue-400"
            />
            <div>
              <h1 className="text-white text-3xl font-mono">
                {displayedText}
                <span className="border-r-2 border-white animate-pulse"></span>
              </h1>
              <p className="text-blue-600 text-2xl">
                Full-Stack Developer 
              </p>
              <p className="text-gray-400 text-sm">
                Cebu City, Cebu 6000 Philippines
              </p>
            </div>
        </div>
        <div className="mt-12 md:mt-0 flex gap-4">
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white transform hover:-translate-y-1 hover:scale-103 transition duration-300 ease-in-out">
            Send Email
          </button>
          <button className="border border-gray-500 px-4 py-2 rounded-lg text-black transform hover:-translate-y-1 hover:scale-103 transition duration-300 ease-in-out">
            View Resume
          </button>
          <button className="bg-gray-700 px-4 py-2 rounded-lg text-white transform hover:-translate-y-1 hover:scale-103 transition duration-300 ease-in-out">
            <a href="https://www.linkedin.com/in/klint-ruales-67865527b/">
              LinkedIn
            </a>
          </button>
        </div>
    </header>
  );
};

export default Header;
