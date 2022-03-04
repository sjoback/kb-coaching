import data from "data/drills.json";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(data);
  }

  if (req.method === "POST") {
    const id = uuidv4();
    const drillName = req.body.name;
    const drillComment = req.body.comment;
    const newDrill = {
      id: id,
      added: Date.now(),
      name: drillName,
      comment: drillComment,
    };
    console.log(newDrill);

    // data.push(newDrill);
    res.status(201).json(newDrill);
    console.log(data);
  }
}
