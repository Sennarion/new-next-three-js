"use client";
import { useState, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import TreeModel from "@/components/tree-model";
import ShibaModel from "@/components/shiba-model";
import SceneTexture from "@/components/scene-texture";
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

const SpotLight = () => {
  const $light = useRef();
  useHelper($light, THREE.SpotLightHelper);

  return (
    <spotLight
      ref={$light}
      color="yellow"
      angle={10}
      intensity={4}
      position={[0, 2, 0]}
      castShadow
    />
  );
};

export default function Model() {
  const [activeAnimation, setActiveAnimation] = useState(animations[1].action);

  return (
    <main className={styles.main}>
      <Canvas camera={{ position: [-3, 2, 8] }} shadows>
        <SceneTexture
          textures={[
            "./images/sky-tex-right.jpg",
            "./images/sky-tex-left.jpg",
            "./images/sky-tex-top.jpg",
            "./images/sky-tex-bottom.jpg",
            "./images/sky-tex-front.jpg",
            "./images/sky-tex-back.jpg",
          ]}
        />
        <OrbitControls
          minDistance={1.4}
          maxDistance={2}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={2} />
        <hemisphereLight args={[0xffffbb, 0x080820]} intensity={0.2} />
        <SpotLight />
        <group position={[0, -0.2, 0]}>
          <TreeModel />
          <ShibaModel activeAnimation={activeAnimation} />
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
