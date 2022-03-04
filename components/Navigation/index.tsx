import styles from "./Navigation.module.scss";
import Link from "next/link";

function Navigation() {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.navLogo}>
        <Link href="/">Logo</Link>
      </div>
    </nav>
  );
}

export default Navigation;
