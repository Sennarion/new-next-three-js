"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import NeuralSphere from "@/components/neural-sphere";
import styles from "../page.module.css";

export default function NeuralNetwork() {
  return (
    <main className={styles.main}>
      <Canvas camera={{ position: [0, 0, 20] }}>
        <NeuralSphere />
        <OrbitControls />
      </Canvas>
    </main>
  );
}
