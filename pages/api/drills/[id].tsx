import data from "data/drills.json";
const fs = require("fs");

export default function handler(req, res) {
   const { id } = req.query;
   const item = data.find((item) => item.id === id);
   const itemIndex = data.findIndex((n) => n.id === id);

   switch (req.method) {
      case "GET":
         res.status(200).json(item);
         break;

      //  case "DELETE":
      //     concatData[type].splice(itemIndex, 1);
      //     saveData(concatData[type]);
      //     res.json({ data: concatData[type] });
      //     break;

      case "PUT":
         const updated = { ...item, ...req.body };
         data[itemIndex] = updated;
         res.status(200).json(updated);
         saveData();
         break;
   }
   function saveData() {
      fs.writeFileSync(`data/drills.json`, JSON.stringify(data, null, 4));
   }
}
