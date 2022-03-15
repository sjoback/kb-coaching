import data from "data/workouts.json";
const fs = require("fs");

export default function handler(req, res) {
    const { id } = req.query;
    const workout = data.find((workout) => workout.id === id);
    const workoutIndex = data.findIndex((n) => n.id === id);

    switch (req.method) {
        case "GET":
            res.status(200).json(workout);
            break;

        case "PUT":
            const updated = { ...workout, ...req.body };
            data[workoutIndex] = updated;
            saveData();
            res.json({ data: updated });
            break;

        case "DELETE":
            data.splice(workoutIndex, 1);
            saveData();
            res.json({ data: data });
            break;

        default:
            res.status(405).end("Method not allowed");
            break;
    }

    function saveData() {
        fs.writeFileSync("data/workouts.json", JSON.stringify(data, null, 4));
    }
}
