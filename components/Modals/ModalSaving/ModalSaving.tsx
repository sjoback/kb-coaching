import styles from "./ModalSaving.module.scss";

function ModalSaving({ state }) {
   return (
      <div className={styles.modal}>
         <h2>{state.message}</h2>
      </div>
   );
}

export default ModalSaving;
