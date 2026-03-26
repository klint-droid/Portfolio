import { useEffect, useState } from "react";
import { FaCalendarAlt, FaDownload, FaEnvelope, FaMapMarkerAlt, FaMoon, FaSun } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Header = ({ theme, toggleTheme }) => {
  
  const text = "Klint Morales Ruales";
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

  const isDark = theme === 'dark';

  return (
    <div 
      className="relative"
    >
      
      <div className="absolute top-6 right-6" onClick={toggleTheme}>
        <div className={`w-14 h-7 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
          <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
            {isDark ? (
              <FaMoon size={12} className="text-slate-800"/>
            ) : (
              <FaSun size={12} className="text-yellow-500"/>
            )}
          </div>
        </div> 
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center p-1 transition-colors">
        
        <div className="flex-shrink-0">
          <img
            src="R.png"
            alt="profile"
            className={`w-35 h-40 md:w-40 md:h-45 rounded-2xl object-cover mt-3 shadow-sm transition-colors duration-300 ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}
          />
        </div>

        <div className="flex-1 text-center md:text-left pt-2">
          
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <h1 className={`text-3xl font-bold tracking-tight min-h-[40px] transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {displayedText}
              <span className="animate-pulse text-blue-500">|</span>
            </h1>
            <MdVerified className="text-blue-500" size={24} />
          </div>

          <div className={`flex items-center justify-center md:justify-start gap-2 text-sm mb-3 font-medium transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <FaMapMarkerAlt className={isDark ? "text-gray-500" : "text-gray-400"} />
            <span>Cebu City, Cebu, Philippines</span> <span>|</span><span>+639363488084</span>
          </div>

          <p className={`text-2xl font-medium mb-6 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Software Developer <span className="text-gray-300 mx-2">|</span> Automation <span className="text-gray-300 mx-2">|</span> Data Analyst
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            
            <a
            href="https://calendly.com/klintruales11"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 hover:bg-black text-white shadow-gray-200'}`}>
              <FaCalendarAlt className="text-sm"/>
              <span>Schedule a Call</span>
            </a>
            
            <a
            href="mailto:klintruales11@gmail.com?subject=Project Inquiry"
            className={`flex items-center gap-2 border px-5 py-2.5 rounded-xl font-medium transition-colors ${isDark ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-white text-black border-gray-200 hover:bg-gray-100'}`}>
              <FaEnvelope className={isDark ? "text-gray-300" : "text-gray-700"}/>
              <span>Send Email</span>
            </a>
            
            <a 
              href="/Klint_Ruales_Resume.pdf"           
              download="Klint_Ruales_Resume.pdf"
              className={`flex items-center gap-2 border px-5 py-2.5 rounded-xl font-medium transition-colors cursor-pointer ${isDark ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-white text-black border-gray-200 hover:bg-gray-100'}`}
            >
              <FaDownload className={isDark ? "text-gray-300" : "text-gray-700"}/>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;