<<<<<<< Updated upstream:components/ModalExpand/index.tsx
import { useState } from "react";
import modal from "styles/Modal.module.scss";
=======
import Button from "components/Button/Button";
import { useEffect, useState } from "react";
import modal from "../Modals.module.scss";
>>>>>>> Stashed changes:components/Modals/ModalExpand/ModalExpand.tsx

function ModalExpand({ onChange, text }) {
   const [open, toggleOpen] = useState(false);
   const [notes, setNotes] = useState(String);

<<<<<<< Updated upstream:components/ModalExpand/index.tsx
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
=======
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
      <div className={"modal"}>
         {open && (
            <div className="modal-open">
               <div className="modal-open-content">
>>>>>>> Stashed changes:components/Modals/ModalExpand/ModalExpand.tsx
                  {text}
                  <textarea
                     name=""
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                  />
               </div>

               <div
                  onClick={() => toggleOpen(false)}
                  className="modal-open-overlay"
               />
            </div>
         )}

<<<<<<< Updated upstream:components/ModalExpand/index.tsx
         <div onClick={() => toggleOpen(true)}>+</div>
=======
         <Button
            onClick={() => toggleOpen(true)}
            type={"expand"}
            text={"notes"}
            size={"xs"}
         />

         {/* <div onClick={() => toggleOpen(true)}>+</div> */}
>>>>>>> Stashed changes:components/Modals/ModalExpand/ModalExpand.tsx
      </div>
   );
}

export default ModalExpand;
