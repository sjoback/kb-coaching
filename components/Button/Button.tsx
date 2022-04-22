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
   // const buttonCustomSize = `padding: ${customSize[0]} ${customSize[1]}`;

   // const buttonSize = {
   //    sm: styles.sm,
   //    md: styles.md,
   //    lg: styles.lg,
   // }[(size as string) || "md"];

   const buttonClasses = [styles.button, buttonSize, buttonColor];

   return (
      <button onClick={onClick} className={classnames(buttonClasses)}>
         {text}
      </button>

      // <div className={styles.container}>
      //    {type == "default" && (
      //       <ButtonDefault
      //          onClick={() => {
      //             action(), console.log("clicked default");
      //          }}
      //          text={text}
      //          classes={classnames(buttonClasses)}
      //       />
      //    )}

      //    {type == "expand" && (
      //       <ButtonExpand
      //          onClick={() => {
      //             action(), console.log("clicked expand");
      //          }}
      //          text={text}
      //          classes={classnames(buttonClasses)}
      //       />
      //    )}
      // </div>
   );
}
export default Button;
