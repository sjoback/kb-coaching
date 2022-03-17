import data from "data/data.json";
import workouts from "data/workouts.json";

import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

export default function handler(req, res) {
   const { type } = req.query;
   switch (req.method) {
      case "GET":
         res.status(200).json(data[type]);
         break;

      case "POST":
         const id = uuidv4();
         const newItem = {
            id: id,
            added: new Date().toISOString(),
            updated: new Date().toISOString(),
            ...req.body,
         };
         // data[type].push(newItem);
         workouts.push(newItem);
         saveData(workouts);
         res.status(201).json(req.body);
         break;
   }

   function saveData(newData) {
      fs.writeFileSync(`data/${type}.json`, JSON.stringify(newData, null, 4));
   }
}
