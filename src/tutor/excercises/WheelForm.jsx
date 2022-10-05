import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./WheelForm.module.css";
import { WheelTask } from "./WheelTask";

export const WheelForm = () => {
  const [wheel, setWheel] = useState({
    labelString: `Title 1
Title 2
Title 3
Title 4
Title 5
Title 6
Title 7
Title 8`,
    data: [
      { label: "Title 1", score: 0 },
      { label: "Title 2", score: 0 },
      { label: "Title 3", score: 0 },
      { label: "Title 4", score: 0 },
      { label: "Title 5", score: 0 },
      { label: "Title 6", score: 0 },
      { label: "Title 7", score: 0 },
      { label: "Title 8", score: 0 },
    ],
  });
  const handleChange = (e) => {
    const labelString = e.target.value;
    const data = labelString
      .split(/\r?\n|\r|\n/g)
      .map((x) => ({ label: x, score: 0 }));
    setWheel({ labelString, data });
  };
  const setScore = useCallback(
    (data) => {
      const newData = [...wheel.data];
      newData[data.index].score = data.data.step + 1;
      setWheel({
        ...wheel,
        data: newData,
      });
    },
    [wheel, setWheel]
  );
  return (
    <div className={styles.wheel}>
      <div className={styles.wheel__form}>
        <section className={styles.wheel__menu}>
          <h1>Wheel Excercise</h1>
          <label className={styles.wheel__label}>
            Write the titles of the areas you want to analyze:{" "}
          </label>
          <textarea
            className={styles.wheel__input}
            value={wheel.labelString}
            onChange={handleChange}
            rows={5}
            cols={5}
          />
        </section>
        <section className={styles.wheel__task}>
          <WheelTask wheel={wheel.data} setScore={setScore} />
        </section>
      </div>
    </div>
  );
};
