import data from "data/workouts.json";

export default function handler(req, res) {
   res.status(200).json(data);
}
