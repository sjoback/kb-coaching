import drills from "data/drills.json";
import workouts from "data/workouts.json";
import fs from "fs";

export default function handler(req, res) {
    // const id = uuidv4();
    // const newItem = {
    //     id: id,
    //     added: new Date().toISOString(),
    //     updated: new Date().toISOString(),
    //     name: name,
    //     comment: comment,
    //     warmup: warmup,
    //     drills: drills,
    //     mitts: mitts,
    // };
    // data.push(req.body);
    // saveData();
    if (req.method === "POST") {
        res.status(201).json(drills);
        // res.writeHead(302, { Location: "/drills" });
        // res.end();
    }

    // function saveData() {
    //     fs.writeFileSync("data/workouts.json", JSON.stringify(data, null, 4));
    // }

    // switch (req.method) {
    //     case "GET":
    //         console.log("get request");
    //         const { id } = req.query;
    //         const drill = drills.find((drill) => drill.id === id);
    //         res.status(200).json(drill);
    //         break;

    //     case "DELETE":
    //         console.log("delete request");
    //         break;

    //     default:
    //         res.status(405).end("Method not allowed");
    //         break;
    // }
}
