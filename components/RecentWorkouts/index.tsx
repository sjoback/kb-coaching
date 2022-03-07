import workouts from "data/workouts.json";

function RecentWorkouts() {
    return (
        <div>
            <h1>Recent Workouts</h1>

            <ul>
                {workouts?.map((item) => (
                    <div>{item.name}</div>
                ))}
            </ul>
        </div>
    );
}

export default RecentWorkouts;
