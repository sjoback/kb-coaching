import React from "react";
import FormRead from "components/Form/FormRead/FormRead";
import ListItemRead from "components/ListItemRead/ListItemRead";

function Workout({ workout }) {
   return (
      <FormRead editLink={`/workouts/edit/${workout.id}`}>
         <div className="form-container-inputs">
            <div className="label">Date</div>
            <div className="input">{workout.date.split("T")[0]}</div>
         </div>

         <div className="form-container-inputs">
            <div className="label">Name</div>
            <div className="input">{workout.name}</div>
         </div>

         <div className="form-container-inputs">
            <div className="label">Note</div>
            <div className="textarea">{workout.name}</div>
         </div>

         <div className="form-container-inputs">
            <div className="label">Drills</div>
            <ul>
               {workout.drills.length > 0 &&
                  workout.drills.map((drill, index) => (
                     <ListItemRead
                        key={`${drill.name}-${index}`}
                        item={drill}
                        type="drills"
                     />
                  ))}
            </ul>
         </div>
      </FormRead>
   );
}

export async function getStaticProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/workouts/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         workout: data["response"][0],
      },
   };
}

export async function getStaticPaths() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);
   const workouts = await response.json();

   const paths = workouts["response"].map((workout) => ({
      params: { id: workout.id },
   }));

   return {
      paths,
      fallback: false,
   };
}

export default Workout;
