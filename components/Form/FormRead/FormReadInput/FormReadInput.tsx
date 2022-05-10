import styles from "../../Form.module.scss";

function FormReadInput({ label, value, type }) {
   return (
      <div className={styles.containerInner}>
         <div className={styles.label}>{label}</div>
         <div className={styles[type]}>{value}</div>
      </div>
   );
}

export default FormReadInput;
