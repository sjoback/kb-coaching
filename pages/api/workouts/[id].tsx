import workouts from "data/workouts.json";
const fs = require("fs");

function saveData(data) {
   fs.writeFileSync(`data/workouts.json`, JSON.stringify(data, null, 4));
}

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         try {
            const workout = workouts.filter(
               (workout) => workout.id == req.query.id
            );

            return res.json({
               message: "Success",
               response: JSON.parse(JSON.stringify(workout)),
               success: true,
            });
         } catch (error) {
            return res.json({
               message: new Error(error).message,
               success: false,
            });
         }
      }

      case "PUT": {
         try {
            const workout = workouts.filter(
               (workout) => workout.id == req.query.id
            );
            const i = workouts.findIndex((n) => n.id === req.query.id);
            const updatedWorkout = { ...workout[0], ...JSON.parse(req.body) };

            workouts[i] = updatedWorkout;

            saveData(workouts);

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

      case "DELETE": {
         try {
            const newWorkouts = workouts.filter(
               (workout) => workout.id != req.query.id
            );
            saveData(newWorkouts);

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
