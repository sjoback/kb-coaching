import workouts from "data/workouts.json";
import drills from "data/drills.json";

import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

export default function handler(req, res) {
   const { slug } = req.query;
   const type = slug[0];
   const id = slug[1];

   const concatData = {
      workouts: [...workouts],
      drills: [...drills],
   };

   const item = concatData[type].find((item) => item.id === id);
   const itemIndex = concatData[type].findIndex((n) => n.id === id);

   switch (req.method) {
      case "GET":
         res.status(200).json(item);
         break;

      case "DELETE":
         concatData[type].splice(itemIndex, 1);
         saveData(concatData[type]);
         res.json({ data: concatData[type] });
         break;

      case "PUT":
         res.status(200).json(concatData[type]);
         //  saveData();
         break;
   }

   function saveData(newData) {
      fs.writeFileSync(`data/${type}.json`, JSON.stringify(newData, null, 4));
   }
}
