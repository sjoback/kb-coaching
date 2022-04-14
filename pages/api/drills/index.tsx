import data from "data/drills.json";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

export default function handler(req, res) {
   switch (req.method) {
      case "GET":
         res.status(200).json(data);
         break;

      case "POST":
         const id = uuidv4();
         const newDrill = {
            id: id,
            name: req.body.name,
            information: req.body.information,
            images: req.body.images,
            added: new Date().toISOString(),
            updated: new Date().toISOString(),
         };

         data.push(newDrill);
         saveData();
         res.status(201).json(newDrill);
         break;
   }
   function saveData() {
      fs.writeFileSync(`data/drills.json`, JSON.stringify(data, null, 4));
   }
}
