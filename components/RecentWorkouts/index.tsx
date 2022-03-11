import LinkButton from "components/LinkButton";
import workouts from "data/workouts.json";

function RecentWorkouts() {
    return (
        <div>
            <h1>Recent Workouts</h1>

            <ul>
                {workouts?.map((item) => (
                    <li key={item.id}>
                        <LinkButton
                            link={`/workouts/${item.id}`}
                            text={item.name}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentWorkouts;
