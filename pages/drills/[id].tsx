import React from "react";
import FormRead from "components/Form/FormRead/FormRead";

function Drill({ drill }) {
   return (
      <FormRead editLink={`/drills/edit/${drill.id}`}>
         <div className="form-container-inputs">
            <div className="label">Name</div>
            <div className="input">{drill.name}</div>
         </div>

         <div className="form-container-inputs">
            <div className="label">Note</div>
            <div className="textarea">{drill.note}</div>
         </div>
      </FormRead>
   );
}

export async function getStaticProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/drills/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         drill: data["response"][0],
      },
   };
}

export async function getStaticPaths() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/drills`);
   const drills = await response.json();

   const paths = drills["response"].map((drill) => ({
      params: { id: drill.id },
   }));

   return {
      paths,
      fallback: false,
   };
}

export default Drill;
