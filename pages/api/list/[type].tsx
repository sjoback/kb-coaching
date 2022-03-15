import data from "data/data.json";

export default function handler(req, res) {
    // const { type } = req.query;
    // const dataArray = [...workouts, ...drills];
    res.status(200).json(data);
}
