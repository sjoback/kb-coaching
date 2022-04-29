import styles from "./Navigation.module.scss";
import Link from "next/link";
import Image from "next/image";

function Navigation() {
   return (
      <nav className={styles.wrapper}>
         <Link href="/">
            <a className={styles.navLogo}>
               <Image layout="fill" src="/logo.webp" />
            </a>
         </Link>
         <Link href="/workouts">Workouts</Link>
         <Link href="/drills">Drills</Link>
         <Link href="/warmups">Warmups</Link>
         <Link href="/mitts">Mitts</Link>
         <Link href="/physicals">Physicals</Link>
      </nav>
   );
}

export default Navigation;
