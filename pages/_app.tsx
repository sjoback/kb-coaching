import "../styles/fonts.scss";
import "../styles/globals.scss";
import Nav from "components/Navigation/Navigation";
import { motion } from "framer-motion";
import Head from "next/head";

const variants = {
   hidden: { opacity: 0, x: -25 },
   enter: { opacity: 1, x: 0 },
   exit: { opacity: 0, x: 0 },
};

function App({ Component, pageProps, router }) {
   return (
      <div>
         <Head>
            <title>KB-COACHING. Amazing stuff!</title>
            <meta
               name="viewport"
               content="initial-scale=1.0, width=device-width"
            />
         </Head>

         <Nav />

         <motion.main
            key={router.route}
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.4, type: "linear" }}
         >
            <Component {...pageProps} />
         </motion.main>
      </div>
   );
}

export default App;
