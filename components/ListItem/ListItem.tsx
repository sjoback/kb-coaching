import { useState } from "react";
import styles from "./ListItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

function ListItem({ index, removeDrill, drill }) {
   const [rounds, setRounds] = useState(drill.rounds);
   const [roundTime, setRoundTime] = useState(drill.round_time);

   return (
      <li className={styles.container}>
         <button
            onClick={() => removeDrill(index)}
            className={classNames(styles.buttonDelete, "btn-red")}
            type="button"
         >
            <FontAwesomeIcon
               icon={faTimes}
               style={{ fontSize: 20, color: "#fff" }}
            />
         </button>

         <div className={styles.containerInner}>
            {/* <div>name</div> */}
            <div>{drill.name}</div>
         </div>

         <div className={styles.containerInner}>
            <div>rounds</div>
            <div>{roundTime}</div>
         </div>

         <div className={styles.containerInner}>
            <div>round time</div>
            <div>{roundTime}</div>
         </div>
      </li>
   );
}

export default ListItem;
