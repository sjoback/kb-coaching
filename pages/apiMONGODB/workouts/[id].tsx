const { connectToDatabase } = require("/lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

async function getWorkout(req, res) {
   try {
      let { db } = await connectToDatabase();

      let workout = await db
         .collection("workouts")
         .findOne({ _id: new ObjectId(req.query.id) }, {});
      console.log(workout);

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

      const jsonBody = JSON.parse(req.body);

      await db.collection("workouts").updateOne(
         { _id: new ObjectId(req.query.id) },
         {
            $set: {
               name: jsonBody.name,
               comment: jsonBody.comment,
               drills: jsonBody.drills,
               warmups: jsonBody.warmups,
               mitts: jsonBody.mitts,
               updated: jsonBody.updated,
            },
         }
      );

      return res.json({
         message: "Workout updated successfully",
         success: true,
      });
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

async function deleteWorkout(req, res) {
   try {
      let { db } = await connectToDatabase();

      await db.collection("workouts").deleteOne({
         _id: new ObjectId(req.query.id),
      });

      return res.json({
         message: "Workout deleted successfully",
         success: true,
      });
      console.log(res);
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
