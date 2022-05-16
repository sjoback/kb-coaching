import styles from "./Grid.module.scss";
import { useSession } from "next-auth/react";
import Button from "components/Button/Button";

function Grid() {
   const { data: session } = useSession();

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

export default Grid;
