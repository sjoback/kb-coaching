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
import ButtonDelete from "components/Button/ButtonDelete/ButtonDelete";

function Workout({ drillsData, workout }) {
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
      const newDrills = [...drills, drill];
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
      console.log("updae");

      e.preventDefault();

      setSaving(true);
      setMessage("Saving workout..");

      if (!name) return setError("All fields are required");

      let updatedWorkout = {
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
            setSaving(false);
            // router.reload();
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
         // setDeleting(false);
      } catch (error) {
         return setDeleting(false);
      }
   };

   return (
      <form onSubmit={(e) => e.preventDefault()} className="form-container">
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
   );
}

export async function getServerSideProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/workouts/${params.id}`
   );

   let drillsResponse = await fetch(`${dev ? DEV_URL : PROD_URL}/api/drills`);

   const data = await response.json();
   const drillsData = await drillsResponse.json();
   console.log(drillsData["response"]);

   return {
      props: {
         workout: data["response"][0],
         drillsData: drillsData["response"],
      },
   };
}

export default Workout;
