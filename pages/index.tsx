import Button from "components/Button/Button";
import styles from "./Styles.module.scss";
import { useSession, signIn } from "next-auth/react";

function Home() {
   const { data: session } = useSession();

   if (!session)
      return (
         <div className={styles.container}>
            <h1>Welcome, Stranger!</h1>
            <p>
               <button onClick={() => signIn("google")}>Sign in</button> to gain
               full access to this wonderful app.
            </p>
         </div>
      );

   return (
      <div className={styles.container}>
         <h1>Welcome, {session.user.name}!</h1>

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
