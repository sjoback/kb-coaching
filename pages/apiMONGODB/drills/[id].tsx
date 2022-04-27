const { connectToDatabase } = require("/lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

async function getDrill(req, res) {
   try {
      let { db } = await connectToDatabase();
      let drill = await db
         .collection("drills")
         .findOne({ _id: new ObjectId(req.query.id) }, {});

      return res.json({
         message: "Drill fetched",
         response: JSON.parse(JSON.stringify(drill)),
         success: true,
      });
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

async function updateDrill(req, res) {
   try {
      let { db } = await connectToDatabase();
      const jsonBody = JSON.parse(req.body);
      await db.collection("drills").updateOne(
         { _id: new ObjectId(req.query.id) },
         {
            $set: {
               name: jsonBody.name,
               comment: jsonBody.comment,
               drills: jsonBody.drills,
               warmups: jsonBody.warmups,
               mitts: jsonBody.mitts,
               updated: new Date().toISOString(),
            },
         }
      );

      return res.json({
         message: "Drill updated successfully",
         success: true,
      });
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

async function deleteDrill(req, res) {
   try {
      let { db } = await connectToDatabase();

      await db.collection("drills").deleteOne({
         _id: new ObjectId(req.body),
      });

      return res.json({
         message: "Drill deleted successfully",
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
         return getDrill(req, res);
      }

      case "PUT": {
         return updateDrill(req, res);
      }

      case "DELETE": {
         return deleteDrill(req, res);
      }
   }
}
