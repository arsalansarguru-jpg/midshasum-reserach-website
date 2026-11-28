"use client";

import {
  AdaptiveDpr,
  ContactShadows,
  Environment,
  Instances,
  Instance,
  Lightformer
} from "@react-three/drei";
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

const ENVIRONMENTS: SpatialEnvironment[] = ["core", "research", "architecture", "intelligence", "outlook"];

type SceneProps = {
  compact: boolean;
  progressRef?: React.RefObject<HTMLElement | null>;
  reducedMotion?: boolean;
  initialEnvironment?: SpatialEnvironment;
  evidence?: boolean;
};

// ─── Shared PBR Material Presets ────────────────────────────────────────────

const MAT = {
  blackTitanium: {
    color: "#161b21",
    metalness: 0.96,
    roughness: 0.19,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.45,
  },
  darkTitanium: {
    color: "#2b363d",
    metalness: 0.91,
    roughness: 0.23,
    clearcoat: 0.88,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1.25,
  },
  champagneGold: {
    color: "#c9a227",
    metalness: 0.92,
    roughness: 0.18,
    clearcoat: 0.78,
    clearcoatRoughness: 0.14,
    envMapIntensity: 1.55,
  },
  brushedChampagne: {
    color: "#e1c46b",
    metalness: 0.90,
    roughness: 0.26,
    clearcoat: 0.65,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.35,
  },
  steelBlue: {
    color: "#3a4f5c",
    metalness: 0.84,
    roughness: 0.28,
    clearcoat: 0.65,
    envMapIntensity: 1.05,
  },
};

function PrecisionRod({
  start,
  end,
  radius = 0.025,
  mat = MAT.darkTitanium,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  radius?: number;
  mat?: object;
}) {
  const dir = useMemo(() => end.clone().sub(start), [end, start]);
  const quat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize()),
    [dir]
  );
  const pos = useMemo(() => start.clone().add(end).multiplyScalar(0.5), [end, start]);
  return (
    <mesh position={pos} quaternion={quat} castShadow>
      <cylinderGeometry args={[radius * 0.8, radius, dir.length(), 10, 1]} />
      <meshPhysicalMaterial {...mat} />
    </mesh>
  );
}

// ─── ENVIRONMENT 1 & 5: THE MIDSHASUM RESEARCH CORE ──────────────────────────
// Asymmetrical, monumental precision-engineered architectural sculpture.
// Layered black titanium cantilevered planes, brushed champagne-gold calibration
// ribs, recessed optical aperture, and an articulated inner polyhedral core.
// Returned to in Chapter 05 (outlook) from a monumental low-angle perspective.

function createAsymmetricSpineShape(s: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-0.92 * s, -1.78 * s);
  shape.lineTo(-1.18 * s, -0.52 * s);
  shape.lineTo(-0.88 * s, 0.86 * s);
  shape.lineTo(-0.34 * s, 1.82 * s);
  shape.lineTo(0.28 * s, 1.82 * s);
  shape.lineTo(0.64 * s, 1.12 * s);
  shape.lineTo(0.52 * s, -0.18 * s);
  shape.lineTo(0.84 * s, -1.78 * s);
  shape.closePath();
  return shape;
}

function createCantileverWingShape(s: number) {
  const shape = new THREE.Shape();
  shape.moveTo(0.18 * s, -1.42 * s);
  shape.lineTo(0.18 * s, 0.22 * s);
  shape.lineTo(0.68 * s, 1.38 * s);
  shape.lineTo(1.34 * s, 1.14 * s);
  shape.lineTo(1.42 * s, -0.48 * s);
  shape.lineTo(0.96 * s, -1.42 * s);
  shape.closePath();
  return shape;
}

