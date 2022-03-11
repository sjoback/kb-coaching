import LinkButton from "components/LinkButton";
import styles from "./QuickActions.module.scss";

function QuickActions() {
    return (
        <div className={styles.wrapper}>
            <h1>Quick actions</h1>

            <ul className={styles.mainList}>
                <li>
                    <LinkButton
                        // icon={"faCoffe"}
                        link={"/workouts/add"}
                        text={"Add Workout"}
                    />
                </li>
                <li>
                    <LinkButton
                        // icon={"faCoffe"}
                        link={"/drills/add"}
                        text={"Add Drill"}
                    />
                </li>
                <li>
                    <LinkButton
                        // icon={"faCoffe"}
                        link={"/warmups/add/"}
                        text={"Add Warmup"}
                    />
                </li>
            </ul>
        </div>
    );
}

export default QuickActions;
