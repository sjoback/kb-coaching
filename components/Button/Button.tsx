import ButtonDefault from "components/ButtonDefault/ButtonDefault";
import ButtonDelete from "components/ButtonDelete/ButtonDelete";
import ButtonExpand from "components/ButtonExpand/ButtonExpand";

function Button({
   onClick,
   text,
   size = "md",
   customSize = [],
   color = "default",
   type = "default",
   align = "center",
   custom = [],
   component = "default",
}) {
   const buttonColor = `btn-${color}`;
   const buttonAlign = `btn-${align}`;
   const buttonSize = customSize.length > 0 ? `btn-custom` : `btn-${size}`;
   const buttonClasses = [buttonSize, buttonColor, buttonAlign];

   const Components = {
      default: ButtonDefault,
      delete: ButtonDelete,
      expand: ButtonExpand,
   };

   if (typeof Components[component] !== "undefined") {
      const Component = Components[component];
      return (
         <Component text={text} onClick={onClick} classes={buttonClasses} />
      );
   } else {
      return <p>{component} is not yet defined.</p>;
   }
}
export default Button;
