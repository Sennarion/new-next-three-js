"use client";
import Link from "next/link";
import ParticleRing from "@/components/particle-ring";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ParticleRing />
      <div className={styles.content}>
        <h1 className={styles.title}>my practical works:</h1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link className={styles.link} href="/events">
              interactive mesh of geometries
            </Link>
            <Link className={styles.link} href="/solar-system">
              solar system
            </Link>
            <Link className={styles.link} href="/model">
              external 3D model
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
