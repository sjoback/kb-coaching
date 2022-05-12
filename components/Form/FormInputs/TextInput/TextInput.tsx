import styles from "./TextInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classnames from "classnames";

function TextInput({
   onChange,
   placeholder,
   error,
   // errorText = placeholder
   //    ? `${placeholder} is required`
   //    : `The field is required`,
   type = "text",
   name,
}) {
   const [value, setValue] = useState("");
   const [active, setActive] = useState(false);

   return (
      <div
         className={classnames(styles.container, active ? styles.active : "")}
      >
         <div className={styles.icon}>
            <FontAwesomeIcon icon={faFloppyDisk} />
         </div>
         {error.toString()}
         <input
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id={name}
         />
      </div>
   );
}

export default TextInput;
