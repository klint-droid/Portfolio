import { useState } from "react";
import Scene from "../three/Scene";

export default function ThreePortfolio() {
  const [activePanel, setActivePanel] = useState(null);
  const [nearPanel, setNearPanel] = useState(null);

  return (
    <div className="w-screen h-screen relative">
      
      <Scene
        setActivePanel={setActivePanel}
        activePanel={activePanel}
        setNearPanel={setNearPanel}
        nearPanel={nearPanel}
      />

      {/* 🎮 Hint */}
      {!activePanel && !nearPanel && (
        <div className="absolute bottom-10 w-full text-center text-white opacity-70">
          Move with WASD • Press E to interact
        </div>
      )}

      {/* 🪟 FULL PANEL UI */}
      {activePanel && (
        <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-md flex flex-col items-center justify-center text-white z-50 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>

          {/* 🔙 BACK BUTTON */}
          <button
            onClick={() => setActivePanel(null)}
            className="absolute top-10 left-10 px-4 py-2 bg-purple-600/80 hover:bg-purple-500 rounded-lg backdrop-blur-md border border-purple-400/30 transition-all font-mono shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
          >
            ← Back
          </button>

          {/* 🧠 CONTENT */}
          <div className="bg-[#0f172a]/70 backdrop-blur-xl border border-purple-500/50 rounded-2xl p-10 text-center shadow-[0_0_40px_rgba(168,85,247,0.2)] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

            <h1 className="text-4xl font-bold mb-6 font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              {activePanel.id}
            </h1>

            <div className="w-80 h-3 bg-gray-900/80 rounded-full overflow-hidden mb-6 border border-white/10 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] relative"
                style={{ width: `${activePanel.level}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>

            <p className="text-purple-300 font-mono text-sm tracking-widest uppercase">
              Mastery: <span className="text-white font-bold">{activePanel.level}%</span>
            </p>

          </div>
        </div>
      )}

    </div>
  );
}