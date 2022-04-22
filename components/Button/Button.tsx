import classnames from "classnames";
import styles from "./Button.module.scss";

function Button({
   onClick,
   text,
   size = "md",
   customSize = [],
   color = "default",
   type = "default",
   align = "center",
   custom = [],
}) {
   const buttonColor = `btn-${color}`;
   const buttonAlign = `btn-${align}`;
   const buttonSize = customSize.length > 0 ? `btn-custom` : `btn-${size}`;
   const buttonClasses = [styles.button, buttonSize, buttonColor, buttonAlign];

   return (
      <button onClick={onClick} className={classnames(buttonClasses)}>
         {text}
      </button>
   );
}
export default Button;
