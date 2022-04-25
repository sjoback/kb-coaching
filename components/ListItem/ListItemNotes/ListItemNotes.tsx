import classnames from "classnames";
import Button from "components/Button/Button";
import { useEffect, useState } from "react";
import styles from "./ListItemNotes.module.scss";

function ListItemNotes({ onChange, notes }) {
   const [note, setNote] = useState(notes);
   const [open, toggleOpen] = useState(false);

   function handleNotes(newNote) {
      setNote(newNote);
      onChange(note);
   }

   useEffect(() => {
      const close = (e) => {
         if (e.keyCode === 27) {
            toggleOpen(false);
         }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
   }, []);

   return (
      <div className="modal">
         {open ? (
            <div className="modal-open">
               <div
                  onClick={() => toggleOpen(false)}
                  className="modal-open-overlay"
               />
               <div className="modal-open-content">
                  <textarea
                     autoFocus
                     name=""
                     value={note}
                     onChange={(e) => handleNotes(e.target.value)}
                  />
               </div>
            </div>
         ) : (
            ""
         )}

         <button
            className={classnames(styles.button, "btn-green", "btn-sm")}
            type="button"
            onClick={() => toggleOpen(true)}
         >
            +
         </button>
      </div>
   );
}

export default ListItemNotes;
