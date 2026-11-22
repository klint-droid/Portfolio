import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* Cebu Night Skyline rendered behind the studio window */
function CebuNightSkyline() {
  const buildings = useMemo(() => {
    const items = [];
    const specs = [
      { x: 1.5, w: 0.72, h: 2.3, z: -7.1, tone: "#181d29" },
      { x: 2.25, w: 0.65, h: 3.1, z: -7.6, tone: "#141824" },
      { x: 2.95, w: 0.82, h: 2.65, z: -7.2, tone: "#1a2030" },
      { x: 3.75, w: 0.7, h: 3.45, z: -7.8, tone: "#131722" },
      { x: 4.45, w: 0.8, h: 2.5, z: -7.3, tone: "#191f2d" },
      { x: 5.15, w: 0.7, h: 2.95, z: -7.5, tone: "#151a27" },
    ];
    specs.forEach((b, idx) => {
      const windows = [];
      const rows = Math.floor(b.h * 3.5);
      const cols = 3;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Deterministic lit windows
          const hash = (idx * 31 + r * 17 + c * 13) % 11;
          if (hash < 4) {
            windows.push({
              x: (c - 1) * 0.17,
              y: -b.h / 2 + 0.35 + r * 0.24,
              color: hash === 0 ? "#D97757" : hash === 1 ? "#FCD34D" : "#93C5FD",
              intensity: hash === 0 ? 1.6 : 1.0,
            });
          }
        }
      }
      items.push({ ...b, windows });
    });
    return items;
  }, []);

  const stars = useMemo(() => {
    const arr = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i++) {
      arr[i * 3] = 0.2 + ((i * 73) % 100) / 15;
      arr[i * 3 + 1] = 1.6 + ((i * 41) % 100) / 34;
      arr[i * 3 + 2] = -8.6 - ((i * 19) % 10) * 0.08;
    }
    return arr;
  }, []);

  return (
    <group>
      {/* Night sky backdrop */}
      <mesh position={[3.3, 2.2, -8.9]}>
        <planeGeometry args={[8, 6]} />
        <meshBasicMaterial color="#0b1020" />
      </mesh>

      {/* Warm horizon glow */}
      <mesh position={[3.3, 0.85, -8.8]}>
        <planeGeometry args={[7.5, 1.5]} />
        <meshBasicMaterial color="#3b1f24" transparent opacity={0.45} />
      </mesh>

      {/* Moon */}
      <mesh position={[4.6, 3.25, -8.5]}>
        <circleGeometry args={[0.26, 28]} />
        <meshBasicMaterial color="#FDE68A" />
      </mesh>

      {/* Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={90} array={stars} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#E2E8F0" transparent opacity={0.75} />
      </points>

      {/* Skyline towers */}
      {buildings.map((b, idx) => (
        <group key={idx} position={[b.x, b.h / 2 + 0.1, b.z]}>
          <mesh>
            <boxGeometry args={[b.w, b.h, 0.5]} />
            <meshStandardMaterial color={b.tone} roughness={0.9} metalness={0.2} />
          </mesh>
          {b.windows.map((w, wIdx) => (
            <mesh key={wIdx} position={[w.x, w.y, 0.26]}>
              <planeGeometry args={[0.09, 0.11]} />
              <meshStandardMaterial
                color={w.color}
                emissive={w.color}
                emissiveIntensity={w.intensity}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* Rising coffee steam wisps */
function CoffeeSteam({ position }) {
  const steamRef = useRef();

  useFrame(({ clock }) => {
    if (!steamRef.current) return;
    const t = clock.elapsedTime;
    steamRef.current.children.forEach((p, idx) => {
      const cycle = (t * 0.45 + idx * 0.33) % 1;
      p.position.y = cycle * 0.24;
      p.position.x = Math.sin(t * 2 + idx * 2) * 0.02;
      p.scale.setScalar(0.5 + cycle * 0.9);
      p.material.opacity = Math.sin(cycle * Math.PI) * 0.32;
    });
  });

  return (
    <group ref={steamRef} position={position}>
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#F3F1EC" transparent opacity={0.2} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* Potted studio plant */
function StudioPlant({ position }) {
  const leaves = [
    { rot: [0.35, 0, 0.3], pos: [0.12, 0.62, 0.08], scale: [0.22, 0.35, 0.04] },
    { rot: [-0.3, 1.1, 0.35], pos: [-0.14, 0.68, 0.1], scale: [0.24, 0.38, 0.04] },
    { rot: [0.25, 2.2, -0.35], pos: [-0.12, 0.72, -0.14], scale: [0.22, 0.36, 0.04] },
    { rot: [-0.35, -1.2, -0.25], pos: [0.15, 0.66, -0.12], scale: [0.24, 0.36, 0.04] },
    { rot: [0.12, 0.5, 0.08], pos: [0.02, 0.85, 0.02], scale: [0.2, 0.4, 0.04] },
  ];

  return (
    <group position={position}>
      {/* Terracotta pot */}
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.19, 0.48, 20]} />
        <meshStandardMaterial color="#B85F43" roughness={0.78} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
        <meshStandardMaterial color="#2C211B" roughness={1} />
      </mesh>
      {/* Stems & leaves */}
      {leaves.map((leaf, i) => (
        <mesh key={i} position={leaf.pos} rotation={leaf.rot} scale={leaf.scale} castShadow>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#2D5A3D" : "#3B6E4C"} roughness={0.65} />
        </mesh>
      ))}
    </group>
  );
}

/* Ergonomic Interviewer Chair facing Klint */
function InterviewerChair({ position, onSelect }) {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.("seated");
      }}
    >
      {/* Seat */}
      <RoundedBox args={[0.66, 0.1, 0.62]} radius={0.04} position={[0, 0.48, 0]} castShadow>
        <meshStandardMaterial color="#272522" roughness={0.85} />
      </RoundedBox>
      {/* Backrest (low profile so it never blocks camera) */}
      <RoundedBox args={[0.62, 0.48, 0.08]} radius={0.04} position={[0, 0.74, 0.28]} castShadow>
        <meshStandardMaterial color="#272522" roughness={0.85} />
      </RoundedBox>
      {/* Terracotta stitching trim */}
      <mesh position={[0, 0.96, 0.24]}>
        <boxGeometry args={[0.42, 0.025, 0.02]} />
        <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={0.35} />
      </mesh>
      {/* Stem & base */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.42, 12]} />
        <meshStandardMaterial color="#181816" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.34, 0.06, 20]} />
        <meshStandardMaterial color="#181816" metalness={0.8} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function StudioRoom({
  isCelebrating = false,
  onSelectStation,
  onCoffeeClick,
  hoveredStation,
  setHoveredStation,
}) {
  const slatOffsets = useMemo(() => {
    const arr = [];
    for (let x = -6.1; x <= -4.4; x += 0.18) arr.push(x);
    for (let x = -1.6; x <= 0.7; x += 0.18) arr.push(x);
    return arr;
  }, []);

  return (
    <group>
      {/* ================= LIGHTING ================= */}
      <hemisphereLight args={["#F5E6D3", "#1A1816", 0.55]} />

      {/* Main soft studio fill */}
      <directionalLight
        position={[3.5, 4.8, 3.2]}
        intensity={0.75}
        color="#FFF3E0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={18}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0005}
      />

      {/* Cool moonlight rim from the Cebu skyline window */}
      <directionalLight position={[5.2, 3.4, -6.0]} intensity={0.65} color="#7DD3FC" />

      {/* Warm terracotta architect desk lamp glow */}
      <pointLight
        position={[-1.02, 1.38, -1.42]}
        intensity={isCelebrating ? 4.2 : 2.8}
        distance={7.5}
        decay={2}
        color="#FF9E6D"
      />

      {/* Overhead warm studio pendant accent */}
      <pointLight
        position={[0, 3.4, -1.1]}
        intensity={isCelebrating ? 3.5 : 1.7}
        distance={9}
        decay={2}
        color="#FFE4C4"
      />

      {/* Projects monitor wall soft glow */}
      <pointLight position={[-4.6, 1.7, -0.9]} intensity={1.3} distance={5.5} color="#D97757" />

      {/* Tech stack holo console glow */}
      <pointLight position={[4.5, 1.6, -0.2]} intensity={1.4} distance={5.5} color="#F59E0B" />

      {/* ================= ARCHITECTURE ================= */}
      {/* Hardwood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#221D1A" roughness={0.72} metalness={0.08} />
      </mesh>

      {/* Subtle plank grid lines on floor */}
      <gridHelper args={[13, 26, "#2E2722", "#28221E"]} position={[0, 0.004, 0]} />

      {/* Woven Charcoal Studio Rug under Desk */}
      <RoundedBox args={[5.4, 0.03, 4.2]} radius={0.015} position={[0, 0.015, -0.65]} receiveShadow>
        <meshStandardMaterial color="#2A2825" roughness={0.96} />
      </RoundedBox>
      {/* Terracotta border inset on rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.032, -0.65]}>
        <ringGeometry args={[2.15, 2.22, 4]} />
        <meshBasicMaterial color="#D97757" transparent opacity={0.18} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.2, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#151412" roughness={0.95} />
      </mesh>

      {/* Back Wall (left & center sections around window) */}
      <mesh position={[-2.75, 2.1, -5.4]} receiveShadow>
        <boxGeometry args={[8.5, 4.2, 0.2]} />
        <meshStandardMaterial color="#1D1B19" roughness={0.88} />
      </mesh>
      {/* Wall below window */}
      <mesh position={[3.6, 0.35, -5.4]} receiveShadow>
        <boxGeometry args={[4.4, 0.7, 0.2]} />
        <meshStandardMaterial color="#1D1B19" roughness={0.88} />
      </mesh>
      {/* Wall above window */}
      <mesh position={[3.6, 3.92, -5.4]}>
        <boxGeometry args={[4.4, 0.56, 0.2]} />
        <meshStandardMaterial color="#1D1B19" roughness={0.88} />
      </mesh>
      {/* Wall right of window */}
      <mesh position={[6.15, 2.1, -5.4]}>
        <boxGeometry args={[1.1, 4.2, 0.2]} />
        <meshStandardMaterial color="#1D1B19" roughness={0.88} />
      </mesh>

      {/* Window mullions & glass */}
      <group position={[3.5, 2.18, -5.38]}>
        <mesh>
          <planeGeometry args={[4.1, 3.05]} />
          <meshPhysicalMaterial
            color="#93C5FD"
            transparent
            opacity={0.08}
            roughness={0.05}
            metalness={0.1}
          />
        </mesh>
        {/* Dark aluminum mullions */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.07, 3.1, 0.09]} />
          <meshStandardMaterial color="#141312" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0.03]}>
          <boxGeometry args={[4.15, 0.06, 0.09]} />
          <meshStandardMaterial color="#141312" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Cebu Night Skyline outside window */}
      <CebuNightSkyline />

      {/* Warm Acoustic Wood Slats on Back Wall */}
      {slatOffsets.map((x, idx) => (
        <mesh key={idx} position={[x, 2.1, -5.27]} castShadow receiveShadow>
          <boxGeometry args={[0.075, 4.0, 0.05]} />
          <meshStandardMaterial color="#4A3224" roughness={0.72} />
        </mesh>
      ))}

      {/* Studio Neon/Warm Sign behind Klint */}
      <group position={[-0.45, 2.88, -5.22]}>
        <RoundedBox args={[2.55, 0.52, 0.06]} radius={0.05}>
          <meshStandardMaterial color="#181715" roughness={0.5} metalness={0.3} />
        </RoundedBox>
        <Text
          position={[0, 0.05, 0.04]}
          fontSize={0.16}
          letterSpacing={0.14}
          color="#F3F1EC"
          anchorX="center"
          anchorY="middle"
        >
          KLINT STUDIO
        </Text>
        <Text
          position={[0, -0.14, 0.04]}
          fontSize={0.075}
          letterSpacing={0.18}
          color="#D97757"
          anchorX="center"
          anchorY="middle"
        >
          INTERVIEW ROOM • CEBU
        </Text>
      </group>

      {/* Left Wall */}
      <mesh position={[-6.4, 2.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 4.2]} />
        <meshStandardMaterial color="#1A1816" roughness={0.9} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[6.4, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 4.2]} />
        <meshStandardMaterial color="#1A1816" roughness={0.9} />
      </mesh>

      {/* Front Wall (behind entrance so 360 panning stays enclosed) */}
      <mesh position={[0, 2.1, 5.4]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[14, 4.2]} />
        <meshStandardMaterial color="#161513" roughness={0.92} />
      </mesh>

      {/* Overhead Minimalist Pendant Lamp */}
      <group position={[0, 3.65, -1.35]}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.16, 0.34, 0.22, 24, 1, true]} />
          <meshStandardMaterial color="#23211E" side={THREE.DoubleSide} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#FFF3E0" emissive="#FFBA82" emissiveIntensity={2.2} />
        </mesh>
      </group>

      {/* ================= CENTER INTERVIEW DESK ================= */}
      <group position={[0, 0, -1.4]}>
        {/* Rich Walnut Desk Surface */}
        <RoundedBox args={[2.9, 0.085, 1.28]} radius={0.025} position={[0, 0.78, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#5A3C2A" roughness={0.52} metalness={0.08} />
        </RoundedBox>

        {/* Subtle Desk Pad */}
        <RoundedBox args={[1.1, 0.012, 0.54]} radius={0.008} position={[0, 0.826, -0.14]} receiveShadow>
          <meshStandardMaterial color="#1C1B19" roughness={0.9} />
        </RoundedBox>

        {/* Matte Obsidian Desk Legs */}
        {[
          [-1.32, 0.38, -0.52],
          [1.32, 0.38, -0.52],
          [-1.32, 0.38, 0.52],
          [1.32, 0.38, 0.52],
        ].map((pos, idx) => (
          <mesh key={idx} position={pos} castShadow>
            <boxGeometry args={[0.07, 0.76, 0.07]} />
            <meshStandardMaterial color="#161514" metalness={0.75} roughness={0.35} />
          </mesh>
        ))}

        {/* Modesty front accent strip */}
        <mesh position={[0, 0.54, 0.54]}>
          <boxGeometry args={[2.55, 0.32, 0.03]} />
          <meshStandardMaterial color="#24211E" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.69, 0.556]}>
          <boxGeometry args={[2.2, 0.015, 0.01]} />
          <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={0.8} />
        </mesh>

        {/* Klint's Sleek Laptop (facing Klint at -Z) */}
        <group position={[-0.12, 0.83, -0.14]}>
          {/* Base */}
          <RoundedBox args={[0.42, 0.018, 0.28]} radius={0.005} castShadow>
            <meshStandardMaterial color="#3B3A37" metalness={0.8} roughness={0.25} />
          </RoundedBox>
          {/* Tilted Screen Lid */}
          <group position={[0, 0.14, 0.13]} rotation={[-0.22, 0, 0]}>
            <RoundedBox args={[0.42, 0.27, 0.014]} radius={0.004} castShadow>
              <meshStandardMaterial color="#2E2D2A" metalness={0.82} roughness={0.22} />
            </RoundedBox>
            {/* Glowing terracotta emblem on back of laptop facing interviewer */}
            <mesh position={[0, 0, 0.009]}>
              <circleGeometry args={[0.026, 16]} />
              <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={1.6} />
            </mesh>
            {/* Screen inner glow facing Klint */}
            <mesh position={[0, 0, -0.009]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.38, 0.23]} />
              <meshStandardMaterial color="#1E293B" emissive="#60A5FA" emissiveIntensity={0.85} />
            </mesh>
          </group>
        </group>

        {/* Brass & Obsidian Nameplate facing Interviewer */}
        <group position={[-0.15, 0.86, 0.44]} rotation={[-0.18, 0, 0]}>
          <RoundedBox args={[0.72, 0.12, 0.06]} radius={0.01} castShadow>
            <meshStandardMaterial color="#1A1917" metalness={0.5} roughness={0.4} />
          </RoundedBox>
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[0.66, 0.095]} />
            <meshStandardMaterial color="#23211E" />
          </mesh>
          <Text position={[0, 0.016, 0.035]} fontSize={0.038} color="#F3F1EC" anchorX="center" anchorY="middle">
            KLINT RUALES
          </Text>
          <Text position={[0, -0.022, 0.035]} fontSize={0.021} color="#D97757" anchorX="center" anchorY="middle">
            SOFTWARE ENGINEER
          </Text>
        </group>

        {/* Terracotta Architect Desk Lamp (Left of Desk) */}
        <group position={[-1.15, 0.825, -0.18]}>
          {/* Base */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.14, 0.04, 20]} />
            <meshStandardMaterial color="#1A1917" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Lower arm */}
          <mesh position={[-0.04, 0.24, -0.04]} rotation={[0.12, 0, 0.18]}>
            <cylinderGeometry args={[0.014, 0.014, 0.45, 10]} />
            <meshStandardMaterial color="#C89B6E" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Upper arm */}
          <mesh position={[0.07, 0.49, 0.03]} rotation={[-0.15, 0, -0.58]}>
            <cylinderGeometry args={[0.012, 0.012, 0.36, 10]} />
            <meshStandardMaterial color="#C89B6E" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Terracotta Shade */}
          <mesh position={[0.17, 0.54, 0.08]} rotation={[0.25, 0, -0.45]} castShadow>
            <coneGeometry args={[0.14, 0.18, 20, 1, true]} />
            <meshStandardMaterial color="#D97757" roughness={0.5} side={THREE.DoubleSide} />
          </mesh>
          {/* Warm Bulb */}
          <mesh position={[0.19, 0.49, 0.09]}>
            <sphereGeometry args={[0.042, 12, 12]} />
            <meshStandardMaterial color="#FFF7ED" emissive="#FFA66B" emissiveIntensity={3.0} />
          </mesh>
        </group>

        {/* Interactive Coffee Mug (Easter Egg!) */}
        <group
          position={[-0.74, 0.825, 0.26]}
          onClick={(e) => {
            e.stopPropagation();
            onCoffeeClick?.();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
            setHoveredStation?.("coffee");
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
            if (hoveredStation === "coffee") setHoveredStation?.(null);
          }}
        >
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.048, 0.042, 0.12, 16]} />
            <meshStandardMaterial
              color={hoveredStation === "coffee" ? "#E88B6C" : "#D97757"}
              emissive="#D97757"
              emissiveIntensity={hoveredStation === "coffee" ? 0.45 : 0.05}
              roughness={0.35}
            />
          </mesh>
          {/* Coffee liquid */}
          <mesh position={[0, 0.115, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.008, 16]} />
            <meshStandardMaterial color="#2C1A12" roughness={0.2} />
          </mesh>
          {/* Handle */}
          <mesh position={[0.052, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.032, 0.009, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#D97757" roughness={0.35} />
          </mesh>
          <CoffeeSteam position={[0, 0.13, 0]} />
        </group>

        {/* Interactive Resume Dossier Folder on Right Side of Desk */}
        <group
          position={[0.82, 0.835, 0.26]}
          rotation={[0, -0.24, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectStation?.("resume");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
            setHoveredStation?.("resume");
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
            if (hoveredStation === "resume") setHoveredStation?.(null);
          }}
        >
          {/* Folder Cover */}
          <RoundedBox args={[0.36, 0.02, 0.46]} radius={0.006} castShadow>
            <meshStandardMaterial
              color={hoveredStation === "resume" ? "#E48667" : "#C86A4B"}
              emissive="#D97757"
              emissiveIntensity={hoveredStation === "resume" ? 0.55 : 0.12}
              roughness={0.6}
            />
          </RoundedBox>
          {/* Paper Sheet Peeking Out */}
          <mesh position={[0.015, 0.013, -0.01]}>
            <boxGeometry args={[0.31, 0.006, 0.41]} />
            <meshStandardMaterial color="#FAF8F4" roughness={0.9} />
          </mesh>
          {/* Tiny header text on folder */}
          <Text
            position={[0, 0.018, 0.02]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.034}
            color="#1F1E1D"
            anchorX="center"
            anchorY="middle"
          >
            KLINT_CV.PDF
          </Text>
        </group>
      </group>

      {/* Klint's Chair (behind desk) */}
      <group position={[0, 0, -2.28]}>
        <RoundedBox args={[0.68, 0.1, 0.62]} radius={0.04} position={[0, 0.48, 0]} castShadow>
          <meshStandardMaterial color="#242220" roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[0.62, 0.88, 0.09]} radius={0.04} position={[0, 0.96, -0.28]} castShadow>
          <meshStandardMaterial color="#242220" roughness={0.82} />
        </RoundedBox>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.44, 12]} />
          <meshStandardMaterial color="#141413" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 0.06, 20]} />
          <meshStandardMaterial color="#141413" metalness={0.8} roughness={0.35} />
        </mesh>
      </group>

      {/* Interviewer's Chair (across from Klint) */}
      <InterviewerChair position={[0, 0, 0.48]} onSelect={onSelectStation} />

      {/* Studio Plants & Cozy Atmosphere */}
      <StudioPlant position={[-5.25, 0, -4.3]} />
      <StudioPlant position={[5.25, 0, -4.1]} />

      {/* Floating warm studio dust particles */}
      <Sparkles
        count={isCelebrating ? 110 : 45}
        scale={[10, 3.6, 8]}
        position={[0, 1.9, -1]}
        size={isCelebrating ? 3.2 : 1.6}
        speed={isCelebrating ? 1.2 : 0.25}
        opacity={isCelebrating ? 0.85 : 0.35}
        color={isCelebrating ? "#FCD34D" : "#F3C7A8"}
      />
    </group>
  );
}
