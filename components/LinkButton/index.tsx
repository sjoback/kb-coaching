import styles from "./LinkButton.module.scss";
import Link from "next/link";
import { faCoffee, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LinkButton({ link, text, icon }) {
  return (
    <Link href={link}>
      <a className={styles.main}>
        <FontAwesomeIcon icon={icon} />
        {text}
      </a>
    </Link>
  );
}

export default LinkButton;
