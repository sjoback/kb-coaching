import Button from "components/Button/Button";
import styles from "./Header.module.scss";
import Nav from "components/Navigation/Navigation";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";

function Header() {
   const router = useRouter();

   function signOut() {
      console.log("signout");
      removeCookies("kb-coach");
      router.reload();
   }
   return (
      <header className={styles.container}>
         <Nav />

         <Button
            text="Sign out"
            onClick={signOut}
            size="xs"
            color="red"
            component="default"
            link={false}
         />
      </header>
   );
}

export default Header;
