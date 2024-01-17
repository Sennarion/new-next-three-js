import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function ShibaModel({ activeAnimation }) {
  const $group = useRef();
  const { nodes, materials, animations } = useGLTF("/shiba.glb");
  const { actions } = useAnimations(animations, $group);

  useEffect(() => {
    if (actions[activeAnimation])
      actions[activeAnimation].reset().fadeIn(0.5).play();

    return () => {
      if (actions[activeAnimation]) actions[activeAnimation].fadeOut(0.5);
    };
  }, [actions, activeAnimation]);

  return (
    <group ref={$group} dispose={null} position={[-2.4, 0.6, 3.6]}>
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
