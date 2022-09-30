import { useState } from "react";
import styles from "./FlashCardForm.module.css";
import { useDispatch } from "react-redux";
import { flashCardAdded } from "./flashCardsSlice";
import { useAddFlashcardMutation } from "../../api/apiSlice";

export default function FlashCardForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [addFlashcard, { isLoading }] = useAddFlashcardMutation();

  const handleAddFlashcard = async () => {
    try {
      if (question && answer) {
        await addFlashcard({ question, answer }).unwrap();
        setQuestion("");
        setAnswer("");
      }
    } catch {
      console.error("An error occurred");
    }
  };

  const dispatch = useDispatch();

  const onQuestionChanged = (event: any) => setQuestion(event.target.value);
  const onAnswerChanged = (event: any) => setAnswer(event.target.value);
  const onSaveClicked = (event: any) => {
    if (question && answer) {
      dispatch(
        flashCardAdded({
          question,
          answer,
        })
      );

      setQuestion("");
      setAnswer("");
    }

    event.preventDefault();
  };
  return (
    <section className={styles.flashcard}>
      <h2 className={styles.flashcard__title}>Flash Cards</h2>
      <h3 className={styles.flashcard__subtitle}>Add Flash Card</h3>
      <form className={styles.flashcard__card}>
        <label className={styles.flashcard__label} htmlFor="question">
          Question:
        </label>
        <input
          className={styles.flashcard__input}
          type="text"
          value={question}
          onChange={onQuestionChanged}
        />
        <label className={styles.flashcard__label} htmlFor="answer">
          Answer:
        </label>
        <input
          className={styles.flashcard__input}
          type="text"
          value={answer}
          onChange={onAnswerChanged}
        />
        <div className={styles.flashcard__space}></div>
        <input
          className={styles.flashcard__submit}
          type="submit"
          value="Save"
          onClick={handleAddFlashcard}
        />
      </form>
    </section>
  );
}
