import classnames from "classnames";
import styles from "./Button.module.scss";

function Button({ onClick, text, size = "md", color, type = "default" }) {
   const buttonSize = {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
   }[(size as string) || "md"];

   const buttonColor = {
      green: styles.green,
      red: styles.red,
   }[(color as string) || ""];

   return (
      <button
         onClick={() => {
            onClick();
         }}
         className={classnames(styles.button, buttonSize, buttonColor)}
      >
         {text}
      </button>
   );
}
export default Button;
