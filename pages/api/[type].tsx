import workouts from "data/workouts.json";
import drills from "data/drills.json";

import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

export default function handler(req, res) {
   const { type } = req.query;
   const concatData = {
      workouts: [...workouts],
      drills: [...drills],
   };
   switch (req.method) {
      case "GET":
         res.status(200).json(concatData[type]);
         break;

      case "POST":
         const id = uuidv4();
         const newItem = {
            id: id,
            added: new Date().toISOString(),
            updated: new Date().toISOString(),
            ...req.body,
         };

         const data = concatData[type];
         data.push(newItem);
         saveData(data);
         res.status(201).json(req.body);
         break;
   }

   function saveData(newData) {
      fs.writeFileSync(`data/${type}.json`, JSON.stringify(newData, null, 4));
   }
}
