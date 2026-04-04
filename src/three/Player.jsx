import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { panels } from "./panelsData";

export default function Player({ setActivePanel, activePanel, setNearPanel }) {
  const ref = useRef();
  const { camera } = useThree();
  const [keys, setKeys] = useState({});
  const [near, setNear] = useState(null); // ✅ local only

  useEffect(() => {
    const down = (e) => {
      const key = e.key.toLowerCase();

      setKeys((k) => ({ ...k, [key]: true }));

      if (key === "e" && near && !activePanel) {
        setActivePanel(near);
      }
    };

    const up = (e) =>
      setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }));

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [near, activePanel]);

  useFrame(() => {
    if (!ref.current) return;

    const speed = 0.08;

    if (keys["w"]) ref.current.position.z -= speed;
    if (keys["s"]) ref.current.position.z += speed;
    if (keys["a"]) ref.current.position.x -= speed;
    if (keys["d"]) ref.current.position.x += speed;

    const playerPos = ref.current.position;

    let found = null;

    panels.forEach((panel) => {
      const dist = playerPos.distanceTo(panel.position);

      if (dist < 1.5) {
        found = panel;
      }
    });

    setNear(found);
    setNearPanel(found); // ✅ send to Scene

    // 🎥 camera follow
    camera.position.x += (ref.current.position.x - camera.position.x) * 0.1;
    camera.position.z += (ref.current.position.z + 6 - camera.position.z) * 0.1;
    camera.position.y = 5;

    camera.lookAt(ref.current.position);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial
        color={near ? "#9333ea" : "#111827"}
        emissive={near ? "#c084fc" : "#000000"}
        emissiveIntensity={near ? 3 : 0.2}
      />
    </mesh>
  );
}