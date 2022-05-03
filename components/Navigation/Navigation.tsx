import styles from "./Navigation.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classnames from "classnames";

function Navigation() {
   const [mobileOpen, setMobileOpen] = useState(false);

   function toggleOpen() {
      if (mobileOpen) setMobileOpen(false);
      else setMobileOpen(true);
   }

   return (
      <nav
         className={classnames(
            styles.wrapper,
            mobileOpen ? styles.mobileOpen : ""
         )}
      >
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

         <div onClick={toggleOpen} className={styles.navToggle}>
            <FontAwesomeIcon
               icon={faBurger}
               style={{ fontSize: 32, color: "#fff" }}
            />
         </div>
      </nav>
   );
}

export default Navigation;