function MidShaSumResearchCore({
  reducedMotion,
  monumental = false,
}: {
  reducedMotion: boolean;
  monumental?: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const innerCore = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const spineGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(createAsymmetricSpineShape(1.0), {
      depth: 0.48,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.05,
      bevelThickness: 0.045,
      curveSegments: 4,
    });
    geo.translate(0, 0, -0.24);
    return geo;
  }, []);

  const wingGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(createCantileverWingShape(0.94), {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.04,
      bevelThickness: 0.035,
      curveSegments: 3,
    });
    geo.translate(0, 0, -0.14);
    return geo;
  }, []);

  const shieldGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(createAsymmetricSpineShape(0.68), {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.03,
      bevelThickness: 0.025,
    });
    geo.translate(0, 0, -0.06);
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      spineGeo.dispose();
      wingGeo.dispose();
      shieldGeo.dispose();
    };
  }, [spineGeo, wingGeo, shieldGeo]);

  const meridianArcs = useMemo(
    () => [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.56, -1.66, 0.34),
        new THREE.Vector3(-0.62, -0.24, 0.38),
        new THREE.Vector3(-0.38, 0.96, 0.36),
        new THREE.Vector3(-0.12, 1.72, 0.32),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.32, -1.32, 0.42),
        new THREE.Vector3(0.68, 0.08, 0.46),
        new THREE.Vector3(1.02, 1.08, 0.42),
      ]),
    ],
    []
  );

  const fasteners = useMemo(
    () =>
      [
        [-0.78, -1.56, 0.3],
        [-1.02, -0.48, 0.3],
        [-0.74, 0.8, 0.3],
        [-0.24, 1.66, 0.3],
        [0.98, 1.0, 0.42],
        [1.16, -0.42, 0.42],
      ] as [number, number, number][],
    []
  );

  useFrame((_, delta) => {
    if (root.current && !reducedMotion) {
      const baseRotY = monumental ? 0.24 : -0.14;
      root.current.rotation.y = baseRotY + Math.sin(performance.now() * 0.0001) * 0.035;
      root.current.rotation.x = (monumental ? -0.05 : 0.03) + Math.sin(performance.now() * 0.00007 + 1.2) * 0.012;
    }
    if (innerCore.current) {
      if (!reducedMotion) innerCore.current.rotation.y += delta * 0.14;
      const target = hovered ? 1.16 : 1.0;
      innerCore.current.scale.lerp(new THREE.Vector3(target, target, target), 1 - Math.exp(-delta * 6));
    }
  });

  return (
    <group ref={root} rotation={[monumental ? -0.05 : 0.03, monumental ? 0.24 : -0.14, -0.015]}>
      {/* Primary asymmetrical black-titanium spine */}
      <mesh geometry={spineGeo} position={[-0.18, 0, -0.06]} castShadow receiveShadow>
        <meshPhysicalMaterial {...MAT.blackTitanium} />
      </mesh>

      {/* Offset cantilevered titanium wing */}
      <mesh geometry={wingGeo} position={[0.04, 0.08, 0.24]} rotation={[0, -0.08, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial {...MAT.darkTitanium} />
      </mesh>

      {/* Recessed obsidian architectural shield */}
      <mesh geometry={shieldGeo} position={[-0.22, -0.04, 0.24]}>
        <meshPhysicalMaterial
          color="#10161c"
          metalness={0.98}
          roughness={0.09}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          envMapIntensity={2.1}
        />
      </mesh>

      {/* Brushed champagne-gold meridian inlays */}
      {meridianArcs.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 64, i === 0 ? 0.014 : 0.011, 8, false]} />
          <meshPhysicalMaterial {...MAT.champagneGold} />
        </mesh>
      ))}

      {/* Precision-machined horizontal calibration ribs */}
      {[-0.86, 0.14, 0.94].map((y, i) => (
        <group key={y} position={[-0.12 + i * 0.12, y, 0.32]}>
          <mesh>
            <boxGeometry args={[1.55 - i * 0.26, 0.042, 0.065]} />
            <meshPhysicalMaterial {...MAT.darkTitanium} />
          </mesh>
          <mesh position={[0, 0, 0.036]}>
            <boxGeometry args={[1.38 - i * 0.24, 0.012, 0.012]} />
            <meshPhysicalMaterial {...MAT.brushedChampagne} />
          </mesh>
        </group>
      ))}

      {/* Machined fasteners */}
      <Instances limit={fasteners.length}>
        <cylinderGeometry args={[0.026, 0.026, 0.04, 8]} />
        <meshPhysicalMaterial {...MAT.champagneGold} />
        {fasteners.map(([x, y, z], i) => (
          <Instance key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} />
        ))}
      </Instances>

      {/* Recessed optical aperture & articulated inner core */}
      <group position={[0.16, 0.06, 0.5]}>
        <mesh
          ref={innerCore}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            setHovered((v) => !v);
          }}
        >
          <octahedronGeometry args={[0.27, 0]} />
          <meshPhysicalMaterial
            color={hovered ? "#e1c46b" : "#c9a227"}
            metalness={0.9}
            roughness={0.14}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            emissive={hovered ? "#5c3808" : "#2d1a04"}
            emissiveIntensity={hovered ? 0.35 : 0.12}
            envMapIntensity={2.3}
          />
        </mesh>
        <mesh rotation={[0.18, -0.22, Math.PI / 6]}>
          <torusGeometry args={[0.42, 0.016, 8, 64]} />
          <meshPhysicalMaterial {...MAT.champagneGold} />
        </mesh>
        <mesh rotation={[-0.24, 0.28, 0]}>
          <torusGeometry args={[0.54, 0.009, 6, 64]} />
          <meshPhysicalMaterial {...MAT.steelBlue} />
        </mesh>
      </group>

      {/* Stepped architectural plinth */}
      <mesh position={[0.06, -1.86, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[2.7, 0.075, 0.84]} />
        <meshPhysicalMaterial {...MAT.blackTitanium} />
      </mesh>
      <mesh position={[0.06, -1.79, 0.04]}>
        <boxGeometry args={[2.35, 0.014, 0.62]} />
        <meshPhysicalMaterial {...MAT.champagneGold} />
      </mesh>
      <mesh position={[0.06, -1.97, 0.04]}>
        <boxGeometry args={[3.15, 0.04, 1.18]} />
        <meshPhysicalMaterial color="#0c1014" metalness={0.95} roughness={0.24} clearcoat={0.9} />
      </mesh>
    </group>
  );
}

