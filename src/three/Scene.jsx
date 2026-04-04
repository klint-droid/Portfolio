import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Grid } from "@react-three/drei";
import { useState } from "react";
import Player from "./Player";
import Panel from "./Panel";
import { panels } from "./panelsData";
import PanelPopup from "./PanelPopup";
import Particles from "./Particles";

export default function Scene({ setActivePanel, activePanel, setNearPanel, nearPanel }) {

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      
      <color attach="background" args={["#020617"]} />

      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 0]} intensity={3} color="#a855f7" />
      <pointLight position={[5, 5, 5]} intensity={2} color="#22d3ee" />

      <Player
        setActivePanel={setActivePanel}
        activePanel={activePanel}
        setNearPanel={setNearPanel}
      />

      {panels.map((panel, i) => (
        <Panel
          key={i}
          position={panel.position.toArray()}
          id={panel.id}
          isNear={false} // temporary (we fix below)
        />
      ))}

        {nearPanel && !activePanel && (
            <PanelPopup panel={nearPanel} />
        )}

      <Grid position={[0, -0.01, 0]} args={[50, 50]} cellSize={1} cellThickness={0.5} cellColor="#6b21a8" sectionSize={5} sectionThickness={1} sectionColor="#c084fc" fadeDistance={30} fadeStrength={1} />

      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
      </EffectComposer>

      <Particles />
    </Canvas>
  );
}