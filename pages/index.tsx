import styles from "./Styles.module.scss";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Button from "components/Button/Button";
import classNames from "classnames";

function Home() {
   const { data: session } = useSession();

   if (!session)
      return (
         <div className={styles.container}>
            <div className={styles.containerInner}>
               <h1>Welcome, Stranger!</h1>

               <div className={styles.buttons}>
                  <button
                     onClick={() => signIn("Google")}
                     className={classNames("btn", "btn-md")}
                  >
                     Sign in
                  </button>

                  <p>
                     Already a coach?
                     <Link href="/signup">
                        <a> Sign up</a>
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      );

   return (
      <div className={styles.container}>
         <h1>Welcome, {session ? session.user.name : "Stranger"}!</h1>

         <div className={styles.containerInner}>
            <Button
               text="Add workout"
               onClick={false}
               size="md"
               color="green"
               component="link"
               link="/workouts/add"
            />

            <Button
               text="Add drill"
               onClick={false}
               size="md"
               color="green"
               component="link"
               link="/drills/add"
            />

            <Button
               text="Add warmup"
               onClick={false}
               size="md"
               color="green"
               component="link"
               link="/warmups/add"
            />

            <Button
               text="Add mitt"
               onClick={false}
               size="md"
               color="green"
               component="link"
               link="/mitts/add"
            />

            <Button
               text="Add physical"
               onClick={false}
               size="md"
               color="green"
               component="link"
               link="/physicals/add"
            />
         </div>
      </div>
   );
}

export default Home;
