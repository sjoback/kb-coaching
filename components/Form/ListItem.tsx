import { useEffect, useState } from "react";
import modal from "styles/Modal.module.scss";
import container from "styles/Container.module.scss";
import styles from "./Styles.module.scss";
import classnames from "classnames";
import table from "styles/Table.module.scss";
import ModalExpand from "components/ModalExpand";

function ListItem({ name, rounds, round_time, comment }) {
   return (
      <li className={table.row}>
         <div className={table.cell}>{name}</div>
         <div className={table.cell}>{rounds}</div>
         <div className={table.cell}>{round_time}</div>
         {/* <div onClick={() => toggleOpen(true)}>+</div> */}
         <ModalExpand data={comment} />

         {/* {open && (
            <div className={modal.window}>
               <div
                  onClick={() => toggleOpen(false)}
                  className={modal.overlay}
               />

               <div className={classnames(modal.inner, container.main)}></div>
            </div>
         )} */}
      </li>
   );
}

export default ListItem;
