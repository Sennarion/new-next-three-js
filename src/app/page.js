import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link className={styles.link} href="/events">
            Interactive mesh of geometries
          </Link>
          <Link className={styles.link} href="/solar-system">
            Solar System
          </Link>
        </li>
      </ul>
    </main>
  );
}
