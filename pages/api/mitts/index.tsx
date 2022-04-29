import mitts from "data/mitts.json";

export default async function handler(req, res) {
   try {
      return res.json({
         response: JSON.parse(JSON.stringify(mitts)),
         success: true,
      });
   } catch (error) {
      return res.json({
         response: new Error(error).message,
         success: false,
      });
   }
}
