import List from "components/List/List";

function Workouts({ data }) {
   return <List type="workouts" items={data} />;
}

export async function getStaticProps() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;
   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);
   let data = await response.json();

   return {
      props: {
         data: data["response"],
      },
   };
}

export default Workouts;
