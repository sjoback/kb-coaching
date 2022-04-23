import LinkButton from "components/LinkButton";
import Link from "next/link";

function WorkoutsPage({ data }) {
   return (
      <div>
         <h1>Workouts</h1>
         {data ? (
            <ul>
               {data.map((workout) => {
                  return (
                     <li key={workout.id}>
                        <Link href={`/workouts/${workout.id}`}>
                           {workout.name}
                        </Link>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <div>No workouts added</div>
         )}

         <LinkButton link={"/workouts/new"} text={"Add new workout"} />
      </div>
   );
}

export default WorkoutsPage;

export async function getStaticProps() {
   // const response = await fetch(`${process.env.DB_HOST}/workouts`);
   const response = await fetch(`http://localhost:3005/api/workouts`);

   const data = await response.json();

   return {
      props: { data },
   };
}
