"use client";
import Link from "next/link";
import ParticleRing from "@/components/particle-ring";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ParticleRing />
      <div className={styles.content}>
        <h2 className={styles.title}>theory:</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <a
              className={styles.link}
              href="https://docs.google.com/document/d/1loYSZDKZHNJlGwNKIv6dXRPNR8vseXhpHhSRLyE3WQo/edit"
              target="_blank"
            >
              basics of webgl
            </a>
          </li>
        </ul>
        <h2 className={styles.title}>practical works:</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link className={styles.link} href="/events">
              interactive mesh of geometries
            </Link>
            <Link className={styles.link} href="/solar-system">
              solar system
            </Link>
            <Link className={styles.link} href="/model">
              interactive 3D model
            </Link>
            <Link className={styles.link} href="/roller">
              interactive roller
            </Link>
            <Link className={styles.link} href="/table-configurator">
              table configurator
            </Link>
            <Link className={styles.link} href="/look-at-mouse">
              look at mouse
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
