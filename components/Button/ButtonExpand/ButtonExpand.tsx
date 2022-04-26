import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonExpand({ onClick, icon, text, classes }) {
   return (
      <button
         onClick={() => {
            onClick();
         }}
         type="button"
         className={classnames(classes)}
      >
         {icon}
         {text}
      </button>
   );
}
export default ButtonExpand;
