import { useState } from "react";
import styles from "./Styles.module.scss";

function ModalSave({ state }) {
   return <div className={styles.modal}>{state.message}</div>;
}

export default ModalSave;
