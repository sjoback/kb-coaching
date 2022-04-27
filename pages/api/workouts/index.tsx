import workouts from "data/workouts.json";
const fs = require("fs");
import { v4 as uuidv4 } from "uuid";

function saveData() {
   fs.writeFileSync(`data/workouts.json`, JSON.stringify(workouts, null, 4));
}

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         try {
            return res.json({
               response: JSON.parse(JSON.stringify(workouts)),
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
            const newWorkout = {
               id: id,
               ...request,
            };
            workouts.push(newWorkout);

            saveData();

            return res.json({
               id: id,
               message: "Workout added successfully",
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
