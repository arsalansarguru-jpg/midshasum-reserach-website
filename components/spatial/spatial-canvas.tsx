"use client";

import { AdaptiveDpr, Instances, Instance } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type SpatialVariant =
  | "institution"
  | "research"
  | "technology"
  | "intelligence"
  | "profile"
  | "contact"
  | "legal";

export type SpatialEnvironment = "core" | "research" | "architecture" | "intelligence" | "outlook";

const ENVIRONMENTS: SpatialEnvironment[] = [
  "core",
  "research",
  "architecture",
  "intelligence",
  "outlook"
];

type SceneProps = {
  compact: boolean;
  progressRef?: React.RefObject<HTMLElement | null>;
  reducedMotion?: boolean;
  initialEnvironment?: SpatialEnvironment;
  evidence?: boolean;
};

function CoreInstrument({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const outerGimbal = useRef<THREE.Group>(null);
  const middleGimbal = useRef<THREE.Group>(null);
  const innerGimbal = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    const movement = reducedMotion ? 0 : delta;
    if (outerGimbal.current) outerGimbal.current.rotation.y += movement * 0.075;
    if (middleGimbal.current) middleGimbal.current.rotation.z -= movement * 0.11;
    if (innerGimbal.current) innerGimbal.current.rotation.x += movement * 0.14;
    if (core.current) {
      const target = hovered ? 1.14 : 1;
      core.current.scale.lerp(new THREE.Vector3(target, target, target), 0.09);
    }
  });

  const pathway = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.68, -0.5, 0.02),
    new THREE.Vector3(-0.95, -0.08, 0.31),
    new THREE.Vector3(-0.39, 0.64, 0.13),
    new THREE.Vector3(0.35, 0.83, -0.1),
    new THREE.Vector3(1.47, 0.31, -0.2)
  ]), []);

  return (
    <group>
      <group>
        <Instances limit={8}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial color="#747b7e" metalness={0.48} roughness={0.34} clearcoat={0.72} />
          {[-1, 1].flatMap((side) => [
            <Instance key={`frame-vertical-${side}`} position={[side * 2.58, 0, -0.58]} scale={[0.14, 4.7, 0.22]}/>,
            <Instance key={`frame-horizontal-${side}`} position={[0, side * 2.31, -0.58]} scale={[5.28, 0.14, 0.22]}/>
          ])}
        </Instances>
        <Instances limit={8}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#d0ae62" metalness={0.7} roughness={0.34} />
          {[-1, 1].flatMap((side) => [
            <Instance key={`frame-inset-v-${side}`} position={[side * 2.58, 0, -0.458]} scale={[0.018, 4.1, 0.012]}/>,
            <Instance key={`frame-inset-h-${side}`} position={[0, side * 2.31, -0.458]} scale={[4.72, 0.018, 0.012]}/>
          ])}
        </Instances>
        <mesh position={[0, -2.48, 0.04]}>
          <boxGeometry args={[3.6, 0.18, 1.95]} />
          <meshPhysicalMaterial color="#676d70" metalness={0.52} roughness={0.39} clearcoat={0.62} />
        </mesh>
        <mesh position={[0, -2.375, 0.04]}>
          <boxGeometry args={[3.15, 0.018, 1.55]} />
          <meshStandardMaterial color="#c6a657" metalness={0.72} roughness={0.31} />
        </mesh>
        {[-1, 1].flatMap((side) => [
          <mesh key={`bearing-side-${side}`} position={[side * 2.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.38, 12]} />
            <meshPhysicalMaterial color="#b4a06b" metalness={0.72} roughness={0.34} clearcoat={0.7} />
          </mesh>,
          <mesh key={`bearing-front-${side}`} position={[0, side * 2.18, 0.06]}>
            <cylinderGeometry args={[0.16, 0.16, 0.38, 12]} />
            <meshStandardMaterial color="#bd9e55" metalness={0.78} roughness={0.32} />
          </mesh>
        ])}
      </group>

      <group ref={outerGimbal} rotation={[0.26, 0.14, -0.24]}>
        <mesh>
          <torusGeometry args={[1.94, 0.056, 14, 144]} />
          <meshPhysicalMaterial color="#686b6b" metalness={0.83} roughness={0.31} clearcoat={0.72} clearcoatRoughness={0.2} />
        </mesh>
        <mesh rotation={[0.61, 0.1, 0.24]} scale={[1.12, 0.76, 1]}>
          <torusGeometry args={[2.08, 0.023, 10, 144]} />
          <meshStandardMaterial color="#c0a35f" metalness={0.86} roughness={0.32} />
        </mesh>
        <mesh rotation={[0.61, 0.1, 0.24]} scale={[1.12, 0.76, 1]}>
          <torusGeometry args={[2.13, 0.011, 8, 144]} />
          <meshStandardMaterial color="#d5bd79" metalness={0.85} roughness={0.36} />
        </mesh>
        <Instances limit={16}>
          <cylinderGeometry args={[0.035, 0.035, 0.13, 8]} />
          <meshStandardMaterial color="#8f7747" metalness={0.9} roughness={0.32} />
          {Array.from({ length: 16 }, (_, index) => {
            const angle = (index / 16) * Math.PI * 2;
            return (
              <Instance
                key={index}
                position={[Math.cos(angle) * 1.94, Math.sin(angle) * 1.94, 0]}
                rotation={[Math.PI / 2, 0, angle]}
              />
            );
          })}
        </Instances>
      </group>

      <group ref={middleGimbal} rotation={[-0.4, 0.32, 0.16]}>
        <mesh rotation={[0.16, 0.65, 0]}>
          <torusGeometry args={[1.57, 0.038, 12, 128]} />
          <meshPhysicalMaterial color="#72777b" metalness={0.82} roughness={0.29} clearcoat={0.8} />
        </mesh>
        <mesh rotation={[0.16, 0.65, 0]}>
          <torusGeometry args={[1.49, 0.008, 6, 128]} />
          <meshStandardMaterial color="#b99b59" metalness={0.88} roughness={0.31} />
        </mesh>
      </group>

      <group ref={innerGimbal} rotation={[0.2, -0.31, 0.45]}>
        <mesh scale={[1.17, 0.72, 1]}>
          <torusGeometry args={[1.31, 0.032, 10, 128]} />
          <meshPhysicalMaterial color="#565d61" metalness={0.86} roughness={0.27} clearcoat={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.22, 0]} scale={[1.12, 0.86, 1]}>
          <torusGeometry args={[1.17, 0.012, 8, 128]} />
          <meshStandardMaterial color="#c0a55f" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      <mesh
        ref={core}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          setHovered((value) => !value);
        }}
      >
        <dodecahedronGeometry args={[0.78, 0]} />
        <meshPhysicalMaterial
          color={hovered ? "#b39b60" : "#737879"}
          metalness={0.78}
          roughness={0.32}
          clearcoat={0.95}
          clearcoatRoughness={0.15}
          emissive="#4c3510"
          emissiveIntensity={hovered ? 0.28 : 0.08}
        />
      </mesh>
      <mesh scale={0.92} rotation={[0.32, 0.12, -0.27]}>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshStandardMaterial color="#ddc27c" metalness={0.75} roughness={0.36} wireframe />
      </mesh>
      <mesh rotation={[0.2, 0.37, 0.14]}>
        <boxGeometry args={[1.42, 1.42, 1.42]} />
        <meshStandardMaterial color="#c6a85e" metalness={0.7} roughness={0.37} wireframe />
      </mesh>
      <mesh scale={0.4} rotation={[0.2, 0.3, 0.1]}>
        <octahedronGeometry args={[0.78, 0]} />
        <meshPhysicalMaterial color="#b2b6b8" metalness={0.86} roughness={0.2} transparent opacity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#f0d892" metalness={0.8} roughness={0.18} emissive="#725118" emissiveIntensity={0.24} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={`strut-${side}`} rotation={[0, 0, side * 0.35]}>
          <mesh position={[side * 1.16, 0, 0.06]}>
            <boxGeometry args={[0.18, 0.88, 0.3]} />
            <meshPhysicalMaterial color="#686e71" metalness={0.8} roughness={0.3} clearcoat={0.8} />
          </mesh>
          <mesh position={[side * 1.16, 0, 0.22]}>
            <boxGeometry args={[0.105, 0.62, 0.018]} />
            <meshStandardMaterial color="#d4b768" metalness={0.82} roughness={0.3} />
          </mesh>
        </group>
      ))}
      {[0, 1, 2, 3, 4, 5].map((index) => {
        const angle = (index / 6) * Math.PI * 2;
        return (
          <mesh
            key={`fin-${index}`}
            position={[Math.cos(angle) * 1.78, Math.sin(angle) * 1.78, 0]}
            rotation={[0, 0, angle - Math.PI / 2]}
          >
            <boxGeometry args={[0.18, 0.36, 0.18]} />
            <meshPhysicalMaterial color="#555c60" metalness={0.85} roughness={0.31} clearcoat={0.65} />
          </mesh>
        );
      })}

      <mesh position={[0, 0, 0.1]}>
        <tubeGeometry args={[pathway, 96, 0.012, 8, false]} />
        <meshStandardMaterial color="#d2af62" metalness={0.85} roughness={0.28} emissive="#6c4a16" emissiveIntensity={0.16} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.48, side * 0.7, 0]}>
          <mesh>
            <boxGeometry args={[0.38, 0.18, 0.25]} />
            <meshPhysicalMaterial color="#252a2e" metalness={0.94} roughness={0.28} clearcoat={0.65} />
          </mesh>
          <mesh position={[0, 0, 0.132]}>
            <boxGeometry args={[0.23, 0.012, 0.012]} />
            <meshStandardMaterial color="#d1ad5c" metalness={0.8} roughness={0.3} emissive="#664412" emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const researchNodes = [
  [-2.4, 0.5, 0.1], [-1.6, 1.26, -0.25], [-0.62, 1.62, 0.22],
  [0.52, 1.48, -0.4], [1.62, 1.03, 0.18], [2.44, 0.23, -0.2],
  [1.93, -0.76, 0.38], [0.94, -1.32, -0.18], [-0.18, -1.58, 0.35],
  [-1.3, -1.15, -0.35], [-2.16, -0.45, 0.18], [-0.25, 0.28, 0.58]
] as const;

