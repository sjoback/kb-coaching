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

function WorkoutPage({ drills, item }) {
   const [drillIds, storeDrills] = useState([]);
   const [warmupArray, storeWarmup] = useState([]);
   const [name, setName] = useState(String);
   const [comment, setComment] = useState(String);
   const [userAnswer, confirmDelete] = useState(false);
   const [apiState, setApiState] = useState({
      message: "",
      status: null,
   });

   useEffect(() => {
      storeDrills(item.drills);
      setName(item.name);
      setComment(item.comment);
   }, []);

   function handleAddDrill(drill) {
      const formattedDrill = {
         id: drill.id,
         name: drill.name,
         rounds: drill.rounds ? drill.rounds : 1,
         round_time: drill.round_time ? drill.round_time : 1,
         notes: drill.notes ? drill.notes : "",
      };
      const newDrillIds = [...drillIds, formattedDrill];
      storeDrills(newDrillIds);
   }

   function removeDrill(drillIndex) {
      const spliced = drillIds.filter((drill, index) => drillIndex !== index);
      storeDrills(spliced);
   }

   function updateDrill(drill, index, type) {
      drillIds[index][type] = drill;
   }

   function setDeleteConfirmed() {
      confirmDelete(true);
   }

   function submit(e) {
      e.preventDefault();
   }

   const saveItem = async () => {
      setApiState({
         message: "Saving..",
         status: 1,
      });

      try {
         const response = await fetch(`/api/workouts/${item.id}`, {
            method: "PUT",
            body: JSON.stringify({
               name: name,
               comment: comment,
               warmup: warmupArray,
               drills: drillIds,
               mitts: item.mitts,
            }),
            headers: { "Content-Type": "application/json" },
         });

         if (response.status == 200) {
            setTimeout(function () {
               setApiState({
                  message: "Saved successful!",
                  status: 2,
               });
            }, 500);
         }
      } catch (e) {
         setApiState({
            message: "Oops, error!",
            status: 2,
         });
      }

      setTimeout(function () {
         setApiState({ message: "", status: null });
      }, 1500);
   };

   const deleteItem = async () => {
      if (userAnswer) {
         const response = await fetch(`/api/edit/workouts/${item.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
         });
      }
   };

   return (
      <div className={styles.wrapper}>
         <div className={styles.inner}>
            <form className={form.container} onSubmit={(e) => submit(e)}>
               <div className={form.inputs}>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     name="name"
                     placeholder="Name"
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
                  <Button
                     onClick={() => saveItem()}
                     text={"Save workout"}
                     color={"green"}
                  />

                  <Button
                     onClick={() => deleteItem()}
                     text={"Delete workout"}
                     color={"red"}
                  />
               </div>

               <span className={form.timestamp}>Edited: {item.added}</span>

               {/* {apiState.message.length > 0 && <ModalSaving state={apiState} />} */}

               {/* {confirmDelete.length > 0 && (
                  <ModalConfirmDelete onClick={() => confirmDelete()} />
               )} */}
            </form>
         </div>
      </div>
   );
}

export default WorkoutPage;

export async function getStaticProps({ params }) {
   // const response = await fetch(`${process.env.DB_HOST}/workouts/${params.id}`);
   // const drillsResponse = await fetch(`${process.env.DB_HOST}/drills`);
   const response = await fetch(
      `https://kb-coach.netlify.app/api/workouts/${params.id}`
   );
   const drillsResponse = await fetch(
      `https://kb-coach.netlify.app/api/drills`
   );

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
   const response = await fetch(`https://kb-coach.netlify.app/api/workouts`);

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
