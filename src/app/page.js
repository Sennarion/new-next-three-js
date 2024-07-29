"use client";
import Link from "next/link";
import ParticleRing from "@/components/particle-ring";
import styles from "./page.module.css";

const nav = [
  { title: "interactive mesh of geometries", href: "/events" },
  { title: "solar system", href: "/solar-system" },
  { title: "interactive 3D model", href: "/model" },
  { title: "interactive roller", href: "/roller" },
  { title: "table configurator", href: "/table-configurator" },
  { title: "look at mouse", href: "/look-at-mouse" },
  { title: "neural sphere", href: "/neural-network" },
];

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
          {nav.map(({ title, href }) => (
            <li className={styles.listItem} key={title}>
              <Link className={styles.link} href={href}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
