import data from "data/data.json";

export default function handler(req, res) {
    const { type } = req.query;
    res.status(200).json(data[type]);
}
