// Types
import ButtonDefault from "./ButtonDefault/ButtonDefault";
import ButtonDelete from "./ButtonDelete/ButtonDelete";
import ButtonExpand from "./ButtonExpand/ButtonExpand";
import ButtonLink from "./ButtonLink/ButtonLink";

function Button({ text, onClick, size, color, component, link }) {
   const buttonColor = `btn-${color}`;

   const buttonSize = `btn-${size}`;
   const buttonClasses = [buttonSize, buttonColor];

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
