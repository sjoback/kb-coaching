import EditActions from "components/EditActions";
import GoBackButton from "components/GoBackButton";
import ModalAdd from "components/ModalAdd";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Workouts.module.scss";

function WorkoutPage({ drills, workout }) {
    const [drillsArray, storeDrills] = useState([]);

    useEffect(() => {
        storeDrills(workout.drills);
    }, []);

    function handleAddDrill(drill) {
        // NOTE: make alert modal
        if (!drillsArray.includes(drill)) {
            const formattedDrill = {
                id: drill.id,
                name: drill.name,
            };
            const newDrillsArray = [...drillsArray, formattedDrill];
            storeDrills(newDrillsArray);
        } else {
            window.alert("item exists");
        }
    }

    const saveWorkout = async () => {
        const response = await fetch(`/api/workouts/${workout.id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: workout.name,
                comment: workout.comment,
                warmup: workout.warmup,
                drills: drillsArray,
                mitts: workout.mitts,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const deleteWorkout = async () => {
        const response = await fetch(`/api/workouts/${workout.id}`, {
            method: "DELETE",
            // headers: {
            //     "Content-Type": "application/json",
            // },
        });

        Router.push("/");
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <h1>{workout.name}</h1>
                <h1>{workout.comment}</h1>
                <h1>{workout.added}</h1>

                <div className={styles.container}>
                    <span>Workout drills</span>

                    <ul className={styles.list}>
                        {drillsArray &&
                            drillsArray.length > 0 &&
                            drillsArray.map((drill) => (
                                <li key={drill.id}>{drill.name}</li>
                            ))}
                    </ul>

                    <ModalAdd data={drills} add={handleAddDrill} />
                </div>

                <button onClick={() => saveWorkout()}>Save workout</button>
                <button onClick={() => deleteWorkout()}>Delete workout</button>

                {/* <GoBackButton /> */}
                {/* <EditActions /> */}
            </div>
        </div>
    );
}

export default WorkoutPage;

export async function getStaticProps({ params }) {
    const response = await fetch(
        `http://localhost:3000/api/workouts/${params.id}`
    );
    const drillsResponse = await fetch(`http://localhost:3000/api/drills`);

    const data = await response.json();

    const drills = await drillsResponse.json();

    return {
        props: {
            workout: data,
            drills: drills,
        },
    };
}

export async function getStaticPaths() {
    const response = await fetch("http://localhost:3000/api/workouts");
    const workouts = await response.json();

    return {
        paths: workouts.map((workout: any) => {
            return {
                params: {
                    id: workout.id,
                },
            };
        }),
        fallback: false,
    };
}
