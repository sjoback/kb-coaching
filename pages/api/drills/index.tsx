import data from "data/drills.json";

export default function handler(req, res) {
   res.status(200).json(data);
}
