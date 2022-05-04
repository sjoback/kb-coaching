import List from "components/List/List";

function Mitts({ data }) {
   return <List type="mitts" items={data} />;
}

export async function getStaticProps() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;
   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/mitts`);
   let data = await response.json();

   return {
      props: {
         data: data["response"],
      },
   };
}

export default Mitts;
