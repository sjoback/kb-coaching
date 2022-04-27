import drills from "data/drills.json";
const fs = require("fs");

function saveData(data) {
   fs.writeFileSync(`data/drills.json`, JSON.stringify(data, null, 4));
}

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         try {
            const drill = drills.filter((drill) => drill.id == req.query.id);

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

      case "PUT": {
         try {
            const drill = drills.filter((drill) => drill.id == req.query.id);
            const i = drills.findIndex((n) => n.id === req.query.id);
            const updatedDrill = { ...drill[0], ...JSON.parse(req.body) };

            drills[i] = updatedDrill;

            saveData(drills);

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

      case "DELETE": {
         try {
            const newDrills = drills.filter(
               (drill) => drill.id != req.query.id
            );
            saveData(newDrills);

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
   }
}
