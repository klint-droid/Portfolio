import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm Klint's virtual assistant. Ask me about his skills, projects, education, or experience!"
    }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase();

    if (text.includes("skill") || text.includes("tech") || text.includes("stack") || text.includes("tools")) {
      return "Klint's technical skills include HTML, CSS, JavaScript, ReactJs, PHP, Python, SQL, C#, Java, C, Git, Docker, Linux, Figma, and Photoshop.";
    }
    if (text.includes("project") || text.includes("portfolio") || text.includes("built")) {
      return "Some of his notable projects include a C-based Console Game with a live WebSocket dashboard, and a mental health platform that won 3rd place in the Wakuworks Social Innovation Competition!";
    }
    if (text.includes("education") || text.includes("school") || text.includes("degree") || text.includes("study")) {
      return "He is currently taking an Associate Degree in Computer Technology (Software Development) at the University of San Jose - Recoletos, graduating in December 2026.";
    }
    if (text.includes("experience") || text.includes("work") || text.includes("job") || text.includes("intern")) {
      return "Klint has a strong passion for learning and staying up-to-date with the latest technologies and trends in software development.He is a Digital Designer Trainee at Datawords Philippines and participated in the Youth Empowerment Session at Synchrony. He also has hands-on experience building full-stack applications and working with various technologies through personal projects.";
    }
    if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach")) {
      return "You can reach Klint directly at klint.ruales@student.passerellesnumeriques.org or use the 'Schedule a Call' button on his profile!";
    }
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello! How can I help you learn more about Klint today?";
    }

    return "That's a great question! For more specific details, please feel free to email Klint directly at klint.ruales@student.passerellesnumeriques.org.";
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userText);
      setMessages((prev) => [...prev, { role: "model", text: botResponse }]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[320px] sm:w-[350px] h-[450px] bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-in-up">

          <div className="bg-blue-600 p-4 text-white flex justify-between items-center z-10">
            <div className="flex items-center gap-2 font-bold text-sm">
              <FaRobot className="text-xl" /> Ask about Klint
            </div>
            <button onClick={toggleChat} className="hover:text-blue-200 transition-colors">
              <IoClose size={24} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4 bg-[var(--bg-color)]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
                    msg.role === "user" ? "bg-slate-700" : "bg-blue-600"
                  }`}
                >
                  {msg.role === "user" ? <FaUser size={12} /> : <FaRobot size={14} />}
                </div>

                <p
                  className={`p-3 rounded-2xl shadow-sm max-w-[80%] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                  <FaRobot size={14} />
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-[44px]">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-[var(--card-bg)] border-t border-[var(--border-color)] flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="E.g., What are your skills?"
              className="flex-1 bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 flex-shrink-0"
            >
              <FaPaperPlane size={14} className="-ml-0.5" />
            </button>
          </div>

        </div>
      )}

      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center"
      >
        {isOpen ? <IoClose size={26} /> : <FaRobot size={24} />}
      </button>
    </div>
  );
};

export default AIChatButton;