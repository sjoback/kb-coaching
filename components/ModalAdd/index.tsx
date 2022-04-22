<<<<<<< Updated upstream:components/ModalAdd/index.tsx
import { useState } from "react";
=======
// import React from "react";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
>>>>>>> Stashed changes:components/Modals/ModalAdd/ModalAdd.tsx
import styles from "./ModalAdd.module.scss";
import modal from "../Modals.module.scss";
import ButtonDefault from "components/ButtonDefault/ButtonDefault";

function ModalAdd({ text, onClick, data }) {
   const [open, toggleOpen] = useState(false);

   function addHandler(item) {
      onClick(item);
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
<<<<<<< Updated upstream:components/ModalAdd/index.tsx
      <div>
         {open ? (
            <div>
               <div
                  onClick={() => toggleOpen(false)}
                  className={styles.modalOverlay}
               />

               <div className={styles.modal}>
                  <button
=======
      <div className={"modal"}>
         {open ? (
            <div className="modal-open">
               <div className="modal-open-content modal-add">
                  {/* <button
>>>>>>> Stashed changes:components/Modals/ModalAdd/ModalAdd.tsx
                     onClick={() => toggleOpen(false)}
                     className={styles.closeModal}
                  >
                     X
                  </button> */}

                  <ul>
                     {data &&
                        data.length > 0 &&
                        data.map((item) => (
                           <li key={item.id}>
                              <Button
                                 onClick={() => addHandler(item)}
                                 text={`${item.name}`}
                                 align="left"
                              />
                           </li>
                        ))}
                  </ul>
               </div>
<<<<<<< Updated upstream:components/ModalAdd/index.tsx
            </div>
         ) : (
            <button onClick={() => toggleOpen(true)}>{props.text} +</button>
         )}
=======

               <div
                  onClick={() => toggleOpen(false)}
                  className="modal-open-overlay"
               />
            </div>
         ) : (
            ""
         )}

         <Button
            onClick={() => toggleOpen(true)}
            text={text}
            color={"green"}
            size={"xs"}
         />
>>>>>>> Stashed changes:components/Modals/ModalAdd/ModalAdd.tsx
      </div>
   );
}

export default ModalAdd;
