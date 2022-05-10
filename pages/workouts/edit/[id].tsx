import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../Style.module.scss";
import Modal from "components/Modal/Modal";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ListItem from "components/ListItem/ListItem";
import ButtonDelete from "components/Button/ButtonDelete/ButtonDelete";
import DatePicker from "components/DatePicker/DatePicker";
import ProtectedRoute from "components/Layout/ProtectedRoute";

function Workout({ drillsData, workout }) {
   const [date, setDate] = useState(workout.date);
   const [name, setName] = useState(workout.name);
   const [note, setNote] = useState(workout.note);
   const [drills, setDrills] = useState(workout.drills);
   const [warmups, setWarmups] = useState(workout.warmups);
   const [mitts, setMitts] = useState(workout.mitts);
   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   function addDrill(drill) {
      const newDrill = {
         ...drill,
         rounds: 1,
         round_time: 1,
      };

      const newDrills = [...drills, newDrill];
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

      setSaving(true);
      setMessage("Saving workout..");

      let updatedWorkout = {
         date: date,
         name: name,
         note: note,
         drills: drills,
         warmups: warmups,
         mitts: mitts,
         updated: new Date().toISOString(),
      };

      let response = await fetch(`/api/workouts/${router.query.id}`, {
         method: "PUT",
         body: JSON.stringify(updatedWorkout),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);

         setTimeout(function () {
            router.reload();
         }, 1200);
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

         return router.push("/workouts");
      } catch (error) {
         return setDeleting(false);
      }
   };

   return (
      <ProtectedRoute>
         <form onSubmit={(e) => e.preventDefault()} className="form-container">
            <div className="form-container-inputs">
               <label htmlFor="date">Date</label>
               <DatePicker datePreset={workout.date} onChange={setDate} />
            </div>

            <div className="form-container-inputs">
               <label htmlFor="name">Name</label>
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>

            <div className="form-container-inputs">
               <label htmlFor="note">Note</label>
               <textarea
                  name="note"
                  placeholder="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
               />
            </div>

            <div className="form-container-inputs">
               {drillsData.length > 0 && (
                  <div className={styles.inputsInner}>
                     <label htmlFor="warmup">Drills</label>

                     <Modal
                        component="add"
                        onClick={addDrill}
                        data={drillsData}
                        text="Add drill"
                        size="add"
                     />
                  </div>
               )}

               {drills.length > 0 ? (
                  <ul className={styles.drillsList}>
                     {drills.length > 0 &&
                        drills.map((drill, index) => (
                           <ListItem
                              key={`${drill.name}-${index}`}
                              index={index}
                              drill={drill}
                              removeDrill={removeDrill}
                              onChange={updateDrill}
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
               <ButtonSubmit
                  onClick={updateWorkout}
                  text={"Save workout"}
                  color={"green"}
               />

               <ButtonDelete
                  onClick={() => deleteWorkout(workout.id)}
                  text={"Delete workout"}
               />
            </div>

            <div className="form-meta">
               <span>
                  <b>Added:</b> {workout.added.split("T")[0]}
               </span>
               {workout.updated && (
                  <span>
                     <b>Updated:</b> {workout.updated.split("T")[0]}
                  </span>
               )}
            </div>

            {saving && <ApiOverlay message={message} />}
         </form>
      </ProtectedRoute>
   );
}

export async function getStaticProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/workouts/${params.id}`
   );

   let drillsResponse = await fetch(`${dev ? DEV_URL : PROD_URL}/api/drills`);

   const data = await response.json();
   const drillsData = await drillsResponse.json();

   return {
      props: {
         workout: data["response"][0],
         drillsData: drillsData["response"],
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
