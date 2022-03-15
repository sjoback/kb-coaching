import GoBackButton from "components/GoBackButton";
import styles from "./Workouts.module.scss";
import { useState } from "react";
import ModalAdd from "components/ModalAdd";

function AddWorkout() {
    const [name, setName] = useState(String);
    const [comment, setComment] = useState(String);

    const saveWorkout = async () => {
        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                comment: comment,
                drills: [],
                warmup: [],
                mitts: [],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <div className={styles.wrapper}>
            <GoBackButton />

            <form className={styles.form}>
                <h1>new workout</h1>

                <div className={styles.formContainer}>
                    <label htmlFor="name">Name</label>
                    <input
                        placeholder="E.g: Dutch slip 'n rip"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.formContainer}>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        name="comment"
                        placeholder="E.g: This is a good for etc etc.."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className={styles.formContainer}>
                    {/* <ModalAdd data={drills} add={handleAddDrill} /> */}
                </div>

                <div>
                    <button onClick={saveWorkout}>Save workout</button>
                </div>
            </form>
        </div>
    );
}

export default AddWorkout;
