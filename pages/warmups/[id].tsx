import FormRead from "components/Form/FormRead/FormRead";
import React from "react";

function Warmup({ warmup }) {
   return (
      <FormRead editLink={`/warmups/edit/${warmup.id}`}>
         <div className="form-container-inputs">
            <div className="label">Name</div>
            <div className="input">{warmup.name}</div>
         </div>

         <div className="form-container-inputs">
            <div className="label">Note</div>
            <div className="textarea">{warmup.note}</div>
         </div>
      </FormRead>
   );
}

export async function getStaticProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/warmups/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         warmup: data["response"][0],
      },
   };
}

export async function getStaticPaths() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/warmups`);
   const warmups = await response.json();

   const paths = warmups["response"].map((warmup) => ({
      params: { id: warmup.id },
   }));

   return {
      paths,
      fallback: false,
   };
}

export default Warmup;
