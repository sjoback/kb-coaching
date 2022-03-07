import LinkButton from "components/LinkButton";
import styles from "./QuickActions.module.scss";

function QuickActions() {
    return (
        <div className={styles.wrapper}>
            <h1>Quick actions</h1>

            <ul className={styles.mainList}>
                <li>
                    <LinkButton
                        icon={"faCoffe"}
                        link={"/add/workout"}
                        text={"Add Workout"}
                    />
                </li>
                <li>
                    <LinkButton
                        icon={"faCoffe"}
                        link={"/add/drill"}
                        text={"Add Drill"}
                    />
                </li>
                <li>
                    <LinkButton
                        icon={"faCoffe"}
                        link={"/add/warmup"}
                        text={"Add Warmup"}
                    />
                </li>
            </ul>
        </div>
    );
}

export default QuickActions;
