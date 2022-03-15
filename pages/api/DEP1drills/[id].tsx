import data from "data/drills.json";
const fs = require("fs");

export default function handler(req, res) {
    const { id } = req.query;
    const drill = data.find((workout) => workout.id === id);
    const drillIndex = data.findIndex((n) => n.id === id);

    switch (req.method) {
        case "GET":
            res.status(200).json(drill);
            break;

        case "PUT":
            const updated = { ...drill, ...req.body };
            data[drillIndex] = updated;
            saveData();
            res.json({ data: updated });
            break;

        case "DELETE":
            data.splice(drillIndex, 1);
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
