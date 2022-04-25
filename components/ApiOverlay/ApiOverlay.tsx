import styles from "./ApiOverlay.module.scss";
import ApiOverlaySaving from "./ApiOverlaySaving/ApiOverlaySaving";

function ApiOverlay({ component, text }) {
   const Components = {
      saving: ApiOverlaySaving,
   };

   const Component = Components[component];

   if (typeof Components[component] !== "undefined") {
      return (
         <div className={styles.apiOverlay}>
            <Component text={text} />
         </div>
      );
   } else {
      return <p>{component} is not yet defined.</p>;
   }
}

export default ApiOverlay;
