import Button from "components/Button/Button";
import styles from "./Styles.module.scss";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import image from "/public/kickboxing.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";

type FormData = {
   Email: string;
   Password: string;
};

function SignUp() {
   // const { data: session } = useSession();
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
            signIn("Google", {
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

   function validateEmail(emailAdress) {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailAdress.match(regexEmail)) return true;
      else return false;
   }
   return (
      <div className={styles.container}>
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
                     onClick={() => signIn("Google")}
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
                     <p>
                        Currently in <b>Beta</b>, thus only allowing gmail
                        accounts. If you do not have this, try{" "}
                        <b>Email/Password </b>: test/test for limited access.
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
                           {errors.Email?.type === "required" &&
                              "Email is required"}

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

                     <div className="form-buttons">
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
      </div>
   );
}

export default SignUp;
