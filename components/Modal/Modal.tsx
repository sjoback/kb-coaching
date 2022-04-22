import { Component } from "react";
import ModalAdd from "./ModalAdd/ModalAdd";
import ModalExpand from "./ModalExpand/ModalExpand";

function Modal({ onClick, data, text, component }) {
   const Components = {
      modal_add: ModalAdd,
      modal_expand: ModalExpand,
   };

   if (typeof Components[component] !== "undefined") {
      const Component = Components[component];
      return <Component text={text} data={data} onClick={onClick} />;
   } else {
      return <p>{component} is not yet defined.</p>;
   }
}

export default Modal;
