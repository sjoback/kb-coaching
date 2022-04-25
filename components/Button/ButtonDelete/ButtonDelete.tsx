import classnames from "classnames";

function ButtonDelete({ onClick, text, classes }) {
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
export default ButtonDelete;
