import List from "components/List/List";

function Warmups({ data }) {
   return <List type="warmups" items={data} />;
}

export async function getServerSideProps() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;
   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/warmups`);
   let data = await response.json();

   return {
      props: {
         data: data["response"],
      },
   };
}

export default Warmups;
