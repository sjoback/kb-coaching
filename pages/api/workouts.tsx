const { connectToDatabase } = require("/lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

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

async function updateWorkout(req, res) {
   try {
      // connect to the database
      let { db } = await connectToDatabase();

      // update the published status of the post
      await db.collection("workouts").updateOne(
         {
            _id: new ObjectId(req.body),
         },
         { $set: { published: true } }
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

async function getWorkouts(req, res) {
   try {
      // connect to the database
      let { db } = await connectToDatabase();
      // fetch the posts
      let workouts = await db
         .collection("workouts")
         .find({})
         .sort({ published: -1 })
         .toArray();
      // return the workouts
      // console.log(workouts);

      return res.json({
         message: JSON.parse(JSON.stringify(workouts)),
         success: true,
      });
   } catch (error) {
      // return the error

      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

async function addWorkout(req, res) {
   try {
      // connect to the database
      let { db } = await connectToDatabase();
      // add the post
      await db.collection("workouts").insertOne(JSON.parse(req.body));
      // return a message
      return res.json({
         message: "Workout added successfully",
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

export default async function handler(req, res) {
   // switch the methods
   switch (req.method) {
      case "GET": {
         return getWorkouts(req, res);
      }

      case "POST": {
         return addWorkout(req, res);
      }

      case "PUT": {
         return updateWorkout(req, res);
      }

      case "DELETE": {
         return deleteWorkout(req, res);
      }
   }
}
