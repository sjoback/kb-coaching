import Button from "components/Button/Button";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useState } from "react";
import styles from "./Auth.module.scss";

function Auth(props) {
   const { data: session } = useSession();
   const [username, setUsername] = useState("joakim.sjoback@gmail.com");
   const [password, setPassword] = useState("admin");

   const handleSignIn = async (e) => {
      signIn("credentials", {
         username: username,
         password: password,
      });
   };

   if (session)
      return <div className={"styles.container"}>{props.children}</div>;

   return (
      <div className={styles.container}>
         <div className={styles.signIn}>
            <div className={styles.signInInner}>
               <h1>Login</h1>
               <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
               />
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
               />
            </div>

            <Button
               text={"Sign in"}
               onClick={handleSignIn}
               size={"md"}
               color={"green"}
               component={"default"}
               link={false}
            />
         </div>
      </div>
   );
}

export default Auth;
