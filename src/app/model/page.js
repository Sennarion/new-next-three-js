"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ShibaAnimationProvider } from "@/contexts/shiba-animation";
import TreeModel from "@/components/tree-model";
import ShibaModel from "@/components/shiba-model";
import SceneTexture from "@/components/scene-texture";
import ShibaInterface from "@/components/shiba-interface";
import styles from "../page.module.css";

export default function Model() {
  return (
    <ShibaAnimationProvider>
      <main className={styles.main}>
        <Canvas camera={{ position: [-1, 0.6, 1.2] }} shadows>
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
          <spotLight
            color="yellow"
            angle={10}
            intensity={4}
            position={[0, 2, 0]}
            castShadow
          />
          <ambientLight intensity={2} />
          <hemisphereLight args={[0xffffbb, 0x080820]} intensity={0.2} />
          <group position={[0, -0.2, 0]}>
            <TreeModel />
            <ShibaModel />
          </group>
        </Canvas>
        <ShibaInterface />
      </main>
    </ShibaAnimationProvider>
  );
}
