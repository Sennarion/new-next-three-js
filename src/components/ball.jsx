import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Quaternion } from "three";
import useKeyboard from "@/hooks/useKeyboard";

export default function Ball({ floor }) {
  const ref = useRef();
  const keyMap = useKeyboard();
  const [angularVelocity, setAngularVelocity] = useState(new Vector3());
  const q = new Quaternion();

  useFrame((_, delta) => {
    let newAngularVelocity = new Vector3(
      angularVelocity.x,
      angularVelocity.y,
      angularVelocity.z
    );

    keyMap["KeyW"] && (newAngularVelocity.x -= delta * 5);
    keyMap["KeyS"] && (newAngularVelocity.x += delta * 5);
    keyMap["KeyA"] && (newAngularVelocity.z += delta * 5);
    keyMap["KeyD"] && (newAngularVelocity.z -= delta * 5);

    q.setFromAxisAngle(newAngularVelocity, delta).normalize();
    ref.current.applyQuaternion(q);

    newAngularVelocity.lerp(new Vector3(), 0.01);
    setAngularVelocity(newAngularVelocity);

    floor.current.position.x += newAngularVelocity.z * delta;
    floor.current.position.z -= newAngularVelocity.x * delta;

    floor.current.position.x = floor.current.position.x % 10;
    floor.current.position.z = floor.current.position.z % 10;
  });

  return (
    <mesh ref={ref} position-y={1.0}>
      <sphereGeometry />
      <meshNormalMaterial wireframe />
    </mesh>
  );
}
