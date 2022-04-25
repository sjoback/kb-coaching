import classnames from "classnames";
import ButtonDefault from "./ButtonDefault/ButtonDefault";
import ButtonDelete from "./ButtonDelete/ButtonDelete";
import ButtonExpand from "./ButtonExpand/ButtonExpand";
import ButtonLink from "./ButtonLink/ButtonLink";

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
   link = "",
}) {
   const buttonColor = `btn-${color}`;
   const buttonAlign = `btn-${align}`;
   const buttonSize = customSize.length > 0 ? `btn-custom` : `btn-${size}`;
   const buttonClasses = [buttonSize, buttonColor, buttonAlign];

   const Components = {
      default: ButtonDefault,
      delete: ButtonDelete,
      expand: ButtonExpand,
      link: ButtonLink,
   };

   if (typeof Components[component] !== "undefined") {
      const Component = Components[component];
      return (
         <Component
            text={text}
            link={link}
            onClick={onClick}
            classes={buttonClasses}
         />
      );
   } else {
      return <p>{component} is not yet defined.</p>;
   }
}
export default Button;
