import styles from "./ListFilter.module.scss";
import ListFilterDate from "./ListFilterDate/ListFilterDate";

function ListFilter({ onChange }) {
   return (
      <div className={styles.container}>
         <ListFilterDate onChange={onChange} />
      </div>
   );
}

export default ListFilter;
