import "../styles/fonts.scss";
import "../styles/globals.scss";
import { motion } from "framer-motion";

import Nav from "components/Navigation/Navigation";

// import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false; // Tel

const variants = {
   // hidden: { opacity: 0, x: -200, y: 0 },
   // enter: { opacity: 1, x: 0, y: 0 },
   // exit: { opacity: 0, x: 0, y: -100 },
   hidden: { opacity: 0, x: -50 },
   enter: { opacity: 1, x: 0 },
   exit: { opacity: 0, x: 0 },
};

function App({ Component, pageProps, router }) {
   return (
      <div>
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

// App.getInitialProps = async (ctx) => {
//    console.log("get initial props");

//    let dev = process.env.NODE_ENV !== "production";

//    let workoutsResponse = await fetch(
//       `${dev ? process.env.DEV_URL : process.env.PROD_URL}/api/workouts`
//    );
//    let workoutsJson = await workoutsResponse.json();

//    let drillsResponse = await fetch(
//       `${dev ? process.env.DEV_URL : process.env.PROD_URL}/api/drills`
//    );
//    let drillsJson = await drillsResponse.json();

//    let warmupsResponse = await fetch(
//       `${dev ? process.env.DEV_URL : process.env.PROD_URL}/api/warmups`
//    );
//    let warmupsJson = await warmupsResponse.json();

//    return {
//       pageProps: {
//          workouts: workoutsJson["response"],
//          drills: drillsJson["response"],
//          warmups: warmupsJson["response"],
//       },
//    };
// };
export default App;
