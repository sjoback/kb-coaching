const { connectToDatabase } = require("/lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

async function getDrills(req, res) {
   try {
      // connect to the database
      let { db } = await connectToDatabase();
      // fetch the posts
      let drills = await db
         .collection("drills")
         .find({})
         .sort({ added: -1 })
         .toArray();

      return res.json({
         message: JSON.parse(JSON.stringify(drills)),
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

async function addDrill(req, res) {
   try {
      // connect to the database
      let { db } = await connectToDatabase();
      // add the post
      await db.collection("drills").insertOne(JSON.parse(req.body));
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
   switch (req.method) {
      case "GET": {
         return getDrills(req, res);
      }

      case "POST": {
         return addDrill(req, res);
      }
   }
}
