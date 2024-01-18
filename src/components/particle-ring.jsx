import { useRef } from "react";
import { Vector3 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { pointsInner, pointsOuter } from "@/utils";

const ParticleRing = () => {
  return (
    <Canvas
      camera={{
        position: [-10, -10, -10],
      }}
      style={{ background: "linear-gradient(#070032, #21001f)" }}
    >
      <directionalLight />
      <pointLight position={[-30, 0, -30]} />
      <PointCircle />
    </Canvas>
  );
};

const PointCircle = () => {
  const ref = useRef(null);
  const { pointer, camera } = useThree();
  const vec = new Vector3();

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
      {pointsInner.map(({ idx, position, color }) => (
        <Point key={idx} position={position} color={color} />
      ))}
      {pointsOuter.map(({ idx, position, color }) => (
        <Point key={idx} position={position} color={color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 10, 10]} />
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </mesh>
  );
};

export default ParticleRing;
