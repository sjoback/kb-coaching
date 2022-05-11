import styles from "./SignIn.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Button from "components/Button/Button";
import { useRouter } from "next/router";

function SignIn() {
   const { data: session } = useSession();
   const [show, toggleShow] = useState(false);

   const router = useRouter();
   const [username, setUsername] = useState("joakim.sjoback@gmail.com");
   const [password, setPassword] = useState("admin");
   console.log(router.asPath);

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

         {show && (
            <div className={styles.signin}>
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
            </div>
         )}
      </div>
   );
}

export default SignIn;
