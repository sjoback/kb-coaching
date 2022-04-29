import workouts from "data/workouts.json";
const fs = require("fs");
import { v4 as uuidv4 } from "uuid";

function saveData() {
   fs.writeFileSync(`data/workouts.json`, JSON.stringify(workouts, null, 4));
}

export default async function handler(req, res) {
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
         message: "Success",
         success: true,
      });
   } catch (error) {
      return res.json({
         message: `Error: ${error}`,
         success: false,
      });
   }
}