const researchEdges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 0],
  [0, 11], [2, 11], [4, 11], [6, 11], [8, 11], [10, 11],
  [1, 9], [3, 7]
] as const;

function ResearchNetwork({
  intelligence = false,
  reducedMotion = false
}: {
  intelligence?: boolean;
  reducedMotion?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => researchNodes.map(([x, y, z], index) => {
    if (!intelligence) return new THREE.Vector3(x, y, z);
    const phase = index * 2.399963;
    return new THREE.Vector3(
      x * 0.76 + Math.sin(phase) * 0.28,
      y * 0.8 + Math.cos(phase) * 0.36,
      z * 2.4 + ((index % 4) - 1.5) * 0.27
    );
  }), [intelligence]);
  const links = useMemo(() => {
    const vertices: number[] = [];
    for (const [from, to] of researchEdges) {
      vertices.push(...points[from].toArray(), ...points[to].toArray());
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [points]);
  useEffect(() => () => links.dispose(), [links]);

  useFrame((_, delta) => {
    if (group.current && !reducedMotion) {
      group.current.rotation.y += delta * (intelligence ? 0.055 : 0.026);
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        intelligence ? -0.14 : 0.08,
        1.6,
        delta
      );
    }
  });

  return (
    <group ref={group} rotation={[0.08, -0.2, 0]}>
      <lineSegments geometry={links}>
        <lineBasicMaterial color={intelligence ? "#8c9cae" : "#b39a61"} transparent opacity={0.48} />
      </lineSegments>
      <Instances limit={researchNodes.length}>
        <icosahedronGeometry args={[0.075, 1]} />
        <meshPhysicalMaterial color="#b9a36c" metalness={0.76} roughness={0.28} clearcoat={0.7} />
        {points.map((point, index) => (
          <Instance
            key={index}
            position={point}
            scale={index === 11 ? 1.9 : index % 3 === 0 ? 1.35 : 1}
          />
        ))}
      </Instances>
      {points.filter((_, index) => index % 3 === 0).map((point, index) => (
        <mesh key={index} position={point} scale={1.8}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshBasicMaterial color="#d3b663" transparent opacity={0.09} />
        </mesh>
      ))}
      <mesh rotation={[0.65, 0.18, 0.32]}>
        <torusGeometry args={[2.72, 0.009, 6, 120]} />
        <meshStandardMaterial color="#6e7781" metalness={0.78} roughness={0.4} transparent opacity={0.45} />
      </mesh>
      {intelligence && [-1.25, 0, 1.25].map((depth, index) => (
        <mesh key={index} position={[0, 0, depth]} rotation={[index * 0.16, 0.12, index * -0.18]}>
          <torusGeometry args={[1.85 + index * 0.18, 0.008, 6, 96]} />
          <meshStandardMaterial color={index === 1 ? "#c1a55f" : "#778491"} metalness={0.76} roughness={0.37} transparent opacity={0.32} />
        </mesh>
      ))}
    </group>
  );
}

function TechnologyArchitecture({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !reducedMotion) group.current.rotation.y += delta * 0.035;
  });

  const structures: Array<{
    position: [number, number, number];
    scale: [number, number, number];
  }> = [
    { position: [-1.45, -0.76, 0], scale: [0.7, 0.18, 1.35] },
    { position: [0, -0.25, -0.2], scale: [0.56, 1.2, 0.56] },
    { position: [1.42, -0.82, -0.18], scale: [0.72, 0.16, 1.15] },
    { position: [0, 0.94, -0.12], scale: [1.72, 0.11, 0.82] },
    { position: [-0.94, 0.1, -0.2], scale: [0.11, 1.45, 0.18] },
    { position: [0.94, 0.1, -0.2], scale: [0.11, 1.45, 0.18] },
    { position: [0, -1.26, -0.2], scale: [2.2, 0.1, 1.05] }
  ];

  return (
    <group ref={group} rotation={[0.02, -0.3, 0]}>
      <Instances limit={structures.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#8b9090" metalness={0.42} roughness={0.36} clearcoat={0.65} />
        {structures.map((part, index) => (
          <Instance key={index} position={part.position} scale={part.scale} />
        ))}
      </Instances>
      <mesh position={[0, 0.93, 0]}>
        <boxGeometry args={[1.48, 0.025, 0.035]} />
        <meshStandardMaterial color="#d0ae62" metalness={0.8} roughness={0.3} emissive="#765116" emissiveIntensity={0.12} />
      </mesh>
      {[-0.48, -0.16, 0.16, 0.48].map((offset) => (
        <group key={offset} position={[offset, -0.2, 0.72]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.035, 1.05, 0.035]} />
            <meshPhysicalMaterial color="#bbc0c0" metalness={0.55} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[0.16, 0.045, 0.14]} />
            <meshStandardMaterial color="#b39450" metalness={0.9} roughness={0.28} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 1.42, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.08, 0.012, 6, 80]} />
        <meshStandardMaterial color="#b6a16c" metalness={0.82} roughness={0.36} />
      </mesh>
    </group>
  );
}

