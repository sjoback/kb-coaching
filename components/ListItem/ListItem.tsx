import { useEffect, useState } from "react";
import styles from "./ListItem.module.scss";
import ModalExpand from "components/Modal/ModalExpand/ModalExpand";
import Button from "components/Button/Button";

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
      setNotes(newNotes);
      onChange(newNotes, index, "notes");
   }

   return (
      <li className={styles.container}>
         <Button onClick={() => removeDrill()} text={"X"} color={"red"} />

         {/* <div className={styles.containerInner}> */}
         <div>{drill.name}</div>

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
         {/* </div> */}

         <ModalExpand onChange={saveNotes} text={drill.notes} />
      </li>
   );
}

export default ListItem;
