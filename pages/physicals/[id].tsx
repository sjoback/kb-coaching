import FormRead from "components/Form/FormRead/FormRead";
import React from "react";

function Physical({ physical }) {
   return (
      <FormRead editLink={`/s/edit/${physical.id}`}>
         <div className="form-container-inputs">
            <div className="label">Name</div>
            <div className="input">{physical.name}</div>
         </div>

         <div className="form-container-inputs">
            <div className="label">Note</div>
            <div className="textarea">{physical.note}</div>
         </div>
      </FormRead>
   );
}

export async function getStaticProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/physicals/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         physical: data["response"][0],
      },
   };
}

export async function getStaticPaths() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/physicals`);
   const physicals = await response.json();

   const paths = physicals["response"].map((physical) => ({
      params: { id: physical.id },
   }));

   return {
      paths,
      fallback: false,
   };
}

export default Physical;
