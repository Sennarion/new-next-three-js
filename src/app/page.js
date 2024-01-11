"use client";
import { useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Mesh from "@/components/mesh";
import styles from "./page.module.css";

const meshes = [
  { geometry: "boxGeometry", args: [1, 1, 1], position: [-3, 3, 0] },
  { geometry: "sphereGeometry", args: [0.8, 32, 32], position: [0, 3, 0] },
  { geometry: "coneGeometry", args: [1, 2, 32, 1], position: [3, 3, 0] },
  {
    geometry: "tetrahedronGeometry",
    args: [1, 8],
    position: [-3, 0, 0],
  },
  { geometry: "torusGeometry", args: [0.8, 0.3, 16, 100], position: [0, 0, 0] },
  { geometry: "dodecahedronGeometry", args: [1, 0], position: [3, 0, 0] },
  { geometry: "octahedronGeometry", args: [1, 0], position: [-3, -3, 0] },
  {
    geometry: "cylinderGeometry",
    args: [0.5, 1, 2, 16, 4],
    position: [0, -3, 0],
  },
  {
    geometry: "torusKnotGeometry",
    args: [0.6, 0.2, 64, 8, 2, 3],
    position: [3, -3, 0],
  },
];

export default function Home() {
  const [activeMesh, setActiveMesh] = useState(null);

  return (
    <main className={styles.main}>
      <Canvas
        camera={{ position: [0, 0, 10] }}
        style={{ background: "black" }}
        shadows
      >
        <ambientLight intensity={0.8} />
        <pointLight
          position={[0, 0, 10]}
          intensity={40}
          distance={20}
          castShadow
        />
        <OrbitControls enableZoom={false} />
        <mesh position={[0, 0, -2]} receiveShadow>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="gray" side={THREE.DoubleSide} />
        </mesh>
        {meshes.map(({ geometry, args, position }, idx) => (
          <Mesh
            geometry={geometry}
            args={args}
            position={position}
            idx={idx}
            activeMesh={activeMesh}
            setActiveMesh={setActiveMesh}
            key={idx}
          />
        ))}
      </Canvas>
    </main>
  );
}
