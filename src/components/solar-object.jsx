import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import PlanetRing from "./planet-ring";

export default function SolarObject({
  texturePath,
  radius,
  distance,
  ring,
  aroundSunRotationSpeed,
  selfRotationSpeed,
  isSun,
  axisAngle,
}) {
  const $group = useRef(null);
  const $planet = useRef(null);
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    $planet.current.rotateY(selfRotationSpeed);

    if (aroundSunRotationSpeed) {
      $group.current.rotateY(aroundSunRotationSpeed);
    }
  });

  return (
    <group ref={$group}>
      <mesh ref={$planet} position={[distance, 0, 0]} rotation-z={axisAngle}>
        <sphereGeometry args={[radius, 32, 32]} />
        {isSun ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshStandardMaterial map={texture} />
        )}
      </mesh>
      {ring && (
        <PlanetRing distance={distance} ring={ring} axisAngle={axisAngle} />
      )}
      <mesh rotation-x={0.5 * Math.PI}>
        <ringGeometry args={[distance, distance + 0.4, distance * 4]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
