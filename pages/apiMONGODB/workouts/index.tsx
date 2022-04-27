const { connectToDatabase } = require("/lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

async function getWorkouts(req, res) {
   try {
      let { db } = await connectToDatabase();
      let workouts = await db
         .collection("workouts")
         .find({})
         .sort({ added: 1 })
         .toArray();

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

async function addWorkout(req, res) {
   try {
      let { db } = await connectToDatabase();
      await db.collection("workouts").insertOne(JSON.parse(req.body));

      return res.json({
         // id: data.id,
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

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         return getWorkouts(req, res);
      }

      case "POST": {
         return addWorkout(req, res);
      }
   }
}
