import React from "react";
import { useEffect, useState } from "react";
import EditActions from "components/EditActions";
import GoBackButton from "components/GoBackButton";
import ModalAdd from "components/Modal/ModalAdd/ModalAdd";
import styles from "./Style.module.scss";
import form from "components/Form/Form.module.scss";
import ListItem from "components/ListItem/ListItem";
import ModalSaving from "components/Modal/ModalSaving/ModalSaving";
import Button from "components/Button/Button";
import ModalConfirmDelete from "components/Modal/ModalConfirmDelete/ModalConfirmDelete";
import Modal from "components/Modal/Modal";
import { useRouter } from "next/router";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

function Workout({ workout }) {
   const [name, setName] = useState("");
   const [comment, setComment] = useState("");
   const [drills, setDrills] = useState({});
   // const [warmups, setWarmups] = useState(false);
   // const [mitts, setMitts] = useState(false);

   const [init, setInit] = useState(false);
   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   useEffect(() => {
      setName(workout.name);
      setComment(workout.comment);
      setDrills(workout.drills);
   }, []);

   function addDrill() {}

   const updateWorkout = async (e) => {
      e.preventDefault();

      // reset error and message
      setSaving(true);
      setMessage("");

      if (!name) return setError("All fields are required");

      let updatedWorkout = {
         name: name,
         comment: comment,
         drills: drills,
         updated_at: new Date().toISOString(),
      };
      // save the workout
      let response = await fetch(`/api/workouts/${router.query.id}`, {
         method: "PUT",
         body: JSON.stringify(updatedWorkout),
      });
      // get the data
      let data = await response.json();
      console.log(data);

      if (data.success) {
         // set the message
         return setMessage(data.message);
      } else {
         // set the error
         return setError(data.message);
      }
   };

   // Delete workout
   const deleteWorkout = async (workoutId) => {
      //change deleting state
      setDeleting(true);

      try {
         // Delete workout
         await fetch("/api/workouts", {
            method: "DELETE",
            body: workoutId,
         });

         // reset the deleting state
         setDeleting(false);

         // reload the page
         return router.push(router.asPath);
      } catch (error) {
         // stop deleting state
         return setDeleting(false);
      }
   };

   return (
      <div className={styles.wrapper}>
         <div className={styles.inner}>
            <form onSubmit={updateWorkout} className={form.container}>
               <div className={form.inputs}>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>

               <div className={form.inputs}>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                     name="comment"
                     placeholder="Comment"
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                  />
               </div>

               <div className={form.inputs}>
                  <div className={form.inputsInner}>
                     <label htmlFor="warmup">Drills</label>

                     <Modal
                        onClick={addDrill}
                        data={drills}
                        text="Add drill"
                        component="modal_add"
                     />
                  </div>

                  {drillIds.length > 0 && (
                     <ul className={form.drillsList}>
                        <li>
                           <div></div>
                           <div>Name</div>
                           <div>Rounds</div>
                           <div>Minuets</div>
                           <div></div>
                        </li>

                        {drillIds &&
                           drillIds.length > 0 &&
                           drillIds.map((drill, index) => (
                              <ListItem
                                 key={`${drill.id}-${index}`}
                                 index={index}
                                 drill={drill}
                                 onChange={updateDrill}
                                 removeDrill={() => removeDrill}
                              />
                           ))}
                     </ul>
                  )}
               </div>

               {/* <div className={form.inputs}>
                  <label htmlFor="warmup">Warmup</label>
                  <ul>
                     {item.warmup &&
                        item.warmup.length > 0 &&
                        item.warmup.map((id) => (
                           <ListItem items={items} type="warmup" id={id} key={id} />
                        ))}
                  </ul>
               </div> */}

               <div className={form.buttons}>
                  {/* <Button
                     onClick={updateWorkout}
                     text={"Save workout"}
                     color={"green"}
                  /> */}
                  <button type="submit">submitx</button>

                  <Button
                     onClick={() => deleteWorkout(workout.id)}
                     text={"Delete workout"}
                     color={"red"}
                  />
               </div>

               {/* <span className={form.timestamp}>Edited: {workout.added}</span> */}

               {/* {apiState.message.length > 0 && <ModalSaving state={apiState} />} */}

               {/* {confirmDelete.length > 0 && (
                  <ModalConfirmDelete onClick={() => confirmDelete()} />
               )} */}
            </form>
         </div>
      </div>
   );
}

export async function getServerSideProps({ params }) {
   // get the current environment

   let dev = process.env.NODE_ENV !== "production";
   let { DEV_URL, PROD_URL } = process.env;

   // request workout from api
   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/workouts/${params.id}`
   );

   let drillsResponse = await fetch(`${dev ? DEV_URL : PROD_URL}/api/drills`);

   // extract the data
   const data = await response.json();
   const drills = await drillsResponse.json();

   return {
      props: {
         workout: data["message"],
         drills: drills,
      },
   };
}

export default Workout;
