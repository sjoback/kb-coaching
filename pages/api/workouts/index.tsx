import workouts from "data/workouts.json";

export default async function handler(req, res) {
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
