import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__title}>Select learning mode</div>
      <div className={styles.home__body}>
        <Link to="flashcards" className={styles.home__option}>
          Flash cards
        </Link>
        <Link to="quiz" className={styles.home__option}>
          Quiz
        </Link>
        <Link to="exam" className={styles.home__option}>
          Exam
        </Link>
      </div>
    </div>
  );
};
