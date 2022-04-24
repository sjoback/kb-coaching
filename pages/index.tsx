import QuickActions from "components/QuickActions";
import RecentWorkouts from "components/RecentWorkouts";

function Home() {
   return (
      <div>
         <QuickActions />

         <RecentWorkouts />
      </div>
   );
}

// export async function getServerSideProps(ctx) {
//    // get the current environment
//    let dev = process.env.NODE_ENV !== "production";
//    let { DEV_URL, PROD_URL } = process.env;

//    // request posts from api
//    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);
//    // extract the data
//    let data = await response.json();

//    return {
//       props: {
//          data: data["message"],
//       },
//    };
// }

export default Home;
