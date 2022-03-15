import data from "data/workouts.json";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

const getWorkout = (id) => data.find((n) => n.id === id);

export default function handler(req, res) {
    const name = req.body.name;
    const comment = req.body.comment;
    const warmup = req.body.warmup;
    const drills = req.body.drills;
    const mitts = req.body.mitts;

    switch (req.method) {
        case "GET":
            res.status(200).json(data);
            break;

        case "POST":
            const id = uuidv4();
            const newItem = {
                id: id,
                added: new Date().toISOString(),
                updated: new Date().toISOString(),
                name: name,
                comment: comment,
                warmup: warmup,
                drills: drills,
                mitts: mitts,
            };
            data.push(newItem);
            saveData();
            res.status(201).json(newItem);
            break;
    }

    function saveData() {
        fs.writeFileSync("data/workouts.json", JSON.stringify(data, null, 4));
    }
}
