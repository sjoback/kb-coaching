import classnames from "classnames";
import styles from "./ButtonExpand.module.scss";

function ButtonExpand({
   onClick,
   text,
   size = "md",
   color = "default",
   type = "default",
}) {
   const buttonSize = {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
   }[(size as string) || "md"];

   const buttonColor = `btn-${color}`;

   const buttonType = `btn-${type}`;

   return (
      <button
         onClick={() => {
            onClick();
         }}
         className={classnames(
            styles.button,
            buttonSize,
            buttonColor,
            buttonType
         )}
      >
         {text}
      </button>
   );
}
export default ButtonExpand;
