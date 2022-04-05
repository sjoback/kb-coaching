import { useState } from "react";
import ListItem from "../ListItem";
import styles from "./Styles.module.scss";

function ModalAdd(props) {
   const [open, toggleOpen] = useState(false);

   function addHandler(item) {
      props.add(item);
   }

   return (
      <div>
         {open ? (
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
         ) : (
            <button onClick={() => toggleOpen(true)}>{props.text} +</button>
         )}

         <div className={styles.modalContainer}>
            {/* <ModalAdd text="Add drill" data={drills} add={handleAddDrill} /> */}

            <ul>
               {props.items &&
                  props.items.length > 0 &&
                  props.items.map((id) => (
                     <ListItem type="drills" id={id} key={id} />
                  ))}
            </ul>
         </div>
      </div>
   );
}

export default ModalAdd;
