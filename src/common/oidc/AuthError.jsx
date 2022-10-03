import styles from "./AuthError.module.css";

export const AuthError = () => (
  <div className={styles.error}>
    <div className={styles.error__title}>Authenticating Error</div>
  </div>
);
