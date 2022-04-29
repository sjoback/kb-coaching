import List from "components/List/List";

function Physicals({ data }) {
   return <List type="physicals" items={data} />;
}

export async function getServerSideProps() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;
   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/physicals`);
   let data = await response.json();

   return {
      props: {
         data: data["response"],
      },
   };
}

export default Physicals;
