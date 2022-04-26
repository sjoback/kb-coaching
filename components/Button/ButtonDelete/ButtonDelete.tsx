import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ButtonDelete({
   text,
   size = "md",
   customSize = [],
   color = "red",
   align = "center",
   onClick,
}) {
   const buttonColor = `btn-${color}`;
   const buttonAlign = `btn-${align}`;
   const buttonSize = customSize.length > 0 ? `btn-custom` : `btn-${size}`;
   const buttonClasses = [buttonSize, buttonColor, buttonAlign];

   return (
      <button
         onClick={() => {
            onClick();
         }}
         type="button"
         className={classnames(buttonClasses)}
      >
         <FontAwesomeIcon
            icon={faTrashCan}
            style={{ fontSize: 20, color: "#fff" }}
         />
         {text}
      </button>
   );
}
export default ButtonDelete;