// ─── ENVIRONMENT 2: RESEARCH DIMENSIONS ────────────────────────────────────

const RESEARCH_NODES: [number, number, number, number, string][] = [
  [-2.1, 0.9, 0.4, 1.0, "primary"],
  [-1.1, 1.6, -0.5, 0.7, "secondary"],
  [0.0, 1.1, 0.7, 0.85, "accent"],
  [1.2, 1.5, -0.3, 0.65, "secondary"],
  [2.2, 0.5, 0.5, 0.9, "primary"],
  [-1.9, -0.6, -0.4, 0.6, "secondary"],
  [-0.5, 0.1, 1.0, 1.1, "accent"],
  [0.9, -0.5, -0.6, 0.7, "secondary"],
  [2.0, -1.1, 0.5, 0.75, "primary"],
  [-0.6, -1.6, -0.2, 0.55, "secondary"],
];

const RESEARCH_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 2], [2, 7], [7, 8], [8, 9], [9, 5],
  [6, 7], [1, 6], [3, 7], [4, 8],
];

function ResearchInstallation({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => RESEARCH_NODES.map(([x, y, z]) => new THREE.Vector3(x, y, z)), []);

  const cables = useMemo(
    () =>
      RESEARCH_EDGES.map(([from, to], i) => {
        const a = nodes[from];
        const b = nodes[to];
        const mid = a.clone().lerp(b, 0.5);
        mid.z += i % 2 === 0 ? 0.4 : -0.5;
        mid.y += ((i % 3) - 1) * 0.15;
        return new THREE.CatmullRomCurve3([a, mid, b]);
      }),
    [nodes]
  );

  useFrame((_, delta) => {
    if (group.current && !reducedMotion) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, 0.14, 0.28, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.07, 0.25, delta);
    }
  });

  return (
    <group ref={group} rotation={[-0.08, -0.14, 0.06]}>
      {cables.map((curve, i) => {
        const isPrimary = i % 4 === 0;
        return (
          <mesh key={i}>
            <tubeGeometry args={[curve, 48, isPrimary ? 0.016 : 0.009, 7, false]} />
            <meshPhysicalMaterial
              color={isPrimary ? "#c9a227" : "#5c6b74"}
              metalness={isPrimary ? 0.86 : 0.72}
              roughness={isPrimary ? 0.22 : 0.36}
              transparent
              opacity={isPrimary ? 0.82 : 0.52}
            />
          </mesh>
        );
      })}

      {RESEARCH_NODES.map(([x, y, z, scale, role], i) => {
        const pos = new THREE.Vector3(x, y, z);
        const isHub = role === "accent";
        const isPrimary = role === "primary";
        const mat = isHub ? MAT.champagneGold : isPrimary ? MAT.darkTitanium : MAT.steelBlue;
        const s = scale * 0.22;
        return (
          <group key={i} position={pos}>
            {isHub ? (
              <mesh rotation={[i * 0.3, i * 0.4, i * 0.2]} scale={s * 1.1} castShadow>
                <icosahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial {...mat} />
              </mesh>
            ) : isPrimary ? (
              <mesh rotation={[i * 0.25, i * 0.35, i * 0.18]} scale={s} castShadow>
                <dodecahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial {...mat} />
              </mesh>
            ) : (
              <mesh rotation={[i * 0.2, i * 0.28, i * 0.14]} scale={s * 0.9} castShadow>
                <octahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial {...mat} />
              </mesh>
            )}
            {(isHub || isPrimary) && (
              <mesh rotation={[Math.PI / 2, i * 0.3, 0]} scale={isHub ? 1.0 : 0.72}>
                <torusGeometry args={[s * 1.9, 0.009, 6, 48]} />
                <meshPhysicalMaterial
                  color={isHub ? "#e1c46b" : "#8fa0aa"}
                  metalness={0.84}
                  roughness={0.24}
                  transparent
                  opacity={isHub ? 0.72 : 0.42}
                />
              </mesh>
            )}
          </group>
        );
      })}

      {[-1.6, 0.0, 1.5].map((x, i) => (
        <mesh key={i} position={[x, -1.74 + i * 0.08, -0.4]} rotation={[0, i * 0.08, -0.12 + i * 0.08]}>
          <boxGeometry args={[0.6, 0.014, 0.44]} />
          <meshPhysicalMaterial color="#2a363d" metalness={0.84} roughness={0.28} />
        </mesh>
      ))}
    </group>
  );
}

