import users from "data/users.json";

export default async function handler(req, res) {
   try {
      const userFromRequest = JSON.parse(req.body);
      const userFromDatabase = users.filter(
         (user) => user.email == userFromRequest.email
      );

      // If user exist in database
      if (userFromDatabase[0].email == userFromRequest.email) {
         if (userFromDatabase[0].password !== userFromRequest.password) {
            return res.json({
               message: "Incorrect password.",
               success: false,
            });
         } else {
            return res.json({
               message: "Found user.",
               response: JSON.parse(JSON.stringify(userFromDatabase[0])),
               success: true,
            });
         }
      }
   } catch (error) {
      return res.json({
         message: "Incorrect email.",
         success: false,
      });
   }
}
