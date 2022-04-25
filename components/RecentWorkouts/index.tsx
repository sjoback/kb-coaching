import LinkButton from "components/Button/ButtonLink/ButtonLink";
import data from "data/workouts.json";
import Link from "next/link";

function RecentWorkouts() {
   return (
      <div>
         <h1>Recent Workouts</h1>

         <ul>
            {data?.map((item) => (
               <li key={item.id}>
                  <Link href={`/workouts/${item.id}`}>{item.name}</Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default RecentWorkouts;
