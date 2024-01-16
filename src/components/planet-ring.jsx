import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export default function PlanetRing({ distance, ring, axisAngle }) {
  const ringTexture = useLoader(THREE.TextureLoader, ring.texturePath);

  return (
    <mesh
      position={[distance, 0, 0]}
      rotation-x={-0.5 * Math.PI}
      rotation-y={-axisAngle}
    >
      <ringGeometry args={[ring.innerRadius, ring.outerRadius, 32]} />
      <meshBasicMaterial map={ringTexture} side={THREE.DoubleSide} />
    </mesh>
  );
}
