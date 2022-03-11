import GoBackButton from "components/GoBackButton";
import styles from "./Drills.module.scss";
import { useState } from "react";

function AddDrill() {
    const [drillName, setDrillName] = useState(String);
    const [drillComment, setDrillComment] = useState(String);

    const submitDrill = async () => {
        const response = await fetch("/api/drills", {
            method: "POST",
            body: JSON.stringify({
                name: drillName,
                comment: drillComment,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // const data = await response.json();
    };

    return (
        <div className={styles.wrapper}>
            <GoBackButton />

            <form className={styles.form}>
                <h1>add new drill</h1>

                <div className={styles.formContainer}>
                    <label htmlFor="name">Name</label>
                    <input
                        placeholder="E.g: Dutch slip 'n rip"
                        name="name"
                        type="text"
                        value={drillName}
                        onChange={(e) => setDrillName(e.target.value)}
                    />
                </div>

                <div className={styles.formContainer}>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        name="comment"
                        placeholder="E.g: This is a good drill for etc etc.."
                        value={drillComment}
                        onChange={(e) => setDrillComment(e.target.value)}
                    />
                </div>

                <div>
                    <button onClick={submitDrill}> Add drill</button>
                </div>
            </form>
        </div>
    );
}

export default AddDrill;
