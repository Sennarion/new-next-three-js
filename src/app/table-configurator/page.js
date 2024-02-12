"use client";
import { Canvas } from "@react-three/fiber";
import { ConfiguratorProvider } from "@/contexts/configurator";
import { TableConfiguratorUi } from "@/components/table-configurator-ui";
import Table from "@/components/table";
import styles from "../page.module.css";

export default function TableConfigurator() {
  return (
    <ConfiguratorProvider>
      <main className={styles.main}>
        <Canvas
          shadows
          camera={{ position: [4, 0, -12], fov: 35 }}
          style={{
            background: "linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%)",
          }}
        >
          <Table />
        </Canvas>
        <TableConfiguratorUi />
      </main>
    </ConfiguratorProvider>
  );
}
