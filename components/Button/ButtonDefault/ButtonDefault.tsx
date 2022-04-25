import classnames from "classnames";

function ButtonDefault({ onClick, text, classes }) {
   return (
      <button
         onClick={() => {
            onClick();
         }}
         type="button"
         className={classnames(classes)}
      >
         {text}
      </button>
   );
}
export default ButtonDefault;
