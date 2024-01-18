import { useState, useEffect, useRef } from "react";
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

  useFrame((_, delta) => {
    if (activeMesh === idx) {
      $mesh.current.rotation.y += delta;
    }
  });

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  useEffect(() => {
    const color =
      activeMesh === idx ? { r: 1, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };

    const newPosition =
      activeMesh === idx
        ? {
            x: 0,
            y: 0,
            z: 6,
          }
        : {
            x: position[0],
            y: position[1],
            z: position[2],
          };

    gsap.to($mesh.current.material.color, {
      ...color,
      duration: 0.4,
    });

    gsap.to($mesh.current.position, {
      ...newPosition,
      duration: 0.4,
    });
  }, [activeMesh, idx, position]);

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
      <meshStandardMaterial />
    </mesh>
  );
}
