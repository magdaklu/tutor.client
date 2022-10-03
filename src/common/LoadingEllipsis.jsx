import styles from "./LoadingEllipsis.module.css";

export const LoadingEllipsis = ({ color }) => {
  const defaultColor = "#fff";
  return (
    <div className={styles.loading__ellipsis}>
      <div style={{ background: color ?? defaultColor }}></div>
      <div style={{ background: color ?? defaultColor }}></div>
      <div style={{ background: color ?? defaultColor }}></div>
      <div style={{ background: color ?? defaultColor }}></div>
    </div>
  );
};
