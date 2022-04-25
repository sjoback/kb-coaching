import Button from "components/Button/Button";
import List from "components/List/List";

function Workouts({ data }) {
   return (
      <div>
         <h1>Workouts</h1>
         <List items={data} />

         <div className="link-list-button">
            <Button
               color="green"
               text="Add new workout"
               component="link"
               link="/workouts/add"
            />
         </div>
      </div>
   );
}

export async function getServerSideProps() {
   let dev = process.env.NODE_ENV !== "production";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);

   let data = await response.json();

   return {
      props: {
         data: data["message"],
      },
   };
}

export default Workouts;
