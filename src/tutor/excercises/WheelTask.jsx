import styles from "./WheelTask.module.css";
import { useRef, useEffect } from "react";
import {
  getWheelConfig,
  styleSvg,
  cleanCurrentSvg,
  getFormattedData,
  addWheelTextPath,
  addWheelSlices,
  addWheelText,
} from "./wheel";

export const WheelTask = ({ wheel, setScore }) => {
  const svgRef = useRef();
  useEffect(() => {
    const config = getWheelConfig();
    const svg = styleSvg(svgRef.current, config.w, config.h);
    cleanCurrentSvg(svg);

    for (let step = 0; step < config.scaleMax; step++) {
      let data = getFormattedData(wheel, step);
      addWheelTextPath(step, svg, data, config);
      addWheelSlices(svg, data, step, config, (d, i) => setScore(i));
    }
    addWheelText(svg, wheel);
  }, [wheel, setScore]);

  return (
    <div className={styles.wheel}>
      <svg
        viewBox="-325 -325 650 650"
        className={styles.scalingsvg}
        ref={svgRef}
      ></svg>
    </div>
  );
};
