import { useShibaAnimation } from "@/contexts/shiba-animation";
import { transformAnimationName } from "@/utils";
import styles from "../app/page.module.css";

export default function ShibaInterface() {
  const { animations, setAnimationIdx } = useShibaAnimation();

  return (
    <ul className={styles.buttonsList}>
      {animations.map((animation, idx) => (
        <li className={styles.buttonItem} key={animation}>
          <button
            className={styles.button}
            onClick={() => setAnimationIdx(idx)}
          >
            {transformAnimationName(animation)}
          </button>
        </li>
      ))}
    </ul>
  );
}
