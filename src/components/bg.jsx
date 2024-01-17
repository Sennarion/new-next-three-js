import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap/gsap-core";
import { Vector3 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "@/utils";

// const ANIMATED_BG_COLORS = [
//   { r: 0, g: 0, b: 0 },
//   { r: 0.1, g: 0.1, b: 0.4 },
//   { r: 0.2, g: 0, b: 0.2 },
//   { r: 0.1, g: 0.1, b: 0.4 },
//   { r: 0, g: 0, b: 0 },
// ];

const ParticleRing = () => {
  return (
    <Canvas
      camera={{
        position: [-10, -10, -10],
      }}
      style={{ background: "linear-gradient(#070032, #21001f)" }}
    >
      <directionalLight />
      <pointLight position={[-30, 0, -30]} power={10.0} />
      <PointCircle />
    </Canvas>
  );
};

const PointCircle = () => {
  const ref = useRef(null);
  const { pointer, camera, scene } = useThree();
  const vec = new Vector3();
  // scene.background = new THREE.Color(0x000000);

  // const tl = gsap.timeline({ repeat: -1 });

  // ANIMATED_BG_COLORS.forEach(({ r, g, b }) => {
  //   tl.to(scene.background, {
  //     duration: 4,
  //     r,
  //     g,
  //     b,
  //   });
  // });

  useFrame(({ clock }) => {
    camera.position.lerp(
      vec.set(-10 + pointer.x, -10 + pointer.y, camera.position.z),
      0.05
    );

    camera.lookAt(10, 10, 0);

    ref.current.rotation.z = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;
