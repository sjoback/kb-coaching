import mitts from "data/mitts.json";
const fs = require("fs");

function saveData(data) {
   fs.writeFileSync(`data/mitts.json`, JSON.stringify(data, null, 4));
}

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         try {
            const mitt = mitts.filter((mitt) => mitt.id == req.query.id);

            return res.json({
               message: "Success",
               response: JSON.parse(JSON.stringify(mitt)),
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
            const mitt = mitts.filter((warmup) => warmup.id == req.query.id);
            const i = mitts.findIndex((n) => n.id === req.query.id);
            const updatedMitt = { ...mitt[0], ...JSON.parse(req.body) };

            mitts[i] = updatedMitt;

            saveData(mitts);

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
            const newMitts = mitts.filter((mitt) => mitt.id != req.query.id);
            saveData(newMitts);

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
