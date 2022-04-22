import React, { useEffect } from "react";
import { useState } from "react";
import Button from "components/Button/Button";

function ModalAdd({ onClick, data, text }) {
   const [open, toggleOpen] = useState(false);

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
                  <ul>
                     {data &&
                        data.length > 0 &&
                        data.map((item) => (
                           <li key={item.id}>
                              <Button
                                 onClick={() => onClick(item)}
                                 text={item.name}
                                 size={"sm"}
                              />
                           </li>
                        ))}
                  </ul>
               </div>
            </div>
         ) : (
            ""
         )}
         <Button
            onClick={() => toggleOpen(true)}
            text={text}
            color={"green"}
            size={"xs"}
            component="default"
         />
      </div>
   );
}

export default ModalAdd;
