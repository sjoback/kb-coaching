import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Nav from "components/Navigation/Navigation";

function Layout(props) {
   const { data: session } = useSession();

   const variants = {
      hidden: { opacity: 0, x: -25 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 0 },
   };

   return (
      <motion.main
         //  key={router.route}
         variants={variants}
         initial="hidden"
         animate="enter"
         exit="exit"
         transition={{ duration: 0.4, type: "linear" }}
      >
         <Nav />
         {props.children}
      </motion.main>
   );
}

export default Layout;
