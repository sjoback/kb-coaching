import classnames from "classnames";
import styles from "./ButtonDelete.module.scss";

function ButtonDefault({ onClick, text, classes }) {
   return (
      <button
         onClick={() => {
            onClick();
         }}
         className={classnames(classes)}
      >
         {text}
      </button>
   );
}
export default ButtonDefault;