// ─── ENVIRONMENT 3: TECHNOLOGY ARCHITECTURE ────────────────────────────────

const tierLevels = [-1.1, 0.14, 1.28] as const;
const tierRadii = [1.52, 1.12, 0.64] as const;

function TechnologyArchitecture({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const innerCore = useRef<THREE.Mesh>(null);

  const struts = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const lowerAngle = (i / 5) * Math.PI * 2;
        const upperAngle = ((i + 0.5) / 5) * Math.PI * 2;
        return {
          start: new THREE.Vector3(Math.cos(lowerAngle) * 1.4, tierLevels[0], Math.sin(lowerAngle) * 1.4),
          end: new THREE.Vector3(Math.cos(upperAngle) * 0.62, tierLevels[2], Math.sin(upperAngle) * 0.62),
          gold: i === 2,
        };
      }),
    []
  );

  const bracingRods = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const a1 = (i / 5) * Math.PI * 2 + 0.22;
        const a2 = ((i + 0.42) / 5) * Math.PI * 2 + 0.22;
        return {
          start: new THREE.Vector3(Math.cos(a1) * 1.08, tierLevels[1], Math.sin(a1) * 1.08),
          end: new THREE.Vector3(Math.cos(a2) * 1.42, tierLevels[0], Math.sin(a2) * 1.42),
        };
      }),
    []
  );

  useFrame((_, delta) => {
    if (root.current && !reducedMotion) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.32, 0.3, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.1, 0.26, delta);
    }
    if (innerCore.current && !reducedMotion) {
      innerCore.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={root} rotation={[0.1, -0.32, 0.03]}>
      {tierLevels.map((h, i) => (
        <group key={h}>
          <mesh position={[0, h, 0]} rotation={[0, (i * Math.PI) / 5, 0]}>
            <torusGeometry args={[tierRadii[i], i === 1 ? 0.058 : 0.038, 5, 5]} />
            <meshPhysicalMaterial {...(i === 1 ? MAT.champagneGold : MAT.blackTitanium)} />
          </mesh>
          <mesh position={[0, h, 0]} rotation={[0, (i * Math.PI) / 5 + Math.PI / 10, 0]}>
            <torusGeometry args={[tierRadii[i] * 0.86, 0.013, 4, 5]} />
            <meshPhysicalMaterial {...MAT.brushedChampagne} />
          </mesh>
          <mesh position={[0, h - (i === 0 ? 0.015 : 0.01), 0]} rotation={[0, (i * Math.PI) / 5, 0]}>
            <ringGeometry args={[tierRadii[i] * 0.14, tierRadii[i] * 0.88, 5]} />
            <meshPhysicalMaterial color="#1a2228" metalness={0.88} roughness={0.18} clearcoat={0.9} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.18, 2.6, 5, 2]} />
        <meshPhysicalMaterial {...MAT.blackTitanium} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 2.78, 5, 1]} />
        <meshPhysicalMaterial {...MAT.champagneGold} />
      </mesh>

      <mesh ref={innerCore} position={[0, 0.1, 0]} scale={[0.88, 0.72, 0.88]}>
        <dodecahedronGeometry args={[0.42, 0]} />
        <meshPhysicalMaterial color="#3a4d57" metalness={0.92} roughness={0.17} clearcoat={1.0} clearcoatRoughness={0.1} envMapIntensity={1.8} />
      </mesh>

      {struts.map(({ start, end, gold }, i) => (
        <PrecisionRod key={i} start={start} end={end} radius={gold ? 0.052 : 0.038} mat={gold ? MAT.champagneGold : MAT.darkTitanium} />
      ))}

      {bracingRods.map(({ start, end }, i) => (
        <PrecisionRod key={i} start={start} end={end} radius={0.022} mat={MAT.steelBlue} />
      ))}

      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.4, tierLevels[0], Math.sin(angle) * 1.4]}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshPhysicalMaterial {...MAT.brushedChampagne} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── ENVIRONMENT 4: INTELLIGENCE SPACE ─────────────────────────────────────

