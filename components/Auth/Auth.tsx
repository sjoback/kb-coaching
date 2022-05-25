import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

function Auth({ onAuth }) {
   const [show, setShow] = useState("register");

   if (show == "login")
      return (
         <Login onLogin={() => onAuth()} onClick={() => setShow("register")} />
      );
   return (
      <Register onRegister={() => onAuth()} onClick={() => setShow("login")} />
   );
}

export default Auth;
