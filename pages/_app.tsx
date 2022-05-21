import "../styles/fonts.scss";
import "../styles/globals.scss";
import Head from "next/head";
import Layout from "layout/Layout";

function App({ Component, pageProps: { ...pageProps } }) {
   return (
      <div>
         <Head>
            <title>KB-COACHING. Amazing stuff!</title>
            <meta
               name="viewport"
               content="initial-scale=1.0, width=device-width"
            />
         </Head>

         <Layout>
            <Component {...pageProps} />
         </Layout>
      </div>
   );
}

export default App;
