import { motion } from "framer-motion";
import Header from "components/Settings/Header/Header";
import React, { useEffect, useState } from "react";
import Auth from "components/Auth/Auth";
import { checkCookies } from "cookies-next";

function Layout({ children }) {
   const [show, setShow] = useState(false);

   const variants = {
      hidden: { opacity: 0, x: -25 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 0 },
   };

   const isLoggedIn = checkCookies("kb-coach");

   useEffect(() => {
      setShow(isLoggedIn);
   }, []);

   if (!show)
      return (
         <div>
            <Auth onAuth={() => setShow(true)} />
         </div>
      );

   return (
      <div>
         <Header />

         <motion.main
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3, type: "linear" }}
         >
            {children}
         </motion.main>
      </div>
   );
}

export default Layout;
