import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Html } from "@react-three/drei";

const HOLO_NODES = [
  { label: "REACT", color: "#61DAFB", angle: 0 },
  { label: "NODE", color: "#4ADE80", angle: (Math.PI * 2) / 6 },
  { label: "LARAVEL", color: "#D97757", angle: ((Math.PI * 2) / 6) * 2 },
  { label: "PYTHON", color: "#FACC15", angle: ((Math.PI * 2) / 6) * 3 },
  { label: "AWS", color: "#FB923C", angle: ((Math.PI * 2) / 6) * 4 },
  { label: "DOCKER", color: "#38BDF8", angle: ((Math.PI * 2) / 6) * 5 },
];

export default function InteractiveStations({
  activeStation,
  onSelectStation,
  hoveredStation,
  setHoveredStation,
  discoveredClues = [],
}) {
  const holoRingRef = useRef();
  const trophyRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (holoRingRef.current) {
      holoRingRef.current.rotation.y = t * 0.42;
      holoRingRef.current.position.y = 1.48 + Math.sin(t * 2.1) * 0.05;
    }
    if (trophyRef.current) {
      trophyRef.current.rotation.y = Math.sin(t * 0.8) * 0.25;
    }
  });

  const makeHandlers = (id) => ({
    onClick: (e) => {
      e.stopPropagation();
      onSelectStation?.(id);
    },
    onPointerOver: (e) => {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      setHoveredStation?.(id);
    },
    onPointerOut: () => {
      document.body.style.cursor = "auto";
      if (hoveredStation === id) setHoveredStation?.(null);
    },
  });

  const isProjectsHovered = hoveredStation === "projects";
  const isStackHovered = hoveredStation === "stack";
  const isCareerHovered = hoveredStation === "career";

  return (
    <group>
      {/* ================================================================
          STATION 1: SHIPPED PROJECTS MONITOR WALL (Left Wall)
      ================================================================ */}
      <group position={[-5.7, 0, -1.0]} rotation={[0, Math.PI / 2, 0]} {...makeHandlers("projects")}>
        {/* Walnut Media Credenza */}
        <RoundedBox args={[3.4, 0.72, 0.75]} radius={0.03} position={[0, 0.36, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#4A3224" roughness={0.6} />
        </RoundedBox>
        {/* Cabinet seam lines */}
        <mesh position={[-0.85, 0.36, 0.38]}>
          <boxGeometry args={[0.015, 0.56, 0.01]} />
          <meshStandardMaterial color="#1A1715" />
        </mesh>
        <mesh position={[0.85, 0.36, 0.38]}>
          <boxGeometry args={[0.015, 0.56, 0.01]} />
          <meshStandardMaterial color="#1A1715" />
        </mesh>

        {/* Terracotta Ambient Wall Light Strip */}
        <mesh position={[0, 2.38, -0.58]}>
          <boxGeometry args={[3.1, 0.04, 0.04]} />
          <meshStandardMaterial
            color="#D97757"
            emissive="#D97757"
            emissiveIntensity={isProjectsHovered ? 2.4 : 1.1}
          />
        </mesh>

        {/* Left Ultrawide Monitor (DoseDay + EvaTrack) */}
        <group position={[-0.78, 1.48, -0.08]} rotation={[0, 0.14, 0]}>
          {/* Stand */}
          <mesh position={[0, -0.48, -0.05]}>
            <boxGeometry args={[0.09, 0.42, 0.06]} />
            <meshStandardMaterial color="#161514" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[0.42, 0.03, 0.25]} />
            <meshStandardMaterial color="#161514" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Bezel */}
          <RoundedBox args={[1.45, 0.88, 0.06]} radius={0.025} castShadow>
            <meshStandardMaterial
              color="#141413"
              emissive="#D97757"
              emissiveIntensity={isProjectsHovered ? 0.22 : 0.02}
              metalness={0.5}
              roughness={0.4}
            />
          </RoundedBox>
          {/* Glowing Display */}
          <mesh position={[0, 0, 0.033]}>
            <planeGeometry args={[1.36, 0.78]} />
            <meshStandardMaterial
              color="#1B1917"
              emissive="#2D241E"
              emissiveIntensity={isProjectsHovered ? 0.9 : 0.5}
            />
          </mesh>
          {/* Stylized UI header bar */}
          <mesh position={[0, 0.31, 0.038]}>
            <planeGeometry args={[1.28, 0.08]} />
            <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={0.8} />
          </mesh>
          <Text position={[0, 0.31, 0.042]} fontSize={0.045} color="#FFF" anchorX="center" anchorY="middle">
            SHIPPED PROJECTS • 11 APPS
          </Text>
          {/* Project cards on screen */}
          <mesh position={[-0.32, 0.04, 0.038]}>
            <planeGeometry args={[0.56, 0.34]} />
            <meshStandardMaterial color="#272421" emissive="#D97757" emissiveIntensity={0.18} />
          </mesh>
          <Text position={[-0.32, 0.1, 0.044]} fontSize={0.055} color="#F3F1EC" anchorX="center" anchorY="middle">
            DoseDay
          </Text>
          <Text position={[-0.32, -0.02, 0.044]} fontSize={0.03} color="#D97757" anchorX="center" anchorY="middle">
            Flutter • Health App
          </Text>

          <mesh position={[0.32, 0.04, 0.038]}>
            <planeGeometry args={[0.56, 0.34]} />
            <meshStandardMaterial color="#272421" emissive="#E2A055" emissiveIntensity={0.18} />
          </mesh>
          <Text position={[0.32, 0.1, 0.044]} fontSize={0.055} color="#F3F1EC" anchorX="center" anchorY="middle">
            EvaTrack
          </Text>
          <Text position={[0.32, -0.02, 0.044]} fontSize={0.03} color="#E2A055" anchorX="center" anchorY="middle">
            Laravel • React • SQL
          </Text>

          <Text position={[0, -0.25, 0.044]} fontSize={0.038} color="#A09C92" anchorX="center" anchorY="middle">
            Click to explore live demos →
          </Text>
        </group>

        {/* Right Ultrawide Monitor (Friend Quiz + POSify) */}
        <group position={[0.78, 1.48, -0.08]} rotation={[0, -0.14, 0]}>
          <mesh position={[0, -0.48, -0.05]}>
            <boxGeometry args={[0.09, 0.42, 0.06]} />
            <meshStandardMaterial color="#161514" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[0.42, 0.03, 0.25]} />
            <meshStandardMaterial color="#161514" metalness={0.8} roughness={0.3} />
          </mesh>
          <RoundedBox args={[1.45, 0.88, 0.06]} radius={0.025} castShadow>
            <meshStandardMaterial
              color="#141413"
              emissive="#5EEAD4"
              emissiveIntensity={isProjectsHovered ? 0.2 : 0.02}
              metalness={0.5}
              roughness={0.4}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.033]}>
            <planeGeometry args={[1.36, 0.78]} />
            <meshStandardMaterial color="#13191B" emissive="#16282B" emissiveIntensity={0.65} />
          </mesh>
          <mesh position={[0, 0.31, 0.038]}>
            <planeGeometry args={[1.28, 0.08]} />
            <meshStandardMaterial color="#0D9488" emissive="#5EEAD4" emissiveIntensity={0.55} />
          </mesh>
          <Text position={[0, 0.31, 0.042]} fontSize={0.044} color="#F3F1EC" anchorX="center" anchorY="middle">
            LIVE WEB • ML • ENTERPRISE
          </Text>
          <Text position={[0, 0.07, 0.044]} fontSize={0.062} color="#5EEAD4" anchorX="center" anchorY="middle">
            Friend Quiz • POSify
          </Text>
          <Text position={[0, -0.1, 0.044]} fontSize={0.042} color="#E2E8F0" anchorX="center" anchorY="middle">
            Evacuation AI • Grade Predict
          </Text>
          <Text position={[0, -0.25, 0.044]} fontSize={0.034} color="#94A3B8" anchorX="center" anchorY="middle">
            {discoveredClues.includes("inspected-projects") ? "✓ EVIDENCE COLLECTED" : "● UNINSPECTED STATION"}
          </Text>
        </group>

        {isProjectsHovered && activeStation !== "projects" && (
          <Html position={[0, 2.55, 0.1]} center distanceFactor={7}>
            <div className="pointer-events-none select-none px-3 py-1.5 rounded-full bg-[#181816]/92 border border-[#D97757]/70 text-[#F3F1EC] text-xs font-mono whitespace-nowrap shadow-lg">
              <span className="text-[#D97757] font-bold mr-1.5">[Click]</span>
              Inspect Projects Monitor
            </div>
          </Html>
        )}
      </group>

      {/* ================================================================
          STATION 2: TECH STACK HOLOGRAM CONSOLE (Right Side)
      ================================================================ */}
      <group position={[4.65, 0, -0.25]} {...makeHandlers("stack")}>
        {/* Pedestal Base */}
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.78, 0.88, 0.12, 28]} />
          <meshStandardMaterial color="#1C1B19" metalness={0.65} roughness={0.35} />
        </mesh>
        {/* Walnut Column */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.52, 0.82, 24]} />
          <meshStandardMaterial color="#4A3224" roughness={0.58} />
        </mesh>
        {/* Emitter Top Ring */}
        <mesh position={[0, 0.96, 0]} castShadow>
          <cylinderGeometry args={[0.72, 0.64, 0.1, 28]} />
          <meshStandardMaterial color="#23211E" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Glowing Emitter Core */}
        <mesh position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 0.58, 32]} />
          <meshStandardMaterial
            color="#D97757"
            emissive="#D97757"
            emissiveIntensity={isStackHovered ? 2.5 : 1.4}
            side={2}
          />
        </mesh>

        {/* Translucent Hologram Projection Cone */}
        <mesh position={[0, 1.46, 0]}>
          <cylinderGeometry args={[0.85, 0.32, 0.85, 24, 1, true]} />
          <meshBasicMaterial
            color="#D97757"
            transparent
            opacity={isStackHovered ? 0.14 : 0.07}
            side={2}
            depthWrite={false}
          />
        </mesh>

        {/* Orbiting 3D Tech Nodes */}
        <group ref={holoRingRef} position={[0, 1.48, 0]}>
          {/* Center glowing core */}
          <mesh>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
              color="#D97757"
              emissive="#FF9E6D"
              emissiveIntensity={isStackHovered ? 2.2 : 1.3}
              wireframe
            />
          </mesh>

          {HOLO_NODES.map((node, idx) => {
            const radius = 0.66;
            const x = Math.cos(node.angle) * radius;
            const z = Math.sin(node.angle) * radius;
            const y = Math.sin(idx * 1.4) * 0.12;
            return (
              <group key={node.label} position={[x, y, z]}>
                <mesh>
                  <boxGeometry args={[0.16, 0.16, 0.16]} />
                  <meshStandardMaterial
                    color={node.color}
                    emissive={node.color}
                    emissiveIntensity={isStackHovered ? 1.6 : 0.9}
                    roughness={0.2}
                    metalness={0.5}
                  />
                </mesh>
                <Text
                  position={[0, 0.17, 0]}
                  fontSize={0.07}
                  color="#F3F1EC"
                  anchorX="center"
                  anchorY="middle"
                >
                  {node.label}
                </Text>
              </group>
            );
          })}
        </group>

        {/* Front Console Label */}
        <Text
          position={[-0.58, 0.62, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.08}
          color="#D97757"
          anchorX="center"
          anchorY="middle"
        >
          TECH STACK
        </Text>

        {isStackHovered && activeStation !== "stack" && (
          <Html position={[0, 2.22, 0]} center distanceFactor={7}>
            <div className="pointer-events-none select-none px-3 py-1.5 rounded-full bg-[#181816]/92 border border-[#D97757]/70 text-[#F3F1EC] text-xs font-mono whitespace-nowrap shadow-lg">
              <span className="text-[#D97757] font-bold mr-1.5">[Click]</span>
              Inspect Tech Stack Console
            </div>
          </Html>
        )}
      </group>

      {/* ================================================================
          STATION 3: CAREER, CERTS & AWARDS SHELF (Back-Left Wall)
      ================================================================ */}
      <group position={[-3.35, 0, -5.08]} {...makeHandlers("career")}>
        {/* Floating Walnut Shelves */}
        {[1.18, 1.85, 2.5].map((y, idx) => (
          <RoundedBox key={idx} args={[2.15, 0.06, 0.36]} radius={0.015} position={[0, y, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#5A3C2A" roughness={0.58} />
          </RoundedBox>
        ))}

        {/* Warm Backlight Bar */}
        <mesh position={[0, 2.72, -0.15]}>
          <boxGeometry args={[2.0, 0.03, 0.03]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={isCareerHovered ? 2.4 : 1.0}
          />
        </mesh>

        {/* Wakuworks 3rd Place Golden Trophy (Middle Shelf Center) */}
        <group ref={trophyRef} position={[0, 1.9, 0.02]}>
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.18, 0.08, 0.18]} />
            <meshStandardMaterial color="#181816" roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.03, 0.05, 0.2, 14]} />
            <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} emissive="#F59E0B" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0, 0.34, 0]}>
            <cylinderGeometry args={[0.11, 0.06, 0.18, 18]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.92} roughness={0.18} emissive="#F59E0B" emissiveIntensity={0.35} />
          </mesh>
        </group>

        {/* Framed Certificates & Milestone Plaques */}
        {[
          { x: -0.68, y: 2.15, title: "KYOCERA", sub: "SWE Intern", color: "#D97757" },
          { x: 0.68, y: 2.15, title: "GOOGLE", sub: "Python & Sec", color: "#60A5FA" },
          { x: -0.62, y: 1.48, title: "JP MORGAN", sub: "Immersion", color: "#F59E0B" },
          { x: 0.62, y: 1.48, title: "DATAWORDS", sub: "UI Designer", color: "#5EEAD4" },
        ].map((plaque) => (
          <group key={plaque.title} position={[plaque.x, plaque.y, -0.05]}>
            <RoundedBox args={[0.56, 0.44, 0.04]} radius={0.015} castShadow>
              <meshStandardMaterial
                color="#1B1917"
                emissive={plaque.color}
                emissiveIntensity={isCareerHovered ? 0.35 : 0.08}
                roughness={0.4}
              />
            </RoundedBox>
            <mesh position={[0, 0, 0.022]}>
              <planeGeometry args={[0.48, 0.36]} />
              <meshStandardMaterial color="#252320" />
            </mesh>
            <Text position={[0, 0.05, 0.026]} fontSize={0.062} color={plaque.color} anchorX="center" anchorY="middle">
              {plaque.title}
            </Text>
            <Text position={[0, -0.06, 0.026]} fontSize={0.045} color="#F3F1EC" anchorX="center" anchorY="middle">
              {plaque.sub}
            </Text>
          </group>
        ))}

        {/* Decorative Books on Bottom Shelf */}
        {[-0.75, -0.64, -0.53, 0.55, 0.66].map((bx, i) => (
          <mesh key={i} position={[bx, 1.35, 0]}>
            <boxGeometry args={[0.08, 0.28 + (i % 2) * 0.05, 0.22]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#8B4B34" : "#2D3748"} roughness={0.8} />
          </mesh>
        ))}

        {/* Shelf Header */}
        <Text position={[0, 2.86, -0.08]} fontSize={0.095} letterSpacing={0.12} color="#F3F1EC" anchorX="center" anchorY="middle">
          CAREER & AWARDS
        </Text>

        {isCareerHovered && activeStation !== "career" && (
          <Html position={[0, 3.05, 0.1]} center distanceFactor={7}>
            <div className="pointer-events-none select-none px-3 py-1.5 rounded-full bg-[#181816]/92 border border-[#D97757]/70 text-[#F3F1EC] text-xs font-mono whitespace-nowrap shadow-lg">
              <span className="text-[#D97757] font-bold mr-1.5">[Click]</span>
              Inspect Career, Certs & Quotes
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
