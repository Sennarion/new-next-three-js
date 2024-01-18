"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SolarObject from "@/components/solar-object";
import SceneTexture from "@/components/scene-texture";
import styles from "../page.module.css";

const solarObjects = [
  {
    texturePath: "./images/sun.jpg",
    radius: 16,
    distance: 0,
    selfRotationSpeed: 0.004,
    isSun: true,
  },
  {
    texturePath: "./images/mercury.jpg",
    radius: 3.2,
    distance: 28,
    aroundSunRotationSpeed: 0.04,
    selfRotationSpeed: 0.004,
  },
  {
    texturePath: "./images/venus.jpg",
    radius: 5.8,
    distance: 44,
    aroundSunRotationSpeed: 0.015,
    selfRotationSpeed: 0.002,
  },
  {
    texturePath: "./images/earth.jpg",
    radius: 6,
    distance: 62,
    aroundSunRotationSpeed: 0.01,
    selfRotationSpeed: 0.02,
    axisAngle: 0.1,
  },
  {
    texturePath: "./images/mars.jpg",
    radius: 4,
    distance: 78,
    aroundSunRotationSpeed: 0.008,
    selfRotationSpeed: 0.018,
  },
  {
    texturePath: "./images/jupiter.jpg",
    radius: 12,
    distance: 100,
    aroundSunRotationSpeed: 0.002,
    selfRotationSpeed: 0.04,
  },
  {
    texturePath: "./images/saturn.jpg",
    radius: 10,
    distance: 138,
    aroundSunRotationSpeed: 0.0009,
    selfRotationSpeed: 0.038,
    ring: {
      innerRadius: 12,
      outerRadius: 20,
      texturePath: "./images/saturn-ring.png",
    },
    axisAngle: 0.3,
  },
  {
    texturePath: "./images/uranus.jpg",
    radius: 7,
    distance: 176,
    aroundSunRotationSpeed: 0.0004,
    selfRotationSpeed: 0.03,
    ring: {
      innerRadius: 8,
      outerRadius: 12,
      texturePath: "./images/uranus-ring.png",
    },
    axisAngle: 0.3,
  },
  {
    texturePath: "./images/neptune.jpg",
    radius: 7,
    distance: 200,
    aroundSunRotationSpeed: 0.0001,
    selfRotationSpeed: 0.032,
  },
  {
    texturePath: "./images/pluto.jpg",
    radius: 2.8,
    distance: 216,
    aroundSunRotationSpeed: 0.00007,
    selfRotationSpeed: 0.008,
  },
];

export default function SolarSystem() {
  return (
    <main className={styles.main}>
      <Canvas
        camera={{ position: [-100, 100, 150] }}
        style={{ background: "black" }}
      >
        <SceneTexture
          textures={[
            "./images/stars.jpg",
            "./images/stars.jpg",
            "./images/stars.jpg",
            "./images/stars.jpg",
            "./images/stars.jpg",
            "./images/stars.jpg",
          ]}
        />
        <ambientLight intensity={0.2} />
        <pointLight intensity={10000} distance={1000} color={0xffffff} />
        <OrbitControls maxDistance={400} minDistance={80} />
        {solarObjects.map((solarObject) => (
          <SolarObject {...solarObject} key={solarObject.texturePath} />
        ))}
      </Canvas>
    </main>
  );
}
