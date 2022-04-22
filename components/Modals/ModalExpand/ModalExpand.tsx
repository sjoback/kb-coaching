import Button from "components/Button/Button";
import { useState } from "react";
import modal from "../Modals.module.scss";

function ModalExpand({ onChange, text }) {
   const [open, toggleOpen] = useState(false);
   const [notes, setNotes] = useState(String);

   //Save notes on enter/esc/click

   return (
      <div className={modal.container}>
         {open && (
            <div className={modal.containerInner}>
               <div
                  onClick={() => toggleOpen(false)}
                  className={modal.overlay}
               />

               <div className={modal.inner}>
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

         {/* <div onClick={() => toggleOpen(true)}>+</div> */}
      </div>
   );
}

export default ModalExpand;
