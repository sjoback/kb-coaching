import physicals from "data/physicals.json";
const fs = require("fs");

function saveData(data) {
   fs.writeFileSync(`data/physicals.json`, JSON.stringify(data, null, 4));
}

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         try {
            const physical = physicals.filter(
               (physical) => physical.id == req.query.id
            );

            return res.json({
               message: "Success",
               response: JSON.parse(JSON.stringify(physical)),
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
            const physical = physicals.filter(
               (physical) => physical.id == req.query.id
            );
            const i = physicals.findIndex((n) => n.id === req.query.id);
            const updatedPhysical = {
               ...physical[0],
               ...JSON.parse(req.body),
            };

            physicals[i] = updatedPhysical;

            saveData(physicals);

            return res.json({
               message: "Success",
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
            const newPhysicals = physicals.filter(
               (physical) => physical.id != req.query.id
            );
            saveData(newPhysicals);

            return res.json({
               message: "Success",
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
