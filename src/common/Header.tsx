import { useOidc, useOidcUser, OidcUserStatus } from "@axa-fr/react-oidc";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { DisplayUser } from "./UserInfo";

export const Header = () => {
  const { login, logout, isAuthenticated } = useOidc();
  const { oidcUser, oidcUserLoadingState } = useOidcUser();

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__itemcontainer}>
          <div className={styles.header__item}>
            <DisplayUser />
          </div>
        </div>
        <div className={styles.header__itemcontainer}>
          <Link to="/" className={styles.header__item}>
            Home
          </Link>
          {!isAuthenticated && (
            <div className={styles.header__item}>
              <button
                type="button"
                className={styles.header__button}
                onClick={() => login("/")}
              >
                Login
              </button>
            </div>
          )}
          {isAuthenticated && (
            <div className={styles.header__item}>
              <button
                type="button"
                className={styles.header__button}
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
