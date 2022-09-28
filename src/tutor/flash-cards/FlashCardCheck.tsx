import React, { useState } from "react";
import Question from "./Question";
import Answer from "./Answer";
import styles from "./FlashCardCheck.module.css";

export default function FlashCardCheck(props: any) {
  const [cardCheck, setCardCheck] = useState({
    current: 0,
    displayAnswer: false,
  });

  const showAnswer = () =>
    setCardCheck({ ...cardCheck, displayAnswer: !cardCheck.displayAnswer });

  const nextTask = () => {
    if (props.flashCards.length - 1 > cardCheck.current) {
      cardCheck.current++;
      setCardCheck({ ...cardCheck, displayAnswer: false });
    }
  };

  const previousTask = () => {
    if (cardCheck.current > 0) {
      cardCheck.current--;
      setCardCheck({ ...cardCheck, displayAnswer: false });
    }
  };

  return (
    <div className={styles.flashcard}>
      <div className={styles.flashcard__title}>English quiz</div>
      <div className={styles.flashcard__card}>
        <div className={styles.flashcard__task}>
          <Question data={props.flashCards[cardCheck.current]?.question} />
        </div>
        <div
          className={styles.flashcard__answer}
          style={{ visibility: cardCheck.displayAnswer ? "visible" : "hidden" }}
        >
          <Answer data={props.flashCards[cardCheck.current]?.answer} />
        </div>
        <button className={styles.flashcard__showbutton} onClick={showAnswer}>
          Show answer
        </button>
      </div>
      <div>
        <button className={styles.flashcard__navbutton} onClick={previousTask}>
          Previous
        </button>
        <button className={styles.flashcard__navbutton} onClick={nextTask}>
          Next
        </button>
      </div>
    </div>
  );
}
