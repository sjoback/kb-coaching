import styles from "./SignIn.module.scss";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";

function SignIn() {
   const [show, toggleShow] = useState(false);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleSignIn = async (e) => {
      signIn("credentials", {
         username: username,
         password: password,
      });
   };

   return (
      <div className={styles.container}>
         <Button
            text={"Sign in"}
            onClick={() => toggleShow(!show)}
            size={"sm"}
            color={"green"}
            component={"default"}
            link={false}
         />

         <AnimatePresence>
            {show && (
               <motion.div
                  initial={{
                     opacity: 0,
                  }}
                  animate={{
                     opacity: 1,
                  }}
                  transition={{
                     duration: 0.3,
                     ease: "easeOut",
                  }}
                  exit={{
                     opacity: 0,
                     transition: { duration: 0.3 },
                  }}
                  className={styles.overlay}
                  onClick={() => toggleShow(false)}
               />
            )}
         </AnimatePresence>

         <AnimatePresence>
            {show && (
               <motion.div
                  className={styles.signin}
                  initial={{
                     opacity: 0,
                     x: "100px",
                  }}
                  animate={{
                     opacity: 1,
                     x: "0px",
                  }}
                  transition={{
                     duration: 0.2,
                     ease: "easeOut",
                  }}
                  exit={{
                     opacity: 0,
                     x: "100px",
                     transition: { duration: 0.2 },
                  }}
               >
                  <input
                     autoFocus
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
                  />

                  <Button
                     text={"Sign in"}
                     onClick={handleSignIn}
                     size={"md"}
                     color={"green"}
                     component={"default"}
                     link={false}
                  />
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

export default SignIn;
