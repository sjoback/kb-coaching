import { useEffect, useState } from "react";
import styles from "./ListItem.module.scss";
import ListItemNotes from "./ListItemNotes/ListItemNotes";
import classNames from "classnames";

function ListItem({ index, removeDrill, drill }) {
   useEffect(() => {
      setRounds(drill.rounds);
      setRoundTime(drill.round_time);
   }, []);

   const [rounds, setRounds] = useState(Number);
   const [roundTime, setRoundTime] = useState(Number);
   // const [note, setNote] = useState(Number);
   // const [inputs, openInputs] = useState(false);

   // function saveRounds(newRounds) {
   //    setRounds(newRounds);
   //    onChange(newRounds, index, "rounds");
   // }

   // function saveRoundTime(newRoundTime) {
   //    setRoundTime(newRoundTime);
   //    onChange(newRoundTime, index, "round_time");
   // }

   // function saveNotes(newNote) {
   //    console.log(newNote);

   //    setNote(newNote);
   //    onChange(newNote, index, "notes");
   // }

   // Enable ESC for closing modal
   // useEffect(() => {
   //    const close = (e) => {
   //       if (e.keyCode === 27) {
   //          openInputs(false);
   //       }
   //    };
   //    window.addEventListener("keydown", close);
   //    return () => window.removeEventListener("keydown", close);
   // }, []);

   return (
      <li className={styles.container}>
         <button
            onClick={() => removeDrill(index)}
            className={classNames(styles.buttonDelete, "btn-red")}
            type="button"
         >
            X
         </button>

         <div className={styles.containerInner}>{drill.name}</div>

         {/* <input
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
         /> */}
      </li>
   );
}

export default ListItem;
