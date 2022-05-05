import styles from "./Navigation.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import classnames from "classnames";
import { useRouter } from "next/router";

function Navigation() {
   const router = useRouter();

   const [mobileOpen, setMobileOpen] = useState(false);

   function toggleOpen() {
      if (mobileOpen) setMobileOpen(false);
      else setMobileOpen(true);
   }
   useEffect(() => {
      if (mobileOpen) setMobileOpen(false);
   }, [router.asPath]);

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

         <Link href="/workouts">
            <a
               className={
                  router.pathname.includes("/workouts") ? styles.active : ""
               }
            >
               Workouts
            </a>
         </Link>

         <Link href="/drills">
            <a
               className={
                  router.pathname.includes("/drills") ? styles.active : ""
               }
            >
               Drills
            </a>
         </Link>

         <Link href="/warmups">
            <a
               className={
                  router.pathname.includes("/warmups") ? styles.active : ""
               }
            >
               Warmups
            </a>
         </Link>

         <Link href="/mitts">
            <a
               className={
                  router.pathname.includes("/mitts") ? styles.active : ""
               }
            >
               Mitts
            </a>
         </Link>

         <Link href="/physicals">
            <a
               className={
                  router.pathname.includes("/physicals") ? styles.active : ""
               }
            >
               Physicals
            </a>
         </Link>

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
