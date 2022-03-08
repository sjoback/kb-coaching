import GoBackButton from "components/GoBackButton";
import { useState } from "react";
import styles from "./Add.module.scss";
import drills from "data/drills.json";

function AddPage() {
    const [name, setName] = useState(String);
    const [comment, setComment] = useState(String);

    const submitDrill = async () => {
        const response = await fetch(`/api/add/workout`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                comment: comment,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
    };

    return (
        <div className={styles.wrapper}>
            <GoBackButton />

            <form className={styles.form}>
                <h1>add new workout</h1>

                <div className={styles.formContainer}>
                    <label htmlFor="name">Name</label>
                    <input
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
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className={styles.formContainer}>
                    <label htmlFor="comment">Drills</label>
                    <select onChange={(e) => setComment(e.target.value)}>
                        {drills.map((drill) => drill.name)}
                    </select>
                </div>

                <div>
                    <button onClick={submitDrill}> Add drill</button>
                </div>
            </form>
        </div>
    );
}

export default AddPage;

// export async function getStaticProps({ params }) {
//     const response = await fetch(
//         `http://localhost:3000/api/add/workout`
//     );
//     const data = await response.json();

//     return {
//         props: { type: data },
//     };
// }

// export async function getStaticPaths() {
//     const response = await fetch("http://localhost:3000/api/add");
//     const addPaths = await response.json();

//     return {
//         paths: addPaths.map((path) => {
//             return {
//                 params: {
//                     type: path.type,
//                 },
//             };
//         }),
//         fallback: false,
//     };
// }
