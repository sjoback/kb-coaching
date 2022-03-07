import drills from "data/drills.json";
import workouts from "data/workouts.json";

export default function handler({ params }, req, res) {
    console.log(params);

    switch (req.method) {
        case "GET":
            console.log("get request");
            const { id } = req.query;
            const drill = drills.find((drill) => drill.id === id);
            res.status(200).json(drill);
            break;

        case "DELETE":
            console.log("delete request");
            break;

        default:
            res.status(405).end("Method not allowed");
            break;
    }
}
