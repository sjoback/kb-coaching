import LinkButton from "components/LinkButton";
import data from "data/data.json";

function RecentWorkouts() {
   return (
      <div>
         <h1>Recent Workouts</h1>

         <ul>
            {data.workouts?.map((item) => (
               <li key={item.id}>
                  <LinkButton link={`/workouts/${item.id}`} text={item.name} />
               </li>
            ))}
         </ul>
      </div>
   );
}

export default RecentWorkouts;
