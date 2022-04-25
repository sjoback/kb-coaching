import LinkButton from "components/Button/ButtonLink/ButtonLink";
import styles from "./QuickActions.module.scss";

function QuickActions() {
   return (
      <div className={styles.wrapper}>
         <ul className={styles.mainList}>
            <li>
               <LinkButton
                  // icon={"faCoffe"}
                  link={"/workouts/new"}
                  text={"Add Workout"}
               />
            </li>
            <li>
               <LinkButton
                  // icon={"faCoffe"}
                  link={"/drills/new"}
                  text={"Add Drill"}
               />
            </li>
            <li>
               <LinkButton
                  // icon={"faCoffe"}
                  link={"/warmups/new"}
                  text={"Add Warmup"}
               />
            </li>
         </ul>
      </div>
   );
}

export default QuickActions;
