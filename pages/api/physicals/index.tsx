import physicals from "data/physicals.json";

export default async function handler(req, res) {
   try {
      return res.json({
         response: JSON.parse(JSON.stringify(physicals)),
         success: true,
      });
   } catch (error) {
      return res.json({
         response: new Error(error).message,
         success: false,
      });
   }
}
