import React from "react";
import { useEffect, useState } from "react";
import styles from "./Style.module.scss";
// import form from "components/Form/Form.module.scss";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ListItem from "components/ListItem/ListItem";

function Workout({ drillsData, workout }) {
   const [name, setName] = useState(workout.name);
   const [comment, setComment] = useState(workout.comment);
   const [drills, setDrills] = useState(workout.drills);
   const [warmups, setWarmups] = useState(workout.warmups);
   const [mitts, setMitts] = useState(workout.mitts);

   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   function addDrill(drill) {
      const drillToAdd = {
         id: drill.id,
         name: drill.name,
         rounds: 1,
         round_time: 1,
         notes: "",
      };

      const newDrills = [...drills, drillToAdd];
      setDrills(newDrills);
   }

   function updateDrill(value, index, key) {
      const updatedDrill = drills[index];
      updatedDrill[key] = value;
   }

   function removeDrill(drillIndex) {
      const filteredDrills = drills.filter(
         (drill, index) => index !== drillIndex
      );
      setDrills(filteredDrills);
   }

   const updateWorkout = async (e) => {
      e.preventDefault();

      // reset error and message
      setSaving(true);
      setMessage("Saving workout..");

      if (!name) return setError("All fields are required");

      let updatedWorkout = {
         name: name,
         comment: comment,
         drills: drills,
         warmups: warmups,
         mitts: mitts,
         updated_at: new Date().toISOString(),
      };

      let response = await fetch(`/api/workouts/${router.query.id}`, {
         method: "PUT",
         body: JSON.stringify(updatedWorkout),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);

         setTimeout(function () {
            setSaving(false);
         }, 600);
      } else {
         return setError(data.message);
      }
   };

   const deleteWorkout = async (e) => {
      setDeleting(true);

      try {
         await fetch(`/api/workouts/${router.query.id}`, {
            method: "DELETE",
         });

         setDeleting(false);

         // reload the page
         return router.push(router.asPath);
      } catch (error) {
         // stop deleting state
         return setDeleting(false);
      }
   };

   return (
      <form onSubmit={updateWorkout} className="form-container">
         <div className="form-container-inputs">
            <label htmlFor="name">Name</label>
            <input
               autoFocus
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div>

         <div className="form-container-inputs">
            <label htmlFor="comment">Comment</label>
            <textarea
               name="comment"
               placeholder="Comment"
               value={comment}
               onChange={(e) => setComment(e.target.value)}
            />
         </div>

         <div className="form-container-inputs">
            <div className={styles.inputsInner}>
               <label htmlFor="warmup">Drills</label>

               <Modal
                  component="add"
                  onClick={addDrill}
                  data={drillsData}
                  text="Add drill"
               />
            </div>

            {/* <FormDrillsList data={drills} /> */}

            {drills.length > 0 ? (
               <ul className={styles.drillsList}>
                  <li>
                     <div></div>
                     <div></div>
                     <div>Rounds</div>
                     <div>Minuets</div>
                     <div></div>
                  </li>

                  {drills.length > 0 &&
                     drills.map((drill, index) => (
                        <ListItem
                           key={`${drill.name}-${index}`}
                           index={index}
                           drill={drill}
                           onChange={updateDrill}
                           removeDrill={removeDrill}
                        />
                     ))}
               </ul>
            ) : (
               <ul className={styles.drillsList}>
                  <li>no drills</li>
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

         <div className="form-buttons">
            <ButtonSubmit text={"Save workout"} color={"green"} />

            <Button
               onClick={() => deleteWorkout(workout.id)}
               text={"Delete workout"}
               color={"red"}
            />
         </div>

         <div className="form-meta">
            <span>
               <b>Added:</b> {workout.added}
            </span>
            <span>
               <b>Updated:</b> {workout.updated}
            </span>
         </div>

         {saving && (
            <ApiOverlay
               text={message}
               requestState={saving}
               component="saving"
            />
         )}
      </form>
   );
}

export async function getServerSideProps({ params }) {
   // get the current environment
   let dev = process.env.NODE_ENV !== "production";
   let { DEV_URL, PROD_URL } = process.env;

   // requests from api
   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/workouts/${params.id}`
   );

   let drillsResponse = await fetch(`${dev ? DEV_URL : PROD_URL}/api/drills`);

   // extract the data
   const data = await response.json();
   const drillsData = await drillsResponse.json();

   return {
      props: {
         workout: data["message"],
         drillsData: drillsData["message"],
      },
   };
}

export default Workout;
