import styles from "./Styles.module.scss";
import Button from "components/Button/Button";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

interface User {
   avatar: String;
   created: String;
   email: String;
   id: String;
   name: String;
   password: String;
   role: String;
}

function Home() {
   const [user, setUser] = useState<User>();
   const userCookie = getCookie("kb-coach");
   const cookieParsed = JSON.parse(JSON.stringify(userCookie));

   useEffect(() => {
      setUser(JSON.parse(cookieParsed));
   }, []);

   return (
      <div className={styles.container}>
         <h1>Welcome, {user ? user.name : "Stranger"}</h1>
         <div className={styles.inner}>
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
