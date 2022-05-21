import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import Button from "components/Button/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../Auth.module.scss";

type FormData = {
   Email: string;
   Password: string;
};

function Register({ onClick }) {
   const {
      register,
      getValues,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();
   const [creating, setCreating] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState(false);

   const handleSignUp = async () => {
      setCreating(true);

      let newUser = {
         name: getValues().Email,
         email: getValues().Email,
         password: getValues().Password,
         role: "user",
         joined: new Date().toISOString(),
      };

      let response = await fetch(`/api/user`, {
         method: "POST",
         body: JSON.stringify(newUser),
      });

      let data = await response.json();

      if (data.success) {
         setMessage("success");
         setTimeout(function () {
            signIn("credentials", {
               username: getValues().Email,
               password: getValues().Password,
            });
         }, 1200);
      } else {
         console.log(data);
         setError(true);

         setTimeout(function () {
            return setCreating(false);
         }, 1200);
      }
   };
   return (
      <div className={styles.container}>
         <div className={styles.inner}>
            <form name="signup" method="POST" data-netlify="true">
               {creating && <ApiOverlay message={"Creating account"} />}
               <h1>Create account</h1>
               <p>
                  In order to gain full access to this app you have to register
                  or log in. If not, you can
                  <a
                     onClick={() =>
                        signIn("Credentials", {
                           username: "test",
                           password: "test",
                        })
                     }
                     className="btnText"
                  >
                     <b> continue as a limited user</b>
                  </a>
                  .
               </p>
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

                     {error && "Email is already registered"}
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
                  text={"Sign up"}
                  onClick={handleSubmit(handleSignUp)}
                  size={"md"}
                  color={"green"}
                  component={"default"}
                  link={false}
               />
               <p>
                  Already a member?{" "}
                  <a className="btnText" onClick={onClick}>
                     <b>Log in</b>
                  </a>
               </p>
            </form>
         </div>
      </div>
   );
}

export default Register;
