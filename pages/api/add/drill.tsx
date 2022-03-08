import data from "data/drills.json";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(data);
    }

    if (req.method === "POST") {
        const id = uuidv4();
        const name = req.body.name;
        const comment = req.body.comment;
        const newItem = {
            id: id,
            added: Date.now(),
            name: name,
            comment: comment,
        };
        data.push(newItem);
        saveData();
        res.status(201).json(newItem);
    }

    function saveData() {
        fs.writeFileSync("data/drills.json", JSON.stringify(data, null, 4));
    }
}
