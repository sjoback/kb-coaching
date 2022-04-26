import { connectToDatabase } from "../../lib/mongodb";
import Button from "components/Button/Button";
import List from "components/List/List";

function Workouts({ data }) {
   return (
      <div>
         <h1>Workouts</h1>
         <List linkType="workouts" items={data} />

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

// export async function getServerSideProps() {
//    let dev = process.env.NODE_ENV == "development";
//    let { DEV_URL, PROD_URL } = process.env;
//    console.log(":::: get server side props ::::");

//    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);

//    let data = await response.json();

//    return {
//       props: {
//          data: data["message"],
//       },
//    };
// }

export async function getStaticProps() {
   const { db } = await connectToDatabase();
   const workouts = await db
      .collection("workouts")
      .find({})
      .sort({ added: -1 })
      .limit(1000)
      .toArray();
   return {
      props: {
         data: JSON.parse(JSON.stringify(workouts)),
      },
   };

   // let dev = process.env.NODE_ENV == "development";
   // let { DEV_URL, PROD_URL } = process.env;

   // let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);
   // let data = await response.json();
   // return {
   //    props: {
   //       data: data["message"],
   //    },
   // };
}

export default Workouts;
