import { Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Panel({ position, id, isNear }) {
  const groupRef = useRef();
  const screenRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    const scale = isNear ? 1.2 : 1;

    groupRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1);

    // ✨ subtle floating
    groupRef.current.position.y =
      position[1] + Math.sin(t * 2) * 0.1;

    // slight rotation
    groupRef.current.rotation.y += 0.003;

    // screen faces camera
    if (screenRef.current) {
      screenRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group position={position} ref={groupRef}>
      
      {/* 🧊 BASE CUBE (short) */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          emissiveIntensity={isNear ? 4 : 1}
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* 🟪 FLOATING SCREEN */}
      <group ref={screenRef} position={[0, 1.6, 0]}>
        <mesh>
          <planeGeometry args={[2.4, 1.2]} />
          <meshStandardMaterial
            color="#0f172a"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.6}
          />
        </mesh>

        <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.5, 1.3]} />
            <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={isNear ? 0.6 : 0.25}
            />
        </mesh>

        <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[2.2, 1]} />
            <meshStandardMaterial
            color="#312e81"
            emissive="#c084fc"
            emissiveIntensity={isNear ? 2 : 0.5}
            transparent
            opacity={0.25}
            />
        </mesh>

        {/* 🏷️ TEXT */}
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.3}
          color={isNear ? "#f5d0fe" : "#a78bfa"}
          opacity={isNear ? 1 : 0.6}
          anchorX="center"
          anchorY="middle"
        >
          {id}
        </Text>
      </group>

    </group>
  );
}