import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap/gsap-core";
import { useFrame } from "@react-three/fiber";

export default function Mesh({
  geometry: Geometry,
  position,
  args,
  idx,
  activeMesh,
  setActiveMesh,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const $mesh = useRef(null);

  useFrame((state, delta) => {
    if (activeMesh === idx) {
      $mesh.current.position.lerp(new THREE.Vector3(0, 0, 6), 0.06);
      $mesh.current.rotation.y += delta;
    } else {
      $mesh.current.position.lerp(new THREE.Vector3(...position), 0.06);
    }
  });

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  const toggleActive = (e) => {
    e.stopPropagation();

    if (activeMesh === idx) {
      setActiveMesh(null);
    } else {
      setActiveMesh(idx);
    }
  };

  return (
    <mesh
      position={position}
      ref={$mesh}
      onClick={toggleActive}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      castShadow
    >
      <Geometry args={args} />
      <meshStandardMaterial color={activeMesh === idx ? "red" : "white"} />
    </mesh>
  );
}
