import { useRouter } from "next/router";
import styles from "./GoBackButton.module.scss";

function GoBackButton() {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={() => router.back()}>
        Go back
      </button>
    </div>
  );
}

export default GoBackButton;
