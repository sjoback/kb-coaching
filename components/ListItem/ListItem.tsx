import { useEffect, useState } from "react";
import styles from "./ListItem.module.scss";
import ListItemNotes from "./ListItemNotes/ListItemNotes";
import classNames from "classnames";

function ListItem({ index, removeDrill, onChange, drill }) {
   useEffect(() => {
      setRounds(drill.rounds);
      setRoundTime(drill.round_time);
   }, []);

   const [rounds, setRounds] = useState(Number);
   const [roundTime, setRoundTime] = useState(Number);
   const [notes, setNotes] = useState(Number);

   function saveRounds(newRounds) {
      setRounds(newRounds);
      onChange(newRounds, index, "rounds");
   }

   function saveRoundTime(newRoundTime) {
      setRoundTime(newRoundTime);
      onChange(newRoundTime, index, "round_time");
   }

   function saveNotes(newNotes) {
      console.log(newNotes);

      setNotes(newNotes);
      onChange(newNotes, index, "notes");
   }

   return (
      <li className={styles.container}>
         <button
            onClick={() => removeDrill(index)}
            className={classNames(styles.buttonDelete, "btn-red", "btn-sm")}
            type="button"
         >
            X
         </button>

         <div className={styles.name}>{drill.name}</div>

         <input
            name="rounds"
            type="text"
            value={rounds}
            onChange={(e) => saveRounds(e.target.value)}
         />

         <input
            name="round time"
            type="text"
            value={roundTime}
            onChange={(e) => saveRoundTime(e.target.value)}
         />

         <ListItemNotes onChange={saveNotes} notes={drill.notes} />
      </li>
   );
}

export default ListItem;
