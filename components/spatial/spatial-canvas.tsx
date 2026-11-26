"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SpatialVariant = "institution" | "research" | "technology" | "intelligence" | "profile" | "contact" | "legal";

function Assembly({ variant, compact }: { variant: SpatialVariant; compact: boolean }) {
  const assembly = useRef<THREE.Group>(null);
  const orbitOne = useRef<THREE.Group>(null);
  const orbitTwo = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const particleCount = compact ? 22 : 52;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    let seed = variant.length * 971;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.8 + random() * 3.8;
      const angle = random() * Math.PI * 2;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = (random() - 0.5) * 5;
      positions[index * 3 + 2] = Math.sin(angle) * radius - 1.4;
    }
    return positions;
  }, [particleCount, variant]);

  useFrame((state, delta) => {
    if (!assembly.current) return;
    const targetX = state.pointer.x * 0.1;
    const targetY = state.pointer.y * 0.08;
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, targetX, 2.4, delta);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, targetY, 2.4, delta);

    const scrollTarget = typeof window === "undefined"
      ? 0
      : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 2);
    scroll.current = THREE.MathUtils.damp(scroll.current, scrollTarget, 1.8, delta);
    assembly.current.rotation.y = pointer.current.x + scroll.current * 0.12;
    assembly.current.rotation.x = pointer.current.y - scroll.current * 0.055;
    assembly.current.position.y = -scroll.current * 0.12;
    if (orbitOne.current) orbitOne.current.rotation.z += delta * 0.035;
    if (orbitTwo.current) orbitTwo.current.rotation.y -= delta * 0.025;
  });

  const scale = variant === "profile" ? 0.74 : variant === "legal" ? 0.62 : 0.9;

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[3, 3, 4]} color="#e1c46b" intensity={30} distance={12} />
      <pointLight position={[-4, -2, 1]} color="#7183a0" intensity={14} distance={10} />
      <points position={[0, 0, -2]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#d8c68a" size={compact ? 0.018 : 0.024} sizeAttenuation transparent opacity={0.52} />
      </points>
      <group ref={assembly} position={[1.9, 0, 0]} scale={scale}>
        <group ref={orbitOne} rotation={[0.38, 0.24, -0.22]}>
          <mesh>
            <torusGeometry args={[1.35, 0.009, 6, 144]} />
            <meshStandardMaterial color="#d2af51" metalness={0.78} roughness={0.36} transparent opacity={0.72} />
          </mesh>
          <mesh rotation={[0.85, 0.14, 0.3]} scale={[1.16, 0.64, 1]}>
            <torusGeometry args={[1.72, 0.006, 6, 144]} />
            <meshStandardMaterial color="#8c9caf" metalness={0.65} roughness={0.48} transparent opacity={0.44} />
          </mesh>
        </group>
        <group ref={orbitTwo} rotation={[-0.42, 0.3, 0.5]}>
          <mesh rotation={[0.9, 0.1, 0.2]} scale={[1.24, 0.73, 1]}>
            <torusGeometry args={[1.7, 0.006, 6, 144]} />
            <meshStandardMaterial color="#c9a227" metalness={0.75} roughness={0.35} transparent opacity={0.42} />
          </mesh>
        </group>
        <mesh>
          <icosahedronGeometry args={[0.48, 1]} />
          <meshStandardMaterial color="#d3bb7b" metalness={0.82} roughness={0.28} emissive="#6c4d12" emissiveIntensity={0.16} />
        </mesh>
        <mesh scale={0.66}>
          <icosahedronGeometry args={[0.48, 1]} />
          <meshBasicMaterial color="#f0d17a" transparent opacity={0.48} wireframe />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshBasicMaterial color="#fff0b0" />
        </mesh>
        {[0, 1, 2, 3].map((index) => {
          const angle = (index / 4) * Math.PI * 2;
          return (
            <mesh key={index} position={[Math.cos(angle) * 1.35, Math.sin(angle) * 0.42, Math.sin(angle) * 0.5]}>
              <sphereGeometry args={[0.027, 8, 8]} />
              <meshBasicMaterial color="#e5c25e" transparent opacity={0.8} />
            </mesh>
          );
        })}
      </group>
    </>
  );
}

export default function SpatialCanvas({
  variant,
  compact
}: {
  variant: SpatialVariant;
  compact: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.6], fov: 36 }}
      dpr={compact ? [0.7, 1] : [0.8, 1.25]}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      frameloop="always"
      performance={{ min: 0.55 }}
      className="spatial-canvas"
    >
      <Assembly variant={variant} compact={compact} />
    </Canvas>
  );
}
