import classnames from "classnames";
import ButtonDefault from "./ButtonDefault/ButtonDefault";
import ButtonDelete from "./ButtonDelete/ButtonDelete";
import ButtonExpand from "./ButtonExpand/ButtonExpand";

function Button({
   onClick = () => {},
   text,
   size = "md",
   customSize = [],
   color = "default",
   type = "default",
   align = "center",
   component = "default",
   borderRadius = [],
}) {
   const buttonColor = `btn-${color}`;
   const buttonAlign = `btn-${align}`;
   const buttonSize = customSize.length > 0 ? `btn-custom` : `btn-${size}`;
   const buttonClasses = [buttonSize, buttonColor, buttonAlign];
   const buttonBorderRadius = borderRadius.length
      ? undefined
      : {
           width: "500px",
        };

   const Components = {
      default: ButtonDefault,
      delete: ButtonDelete,
      expand: ButtonExpand,
   };

   if (typeof Components[component] !== "undefined") {
      const Component = Components[component];
      return (
         <Component
            text={text}
            onClick={onClick}
            classes={buttonClasses}
            style={buttonBorderRadius}
         />
      );
   } else {
      return <p>{component} is not yet defined.</p>;
   }
}
export default Button;
