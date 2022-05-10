import classnames from "classnames";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Signup() {
   const router = useRouter();
   const [name, setName] = useState("");
   const [avatar, setAvatar] = useState("");
   const [email, setEmail] = useState("");
   const [saving, setSaving] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

   useEffect(() => {
      //  router.push("/");
   }, []);

   const createUser = async (e) => {
      e.preventDefault();

      setSaving(true);
      setMessage("Creating user..");

      if (!name) return setError("All fields are required");

      let newUser = {
         name: name,
         avatar: avatar,
         email: email,
         role: "user",
         created: new Date().toISOString(),
      };

      let response = await fetch(`/api/user/create`, {
         method: "POST",
         body: JSON.stringify(newUser),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);

         setTimeout(function () {
            router.push(`/`);
         }, 600);
      } else {
         return setError(data.message);
      }
   };

   return (
      <form className="form-container">
         <h1>Create user</h1>

         <div className="form-container-inputs">
            <label htmlFor="name">Name</label>
            <input
               autoFocus
               type="text"
               placeholder="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div>

         <div className="form-container-inputs">
            <label htmlFor="name">Email</label>
            <input
               type="text"
               placeholder="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
         </div>

         <div>
            <ButtonSubmit
               onClick={createUser}
               text={"Create user"}
               color={"green"}
            />
         </div>

         {saving && <ApiOverlay message={message} />}
      </form>
   );
}

export default Signup;
