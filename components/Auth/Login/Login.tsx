import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { setCookies } from "cookies-next";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import Button from "components/Button/Button";
import styles from "../Auth.module.scss";

type FormData = {
   Email: string;
   Password: string;
};

function Login({ onClick, onLogin }) {
   const {
      register,
      getValues,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const [loggingIn, setLogginIn] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState(false);

   const handleSignIn = async () => {
      setLogginIn(true);

      let userInput = {
         email: getValues().Email,
         password: getValues().Password,
      };

      let response = await fetch(`/api/login`, {
         method: "POST",
         body: JSON.stringify(userInput),
      });

      let data = await response.json();

      if (data.success) {
         setCookies("kb-coach", JSON.stringify(data.response));
         setTimeout(function () {
            setLogginIn(false);
            onLogin();
         }, 1400);
      } else {
         setError(true);
         // setTimeout(function () {
         return setLogginIn(false);
         // }, 1200);
      }
   };
   return (
      <div className={styles.container}>
         <div className={styles.inner}>
            <form name="login">
               {loggingIn && <ApiOverlay message={"Logging in"} />}
               <h1>Log in</h1>

               <div className="form-container-inputs">
                  <div className="form-icon">
                     <FontAwesomeIcon icon={faEnvelope} />
                  </div>

                  <input
                     type={"email"}
                     name={"Email"}
                     placeholder={"Email"}
                     required
                     {...register("Email", { required: true })}
                  />

                  <div className="form-error">
                     {errors.Email?.type === "required" && "Email is required"}
                  </div>
               </div>

               <div className="form-container-inputs">
                  <div className="form-icon">
                     <FontAwesomeIcon icon={faLock} />
                  </div>

                  <input
                     type={"password"}
                     name={"Password"}
                     placeholder={"Password"}
                     required
                     {...register("Password", { required: true })}
                  />

                  <div className="form-error">
                     {errors.Password?.type === "required" &&
                        "Password is required"}
                  </div>
               </div>

               <Button
                  text={"Log in"}
                  onClick={handleSubmit(handleSignIn)}
                  size={"md"}
                  color={"green"}
                  component={"default"}
                  link={false}
               />
               <p>
                  Not a member?{" "}
                  <a className="btnText" onClick={onClick}>
                     <b>Register </b>
                  </a>
                  now!
               </p>
            </form>
         </div>
      </div>
   );
}

export default Login;
