import styles from "./ApiOverlay.module.scss";

function ApiOverlay({ message }) {
   return (
      <div className={styles.apiOverlay}>
         <div className={styles.apiOverlayInner}>
            <svg
               className={styles.checkmark}
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 52 52"
            >
               <circle
                  className={styles.checkmarkCircle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
               />
               <path
                  className={styles.checkmarkCheck}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
               />
            </svg>

            <div>
               <h1>{message}</h1>
            </div>
         </div>
      </div>
   );
}

export default ApiOverlay;