function InstitutionalOutlook({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const core = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (core.current && !reducedMotion) core.current.rotation.y += delta * 0.025;
  });
  return (
    <group ref={core} position={[0, 0.1, 0]}>
      <mesh position={[0, -0.92, 0]}>
        <cylinderGeometry args={[1.5, 1.86, 0.22, 8, 1]} />
        <meshPhysicalMaterial color="#8a8e8f" metalness={0.46} roughness={0.36} clearcoat={0.65} />
      </mesh>
      <mesh position={[0, -0.77, 0]}>
        <cylinderGeometry args={[1.36, 1.36, 0.035, 8, 1]} />
        <meshStandardMaterial color="#baa15f" metalness={0.9} roughness={0.31} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <octahedronGeometry args={[0.98, 1]} />
        <meshPhysicalMaterial color="#7f8587" metalness={0.52} roughness={0.32} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, 0.2, 0]} scale={1.14} rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[0.98, 0]} />
        <meshStandardMaterial color="#b59853" metalness={0.86} roughness={0.36} wireframe />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 2.1, -0.2, -0.12]}>
          <boxGeometry args={[0.09, 3.4, 0.18]} />
          <meshPhysicalMaterial color="#747b7e" metalness={0.48} roughness={0.34} clearcoat={0.65} />
        </mesh>
      ))}
      <mesh rotation={[0.22, 0.32, 0.62]}>
        <torusGeometry args={[1.65, 0.015, 8, 128]} />
        <meshStandardMaterial color="#c1a55f" metalness={0.88} roughness={0.29} />
      </mesh>
    </group>
  );
}

