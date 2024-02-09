"use client";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import useKeyboard from "@/hooks/useKeyboard";
import Ball from "@/components/ball";
import styles from "../page.module.css";

export default function Roller() {
  const ref = useRef();
  const keyMap = useKeyboard();
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    const activeKeysList = Object.keys(keyMap).filter((key) => keyMap[key]);
    setActiveKeys(activeKeysList);
  }, [keyMap]);

  return (
    <main className={styles.main}>
      <div className={styles.hints}>
        <div className={styles.hintW}>
          <div
            className={`${styles.hint} ${
              activeKeys.includes("KeyW") ? styles.active : ""
            }`}
          >
            W
          </div>
        </div>
        <div className={styles.hintW}>
          <div
            className={`${styles.hint} ${
              activeKeys.includes("KeyA") ? styles.active : ""
            }`}
          >
            A
          </div>
          <div
            className={`${styles.hint} ${
              activeKeys.includes("KeyS") ? styles.active : ""
            }`}
          >
            S
          </div>
          <div
            className={`${styles.hint} ${
              activeKeys.includes("KeyD") ? styles.active : ""
            }`}
          >
            D
          </div>
        </div>
      </div>
      <Canvas
        camera={{ position: [0, 2.5, 2.5] }}
        style={{ background: "black" }}
        onCreated={({ camera }) => camera.lookAt(0, 1, 0)}
      >
        <gridHelper ref={ref} args={[100, 100]} />
        <Ball floor={ref} />
      </Canvas>
    </main>
  );
}
