import "../styles/fonts.scss";
import "../styles/globals.scss";
import Nav from "components/Navigation";

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
