import { useEffect, useState } from "react";
import container from "styles/Container.module.scss";
import styles from "./Styles.module.scss";
import table from "styles/Table.module.scss";
import ModalExpand from "components/Modals/ModalExpand/ModalExpand";

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
      <li className={table.row}>
         <div className={table.cell}>
            <div onClick={() => removeDrill(index)}>X</div>
            {drill.name}
         </div>

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

         <ModalExpand onChange={saveNotes} text={drill.notes} />
      </li>
   );
}

export default ListItem;
