"use client";
import { useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TreeModel from "@/components/tree-model";
import ShibaModel from "@/components/shiba-model";
import styles from "../page.module.css";

const animations = [
  {
    name: "sit",
    action: "sitting_skeletal.3",
  },
  {
    name: "stand",
    action: "standing_skeletal.3",
  },
  {
    name: "rollover",
    action: "rollover_skeletal.3",
  },
  {
    name: "shake",
    action: "shake_skeletal.3",
  },
  {
    name: "play dead",
    action: "play_dead_skeletal.3",
  },
];

export default function Model() {
  const grassTexture = useLoader(THREE.TextureLoader, "./images/grass.jpg");
  grassTexture.repeat.set(20, 20);
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

  const [activeAnimation, setActiveAnimation] = useState(animations[1].action);

  return (
    <main className={styles.main}>
      <Canvas
        camera={{ position: [-3, -0.6, 6] }}
        style={{ background: "#f0ff8f" }}
        shadows
      >
        <OrbitControls minDistance={6} maxDistance={8} />
        <ambientLight intensity={2} />
        <hemisphereLight args={[0xffffbb, 0x080820]} intensity={1} />
        {/* <spotLight
          penumbra={1}
          angle={10}
          intensity={100}
          position={[10, 10, 0]}
          castShadow
        /> */}
        <group position={[0, -2, 0]}>
          <TreeModel />
          <ShibaModel activeAnimation={activeAnimation} />
          <mesh rotation-x={-0.5 * Math.PI} position={[0, 0.34, 0]}>
            <circleGeometry args={[30, 30]} />
            <meshBasicMaterial map={grassTexture} />
          </mesh>
        </group>
      </Canvas>
      <ul className={styles.buttonsList}>
        {animations.map(({ name, action }) => (
          <li className={styles.buttonItem} key={action}>
            <button
              className={styles.button}
              onClick={() => {
                setActiveAnimation(action);
              }}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
