import styles from "./LinkButton.module.scss";
import Link from "next/link";
function LinkButton({ link, text }) {
   return (
      <div className={styles.wrapper}>
         <Link href={link}>
            <a className={styles.main}>
               {/* <FontAwesomeIcon icon={icon} /> */}
               {text}
            </a>
         </Link>
      </div>
   );
}

export default LinkButton;
