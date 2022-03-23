import EditActions from "components/EditActions";
import FormWorkout from "components/Forms/FormWorkout";
import GoBackButton from "components/GoBackButton";
import ModalAdd from "components/ModalAdd";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Style.module.scss";
import form from "styles/Form.module.scss";
import ListItem from "components/Form/ListItem";

function WorkoutPage({ drills, item }) {
   const [drillsArray, storeDrills] = useState([]);
   const [name, setName] = useState(String);
   const [comment, setComment] = useState(String);

   useEffect(() => {
      storeDrills(item.drills);
      setName(item.name);
      setComment(item.comment);
   }, []);

   function handleAddDrill(drill) {
      // NOTE: make alert modal
      if (!drillsArray.includes(drill)) {
         const formattedDrill = {
            id: drill.id,
            name: drill.name,
         };
         const newDrillsArray = [...drillsArray, formattedDrill];
         storeDrills(newDrillsArray);
      } else {
         window.alert("item exists");
      }
   }

   const saveItem = async () => {
      const response = await fetch(`/api/workouts/${item.id}`, {
         method: "PUT",
         body: JSON.stringify({
            name: name,
            comment: comment,
            warmup: item.warmup,
            drills: drillsArray,
            mitts: item.mitts,
         }),
         headers: { "Content-Type": "application/json" },
      });
   };

   const deleteItem = async () => {
      const response = await fetch(`/api/edit/workouts/${item.id}`, {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
      });

      // Router.push("/");
   };

   return (
      <div className={styles.wrapper}>
         <div className={styles.inner}>
            <form className={form.container}>
               <div className={form.inputs}>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     name="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>

               <div className={form.inputs}>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                     name="comment"
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                  />
               </div>

               <div className={form.inputs}>
                  <label htmlFor="warmup">Warmup</label>
                  <ul>
                     {drillsArray &&
                        drillsArray.length > 0 &&
                        drillsArray.map((id) => (
                           // <li key={drill.id}>{drill}</li>
                           <ListItem type="drills" id={id} key={id} />
                        ))}
                  </ul>
               </div>

               <div className={styles.container}>
                  <span>Workout drills</span>

                  <ModalAdd data={drills} add={handleAddDrill} />
               </div>

               <div className={form.buttons}>
                  <button onClick={() => saveItem()}>Save workout</button>
                  <button onClick={() => deleteItem()}>Delete workout</button>
               </div>

               <span className={form.timestamp}>Edited: {item.added}</span>
            </form>
            {/* <GoBackButton /> */}
            {/* <EditActions /> */}
         </div>
      </div>
   );
}

export default WorkoutPage;

export async function getStaticProps({ params }) {
   const response = await fetch(
      `${process.env.API_URL}/edit/workouts/${params.id}`
   );
   const drillsResponse = await fetch(`${process.env.API_URL}/drills`);

   const data = await response.json();

   const drills = await drillsResponse.json();

   return {
      props: {
         item: data,
         drills: drills,
      },
   };
}

export async function getStaticPaths() {
   const response = await fetch(`${process.env.API_URL}/workouts`);

   const workouts = await response.json();

   return {
      paths: workouts.map((workout: any) => {
         return {
            params: {
               id: workout.id,
            },
         };
      }),
      fallback: false,
   };
}
