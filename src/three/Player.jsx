import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBX, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { panels } from "./panelsData";

export default function Player({ setActivePanel, activePanel, setNearPanel }) {
  const ref = useRef();
  const { camera } = useThree();

  const [keys, setKeys] = useState({});
  const [near, setNear] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);

  // 🎬 LOAD ANIMATIONS
  const idle = useFBX("/models/idle.fbx");
  const walk = useFBX("/models/walk.fbx");

  const { actions } = useAnimations(
    [idle.animations[0], walk.animations[0]],
    ref
  );

  // 🎮 INPUT
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

  // 🎬 PLAY IDLE DEFAULT
  useEffect(() => {
    if (!actions) return;

    const names = Object.keys(actions);
    actions[names[0]]?.play();
    setCurrentAction(names[0]);
  }, [actions]);

  useFrame(() => {
    if (!ref.current || !actions) return;

    const speed = 0.08;
    const dir = new THREE.Vector3();

    // 🎮 MOVEMENT INPUT
    if (keys["w"]) dir.z -= 1;
    if (keys["s"]) dir.z += 1;
    if (keys["a"]) dir.x -= 1;
    if (keys["d"]) dir.x += 1;

    const isMoving = dir.length() > 0;

    if (isMoving) {
      dir.normalize();

      ref.current.position.x += dir.x * speed;
      ref.current.position.z += dir.z * speed;

      // 🔥 ROTATE PLAYER
      const angle = Math.atan2(dir.x, dir.z);
      ref.current.rotation.y = angle;
    }

    // 🎬 ANIMATION SWITCH
    const names = Object.keys(actions);
    const idleName = names[0];
    const walkName = names[1];

    const nextAction = isMoving ? walkName : idleName;

    if (currentAction !== nextAction) {
      actions[currentAction]?.fadeOut(0.2);
      actions[nextAction]?.reset().fadeIn(0.2).play();
      setCurrentAction(nextAction);
    }

    // 📡 PANEL DETECTION
    const playerPos = ref.current.position;
    let found = null;

    panels.forEach((panel) => {
      const dist = playerPos.distanceTo(panel.position);

      if (dist < 1.5) {
        found = panel;
      }
    });

    setNear(found);
    setNearPanel(found);

    // 🎥 CAMERA FOLLOW
    camera.position.x += (ref.current.position.x - camera.position.x) * 0.1;
    camera.position.z += (ref.current.position.z + 6 - camera.position.z) * 0.1;
    camera.position.y = 5;

    camera.lookAt(ref.current.position);
  });

  return (
    <primitive
      ref={ref}
      object={idle}
      scale={0.01}
      position={[0, 0, 0]}
    />
  );
}