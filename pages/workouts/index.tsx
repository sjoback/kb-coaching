import LinkButton from "components/LinkButton";
import Link from "next/link";

function Workouts({ data }) {
   return (
      <div>
         <h1>Workouts</h1>
         {data ? (
            <ul>
               {data.map((workout) => {
                  return (
                     <li key={`name + ${workout._id}`}>
                        <Link href={`/workouts/${workout._id}`}>
                           {workout.name}
                        </Link>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <div>No workouts added</div>
         )}

         <LinkButton link={"/workouts/add"} text={"Add new workout"} />
      </div>
   );
}

export async function getServerSideProps() {
   // get the current environment

   let dev = process.env.NODE_ENV !== "production";
   let { DEV_URL, PROD_URL } = process.env;

   // request posts from api
   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);

   // extract the data
   let data = await response.json();

   return {
      props: {
         data: data["message"],
      },
   };
}

export default Workouts;
