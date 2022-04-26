import "../styles/fonts.scss";
import "../styles/globals.scss";
import Nav from "components/Navigation/Navigation";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tel

export default function App({ Component, pageProps }) {
   return (
      <div>
         <Nav />
         <main>
            <Component {...pageProps} />
         </main>
      </div>
   );
}
