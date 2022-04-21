import React, { useEffect } from "react";
import { useState } from "react";
import Button from "components/Button/Button";
import styles from "./ModalAdd.module.scss";

function ModalAdd(props) {
   const [open, toggleOpen] = useState(false);

   useEffect(() => {
      toggleOpen(false);
   }, []);

   function addHandler(item) {
      props.add(item);
      toggleOpen(false);
   }

   return (
      <div className={styles.container}>
         {open ?? (
            <div className={styles.containerInner}>
               <div
                  onClick={() => toggleOpen(false)}
                  className={styles.modalOverlay}
               />

               <div className={styles.modal}>
                  <button
                     onClick={() => toggleOpen(false)}
                     className={styles.closeModal}
                  >
                     X
                  </button>

                  <ul>
                     {props.data &&
                        props.data.length > 0 &&
                        props.data.map((item) => (
                           <li key={item.id}>
                              <button onClick={() => addHandler(item)}>
                                 {item.name}
                              </button>
                           </li>
                        ))}
                  </ul>
               </div>

               {/* <div className={styles.containerOverlay}></div> */}
            </div>
         )}
         <Button
            onClick={() => toggleOpen(true)}
            text={props.text}
            color={"green"}
            size={"sm"}
         />
      </div>
   );
}

export default ModalAdd;