function IntelligenceArchitecture({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);

  const strata = [
    { z: -0.88, w: 3.1, h: 2.1, rot: [0.14, 0.08, -0.18], opacity: 0.14 },
    { z: 0.0, w: 2.7, h: 1.9, rot: [0.08, 0.04, -0.1], opacity: 0.18 },
    { z: 0.78, w: 2.2, h: 1.6, rot: [0.04, 0.0, -0.06], opacity: 0.22 },
  ];

  const signals = useMemo(
    () => [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.1, 0.88, 0.95),
        new THREE.Vector3(-0.9, 0.32, 0.18),
        new THREE.Vector3(0.1, 0.72, -0.58),
        new THREE.Vector3(1.2, -0.12, 0.38),
        new THREE.Vector3(2.1, -0.78, -0.72),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.0, -1.1, -0.85),
        new THREE.Vector3(-0.9, -0.3, 0.78),
        new THREE.Vector3(0.1, -0.78, 0.08),
        new THREE.Vector3(1.2, 0.62, -0.88),
        new THREE.Vector3(1.9, 1.2, 0.65),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.5, 1.4, -0.42),
        new THREE.Vector3(-0.4, 0.72, 0.9),
        new THREE.Vector3(0.4, 0.08, -0.14),
        new THREE.Vector3(1.5, -0.8, 0.86),
      ]),
    ],
    []
  );

  const signalNodes = useMemo(
    () =>
      signals.flatMap((curve, ci) =>
        [0.15, 0.4, 0.65, 0.88].map((t, ti) => ({
          pos: curve.getPointAt(t),
          scale: ti === 2 ? 0.17 : 0.11,
          gold: (ci + ti) % 4 === 0,
        }))
      ),
    [signals]
  );

  const columns = useMemo(
    () =>
      [-1.4, -0.4, 0.5, 1.4].map((x, i) => ({
        start: new THREE.Vector3(x, -1.6, -0.65 + i * 0.42),
        end: new THREE.Vector3(x + (i - 1.5) * 0.3, 1.4 - i * 0.14, 0.62 - i * 0.4),
      })),
    []
  );

  useFrame((_, delta) => {
    if (root.current && !reducedMotion) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, 0.16, 0.26, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -0.06, 0.22, delta);
    }
  });

  return (
    <group ref={root} rotation={[0.06, -0.16, 0]}>
      {strata.map(({ z, w, h, rot, opacity }, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={rot as [number, number, number]}>
          <planeGeometry args={[w, h]} />
          <meshPhysicalMaterial
            color={i === 1 ? "#5a4420" : "#1a2d38"}
            metalness={0.65}
            roughness={0.16}
            clearcoat={0.95}
            clearcoatRoughness={0.05}
            transparent
            opacity={opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
            envMapIntensity={1.6}
          />
        </mesh>
      ))}

      {strata.map(({ z, w, h, rot }, i) => (
        <group key={`frame-${i}`} position={[0, 0, z + 0.01]} rotation={rot as [number, number, number]}>
          {[
            [w * 0.5, 0],
            [-w * 0.5, 0],
            [0, h * 0.5],
            [0, -h * 0.5],
          ].map(([fx, fy], fi) => (
            <mesh key={fi} position={[fx, fy, 0]}>
              <boxGeometry args={[fi < 2 ? 0.012 : w, fi < 2 ? h : 0.012, 0.004]} />
              <meshPhysicalMaterial color={i === 1 ? "#c9a227" : "#4a5e68"} metalness={0.84} roughness={0.22} transparent opacity={0.55} />
            </mesh>
          ))}
        </group>
      ))}

      {signals.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 96, i === 0 ? 0.021 : i === 1 ? 0.014 : 0.009, 8, false]} />
          <meshPhysicalMaterial
            color={i === 0 ? "#c9a227" : i === 1 ? "#8fa0a8" : "#637078"}
            metalness={0.76}
            roughness={i === 0 ? 0.22 : 0.34}
            transparent
            opacity={i === 0 ? 0.9 : i === 1 ? 0.72 : 0.5}
          />
        </mesh>
      ))}

      {signalNodes.map(({ pos, scale, gold }, i) => (
        <mesh key={i} position={pos} rotation={[0.28 * (i % 3), i * 0.22, -0.16]}>
          <octahedronGeometry args={[scale, 0]} />
          <meshPhysicalMaterial
            color={gold ? "#e1c46b" : "#4e616a"}
            metalness={gold ? 0.9 : 0.78}
            roughness={gold ? 0.16 : 0.28}
            clearcoat={0.8}
            envMapIntensity={gold ? 1.6 : 0.9}
          />
        </mesh>
      ))}

      {columns.map(({ start, end }, i) => (
        <PrecisionRod key={i} start={start} end={end} radius={0.013} mat={{ color: "#7a6830", metalness: 0.86, roughness: 0.24 }} />
      ))}
    </group>
  );
}