function SpatialComposition({
  compact,
  progressRef,
  reducedMotion,
  initialEnvironment,
  evidence
}: SceneProps) {
  const groups = useRef<Array<THREE.Group | null>>([]);
  const progress = useRef(initialEnvironment ? ENVIRONMENTS.indexOf(initialEnvironment) / 4 : 0);
  const pointer = useRef(new THREE.Vector2());
  const targetCamera = useMemo(() => new THREE.Vector3(), []);
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    const reduced = reducedMotion ?? false;
    let targetProgress = initialEnvironment ? ENVIRONMENTS.indexOf(initialEnvironment) / 4 : 0;
    const progressElement = progressRef?.current;
    if (progressElement) {
      const bounds = progressElement.getBoundingClientRect();
      const scrollDistance = Math.max(bounds.height - window.innerHeight, 1);
      targetProgress = THREE.MathUtils.clamp(-bounds.top / scrollDistance, 0, 1);
    }
    progress.current = THREE.MathUtils.damp(progress.current, targetProgress, reduced ? 18 : 2.4, delta);
    const stage = progress.current * (ENVIRONMENTS.length - 1);

    groups.current.forEach((group, index) => {
      if (!group) return;
      const distance = Math.abs(stage - index);
      const envelope = THREE.MathUtils.smoothstep(1 - distance, 0.05, 0.9);
      const scale = 0.001 + envelope * (index === 0 ? 0.94 : 0.9);
      group.scale.setScalar(scale);
      group.visible = envelope > 0.015;
    });

    const environmentIndex = Math.min(
      ENVIRONMENTS.length - 1,
      Math.round(progress.current * (ENVIRONMENTS.length - 1))
    );
    targetCamera.set(
      (reduced ? 0 : state.pointer.x * 0.42) + (environmentIndex - 2) * 0.09,
      (reduced ? 0 : -state.pointer.y * 0.26) + (environmentIndex === 2 ? 0.12 : 0),
      8.15 + Math.sin(progress.current * Math.PI) * 0.5
    );
    camera.position.lerp(targetCamera, 1 - Math.exp(-delta * (reduced ? 12 : 2.3)));
    camera.lookAt(0, 0, 0);
    pointer.current.set(state.pointer.x, state.pointer.y);

    if (evidence) {
      const canvas = gl.domElement;
      canvas.dataset.environment = ENVIRONMENTS[environmentIndex];
      canvas.dataset.scrollProgress = progress.current.toFixed(3);
      canvas.dataset.cameraX = camera.position.x.toFixed(3);
      canvas.dataset.cameraY = camera.position.y.toFixed(3);
      canvas.dataset.cameraZ = camera.position.z.toFixed(3);
      canvas.dataset.pointerX = pointer.current.x.toFixed(3);
      canvas.dataset.drawCalls = String(gl.info.render.calls);
      canvas.dataset.triangles = String(gl.info.render.triangles);
    }
  });

  return (
    <>
      <color attach="background" args={["#090b0e"]} />
      <fog attach="fog" args={["#090b0e", 9, 19]} />
      <ambientLight intensity={0.72} />
      <hemisphereLight args={["#e2e0d7", "#101113", 1.05]} />
      <directionalLight position={[-4, 6, 5]} color="#f0dfb6" intensity={4.6} />
      <directionalLight position={[5, 1, -4]} color="#a5b1bf" intensity={3.1} />
      <spotLight position={[0, 7, 2]} angle={0.48} penumbra={0.72} color="#f5e4bd" intensity={58} distance={20} />
      <pointLight position={[-2, -1, 2]} color="#b28737" intensity={13} distance={9} />

      <group ref={(node) => { groups.current[0] = node; }} position={[1.85, 0, 0]}>
        <CoreInstrument reducedMotion={reducedMotion}/>
      </group>
      <group ref={(node) => { groups.current[1] = node; }} position={[1.62, 0, 0]}>
        <ResearchNetwork reducedMotion={reducedMotion}/>
      </group>
      <group ref={(node) => { groups.current[2] = node; }} position={[1.6, 0, 0]}>
        <TechnologyArchitecture reducedMotion={reducedMotion}/>
      </group>
      <group ref={(node) => { groups.current[3] = node; }} position={[1.62, 0, 0]}>
        <ResearchNetwork intelligence reducedMotion={reducedMotion}/>
      </group>
      <group ref={(node) => { groups.current[4] = node; }} position={[1.65, 0, 0]}>
        <InstitutionalOutlook reducedMotion={reducedMotion}/>
      </group>

      {!compact && (
        <Instances limit={32}>
          <icosahedronGeometry args={[0.012, 0]} />
          <meshStandardMaterial color="#aeb6bd" metalness={0.5} roughness={0.48} />
          {Array.from({ length: 32 }, (_, index) => {
            const angle = index * 2.399963;
            const radius = 3.4 + (index % 7) * 0.29;
            const height = ((index * 37) % 17) / 5 - 1.7;
            return (
              <Instance
                key={index}
                position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius - 1.5]}
                scale={index % 5 === 0 ? 1.8 : 1}
              />
            );
          })}
        </Instances>
      )}
      <AdaptiveDpr pixelated/>
    </>
  );
}

