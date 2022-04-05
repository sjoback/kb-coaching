import { useState } from "react";
import modal from "styles/Modal.module.scss";

function ModalExpand(props) {
   const [open, toggleOpen] = useState(false);

   return (
      <div>
         {open && (
            <div className={modal.wrapper}>
               <div
                  onClick={() => toggleOpen(false)}
                  className={modal.overlay}
               ></div>
               <div className={modal.inner}>
                  <div onClick={() => toggleOpen(false)}>X</div>
                  {props.data}
               </div>
            </div>
         )}

         <div onClick={() => toggleOpen(true)}>{props.text} +</div>
      </div>
   );
}

export default ModalExpand;
