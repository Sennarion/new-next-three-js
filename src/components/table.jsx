import { Stage, OrbitControls } from "@react-three/drei";
import { TableModel } from "./table-model";

export default function Table() {
  return (
    <>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      <Stage intensity={1.5} environment="city" adjustCamera={2}>
        <TableModel />
      </Stage>
    </>
  );
}
