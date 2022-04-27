import Button from "components/Button/Button";
import styles from "./List.module.scss";

function List({ items, linkType }) {
   return (
      <div className={styles.container}>
         {items.length > 0 ? (
            <ul className="link-list">
               {items.map((item) => {
                  return (
                     <li key={`${item.name} + ${item.id}`}>
                        <Button
                           text={item.name}
                           component="link"
                           link={`/${linkType}/${item.id}`}
                        />
                     </li>
                  );
               })}
            </ul>
         ) : (
            <div className={styles.empty}>
               <h2>No {linkType} added</h2>
            </div>
         )}
      </div>
   );
}

export default List;
