import styles from "./ErrorIcon.module.css";
import { ReactComponent as Icon } from "./../icons/panic.svg";

export const ErrorIcon = ({ color, text, iconWidth }: any) => {
  const defaultColor = "#6a6868b3";
  return (
    <div className={styles.error}>
      <div
        className={styles.error__icon}
        style={{ width: iconWidth ?? "80px" }}
      >
        <Icon fill={color ?? defaultColor} />
      </div>
      {text && (
        <div
          className={styles.error__title}
          style={{ color: color ?? defaultColor }}
        >
          {text}
        </div>
      )}
    </div>
  );
};
