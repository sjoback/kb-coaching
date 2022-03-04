import "../styles/globals.css";
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
