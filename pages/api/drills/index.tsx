import drills from "data/drills.json";
const fs = require("fs");
import { v4 as uuidv4 } from "uuid";

function saveData() {
   fs.writeFileSync(`data/drills.json`, JSON.stringify(drills, null, 4));
}

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         try {
            return res.json({
               response: JSON.parse(JSON.stringify(drills)),
               success: true,
            });
         } catch (error) {
            return res.json({
               response: new Error(error).message,
               success: false,
            });
         }
      }

      case "POST": {
         const id = uuidv4();

         try {
            const request = JSON.parse(req.body);
            const newDrill = {
               id: id,
               ...request,
            };
            drills.push(newDrill);

            saveData();

            return res.json({
               message: "Success",
               success: true,
            });
         } catch (error) {
            return res.json({
               message: new Error(error).message,
               success: false,
            });
         }
      }
   }
}
