import Link from "next/link";
import styles from "./List.module.scss";
import Button from "components/Button/Button";
import ListFilter from "./ListFilter/ListFilter";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

function List({ items, type }) {
   const [filteredList, setFilteredList] = useState(items);
   const { data: session } = useSession();

   function handleDateFilter(value) {
      if (value.length > 0) {
         const filtered = items.filter((item) => {
            if (item.date == value) return item;
         });
         setFilteredList(filtered);
      } else setFilteredList(items);
   }

   return (
      <div className={styles.container}>
         <h1>{type}</h1>

         {type == "workouts" && <ListFilter onChange={handleDateFilter} />}

         {filteredList.length > 0 ? (
            <ul className={styles.linkList}>
               {filteredList.map((item) => {
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
               <h1>:(</h1>
            </div>
         )}

         {session && (
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
         )}
      </div>
   );
}

export default List;
