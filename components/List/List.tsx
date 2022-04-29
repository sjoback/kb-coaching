import Link from "next/link";

import styles from "./List.module.scss";
import Button from "components/Button/Button";
import ListFilter from "./ListFilter/ListFilter";

function List({ items, type }) {
   return (
      <div className={styles.container}>
         <h1>{type}</h1>

         {type == "workouts" && <ListFilter />}

         {items.length > 0 ? (
            <ul className={styles.linkList}>
               {items.map((item) => {
                  return (
                     <li key={`${item.name} + ${item.id}`}>
                        <Link href={`/${type}/${item.id}`}>
                           <a>
                              <h4>{item.name}</h4>
                              {type == "workouts" && (
                                 <p>{item.date.split("T")[0]}</p>
                              )}
                           </a>
                        </Link>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <div className={styles.empty}>
               <h2>No {type} added</h2>
            </div>
         )}

         <div className={styles.button}>
            <Button
               color="green"
               text={`Add ${type.slice(0, -1)}`}
               component="link"
               link={`/${type}/add`}
               onClick={false}
               size="md"
            />
         </div>
      </div>
   );
}

export default List;
