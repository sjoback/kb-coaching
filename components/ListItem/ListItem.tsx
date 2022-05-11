import { useState } from "react";
import styles from "./ListItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import ListItemCounter from "./ListItemCounter/ListItemCounter";
import classnames from "classnames";
import { useSession, signIn } from "next-auth/react";

function ListItem({ onChange, index, removeDrill, drill }) {
   const { data: session } = useSession();
   const [rounds, setRounds] = useState(drill.rounds);
   const [roundTime, setRoundTime] = useState(drill.round_time);

   function handleRoundsChange(value) {
      onChange(value, index, "rounds");
   }

   function handleRoundTimeChange(value) {
      onChange(value, index, "round_time");
   }

   return (
      <li className={styles.container}>
         {!session ? (
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
         ) : (
            <div></div>
         )}

         <div className={classnames(styles.containerInner, styles.name)}>
            <div>{drill.name}</div>
         </div>

         <div className={classnames(styles.containerInner, styles.rounds)}>
            <ListItemCounter
               onChange={handleRoundsChange}
               label="rounds"
               preset={drill.rounds}
            />
         </div>

         <div className={classnames(styles.containerInner, styles.roundTime)}>
            <ListItemCounter
               onChange={handleRoundTimeChange}
               label="round time"
               preset={drill.round_time}
            />
         </div>
      </li>
   );
}

export default ListItem;
