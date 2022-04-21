import { useState } from "react";
import modal from "../Modals.module.scss";

function ModalExpand({ onChange, text }) {
   const [open, toggleOpen] = useState(false);
   const [notes, setNotes] = useState(String);

   return (
      <div>
         {open && (
            <div className={modal.wrapper}>
               <div
                  onClick={() => toggleOpen(false)}
                  className={modal.overlay}
               />

               <div className={modal.inner}>
                  <div onClick={() => toggleOpen(false)}>X</div>
                  {text}
                  <textarea
                     name=""
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                  />
               </div>
            </div>
         )}

         <div onClick={() => toggleOpen(true)}>+</div>
      </div>
   );
}

export default ModalExpand;
