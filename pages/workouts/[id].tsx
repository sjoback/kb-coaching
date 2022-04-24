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
   const [name, setName] = useState(false);
   const [comment, setComment] = useState(false);
   // const [drills, setDrills] = useState(false);
   // const [warmups, setWarmups] = useState(false);
   // const [mitts, setMitts] = useState(false);

   const [init, setInit] = useState(false);
   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState(false);
   const [error, setError] = useState("");
   const router = useRouter();

   const updateWorkout = async (e) => {
      e.preventDefault();

      // reset error and message
      setSaving(true);
      // setMessage('');

      // fields check
      if (!name) return setError("All fields are required");

      // post structure
      let post = {
         name,
         published: false,
         createdAt: new Date().toISOString(),
      };
      // save the post
      let response = await fetch("/api/workouts", {
         method: "PUT",
         body: JSON.stringify(post),
      });

      // get the data
      let data = await response.json();

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

   // const getWorkout = async (workoutId) => {
   //    //change deleting state
   //    setInit(true);

   //    try {
   //       // Delete post
   //       await fetch("/api/workouts", {
   //          method: "DELETE",
   //          body: workoutId,
   //       });

   //       // reset the deleting state
   //       setDeleting(false);

   //       // reload the page
   //       return router.push(router.asPath);
   //    } catch (error) {
   //       // stop deleting state
   //       return setDeleting(false);
   //    }
   // };

   return (
      <div className={styles.wrapper}>
         <div className={styles.inner}>
            {/* <form className={form.container} onSubmit={(e) => saveWorkout(e)}> */}
            <form onSubmit={handleWorkout} className={styles.form}>
               <div className={form.inputs}>
                  <label htmlFor="name">Name</label>
                  <input type="text" value={workout.name} />
                  {/* <input
                     type="text"
                     name="name"
                     placeholder="Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  /> */}
               </div>

               {/* <div className={form.inputs}>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                     name="comment"
                     placeholder="Comment"
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                  />
               </div> */}

               {/* <div className={form.inputs}>
                  <div className={form.inputsInner}>
                     <label htmlFor="warmup">Drills</label>

                     <Modal
                        onClick={handleAddDrill}
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
               </div> */}

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
                  <Button
                     onClick={() => saveWorkout(workout.id)}
                     text={"Save workout"}
                     color={"green"}
                  />

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
   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts/`);

   // extract the data
   const data = await response.json();
   const workouts = data["message"];

   const workout = workouts.filter((workout) => workout._id == params.id);

   return {
      props: {
         workout: workout[0],
      },
   };
}

// export async function getStaticPaths() {
//    // get the current environment
//    let dev = process.env.NODE_ENV !== "production";
//    let { DEV_URL, PROD_URL } = process.env;

//    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);
//    let data = await response.json();

//    return {
//       paths: data.map((workout: any) => {
//          return {
//             params: {
//                id: workout.id,
//             },
//          };
//       }),
//       fallback: false,
//    };
// }

export default Workout;

// export async function getStaticProps({ params }) {
//    // const response = await fetch(`${process.env.DB_HOST}/workouts/${params.id}`);
//    // const drillsResponse = await fetch(`${process.env.DB_HOST}/drills`);
//    const response = await fetch(
//       `https://kb-coach.netlify.app/api/workouts/${params.id}`
//    );
//    const drillsResponse = await fetch(
//       `https://kb-coach.netlify.app/api/drills`
//    );

//    const data = await response.json();
//    const drills = await drillsResponse.json();

//    return {
//       props: {
//          item: data,
//          drills: drills,
//       },
//    };
// }
