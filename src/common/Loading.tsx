import styles from "./Loading.module.css";

export const Loading = ({ title }: any) => (
  <div className={styles.loading}>
    <div className={styles.loading__title}>{title}</div>
    <div className={styles.loading__roller}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
