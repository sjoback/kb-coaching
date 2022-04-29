import warmups from "data/warmups.json";
const fs = require("fs");

function saveData(data) {
   fs.writeFileSync(`data/warmups.json`, JSON.stringify(data, null, 4));
}

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         try {
            const warmup = warmups.filter(
               (warmup) => warmup.id == req.query.id
            );

            return res.json({
               message: "Success",
               response: JSON.parse(JSON.stringify(warmup)),
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
            const warmup = warmups.filter(
               (warmup) => warmup.id == req.query.id
            );
            const i = warmups.findIndex((n) => n.id === req.query.id);
            const updatedWarmup = { ...warmup[0], ...JSON.parse(req.body) };

            warmups[i] = updatedWarmup;

            saveData(warmups);

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
            const newWarmups = warmups.filter(
               (warmup) => warmup.id != req.query.id
            );
            saveData(newWarmups);

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
