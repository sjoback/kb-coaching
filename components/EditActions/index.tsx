import styles from "./EditActions.module.scss";

function EditActions() {
  return (
    <div className={styles.wrapper}>
      <button>Remove</button>
      <button>Save changes</button>
      {/* We want a confirmation modal here */}
    </div>
  );
}

export default EditActions;
