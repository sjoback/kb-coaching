import Button from "components/Button/Button";
import styles from "./List.module.scss";

function List({ items }) {
   return (
      <div className={styles.container}>
         {items.length > 0 ? (
            <ul className="link-list">
               {items.map((item) => {
                  return (
                     <li key={`name + ${item._id}`}>
                        <Button
                           text={item.name}
                           component="link"
                           link={`/workouts/${item._id}`}
                        />
                     </li>
                  );
               })}
            </ul>
         ) : (
            <div className={styles.empty}>
               <h2>No workouts added</h2>
            </div>
         )}
      </div>
   );
}

export default List;
