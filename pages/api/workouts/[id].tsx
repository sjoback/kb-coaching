const { connectToDatabase } = require("/lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

async function getWorkout(req, res) {
   try {
      let { db } = await connectToDatabase();

      let workout = await db
         .collection("workouts")
         .findOne({ _id: new ObjectId(req.query.id) }, {});

      return res.json({
         message: JSON.parse(JSON.stringify(workout)),
         success: true,
      });
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

async function updateWorkout(req, res) {
   try {
      let { db } = await connectToDatabase();

      // Parse body
      const jsonBody = JSON.parse(req.body);

      // update the workout
      await db.collection("workouts").updateOne(
         { _id: new ObjectId(req.query.id) },
         {
            $set: {
               name: jsonBody.name,
               comment: jsonBody.comment,
               drills: jsonBody.drills,
               warmups: jsonBody.warmups,
               mitts: jsonBody.mitts,
            },
         }
      );

      // return a message
      return res.json({
         message: "Workout updated successfully",
         success: true,
      });
   } catch (error) {
      // return an error
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

async function deleteWorkout(req, res) {
   try {
      // Connecting to the database
      let { db } = await connectToDatabase();

      // Deleting the post
      await db.collection("workouts").deleteOne({
         _id: new ObjectId(req.body),
      });

      // returning a message
      return res.json({
         message: "Workout deleted successfully",
         success: true,
      });
   } catch (error) {
      // returning an error
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         return getWorkout(req, res);
      }

      case "PUT": {
         return updateWorkout(req, res);
      }

      case "DELETE": {
         return deleteWorkout(req, res);
      }
   }
}
