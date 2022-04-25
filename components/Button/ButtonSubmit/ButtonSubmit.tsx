import classnames from "classnames";

function ButtonSubmit({
   text,
   size = "md",
   customSize = [],
   color = "default",
   align = "center",
   component = "default",
}) {
   const buttonColor = `btn-${color}`;
   const buttonAlign = `btn-${align}`;
   const buttonSize = customSize.length > 0 ? `btn-custom` : `btn-${size}`;
   const buttonClasses = [buttonSize, buttonColor, buttonAlign];

   return (
      <button type="submit" className={classnames(buttonClasses)}>
         {text}
      </button>
   );
}
export default ButtonSubmit;
