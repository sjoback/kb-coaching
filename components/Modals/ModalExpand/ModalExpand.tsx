import Button from "components/Button/Button";
import { useState } from "react";
import modal from "../Modals.module.scss";

function ModalExpand({ onChange, text }) {
   const [open, toggleOpen] = useState(false);
   const [notes, setNotes] = useState(String);

   return (
      <div className="modal">
         {open && (
            <div className="modal-open">
               <div
                  onClick={() => toggleOpen(false)}
                  className="modal-open-overlay"
               />

               <div className="modal-open-content">
                  {text}

                  <textarea
                     name=""
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                  />
               </div>
            </div>
         )}

         <Button
            onClick={() => toggleOpen(true)}
            type={"expand"}
            text={"info"}
            color={"green"}
            size={"sm"}
         />
      </div>
   );
}

export default ModalExpand;