export function SpatialExperienceCanvas({
  compact,
  progressRef,
  reducedMotion = false,
  initialEnvironment,
  evidence = false
}: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.15], fov: 40, near: 0.1, far: 40 }}
      dpr={compact ? [0.6, 0.9] : [0.8, 1.25]}
      gl={{ alpha: false, antialias: !compact, powerPreference: "high-performance" }}
      frameloop="always"
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.18;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.domElement.dataset.spatialCore = "MIDSHASUM SPATIAL CORE";
        gl.domElement.dataset.webgl = gl.getContext().getParameter(gl.getContext().VERSION);
      }}
      className="spatial-canvas"
    >
      <SpatialComposition
        compact={compact}
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        initialEnvironment={initialEnvironment}
        evidence={evidence}
      />
    </Canvas>
  );
}

function variantEnvironment(variant: SpatialVariant): SpatialEnvironment {
  if (variant === "research") return "research";
  if (variant === "technology") return "architecture";
  if (variant === "intelligence") return "intelligence";
  if (variant === "contact") return "outlook";
  return "core";
}

export default function SpatialCanvas({
  variant,
  compact
}: {
  variant: SpatialVariant;
  compact: boolean;
}) {
  return (
    <SpatialExperienceCanvas
      compact={compact}
      initialEnvironment={variantEnvironment(variant)}
    />
  );
}