// ─── SCENE COMPOSITION ───────────────────────────────────────────────────────

function SpatialComposition({
  compact,
  progressRef,
  reducedMotion,
  initialEnvironment,
  evidence,
}: SceneProps) {
  const groups = useRef<Array<THREE.Group | null>>([]);
  const progress = useRef(initialEnvironment ? ENVIRONMENTS.indexOf(initialEnvironment) / 4 : 0);
  const targetCamera = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    const reduced = reducedMotion ?? false;

    let tp = initialEnvironment ? ENVIRONMENTS.indexOf(initialEnvironment) / 4 : 0;
    const el = progressRef?.current;
    if (el) {
      const bounds = el.getBoundingClientRect();
      const scrollDist = Math.max(bounds.height - window.innerHeight, 1);
      tp = THREE.MathUtils.clamp(-bounds.top / scrollDist, 0, 1);
    }
    progress.current = THREE.MathUtils.damp(progress.current, tp, reduced ? 18 : 2.6, delta);
    const stage = progress.current * (ENVIRONMENTS.length - 1);
    const envIdx = Math.min(ENVIRONMENTS.length - 1, Math.round(stage));

    const desktopPos: [number, number, number][] = [
      [2.15, 0.04, 0],
      [2.0, 0.1, 0],
      [2.08, -0.04, 0],
      [2.08, 0.1, 0],
      [2.0, -0.14, 0.2],
    ];
    const mobilePos: [number, number, number][] = [
      [0, -2.3, 0],
      [0, -2.2, 0],
      [0, -2.3, 0],
      [0, -2.2, 0],
      [0, -2.35, 0],
    ];
    const desktopScales = [1.04, 0.98, 0.96, 0.95, 1.12];
    const mobileScales = [0.64, 0.58, 0.6, 0.58, 0.68];

    groups.current.forEach((g, i) => {
      if (!g) return;
      const dist = Math.abs(stage - i);
      const env = THREE.MathUtils.smoothstep(1 - dist, 0.05, 0.9);
      const sc = compact ? mobileScales[i] : desktopScales[i];
      g.scale.setScalar(0.001 + env * sc);
      const [x, y, z] = compact ? mobilePos[i] : desktopPos[i];
      g.position.set(x, y, z);
      g.visible = env > 0.012;
    });

    const desktopViews = [
      { cam: [0.1, 0.0, 9.4], look: [0.1, 0.0, 0] },
      { cam: [0.5, 0.3, 10.2], look: [0.18, 0.08, 0] },
      { cam: [-0.7, 0.5, 10.9], look: [0.2, 0.04, 0] },
      { cam: [0.2, -0.3, 9.2], look: [0.14, 0.0, 0] },
      { cam: [-0.85, -0.45, 9.8], look: [0.25, 0.15, 0] },
    ] as const;
    const mobileViews = [
      { cam: [0, 0.1, 11.6], look: [0, -0.3, 0] },
      { cam: [-0.1, 0.3, 12.0], look: [0, -0.3, 0] },
      { cam: [0.2, 0.4, 12.4], look: [0, -0.32, 0] },
      { cam: [-0.1, -0.2, 11.6], look: [0, -0.32, 0] },
      { cam: [-0.15, -0.1, 11.2], look: [0, -0.24, 0] },
    ] as const;

    const v = (compact ? mobileViews : desktopViews)[envIdx];
    const pxInfluence = compact ? 0.09 : 0.22;
    const pyInfluence = compact ? 0.06 : 0.14;
    targetCamera.set(
      v.cam[0] + (reduced ? 0 : state.pointer.x * pxInfluence),
      v.cam[1] + (reduced ? 0 : -state.pointer.y * pyInfluence),
      v.cam[2] + Math.sin(progress.current * Math.PI) * 0.2
    );
    targetLook.set(v.look[0], v.look[1], v.look[2]);
    camera.position.lerp(targetCamera, 1 - Math.exp(-delta * (reduced ? 14 : 2.6)));
    camera.lookAt(targetLook);

    if (evidence) {
      const c = gl.domElement;
      c.dataset.environment = ENVIRONMENTS[envIdx];
      c.dataset.scrollProgress = progress.current.toFixed(3);
      c.dataset.cameraX = camera.position.x.toFixed(3);
      c.dataset.cameraY = camera.position.y.toFixed(3);
      c.dataset.cameraZ = camera.position.z.toFixed(3);
      c.dataset.pointerX = state.pointer.x.toFixed(3);
      c.dataset.drawCalls = String(gl.info.render.calls);
      c.dataset.triangles = String(gl.info.render.triangles);
    }
  });

  return (
    <>
      <color attach="background" args={["#080808"]} />
      <fog attach="fog" args={["#080808", 14, 28]} />

      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#d8d4ca", "#0a1628", 0.65]} />
      <directionalLight
        castShadow
        position={[-5, 7, 7]}
        color="#f2e4c2"
        intensity={3.4}
        shadow-mapSize-width={compact ? 512 : 1024}
        shadow-mapSize-height={compact ? 512 : 1024}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[6, 1, -6]} color="#9aafc0" intensity={2.0} />
      <spotLight position={[4, -4, 4]} angle={0.44} penumbra={0.9} color="#c9a227" intensity={18} distance={22} />
      <spotLight position={[-2, 8, -4]} angle={0.38} penumbra={0.85} color="#e8edf2" intensity={22} distance={28} />
      <pointLight position={[-2, -1.5, 4]} color="#c9a227" intensity={4.0} distance={12} />

      <Environment resolution={128} frames={1} background={false}>
        <Lightformer form="rect" intensity={3.2} color="#fff4e0" position={[-5, 4, 2]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.8} color="#c8d8e4" position={[5, 1.5, -3]} rotation={[0, Math.PI / 2, 0]} scale={[5, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#c9a227" position={[0, -3, 4]} rotation={[Math.PI / 2, 0, 0]} scale={[4, 2, 1]} />
        <Lightformer form="ring" intensity={0.8} color="#e0eaf4" position={[0, 6, 0]} scale={[8, 8, 1]} />
      </Environment>

      {/* Chapter 01 — Institutional Core */}
      <group ref={(n) => { groups.current[0] = n; }}>
        <MidShaSumResearchCore reducedMotion={reducedMotion ?? false} />
      </group>
      {/* Chapter 02 — Research Dimensions */}
      <group ref={(n) => { groups.current[1] = n; }}>
        <ResearchInstallation reducedMotion={reducedMotion ?? false} />
      </group>
      {/* Chapter 03 — Technology Architecture */}
      <group ref={(n) => { groups.current[2] = n; }}>
        <TechnologyArchitecture reducedMotion={reducedMotion ?? false} />
      </group>
      {/* Chapter 04 — Intelligence Space */}
      <group ref={(n) => { groups.current[3] = n; }}>
        <IntelligenceArchitecture reducedMotion={reducedMotion ?? false} />
      </group>
      {/* Chapter 05 — Institutional Outlook (Monumental return to Core) */}
      <group ref={(n) => { groups.current[4] = n; }}>
        <MidShaSumResearchCore reducedMotion={reducedMotion ?? false} monumental />
      </group>

      <ContactShadows
        position={compact ? [0, -3.1, 0] : [2.1, -2.1, 0]}
        opacity={compact ? 0.18 : 0.26}
        scale={compact ? 4.0 : 6.5}
        blur={3.2}
        far={compact ? 3.5 : 4.2}
        resolution={compact ? 64 : 256}
        frames={1}
      />

      {!compact && (
        <Instances limit={18}>
          <icosahedronGeometry args={[0.011, 0]} />
          <meshStandardMaterial color="#8ea0aa" metalness={0.6} roughness={0.4} />
          {Array.from({ length: 18 }, (_, i) => {
            const a = i * 2.399963;
            const r = 4.6 + (i % 5) * 0.28;
            const y = ((i * 41) % 15) / 4.5 - 1.6;
            return (
              <Instance
                key={i}
                position={[Math.cos(a) * r, y, Math.sin(a) * r - 1.2]}
                scale={i % 7 === 0 ? 1.6 : 1}
              />
            );
          })}
        </Instances>
      )}

      <AdaptiveDpr pixelated />
    </>
  );
}

export function SpatialExperienceCanvas({
  compact,
  progressRef,
  reducedMotion = false,
  initialEnvironment,
  evidence = false,
}: SceneProps) {
  const [contextLost, setContextLost] = useState(false);

  if (contextLost) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, compact ? 11.6 : 9.4], fov: compact ? 42 : 38, near: 0.1, far: 40 }}
      dpr={compact ? [0.65, 0.95] : [0.85, 1.3]}
      gl={{ alpha: false, antialias: !compact, powerPreference: "high-performance" }}
      frameloop="always"
      shadows
      performance={{ min: 0.5 }}
      eventSource={typeof document !== "undefined" ? document.documentElement : undefined}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.domElement.dataset.spatialCore = "MIDSHASUM SPATIAL CORE";
        gl.domElement.dataset.webgl = gl.getContext().getParameter(gl.getContext().VERSION);
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setContextLost(true);
        });
        gl.domElement.addEventListener("webglcontextrestored", () => {
          setContextLost(false);
        });
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
  compact,
}: {
  variant: SpatialVariant;
  compact: boolean;
}) {
  return (
    <SpatialExperienceCanvas compact={compact} initialEnvironment={variantEnvironment(variant)} />
  );
}
