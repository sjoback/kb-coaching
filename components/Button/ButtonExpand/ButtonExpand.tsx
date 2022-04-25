import classnames from "classnames";

function ButtonExpand({ onClick, text, classes }) {
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
export default ButtonExpand;
