import "../styles/globals.css";
import Head from "next/head";
import Nav from "components/Navigation";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <Nav />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
