import Button from "components/Button/Button";
import Image from "next/image";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./ProtectedRoute.module.scss";
import image from "/public/kickboxing.png";
import TextInput from "components/Form/FormInputs/TextInput/TextInput";

function ProtectedRoute(props) {
   const { data: session } = useSession();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [creating, setCreating] = useState(false);
   const [errors, setErrors] = useState({
      name: false,
      email: false,
      password: false,
   });

   const handleSignIn = async () => {
      signIn("credentials", {
         username: email,
         password: password,
      });
   };

   const handleSignUp = async () => {
      setCreating(true);

      let newUser = {
         name: name,
         email: email,
         password: password,
         role: "user",
         created: new Date().toISOString(),
      };

      return function validateFormWithJS() {
         const name = document.querySelector("#name").value;
         const email = document.querySelector("#email").value;
         const password = document.querySelector("#password").value;
         console.log(name);

         if (!name) console.log("noname");

         if (email.length < 3) {
         }
      };

      // if (!name || !email || !password) {
      //    if (!name) setErrors({ name: true, ...errors });
      //    if (!email) return;
      // }

      let response = await fetch(`/api/user`, {
         method: "POST",
         body: JSON.stringify(newUser),
      });

      let data = await response.json();

      if (data.success) {
         handleSignIn();
         // setTimeout(function () {
         // }, 600);
      } else {
         // return setError(data.message);
      }
   };

   if (!session)
      return (
         <div className={styles.container}>
            <div className={styles.signin}>
               <div className={styles.image}>
                  <Image src={image} loading="eager" />
               </div>

               <div className={styles.inner}>
                  <h1>Welcome</h1>
                  <p>
                     To the one-stop-shop for managing your kickboxing workouts.
                  </p>
                  <p>Already registered?</p>
                  {/* 
                  
                  <input
                     type="text"
                     placeholder="name"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />

                  <input
                     type="password"
                     placeholder="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  /> */}

                  <Button
                     text={"Sign in"}
                     onClick={handleSignIn}
                     size={"md"}
                     color={"border-white"}
                     component={"default"}
                     link={false}
                  />
               </div>
            </div>

            <div className={styles.register}>
               <div className={styles.inner}>
                  <form name="contact" method="POST" data-netlify="true">
                     <h1>Create account</h1>

                     <div className="form-container-inputs">
                        <TextInput
                           onChange={setName}
                           error={errors.name}
                           placeholder={"Name"}
                           name={"name"}
                        />
                     </div>

                     <div className="form-container-inputs">
                        <TextInput
                           type="email"
                           placeholder="Email"
                           onChange={setEmail}
                           error={errors.email}
                           name={"email"}
                        />
                     </div>

                     <div className="form-container-inputs">
                        <input
                           autoFocus
                           type="password"
                           placeholder="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>

                     <div>
                        <Button
                           text={"Sign up"}
                           onClick={handleSignUp}
                           size={"md"}
                           color={"green"}
                           component={"default"}
                           link={false}
                        />
                     </div>
                  </form>
               </div>
            </div>
         </div>
      );

   return <div>{props.children}</div>;
}

export default ProtectedRoute;
