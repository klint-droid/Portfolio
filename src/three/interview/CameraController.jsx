import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA_PRESETS, ROOM_BOUNDS, DESK_COLLIDER } from "./interviewState";

/**
 * Hybrid Interviewer Camera Controller supporting BOTH First-Person (1P) and Third-Person (3P):
 * - Smoothly lerps between camera presets (title, explore, seated, projects, stack, career, resume)
 * - Syncs playerRef.current (pos, yaw, isMoving) every frame for InterviewerCharacter & Klint head tracking
 * - Explore 1P: eye-level POV walking with WASD/Arrows + drag-to-look
 * - Explore 3P: smooth over-the-shoulder follow camera clamped inside studio walls
 * - Seated 1P: direct face-to-face POV across the desk
 * - Seated 3P: cinematic over-the-shoulder two-shot framing both Interviewer & Klint
 */
export default function CameraController({
  mode = "title",
  cameraPerspective = "third",
  hasEntered = false,
  isTypingInput = false,
  playerRef,
}) {
  const { camera, gl } = useThree();

  const keysRef = useRef({});
  const draggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const mouseNormRef = useRef({ x: 0, y: 0 });

  const currentLookAtRef = useRef(new THREE.Vector3(...CAMERA_PRESETS.title.target));
  const explorePosRef = useRef(new THREE.Vector3(0.2, 0, 2.75));
  const exploreYawRef = useRef(0); // 0 = facing -Z toward Klint
  const explorePitchRef = useRef(-0.08);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (isTypingInput) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      keysRef.current[e.key.toLowerCase()] = true;
    };

    const onKeyUp = (e) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    const onPointerDown = (e) => {
      if (mode !== "explore" || !hasEntered) return;
      if (e.target !== gl.domElement) return;
      draggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      mouseNormRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };

      if (draggingRef.current && mode === "explore" && hasEntered) {
        const dx = e.clientX - lastPointerRef.current.x;
        const dy = e.clientY - lastPointerRef.current.y;
        lastPointerRef.current = { x: e.clientX, y: e.clientY };

        exploreYawRef.current -= dx * 0.0045;
        explorePitchRef.current = THREE.MathUtils.clamp(
          explorePitchRef.current - dy * 0.0032,
          -0.42,
          0.38
        );
      }
    };

    const onPointerUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [mode, hasEntered, isTypingInput, gl.domElement]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // 1. Title screen: slow cinematic orbit showing both Klint & Interviewer in studio
    if (!hasEntered || mode === "title") {
      const orbitPos = new THREE.Vector3(
        Math.sin(t * 0.16) * 2.5 + 0.5,
        2.12 + Math.sin(t * 0.25) * 0.08,
        3.5 + Math.cos(t * 0.16) * 0.45
      );
      const orbitTarget = new THREE.Vector3(-0.15, 1.2, -1.35);
      camera.position.lerp(orbitPos, dt * 2.2);
      currentLookAtRef.current.lerp(orbitTarget, dt * 2.5);
      camera.lookAt(currentLookAtRef.current);
      if (playerRef?.current) {
        playerRef.current.isMoving = false;
      }
      return;
    }

    // 2. Explore Mode: WASD + Arrows walking (supports both 1P and 3P camera!)
    if (mode === "explore") {
      const keys = keysRef.current;
      const forward = new THREE.Vector3(
        -Math.sin(exploreYawRef.current),
        0,
        -Math.cos(exploreYawRef.current)
      );
      const right = new THREE.Vector3(
        Math.cos(exploreYawRef.current),
        0,
        -Math.sin(exploreYawRef.current)
      );

      const moveDir = new THREE.Vector3();
      if (keys["w"] || keys["arrowup"]) moveDir.add(forward);
      if (keys["s"] || keys["arrowdown"]) moveDir.sub(forward);
      if (keys["d"] || keys["arrowright"]) moveDir.add(right);
      if (keys["a"] || keys["arrowleft"]) moveDir.sub(right);

      if (keys["q"]) exploreYawRef.current += dt * 1.6;
      if (keys["e"]) exploreYawRef.current -= dt * 1.6;

      const isMoving = moveDir.lengthSq() > 0;

      if (isMoving) {
        moveDir.normalize();
        const speed = 3.2 * dt;
        const nextX = THREE.MathUtils.clamp(
          explorePosRef.current.x + moveDir.x * speed,
          ROOM_BOUNDS.minX,
          ROOM_BOUNDS.maxX
        );
        const nextZ = THREE.MathUtils.clamp(
          explorePosRef.current.z + moveDir.z * speed,
          ROOM_BOUNDS.minZ,
          ROOM_BOUNDS.maxZ
        );

        const nextPt = new THREE.Vector2(nextX, nextZ);
        if (!DESK_COLLIDER.containsPoint(nextPt)) {
          explorePosRef.current.x = nextX;
          explorePosRef.current.z = nextZ;
        }
      }

      // Sync shared player ref for InterviewerCharacter & Klint head-tracking
      if (playerRef?.current) {
        playerRef.current.pos.set(explorePosRef.current.x, 0, explorePosRef.current.z);
        playerRef.current.yaw = exploreYawRef.current;
        playerRef.current.isMoving = isMoving;
      }

      if (cameraPerspective === "third") {
        // Third-Person over-the-shoulder follow camera
        const followDist = 2.35;
        const camX = THREE.MathUtils.clamp(
          explorePosRef.current.x + Math.sin(exploreYawRef.current) * followDist,
          -5.85,
          5.85
        );
        const camZ = THREE.MathUtils.clamp(
          explorePosRef.current.z + Math.cos(exploreYawRef.current) * followDist,
          -4.85,
          4.95
        );
        const camY = THREE.MathUtils.clamp(
          2.05 - explorePitchRef.current * 1.3,
          1.15,
          3.15
        );

        const desiredPos = new THREE.Vector3(camX, camY, camZ);
        const desiredTarget = new THREE.Vector3(
          explorePosRef.current.x - Math.sin(exploreYawRef.current) * 1.2,
          1.42 + explorePitchRef.current * 0.7,
          explorePosRef.current.z - Math.cos(exploreYawRef.current) * 1.2
        );

        camera.position.lerp(desiredPos, dt * 6.5);
        currentLookAtRef.current.lerp(desiredTarget, dt * 8.5);
        camera.lookAt(currentLookAtRef.current);
      } else {
        // First-Person eye-level camera
        const bob = isMoving ? Math.sin(t * 9.5) * 0.032 : Math.sin(t * 1.6) * 0.008;
        const desiredPos = new THREE.Vector3(
          explorePosRef.current.x,
          1.7 + bob,
          explorePosRef.current.z
        );

        camera.position.lerp(desiredPos, dt * 7);

        const lookDir = new THREE.Vector3(
          -Math.sin(exploreYawRef.current) * Math.cos(explorePitchRef.current),
          Math.sin(explorePitchRef.current),
          -Math.cos(exploreYawRef.current) * Math.cos(explorePitchRef.current)
        );
        const desiredTarget = camera.position.clone().add(lookDir.multiplyScalar(4));
        currentLookAtRef.current.lerp(desiredTarget, dt * 8.5);
        camera.lookAt(currentLookAtRef.current);
      }
      return;
    }

    // 3. Preset Focus Modes (seated 1P / seated 3P OTS / station close-ups)
    if (playerRef?.current) {
      playerRef.current.isMoving = false;
    }

    const presetKey =
      mode === "seated" && cameraPerspective === "third" ? "seatedThird" : mode;
    const preset = CAMERA_PRESETS[presetKey] || CAMERA_PRESETS.seated;

    const parallaxX = mouseNormRef.current.x * (mode === "seated" ? 0.14 : 0.09);
    const parallaxY = -mouseNormRef.current.y * (mode === "seated" ? 0.06 : 0.05);

    const targetCamPos = new THREE.Vector3(
      preset.position[0] + parallaxX,
      preset.position[1] + parallaxY,
      preset.position[2]
    );
    const targetLookAt = new THREE.Vector3(
      preset.target[0],
      preset.target[1],
      preset.target[2]
    );

    camera.position.lerp(targetCamPos, dt * 4.5);
    currentLookAtRef.current.lerp(targetLookAt, dt * 5.2);
    camera.lookAt(currentLookAtRef.current);
  });

  return null;
}
