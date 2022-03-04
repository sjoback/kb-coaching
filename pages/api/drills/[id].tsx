import drills from "data/drills.json";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      console.log("get request");
      const { id } = req.query;
      const drill = drills.find((drill) => drill.id === id);
      res.status(200).json(drill);
      break;

    case "DELETE":
      console.log("delete request");
      break;

    default:
      res.status(405).end("Method not allowed");
      break;
  }
}
