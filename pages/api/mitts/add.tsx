import mitts from "data/mitts.json";
const fs = require("fs");
import { v4 as uuidv4 } from "uuid";

function saveData() {
   fs.writeFileSync(`data/mitts.json`, JSON.stringify(mitts, null, 4));
}

export default async function handler(req, res) {
   const id = uuidv4();

   try {
      const request = JSON.parse(req.body);
      const newWarmup = {
         id: id,
         ...request,
      };
      mitts.push(newWarmup);

      saveData();

      return res.json({
         id: id,
         message: "Success",
         success: true,
      });
   } catch (error) {
      return res.json({
         message: `Error: ${error}`,
         success: false,
      });
   }
}
