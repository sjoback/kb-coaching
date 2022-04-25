import styles from "./ButtonLink.module.scss";
import Link from "next/link";
import classnames from "classnames";

function ButtonLink({ onClick, link, text, classes, style }) {
   return (
      <Link href={link}>
         <a className={classnames(classes)}>
            {/* <FontAwesomeIcon icon={icon} /> */}
            {text}
         </a>
      </Link>
   );
}

export default ButtonLink;
