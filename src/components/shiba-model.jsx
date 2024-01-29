import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useShibaAnimation } from "@/contexts/shiba-animation";

export default function ShibaModel() {
  const $group = useRef();
  const { nodes, materials, animations } = useGLTF("/shiba.glb");
  const { setAnimations, animationIdx } = useShibaAnimation();
  const { actions, names } = useAnimations(animations, $group);

  useEffect(() => {
    setAnimations(names);
  }, [names, setAnimations]);

  useEffect(() => {
    if (actions[names[animationIdx]])
      actions[names[animationIdx]].reset().fadeIn(0.5).play();

    return () => {
      if (actions[names[animationIdx]])
        actions[names[animationIdx]].fadeOut(0.5);
    };
  }, [actions, animationIdx, names]);

  return (
    <group ref={$group} dispose={null} position={[-0.6, 0.12, 0.6]} scale={0.2}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} castShadow />
        <skinnedMesh
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.Material_0}
          skeleton={nodes.Object_8.skeleton}
          scale={0.01}
          castShadow
        />
        <skinnedMesh
          name="Object_10"
          geometry={nodes.Object_10.geometry}
          material={materials["Material.001"]}
          skeleton={nodes.Object_10.skeleton}
          scale={0.01}
          castShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload("/shiba.glb");
