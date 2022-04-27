const { connectToDatabase } = require("/lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

async function getDrills(req, res) {
   try {
      let { db } = await connectToDatabase();
      let drills = await db
         .collection("drills")
         .find({})
         .sort({ added: -1 })
         .toArray();

      return res.json({
         response: JSON.parse(JSON.stringify(drills)),
         success: true,
      });
   } catch (error) {
      return res.json({
         response: new Error(error).message,
         success: false,
      });
   }
}

async function addDrill(req, res) {
   try {
      let { db } = await connectToDatabase();
      await db.collection("drills").insertOne(JSON.parse(req.body));

      return res.json({
         message: "Drill added successfully",
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
         return getDrills(req, res);
      }

      case "POST": {
         return addDrill(req, res);
      }
   }
}
