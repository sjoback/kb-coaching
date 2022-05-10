import styles from "./SignIn.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Button from "components/Button/Button";
import { useRouter } from "next/router";

function SignIn() {
   const { data: session } = useSession();
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
            onClick={handleSignIn}
            size={"md"}
            color={"green"}
            component={"default"}
            link={false}
         />
      </div>
   );
}

export default SignIn;
