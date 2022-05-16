import Button from "components/Button/Button";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./ProtectedRoute.module.scss";
import image from "/public/kickboxing.png";
import InputContainer from "components/Form/FormInputs/InputContainer/InputContainer";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";

function ProtectedRoute(props) {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();

   const { data: session } = useSession();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [creating, setCreating] = useState(false);
   const [message, setMessage] = useState("");
   // const [nameError, setNameError] = useState("");
   // const [emailError, setEmailError] = useState("");
   // const [passwordError, setPasswordError] = useState("");

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

      let response = await fetch(`/api/user`, {
         method: "POST",
         body: JSON.stringify(newUser),
      });

      let data = await response.json();

      if (data.success) {
         setMessage("success");
         setTimeout(function () {
            handleSignIn();
            // setCreating(false);
         }, 1200);
      } else {
         // return setError(data.message);
      }
   };

   function validateEmail(emailAdress) {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailAdress.match(regexEmail)) return true;
      else return false;
   }

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
                  <form name="signup" method="POST" data-netlify="true">
                     {creating && <ApiOverlay message={"Creating account"} />}
                     <h1>Create account</h1>

                     <div className="form-container-inputs">
                        <div className="form-icon">
                           <FontAwesomeIcon icon={faUser} />
                        </div>

                        <input
                           // onChange={(e) => setName(e.target.value)}
                           type={"text"}
                           name={"Name"}
                           placeholder={"Name"}
                           required
                           {...register("Name", { required: true })}
                        />

                        <div className="form-error">
                           {errors.Name?.type === "required" &&
                              "First name is required"}
                        </div>
                     </div>

                     <div className="form-container-inputs">
                        {/* <InputContainer
                           placeholder={"Email"}
                           name={"Email"}
                           preset={email}
                           onChange={setEmail}
                           resetError={resetError}
                           icon={"email"}
                           error={emailError}
                        /> */}
                     </div>

                     <div className="form-container-inputs">
                        {/* <InputContainer
                           placeholder={"Password"}
                           name={"Password"}
                           preset={password}
                           onChange={setPassword}
                           resetError={resetError}
                           icon={"password"}
                           error={passwordError}
                           type="password"
                        /> */}
                     </div>

                     <div>
                        <Button
                           text={"Sign up"}
                           onClick={handleSubmit(handleSignUp)}
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

   return props.children;
}

export default ProtectedRoute;
