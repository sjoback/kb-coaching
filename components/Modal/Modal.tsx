import Button from "components/Button/Button";
import { Component, useEffect, useState } from "react";
import ModalAdd from "./ModalAdd/ModalAdd";
import ModalExpand from "./ModalExpand/ModalExpand";

function Modal(props) {
   const [open, toggleOpen] = useState(false);

   const Components = {
      add: ModalAdd,
      expand: ModalExpand,
   };

   const Component = Components[props.component];

   // Enable ESC for closing modal
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
               <div className="modal-open-content modal-add">
                  {typeof Components[props.component] == "undefined" ? (
                     <p>{props.component} is undefined</p>
                  ) : (
                     <Component
                        data={props.data}
                        onClick={props.onClick}
                        onChange={props.onChange}
                     />
                  )}
               </div>
            </div>
         ) : (
            ""
         )}

         <Button
            onClick={() => toggleOpen(true)}
            text={props.text}
            color={"blue"}
            size={props.size}
            component="default"
            link={false}
         />
      </div>
   );
}

export default Modal;
