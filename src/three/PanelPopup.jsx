import { Text, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function PanelPopup({ panel }) {
  const ref = useRef();

  if (!panel || !panel.position) return null;

  useFrame((state) => {
    if (!ref.current) return;

    // 🎥 Always face camera
    ref.current.lookAt(state.camera.position);

    const t = state.clock.elapsedTime;

    // 🌊 Floating animation
    ref.current.position.y =
      panel.position.y + 2 + Math.sin(t * 2) * 0.1;

    // ✨ Safe glow animation
    ref.current.traverse((child) => {
      if (child.material?.emissive) {
        child.material.emissiveIntensity =
          0.6 + Math.sin(t * 2) * 0.2;
      }
    });
  });

  return (
    <group
      ref={ref}
      position={[
        panel.position.x + 2,
        panel.position.y + 2,
        panel.position.z,
      ]}
    >
      {/* 🧊 MAIN GLASS CARD */}
      <RoundedBox args={[3, 1.6, 0.05]} radius={0.25} smoothness={4}>
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.7}
        />
      </RoundedBox>

      {/* 🌫️ FROSTED LAYER */}
      <RoundedBox
        args={[2.9, 1.5, 0.02]}
        radius={0.22}
        position={[0, 0, 0.01]}
      >
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.15}
        />
      </RoundedBox>

      {/* ✨ INNER GLOW */}
      <RoundedBox
        args={[2.7, 1.3, 0.02]}
        radius={0.2}
        position={[0, 0, 0.02]}
      >
        <meshStandardMaterial
          color="#312e81"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          transparent
          opacity={0.1}
        />
      </RoundedBox>

      {/* 💡 NEON BORDER */}
      <RoundedBox
        args={[3.1, 1.7, 0.01]}
        radius={0.28}
        position={[0, 0, 0.03]}
      >
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.2}
        />
      </RoundedBox>

      {/* 📊 PROGRESS BAR BACK */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.2, 0.12]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* 📊 PROGRESS BAR FILL */}
      <mesh
        position={[
          -1.1 + (panel.level / 100) * 1.1,
          0,
          0.06,
        ]}
      >
        <planeGeometry args={[(panel.level / 100) * 2.2, 0.12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* 🏷️ TITLE */}
      <Text
        position={[0, 0.4, 0.06]}
        fontSize={0.3}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
      >
        {panel.id.toUpperCase()}
      </Text>

      {/* 🧠 MASTERY TEXT */}
      <Text
        position={[0, -0.4, 0.06]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        MASTERY: {panel.level}%
      </Text>
    </group>
  );
}