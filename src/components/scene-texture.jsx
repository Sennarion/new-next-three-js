import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function SceneTexture({ textures }) {
  const { scene } = useThree();
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const backgroundTexture = cubeTextureLoader.load(textures);

  scene.background = backgroundTexture;

  return null;
}
