import Button from "components/Button/Button";
import styles from "./Styles.module.scss";
function Home(props) {
   return (
      <div className={styles.container}>
         <h1>Welcome, Coach!</h1>

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
