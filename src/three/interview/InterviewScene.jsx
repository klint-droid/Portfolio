import React, { Suspense, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import StudioRoom from "./StudioRoom";
import KlintCharacter from "./KlintCharacter";
import InterviewerCharacter from "./InterviewerCharacter";
import InteractiveStations from "./InteractiveStations";
import CameraController from "./CameraController";
import { detectMobileDevice } from "./interviewState";

export default function InterviewScene({
  mode,
  cameraPerspective = "third",
  hasEntered,
  klintMood,
  speechText,
  speechSegmentIndex,
  speechTotalSegments,
  isSpeaking,
  showSpeechBubble,
  onSkipNext,
  onReplaySpeech,
  onExpandChat,
  isCelebrating,
  hoveredStation,
  setHoveredStation,
  onSelectStation,
  onCoffeeClick,
  discoveredClues,
  isTypingInput,
  onContextLost,
}) {
  // Detect mobile / low-VRAM devices once on mount to keep WebGL crash-free
  const isMobile = useMemo(() => detectMobileDevice(), []);

  // Shared mutable player transform (updated at 60fps with zero React re-renders)
  const playerRef = useRef({
    pos: new THREE.Vector3(0.2, 0, 2.75),
    yaw: 0,
    isMoving: false,
  });

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? 1 : [1, 1.5]}
      camera={{ position: [2.6, 2.05, 3.2], fov: isMobile ? 52 : 46, near: 0.1, far: 35 }}
      gl={{
        antialias: !isMobile,
        powerPreference: isMobile ? "default" : "high-performance",
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl }) => {
        const dom = gl.domElement;
        const handleLost = (e) => {
          e.preventDefault();
          onContextLost?.();
        };
        dom.addEventListener("webglcontextlost", handleLost, false);
      }}
      className="w-full h-full block"
    >
      <color attach="background" args={["#121110"]} />
      <fog attach="fog" args={["#121110", 11, 24]} />

      {/* Local procedural studio reflections (desktop only — avoids PMREM cubemap VRAM spike on mobile) */}
      {!isMobile && (
        <Environment resolution={128}>
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#FFE4C4"
            scale={[6, 2, 1]}
            position={[0, 4, -1]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Lightformer
            form="circle"
            intensity={1.6}
            color="#D97757"
            scale={2.5}
            position={[-4, 2, -1]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1.2}
            color="#7DD3FC"
            scale={[4, 3, 1]}
            position={[4, 2.2, -5]}
          />
        </Environment>
      )}

      <Suspense fallback={null}>
        <StudioRoom
          isMobile={isMobile}
          isCelebrating={isCelebrating}
          onSelectStation={onSelectStation}
          onCoffeeClick={onCoffeeClick}
          hoveredStation={hoveredStation}
          setHoveredStation={setHoveredStation}
        />

        <KlintCharacter
          mood={klintMood}
          activeStation={mode}
          cameraPerspective={cameraPerspective}
          playerRef={playerRef}
          speechText={speechText}
          speechSegmentIndex={speechSegmentIndex}
          speechTotalSegments={speechTotalSegments}
          isSpeaking={isSpeaking}
          showSpeechBubble={showSpeechBubble}
          onSkipNext={onSkipNext}
          onReplaySpeech={onReplaySpeech}
          onExpandChat={onExpandChat}
          onSelect={onSelectStation}
          hovered={hoveredStation}
          setHovered={setHoveredStation}
        />

        <InterviewerCharacter
          mode={mode}
          cameraPerspective={cameraPerspective}
          hasEntered={hasEntered}
          playerRef={playerRef}
          klintMood={klintMood}
        />

        <InteractiveStations
          isMobile={isMobile}
          activeStation={mode}
          onSelectStation={onSelectStation}
          hoveredStation={hoveredStation}
          setHoveredStation={setHoveredStation}
          discoveredClues={discoveredClues}
        />

        <CameraController
          mode={mode}
          cameraPerspective={cameraPerspective}
          hasEntered={hasEntered}
          isTypingInput={isTypingInput}
          playerRef={playerRef}
        />
      </Suspense>

      {/* Post-processing disabled on mobile to eliminate multi-FBO VRAM crashes */}
      {!isMobile && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur luminanceThreshold={0.95} intensity={0.42} />
          <Vignette eskil={false} offset={0.22} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
