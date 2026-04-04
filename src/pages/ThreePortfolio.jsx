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
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-50">

          {/* 🔙 BACK BUTTON */}
          <button
            onClick={() => setActivePanel(null)}
            className="absolute top-10 left-10 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500"
          >
            ← Back
          </button>

          {/* 🧠 CONTENT */}
          <div className="bg-[#0f172a] border border-purple-500 rounded-2xl p-8 text-center shadow-xl">

            <h1 className="text-3xl font-bold mb-4">
              {activePanel.id}
            </h1>

            <div className="w-80 h-3 bg-gray-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${activePanel.level}%` }}
              />
            </div>

            <p className="text-purple-300">
              Mastery: {activePanel.level}%
            </p>

          </div>
        </div>
      )}

    </div>
  );
}