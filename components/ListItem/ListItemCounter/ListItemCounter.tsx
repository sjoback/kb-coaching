import { useState } from "react";
import styles from "./ListItemCounter.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

function ListItemCounter({ preset, onChange, label }) {
   const { data: session } = useSession();
   const [counter, setCounter] = useState(preset ? preset : 1);

   function countUp() {
      setCounter(counter + 1);
      onChange(counter + 1);
   }

   function countDown() {
      if (counter > 1) {
         setCounter(counter - 1);
         onChange(counter - 1);
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.containerValue}>
            <div>{label}</div>
            <div>{counter}</div>
         </div>

         {!session && (
            <div className={styles.containerButtons}>
               <button type="button" onClick={countUp}>
                  <FontAwesomeIcon
                     icon={faAngleUp}
                     style={{ fontSize: 20, color: "#333" }}
                  />
               </button>

               <button type="button" onClick={countDown}>
                  <FontAwesomeIcon
                     icon={faAngleDown}
                     style={{ fontSize: 20, color: "#333" }}
                  />
               </button>
            </div>
         )}
      </div>
   );
}

export default ListItemCounter;
