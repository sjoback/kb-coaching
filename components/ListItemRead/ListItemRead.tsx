import Link from "next/link";

import styles from "./ListItemRead.module.scss";

function ListItemRead({ item, type }) {
   return (
      <li className={styles.container}>
         <div className={styles.inner}>
            <div>name</div>
            <div>
               <Link href={`/${type}/${item.id}`}>{item.name}</Link>
            </div>
         </div>

         <div className={styles.inner}>
            <div>rounds</div>
            <div>{item.rounds}</div>
         </div>

         <div className={styles.inner}>
            <div>round time</div>
            <div>{item.round_time}</div>
         </div>
      </li>
   );
}

export default ListItemRead;
