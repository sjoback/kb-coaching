import FormRead from "components/Form/FormRead/FormRead";
import React from "react";

function Mitt({ mitt }) {
   return (
      <FormRead editLink={`/mitts/edit/${mitt.id}`}>
         <div className="form-container-inputs">
            <div className="label">Name</div>
            <div className="input">{mitt.name}</div>
         </div>

         <div className="form-container-inputs">
            <div className="label">Note</div>
            <div className="textarea">{mitt.note}</div>
         </div>
      </FormRead>
   );
}

export async function getStaticProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/mitts/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         mitt: data["response"][0],
      },
   };
}

export async function getStaticPaths() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/mitts`);
   const mitts = await response.json();

   const paths = mitts["response"].map((mitt) => ({
      params: { id: mitt.id },
   }));

   return {
      paths,
      fallback: false,
   };
}

export default Mitt;
