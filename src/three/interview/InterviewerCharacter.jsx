import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { STATION_STAND_SPOTS } from "./interviewState";

/**
 * Stylized 3D Interviewer Character (the visitor's avatar).
 * Visible in Third-Person mode (and on the Title Screen).
 * Automatically sits in the interviewer's chair in 'seated' mode,
 * stands & walks with animated limbs in 'explore' mode,
 * and positions naturally beside inspected stations.
 */
export default function InterviewerCharacter({
  mode = "title",
  cameraPerspective = "third",
  hasEntered = false,
  playerRef,
  klintMood = "idle",
}) {
  const rootRef = useRef();
  const bodyRef = useRef();
  const headRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  const walkPhaseRef = useRef(0);
  const currentPosRef = useRef(new THREE.Vector3(0.2, 0, 2.8));
  const currentYawRef = useRef(Math.PI);

  const isVisible = !hasEntered || cameraPerspective === "third";

  useFrame((state, delta) => {
    if (!rootRef.current || !isVisible) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    const isSeated = mode === "seated" && hasEntered;
    let targetPos = new THREE.Vector3(0.2, 0, 2.8);
    let targetYaw = Math.PI; // facing -Z toward Klint
    let isMoving = false;

    if (!hasEntered || mode === "title") {
      // Standing in the studio facing Klint on the title screen
      targetPos.set(-0.85, 0, 1.85);
      targetYaw = Math.atan2(0 - -0.85, -2.08 - 1.85);
    } else if (isSeated) {
      // Seated cleanly on the interviewer chair facing Klint (-Z)
      targetPos.set(0, 0, 0.48);
      targetYaw = Math.PI;
    } else if (mode === "explore" && playerRef?.current) {
      targetPos.copy(playerRef.current.pos);
      // Convert camera exploreYaw (0 = facing -Z) to character mesh rotation (0 = facing +Z)
      targetYaw = playerRef.current.yaw + Math.PI;
      isMoving = playerRef.current.isMoving;
    } else if (STATION_STAND_SPOTS[mode]) {
      const spot = STATION_STAND_SPOTS[mode];
      targetPos.set(spot.pos[0], 0, spot.pos[2]);
      targetYaw = spot.yaw;
    }

    // Smoothly interpolate position & facing angle
    currentPosRef.current.lerp(targetPos, dt * 10);

    // Shortest-angle yaw interpolation
    let yawDiff = targetYaw - currentYawRef.current;
    while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
    while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
    currentYawRef.current += yawDiff * Math.min(1, dt * 10);

    rootRef.current.position.set(
      currentPosRef.current.x,
      0,
      currentPosRef.current.z
    );
    rootRef.current.rotation.y = currentYawRef.current;

    // Walk cycle phase
    if (isMoving && !isSeated) {
      walkPhaseRef.current += dt * 10.5;
    } else {
      // Settle smoothly back to neutral
      walkPhaseRef.current = THREE.MathUtils.lerp(walkPhaseRef.current, 0, dt * 8);
    }
    const stride = isMoving && !isSeated ? Math.sin(walkPhaseRef.current) : 0;

    // Body height (seated vs standing + walking bob)
    if (bodyRef.current) {
      const targetBodyY = isSeated
        ? 0.88 + Math.sin(t * 1.8) * 0.008
        : 1.06 + Math.abs(stride) * 0.035 + Math.sin(t * 1.6) * 0.008;
      bodyRef.current.position.y = THREE.MathUtils.lerp(
        bodyRef.current.position.y,
        targetBodyY,
        dt * 10
      );
    }

    // Legs animation (seated bent forward vs standing/walking swing)
    if (leftLegRef.current && rightLegRef.current) {
      const targetL = isSeated ? -Math.PI / 2.15 : stride * 0.55;
      const targetR = isSeated ? -Math.PI / 2.15 : -stride * 0.55;
      leftLegRef.current.rotation.x = THREE.MathUtils.lerp(
        leftLegRef.current.rotation.x,
        targetL,
        dt * 10
      );
      rightLegRef.current.rotation.x = THREE.MathUtils.lerp(
        rightLegRef.current.rotation.x,
        targetR,
        dt * 10
      );
    }

    // Arms animation (right hand holds evaluation tablet/clipboard!)
    if (leftArmRef.current && rightArmRef.current) {
      const targetLeftArm = isSeated ? -0.65 : -stride * 0.45;
      const targetRightArm = isSeated
        ? -0.95 + Math.sin(t * 2.2) * 0.04
        : isMoving
        ? -0.45 + stride * 0.25
        : -0.58;

      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.x,
        targetLeftArm,
        dt * 10
      );
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        targetRightArm,
        dt * 10
      );
    }

    // Subtle attentive head nod while Klint is speaking
    if (headRef.current) {
      const nod =
        isSeated && klintMood === "talking"
          ? Math.sin(t * 3.4) * 0.06
          : Math.sin(t * 1.2) * 0.02;
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        nod,
        dt * 6
      );
    }
  });

  if (!isVisible) return null;

  const blazerColor = "#243447"; // Tailored slate-navy interviewer blazer
  const trousersColor = "#1B222C";
  const skinColor = "#E2B495";
  const hairColor = "#2A211B";

  return (
    <group ref={rootRef}>
      {/* Upper Body + Legs anchored to pelvis/torso */}
      <group ref={bodyRef} position={[0, 1.06, 0]}>
        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.12, -0.27, 0]}>
          <mesh position={[0, -0.26, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.42, 6, 12]} />
            <meshStandardMaterial color={trousersColor} roughness={0.82} />
          </mesh>
          {/* Shoe */}
          <RoundedBox args={[0.13, 0.08, 0.22]} radius={0.03} position={[0, -0.52, 0.04]} castShadow>
            <meshStandardMaterial color="#151413" roughness={0.5} />
          </RoundedBox>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.12, -0.27, 0]}>
          <mesh position={[0, -0.26, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.42, 6, 12]} />
            <meshStandardMaterial color={trousersColor} roughness={0.82} />
          </mesh>
          {/* Shoe */}
          <RoundedBox args={[0.13, 0.08, 0.22]} radius={0.03} position={[0, -0.52, 0.04]} castShadow>
            <meshStandardMaterial color="#151413" roughness={0.5} />
          </RoundedBox>
        </group>

        {/* Tailored Navy Blazer Torso */}
        <RoundedBox args={[0.45, 0.52, 0.26]} radius={0.08} castShadow>
          <meshStandardMaterial color={blazerColor} roughness={0.72} />
        </RoundedBox>

        {/* Crisp White Dress Shirt Front */}
        <mesh position={[0, 0.08, 0.125]}>
          <boxGeometry args={[0.13, 0.3, 0.025]} />
          <meshStandardMaterial color="#F3F1EC" roughness={0.85} />
        </mesh>

        {/* Subtle Interviewer ID Badge Lanyard Accent */}
        <mesh position={[-0.12, 0.06, 0.138]}>
          <boxGeometry args={[0.065, 0.085, 0.012]} />
          <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={0.35} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.31, 0]}>
          <cylinderGeometry args={[0.064, 0.07, 0.11, 14]} />
          <meshStandardMaterial color={skinColor} roughness={0.62} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.27, 0.18, 0]}>
          <mesh position={[0, -0.17, 0]} castShadow>
            <capsuleGeometry args={[0.062, 0.26, 6, 12]} />
            <meshStandardMaterial color={blazerColor} roughness={0.74} />
          </mesh>
          <mesh position={[0, -0.35, 0.02]}>
            <sphereGeometry args={[0.052, 10, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} />
          </mesh>
        </group>

        {/* Right Arm + Interviewer Evaluation Tablet / Clipboard */}
        <group ref={rightArmRef} position={[0.27, 0.18, 0]}>
          <mesh position={[0, -0.17, 0]} castShadow>
            <capsuleGeometry args={[0.062, 0.26, 6, 12]} />
            <meshStandardMaterial color={blazerColor} roughness={0.74} />
          </mesh>
          <mesh position={[0, -0.35, 0.02]}>
            <sphereGeometry args={[0.052, 10, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} />
          </mesh>
          {/* Sleek Glowing Evaluation Tablet held in hand */}
          <group position={[-0.03, -0.36, 0.12]} rotation={[0.55, -0.2, 0]}>
            <RoundedBox args={[0.2, 0.26, 0.018]} radius={0.01} castShadow>
              <meshStandardMaterial color="#181816" metalness={0.6} roughness={0.35} />
            </RoundedBox>
            <mesh position={[0, 0, 0.011]}>
              <planeGeometry args={[0.17, 0.22]} />
              <meshStandardMaterial color="#1E293B" emissive="#D97757" emissiveIntensity={0.45} />
            </mesh>
          </group>
        </group>

        {/* Head */}
        <group ref={headRef} position={[0, 0.48, 0.01]}>
          <RoundedBox args={[0.29, 0.32, 0.28]} radius={0.11} castShadow>
            <meshStandardMaterial color={skinColor} roughness={0.58} />
          </RoundedBox>

          {/* Ears */}
          <mesh position={[-0.15, -0.01, 0]}>
            <sphereGeometry args={[0.038, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} />
          </mesh>
          <mesh position={[0.15, -0.01, 0]}>
            <sphereGeometry args={[0.038, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} />
          </mesh>

          {/* Clean Executive Hair */}
          <RoundedBox args={[0.31, 0.14, 0.3]} radius={0.065} position={[0, 0.12, -0.01]} castShadow>
            <meshStandardMaterial color={hairColor} roughness={0.85} />
          </RoundedBox>
          <RoundedBox args={[0.3, 0.22, 0.11]} radius={0.045} position={[0, 0.02, -0.11]}>
            <meshStandardMaterial color={hairColor} roughness={0.88} />
          </RoundedBox>

          {/* Eyes (facing +Z of local character) */}
          <mesh position={[-0.06, 0.015, 0.14]}>
            <sphereGeometry args={[0.02, 10, 10]} />
            <meshStandardMaterial color="#171514" roughness={0.2} />
          </mesh>
          <mesh position={[0.06, 0.015, 0.14]}>
            <sphereGeometry args={[0.02, 10, 10]} />
            <meshStandardMaterial color="#171514" roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
