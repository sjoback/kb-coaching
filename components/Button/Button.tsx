import classnames from "classnames";
import ButtonExpand from "components/ButtonExpand/ButtonExpand";
import styles from "./Button.module.scss";

function Button({
   onClick,
   text,
   size = "md",
   color,
   type = "default",
   custom = [],
}) {
   const buttonColor = `btn-${color}`;
   const buttonSize = `btn-${size}`;

   return (
      <div className={styles.container}>
         {type == "default" && (
            <button
               onClick={() => {
                  onClick();
               }}
               className={classnames(styles.button, buttonSize, buttonColor)}
            >
               {text}
            </button>
         )}

         {type == "expand" && (
            <ButtonExpand onClick={() => onClick()} text={text} size={size} />
         )}
      </div>
   );
}
export default Button;
