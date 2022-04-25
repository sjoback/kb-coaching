import classnames from "classnames";

function ButtonExpand({ onClick, text, classes, style }) {
   return (
      <button
         onClick={() => {
            onClick();
         }}
         type="button"
         className={classnames(classes)}
         style={style}
      >
         {text}
      </button>
   );
}
export default ButtonExpand;
