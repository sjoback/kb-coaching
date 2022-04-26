const { connectToDatabase } = require("/lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

async function getWorkouts(req, res) {
   try {
      // connect to the database
      let { db } = await connectToDatabase();
      // fetch the workouts
      let workouts = await db
         .collection("workouts")
         .find({})
         .sort({ added: 1 })
         .toArray();

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
      let { db } = await connectToDatabase();

      let id;

      await db
         .collection("workouts")
         .insertOne(JSON.parse(req.body))
         .then((result) => {
            id = result.insertedId;
         });

      return res.json({
         message: "Workout added successfully",
         id: new ObjectId(id),
         success: true,
      });
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

// async function deleteWorkout(req, res) {
//    try {
//       let { db } = await connectToDatabase();
//       // console.log(req.body);
//       const jsonBody = JSON.parse(req.body);

//       await db.collection("workouts").deleteOne({
//          _id: new ObjectId(jsonBody._id),
//       });

//       return res.json({
//          message: "Workout deleted successfully",
//          success: true,
//       });

//       console.log(res);
//    } catch (error) {
//       return res.json({
//          message: new Error(error).message,
//          success: false,
//       });
//    }
// }

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         return getWorkouts(req, res);
      }

      case "POST": {
         return addWorkout(req, res);
      }

      // case "PUT": {
      //    return updateWorkout(req, res);
      // }

      // case "DELETE": {
      //    return deleteWorkout(req, res);
      // }
   }
}
