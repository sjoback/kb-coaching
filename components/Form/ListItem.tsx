import { useEffect, useState } from "react";
import container from "styles/Container.module.scss";
import styles from "./Styles.module.scss";
import table from "styles/Table.module.scss";
import ModalExpand from "components/ModalExpand";

function ListItem({ index, onChange, drill }) {
   useEffect(() => {
      setRoundsState(drill.rounds);
      setRoundTimeState(drill.round_time);
   }, []);

   const [rounds, setRoundsState] = useState(Number);
   const [roundTime, setRoundTimeState] = useState(Number);

   function setRounds(newRounds) {
      console.log(newRounds);

      setRoundsState(newRounds);
      saveDrill();
   }

   function setRoundTime(roundTime) {
      setRoundTimeState(roundTime);
      saveDrill();
   }

   function saveDrill() {
      drill.rounds = rounds;
      drill.round_time = roundTime;
      onChange(drill, index);
   }

   return (
      <li className={table.row}>
         <div className={table.cell}>{drill.name}</div>

         <input
            name="rounds"
            type="text"
            value={rounds}
            onChange={(e) => setRounds(e.target.value)}
         />

         <input
            name="round time"
            type="text"
            value={roundTime}
            onChange={(e) => setRoundTime(e.target.value)}
         />

         <ModalExpand data={drill.comment} />
      </li>
   );
}

export default ListItem;
