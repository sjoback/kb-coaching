import styles from "./Navigation.module.scss";
import Link from "next/link";
import Image from "next/image";

function Navigation() {
   return (
      <nav className={styles.wrapper}>
         <div className={styles.navLogo}>
            <Link href="/">
               <a>
                  <Image
                     layout="fixed"
                     height={50}
                     width={50}
                     src="/logo.webp"
                  />
               </a>
            </Link>
            <Link href="/workouts">Workouts</Link>
            <Link href="/drills">Drills</Link>
            <Link href="/warmups">Warmups</Link>
         </div>
      </nav>
   );
}

export default Navigation;
