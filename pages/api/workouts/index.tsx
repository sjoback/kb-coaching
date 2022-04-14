import data from "data/workouts.json";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

export default function handler(req, res) {
   switch (req.method) {
      case "GET":
         res.status(200).json(data);
         break;

      case "POST":
         const id = uuidv4();
         const newWorkout = {
            id: id,
            name: req.body.name,
            comment: req.body.comment,
            warmup: req.body.warmup,
            drills: req.body.drills,
            mitts: req.body.mitts,
            added: new Date().toISOString(),
            updated: new Date().toISOString(),
         };

         data.push(newWorkout);
         saveData();
         res.status(201).json(newWorkout);
         break;
   }
   function saveData() {
      fs.writeFileSync(`data/workouts.json`, JSON.stringify(data, null, 4));
   }
}
