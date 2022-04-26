import Link from "next/link";
import classnames from "classnames";
function ButtonLink({ onClick, link, text, classes, style }) {
   return (
      <Link href={link}>
         <a className={classnames(classes)}>{text}</a>
      </Link>
   );
}

export default ButtonLink;
