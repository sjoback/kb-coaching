import users from "data/users.json";
const fs = require("fs");
import { v4 as uuidv4 } from "uuid";
import { signIn } from "next-auth/react";

function saveData() {
   fs.writeFileSync(`data/users.json`, JSON.stringify(users, null, 4));
}

export default async function handler(req, res) {
   const request = JSON.parse(req.body);
   const userInDatabase = users.filter((user) => user.email == request.email);

   if (userInDatabase.length > 0) {
      return res.json({
         message: `Error: Email already exists.`,
         success: false,
      });
   } else {
      try {
         const id = uuidv4();
         const newUser = {
            id: id,
            ...request,
         };

         users.push(newUser);

         saveData();

         return signIn("Google", {
            username: request.email,
            password: request.password,
         });
      } catch (error) {
         return res.json({
            message: `Error: ${error}`,
            success: false,
         });
      }
   }
}
