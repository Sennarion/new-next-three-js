import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";
import { Text } from "@react-three/drei";

export default function Box({ text, ...props }) {
  const ref = useRef();

  const [hovered, setHovered] = useState(false);

  useFrame(({ pointer, viewport }) => {
    const x = (pointer.x * viewport.width) / 2.5;
    const y = (pointer.y * viewport.height) / 2.5;

    ref.current.lookAt(x, y, 1);
    ref.current.material.color.lerp(
      hovered ? new Color("yellow") : new Color("lime"),
      0.05
    );
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={new Color("lime")} />
      <Text fontSize={0.5} position-z={0.501}>
        {text}
      </Text>
    </mesh>
  );
}
