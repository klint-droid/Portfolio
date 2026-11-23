import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * In-world floating speech bubble anchored beside Klint's head.
 * Animates live in rhythm as Klint voices out every segment of his answer
 * all the way to the end without truncating!
 */
function CharacterSpeechBubble({
  text,
  mood,
  segmentIndex = 0,
  totalSegments = 1,
  isSpeaking = false,
  onSkipNext,
  onReplay,
  onExpandChat,
}) {
  const [chars, setChars] = useState(0);

  // Typewrite each spoken segment cleanly in rhythm with natural speech (~58ms/word ≈ 26ms/char)
  useEffect(() => {
    setChars(0);
    if (!text) return;

    const stepMs = 24;
    const charsPerStep = 1;
    const timer = setInterval(() => {
      setChars((prev) => {
        const next = prev + charsPerStep;
        if (next >= text.length) {
          clearInterval(timer);
          return text.length;
        }
        return next;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [text, segmentIndex]);

  if (mood === "thinking") {
    return (
      <Html position={[0.42, 1.56, 0.12]} style={{ pointerEvents: "none" }}>
        <div className="relative -translate-y-1/2 ml-2 bg-[#1B1A18]/94 border border-[#D97757]/60 text-[#F3F1EC] px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-[0_12px_35px_rgba(0,0,0,0.55)] backdrop-blur-md flex items-center gap-1.5 w-max">
          <span className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce [animation-delay:120ms]" />
          <span className="w-2 h-2 rounded-full bg-[#D97757] animate-bounce [animation-delay:240ms]" />
          <div className="absolute -left-1.5 bottom-2.5 w-3 h-3 bg-[#1B1A18] border-l border-b border-[#D97757]/60 rotate-45" />
        </div>
      </Html>
    );
  }

  if (!text) return null;

  const visible = text.slice(0, chars);
  const isTyping = chars < text.length;
  const progressPct =
    totalSegments > 0
      ? Math.min(100, Math.round(((segmentIndex + (isTyping ? chars / Math.max(1, text.length) : 1)) / totalSegments) * 100))
      : 100;

  return (
    <Html position={[0.38, 1.58, 0.12]}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (isTyping) {
            setChars(text.length);
          } else if (isSpeaking && segmentIndex < totalSegments - 1) {
            onSkipNext?.();
          }
        }}
        className="relative -translate-y-1/2 ml-2 w-[265px] sm:w-[325px] bg-[#1A1917]/94 border border-[#D97757]/65 text-[#F3F1EC] px-4 pt-3 pb-3.5 rounded-2xl rounded-bl-sm shadow-[0_14px_40px_rgba(0,0,0,0.62)] backdrop-blur-xl cursor-pointer select-none transition-all hover:border-[#E88B6C] overflow-hidden"
        title={isSpeaking ? "Click to advance sentence" : "Klint's answer"}
      >
        {/* Speech bubble pointer tail toward Klint */}
        <div className="absolute -left-1.5 bottom-3.5 w-3 h-3 bg-[#1A1917] border-l border-b border-[#D97757]/65 rotate-45" />

        {/* Speaker Mini Header */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            {isSpeaking ? (
              /* Animated equalizer voice bars */
              <span className="inline-flex items-end gap-[2px] h-3">
                <span className="w-[2.5px] h-2 bg-[#D97757] rounded-full animate-pulse" />
                <span className="w-[2.5px] h-3 bg-[#E88B6C] rounded-full animate-bounce" />
                <span className="w-[2.5px] h-1.5 bg-[#D97757] rounded-full animate-pulse [animation-delay:150ms]" />
              </span>
            ) : (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  mood === "celebrating" ? "bg-emerald-400 animate-ping" : "bg-emerald-400"
                }`}
              />
            )}
            <span className="claude-font-mono text-[10px] uppercase tracking-wider font-semibold text-[#E88B6C]">
              Klint
            </span>
            {totalSegments > 1 && (
              <span className="claude-font-mono text-[9px] text-[#8A857B]">
                {Math.min(segmentIndex + 1, totalSegments)}/{totalSegments}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && segmentIndex < totalSegments - 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSkipNext?.();
                }}
                className="claude-font-mono text-[10px] text-[#A09C92] hover:text-[#F3F1EC] transition-colors"
              >
                Next ▸
              </button>
            )}
            {!isSpeaking && totalSegments > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReplay?.();
                }}
                className="claude-font-mono text-[10px] text-[#A09C92] hover:text-[#D97757] transition-colors"
              >
                ↺ Replay
              </button>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExpandChat?.();
              }}
              className="claude-font-mono text-[10px] text-[#A09C92] hover:text-[#D97757] transition-colors"
            >
              Chat
            </button>
          </div>
        </div>

        {/* Live Voiced Text */}
        <p className="text-xs sm:text-[13px] leading-relaxed text-[#F3F1EC] font-normal min-h-[2.4rem]">
          {visible}
          {(isTyping || isSpeaking) && (
            <span className="inline-block w-1.5 h-3.5 bg-[#D97757] ml-0.5 animate-pulse align-middle" />
          )}
        </p>

        {/* Sleek Reading Progress Bar along bottom edge */}
        {totalSegments > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2A2824]">
            <div
              className="h-full bg-gradient-to-r from-[#D97757] to-amber-400 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </div>
    </Html>
  );
}

const CHAR_WORLD_POS = new THREE.Vector3(0, 1.38, -2.08);

/**
 * Stylized procedural 3D Klint character seated behind the interview desk.
 * Supports:
 * - Smooth eye/head tracking toward the interviewer camera or inspected station
 * - Natural periodic blinking
 * - Expressive states: 'idle' | 'thinking' | 'talking' | 'celebrating' | 'coffee'
 * - In-world floating Speech Bubble beside Klint's head
 */
export default function KlintCharacter({
  mood = "idle",
  activeStation = "explore",
  cameraPerspective = "third",
  playerRef,
  speechText = "",
  speechSegmentIndex = 0,
  speechTotalSegments = 1,
  isSpeaking = false,
  showSpeechBubble = false,
  onSkipNext,
  onReplaySpeech,
  onExpandChat,
  onSelect,
  hovered,
  setHovered,
}) {
  const rootRef = useRef();
  const torsoRef = useRef();
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const mouthRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const thinkOrbRef = useRef();

  const blinkTimer = useRef(0);
  const nextBlink = useRef(2.8);
  const targetLook = useRef(new THREE.Vector3(0, 1.4, 2));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // 1. Subtle breathing & posture sway
    if (torsoRef.current) {
      const breathSpeed = mood === "celebrating" ? 6.0 : mood === "talking" ? 3.2 : 1.6;
      const breathAmp = mood === "celebrating" ? 0.028 : 0.01;
      torsoRef.current.position.y = 0.88 + Math.sin(t * breathSpeed) * breathAmp;
      torsoRef.current.rotation.z =
        mood === "celebrating"
          ? Math.sin(t * 7) * 0.06
          : Math.sin(t * 0.9) * 0.015;
    }

    // 2. Head tracking toward interviewer camera or currently inspected station
    if (headRef.current) {
      if (activeStation === "projects") {
        targetLook.current.set(-4.8, 1.5, -1.0);
      } else if (activeStation === "stack") {
        targetLook.current.set(4.5, 1.4, -0.3);
      } else if (activeStation === "career") {
        targetLook.current.set(-3.3, 1.8, -4.5);
      } else if (activeStation === "resume") {
        targetLook.current.set(0.85, 0.9, -1.1);
      } else if (activeStation === "recommendations") {
        targetLook.current.set(5.5, 1.7, 2.35);
      } else if (activeStation === "community") {
        targetLook.current.set(-5.5, 1.6, 2.65);
      } else if (activeStation === "oracle") {
        targetLook.current.set(-2.35, 1.5, 4.5);
      } else if (activeStation === "seated") {
        targetLook.current.set(0, 1.42, 0.48);
      } else if (cameraPerspective === "third" && playerRef?.current) {
        targetLook.current.set(
          playerRef.current.pos.x,
          1.52,
          playerRef.current.pos.z
        );
      } else {
        targetLook.current.copy(state.camera.position);
      }

      const dx = targetLook.current.x - CHAR_WORLD_POS.x;
      const dy = targetLook.current.y - CHAR_WORLD_POS.y;
      const dz = Math.max(0.5, targetLook.current.z - CHAR_WORLD_POS.z);

      let desiredYaw = THREE.MathUtils.clamp(Math.atan2(dx, dz) * 0.65, -0.58, 0.58);
      let desiredPitch = THREE.MathUtils.clamp(-Math.atan2(dy, Math.hypot(dx, dz)) * 0.45, -0.25, 0.25);

      if (mood === "thinking") {
        desiredYaw += 0.16;
        desiredPitch -= 0.12;
      } else if (mood === "talking") {
        desiredPitch += Math.sin(t * 5.2) * 0.055;
        desiredYaw += Math.sin(t * 2.1) * 0.04;
      } else if (mood === "celebrating") {
        desiredPitch -= 0.06 + Math.sin(t * 8) * 0.08;
      }

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, desiredYaw, dt * 5.5);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, desiredPitch, dt * 5.5);
      headRef.current.rotation.z = THREE.MathUtils.lerp(
        headRef.current.rotation.z,
        mood === "thinking" ? 0.1 : mood === "coffee" ? -0.08 : 0,
        dt * 5
      );
    }

    // 3. Natural eye blinking
    blinkTimer.current += dt;
    let eyeScaleY = 1;
    if (blinkTimer.current > nextBlink.current) {
      const blinkProgress = (blinkTimer.current - nextBlink.current) / 0.14;
      if (blinkProgress < 1) {
        eyeScaleY = Math.max(0.08, Math.abs(Math.cos(blinkProgress * Math.PI)));
      } else {
        blinkTimer.current = 0;
        nextBlink.current = 2.4 + ((Math.sin(t * 13.7) + 1) * 1.4);
      }
    }
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY;
      rightEyeRef.current.scale.y = eyeScaleY;
    }

    // 4. Mouth animation during speaking or celebrating
    if (mouthRef.current) {
      if (mood === "talking") {
        const talkOpen = 0.7 + Math.abs(Math.sin(t * 14)) * 1.4;
        mouthRef.current.scale.set(1.05, talkOpen, 1);
      } else if (mood === "celebrating") {
        mouthRef.current.scale.set(1.35, 1.6, 1);
      } else {
        mouthRef.current.scale.set(1, 0.45, 1);
      }
    }

    // 5. Expressive arms / hand gestures
    if (leftArmRef.current && rightArmRef.current) {
      let lRotX = -0.78;
      let rRotX = -0.78;
      let lRotZ = 0.12;
      let rRotZ = -0.12;

      if (mood === "talking") {
        lRotX = -0.92 + Math.sin(t * 4.5) * 0.18;
        rRotX = -0.95 + Math.cos(t * 4.0) * 0.2;
        lRotZ = 0.22 + Math.sin(t * 2.5) * 0.08;
        rRotZ = -0.22 - Math.cos(t * 2.5) * 0.08;
      } else if (mood === "thinking") {
        lRotX = -0.72;
        rRotX = -1.65;
        rRotZ = -0.35;
      } else if (mood === "celebrating") {
        lRotX = -2.45 + Math.sin(t * 9) * 0.25;
        rRotX = -2.45 - Math.sin(t * 9) * 0.25;
        lRotZ = 0.45;
        rRotZ = -0.45;
      } else if (mood === "coffee") {
        lRotX = -1.35;
        lRotZ = 0.28;
        rRotX = -0.82;
      }

      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, lRotX, dt * 6);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, rRotX, dt * 6);
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, lRotZ, dt * 6);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, rRotZ, dt * 6);
    }

    // 6. Floating thinking indicator
    if (thinkOrbRef.current) {
      thinkOrbRef.current.rotation.y = t * 2.5;
      thinkOrbRef.current.position.y = 1.82 + Math.sin(t * 4) * 0.04;
    }
  });

  const skinColor = "#D9A47F";
  const hoodieColor = hovered ? "#2F2E2B" : "#252422";
  const hairColor = "#171514";

  return (
    <group
      ref={rootRef}
      position={[0, 0, -2.08]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.("seated");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHovered?.("seated");
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        if (hovered === "seated") setHovered?.(null);
      }}
    >
      {/* Seated Legs (under desk) */}
      <mesh position={[-0.14, 0.46, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.085, 0.34, 6, 12]} />
        <meshStandardMaterial color="#1A1D24" roughness={0.85} />
      </mesh>
      <mesh position={[0.14, 0.46, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.085, 0.34, 6, 12]} />
        <meshStandardMaterial color="#1A1D24" roughness={0.85} />
      </mesh>

      {/* Upper Body Group */}
      <group ref={torsoRef} position={[0, 0.88, 0]}>
        {/* Smart-casual charcoal hoodie/jacket torso */}
        <RoundedBox args={[0.48, 0.54, 0.28]} radius={0.09} castShadow>
          <meshStandardMaterial
            color={hoodieColor}
            emissive="#D97757"
            emissiveIntensity={hovered ? 0.14 : 0.02}
            roughness={0.78}
          />
        </RoundedBox>

        {/* Warm cream inner tee collar */}
        <mesh position={[0, 0.16, 0.135]}>
          <boxGeometry args={[0.14, 0.22, 0.03]} />
          <meshStandardMaterial color="#EAE5DC" roughness={0.85} />
        </mesh>

        {/* Signature Terracotta lapel / badge detail */}
        <mesh position={[0.14, 0.14, 0.145]}>
          <boxGeometry args={[0.06, 0.025, 0.015]} />
          <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={0.65} />
        </mesh>

        {/* Hoodie collar ring */}
        <mesh position={[0, 0.27, -0.02]} rotation={[0.15, 0, 0]}>
          <torusGeometry args={[0.145, 0.042, 10, 20]} />
          <meshStandardMaterial color="#1E1D1B" roughness={0.85} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.068, 0.075, 0.12, 14]} />
          <meshStandardMaterial color={skinColor} roughness={0.62} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.29, 0.19, 0.02]}>
          <mesh position={[0, -0.17, 0]} castShadow>
            <capsuleGeometry args={[0.068, 0.26, 6, 12]} />
            <meshStandardMaterial color={hoodieColor} roughness={0.8} />
          </mesh>
          {/* Left Hand */}
          <mesh position={[0, -0.35, 0.03]}>
            <sphereGeometry args={[0.058, 12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.29, 0.19, 0.02]}>
          <mesh position={[0, -0.17, 0]} castShadow>
            <capsuleGeometry args={[0.068, 0.26, 6, 12]} />
            <meshStandardMaterial color={hoodieColor} roughness={0.8} />
          </mesh>
          {/* Right Hand */}
          <mesh position={[0, -0.35, 0.03]}>
            <sphereGeometry args={[0.058, 12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} />
          </mesh>
        </group>

        {/* Head Group */}
        <group ref={headRef} position={[0, 0.49, 0.02]}>
          {/* Face / Skull */}
          <RoundedBox args={[0.31, 0.34, 0.3]} radius={0.12} castShadow>
            <meshStandardMaterial color={skinColor} roughness={0.58} />
          </RoundedBox>

          {/* Ears */}
          <mesh position={[-0.16, -0.01, 0]}>
            <sphereGeometry args={[0.042, 10, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} />
          </mesh>
          <mesh position={[0.16, -0.01, 0]}>
            <sphereGeometry args={[0.042, 10, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} />
          </mesh>

          {/* Stylized Layered Modern Hair */}
          <group position={[0, 0.08, -0.01]}>
            {/* Top volume */}
            <RoundedBox args={[0.33, 0.16, 0.32]} radius={0.075} position={[0, 0.06, -0.01]} castShadow>
              <meshStandardMaterial color={hairColor} roughness={0.88} />
            </RoundedBox>
            {/* Front textured sweep */}
            <RoundedBox args={[0.29, 0.08, 0.14]} radius={0.035} position={[0.02, 0.05, 0.11]} rotation={[0.12, 0, -0.08]}>
              <meshStandardMaterial color={hairColor} roughness={0.88} />
            </RoundedBox>
            {/* Back hair fade */}
            <RoundedBox args={[0.32, 0.24, 0.12]} radius={0.05} position={[0, -0.06, -0.12]}>
              <meshStandardMaterial color={hairColor} roughness={0.9} />
            </RoundedBox>
          </group>

          {/* Eyebrows */}
          <mesh position={[-0.065, 0.06, 0.152]} rotation={[0, 0, mood === "thinking" ? 0.16 : 0.04]}>
            <boxGeometry args={[0.058, 0.014, 0.01]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0.065, 0.06, 0.152]} rotation={[0, 0, mood === "thinking" ? -0.04 : -0.04]}>
            <boxGeometry args={[0.058, 0.014, 0.01]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>

          {/* Eyes */}
          <group ref={leftEyeRef} position={[-0.065, 0.018, 0.148]}>
            <mesh>
              <sphereGeometry args={[0.024, 12, 12]} />
              <meshStandardMaterial color="#171514" roughness={0.15} />
            </mesh>
            <mesh position={[0.008, 0.008, 0.02]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
          <group ref={rightEyeRef} position={[0.065, 0.018, 0.148]}>
            <mesh>
              <sphereGeometry args={[0.024, 12, 12]} />
              <meshStandardMaterial color="#171514" roughness={0.15} />
            </mesh>
            <mesh position={[0.008, 0.008, 0.02]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* Sleek Thin Dev Glasses */}
          <group position={[0, 0.018, 0.162]}>
            {/* Left frame */}
            <mesh position={[-0.065, 0, 0]}>
              <torusGeometry args={[0.045, 0.005, 8, 24]} />
              <meshStandardMaterial color="#1F1E1D" metalness={0.7} roughness={0.25} />
            </mesh>
            {/* Right frame */}
            <mesh position={[0.065, 0, 0]}>
              <torusGeometry args={[0.045, 0.005, 8, 24]} />
              <meshStandardMaterial color="#1F1E1D" metalness={0.7} roughness={0.25} />
            </mesh>
            {/* Bridge */}
            <mesh position={[0, 0.005, 0]}>
              <boxGeometry args={[0.042, 0.007, 0.007]} />
              <meshStandardMaterial color="#1F1E1D" metalness={0.7} roughness={0.25} />
            </mesh>
            {/* Subtle glass tint (lightweight material for mobile GPU speed) */}
            <mesh position={[-0.065, 0, -0.002]}>
              <circleGeometry args={[0.042, 16]} />
              <meshBasicMaterial color="#DBEAFE" transparent opacity={0.14} />
            </mesh>
            <mesh position={[0.065, 0, -0.002]}>
              <circleGeometry args={[0.042, 16]} />
              <meshBasicMaterial color="#DBEAFE" transparent opacity={0.14} />
            </mesh>
          </group>

          {/* Subtle Nose */}
          <mesh position={[0, -0.024, 0.155]}>
            <sphereGeometry args={[0.016, 8, 8]} />
            <meshStandardMaterial color="#C8916D" roughness={0.65} />
          </mesh>

          {/* Animated Mouth / Smile */}
          <mesh ref={mouthRef} position={[0, -0.082, 0.148]}>
            <capsuleGeometry args={[0.012, 0.042, 4, 8]} />
            <meshStandardMaterial
              color={mood === "talking" || mood === "celebrating" ? "#9A4A38" : "#8F5A46"}
              roughness={0.6}
            />
          </mesh>
        </group>
      </group>

      {/* Subtle Thinking Halo Indicator */}
      {mood === "thinking" && (
        <group ref={thinkOrbRef} position={[0, 1.82, 0]}>
          {[0, 1, 2].map((i) => {
            const angle = (i / 3) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(angle) * 0.12, 0, Math.sin(angle) * 0.12]}>
                <sphereGeometry args={[0.025, 10, 10]} />
                <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={2.0} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Live In-World Speech Bubble */}
      {showSpeechBubble && (
        <CharacterSpeechBubble
          text={speechText}
          mood={mood}
          segmentIndex={speechSegmentIndex}
          totalSegments={speechTotalSegments}
          isSpeaking={isSpeaking}
          onSkipNext={onSkipNext}
          onReplay={onReplaySpeech}
          onExpandChat={onExpandChat}
        />
      )}

      {/* Hover prompt above Klint when not already seated */}
      {hovered === "seated" && activeStation !== "seated" && !showSpeechBubble && (
        <Html position={[0, 1.88, 0]} center distanceFactor={6}>
          <div className="pointer-events-none select-none px-3 py-1.5 rounded-full bg-[#181816]/92 border border-[#D97757]/70 text-[#F3F1EC] text-xs font-mono whitespace-nowrap shadow-lg backdrop-blur-md">
            <span className="text-[#D97757] font-bold mr-1.5">[Click]</span>
            Sit & Interview Klint
          </div>
        </Html>
      )}
    </group>
  );
}
