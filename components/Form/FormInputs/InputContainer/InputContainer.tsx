import styles from "./InputContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classnames from "classnames";

function InputContainer({
   onChange,
   resetError,
   type = "text",
   name,
   placeholder,
   error,
   icon,
   preset,
}) {
   const [value, setValue] = useState("");
   const [active, setActive] = useState(false);
   const icons = {
      name: faUser,
      password: faLock,
      email: faEnvelope,
   };

   function handleChange(input) {
      if (preset != value) resetError(name);
      onChange(input);
      setValue(input);
   }

   return (
      <div
         className={classnames(
            styles.container,
            active ? styles.active : "",
            error ? styles.errorActive : ""
         )}
      >
         <div className={styles.icon}>
            <FontAwesomeIcon icon={icons[icon]} />
         </div>

         <input
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={(e) => handleChange(e.target.value)}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
         />

         {error.length > 0 && <div className={styles.error}>{error}</div>}
      </div>
   );
}

export default InputContainer;
