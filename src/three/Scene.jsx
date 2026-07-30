import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { Grid, Environment } from "@react-three/drei";
import { BlendFunction } from "postprocessing";
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
      <fog attach="fog" args={["#020617", 5, 30]} />
      
      <Environment preset="night" />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={4} color="#a855f7" distance={20} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#22d3ee" distance={20} />

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

      <EffectComposer disableNormalPass>
        <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.001, 0.001]} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      <Particles />
    </Canvas>
  );
}