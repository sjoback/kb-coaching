import React from "react";
import { useEffect, useState } from "react";
import styles from "./Style.module.scss";
import Modal from "components/Modal/Modal";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ListItem from "components/ListItem/ListItem";
import classnames from "classnames";
import DatePicker from "components/DatePicker/DatePicker";

function AddWorkout({ drillsData }) {
   const [date, setDate] = useState("");
   const [name, setName] = useState("");
   const [note, setNote] = useState("");
   const [drills, setDrills] = useState([]);
   const [warmups, setWarmups] = useState([]);
   const [mitts, setMitts] = useState([]);

   const [saving, setSaving] = useState(false);
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

   const saveWorkout = async (e) => {
      e.preventDefault();

      setSaving(true);
      setMessage("Saving workout..");

      if (!name) return setError("All fields are required");

      let newWorkout = {
         date: date,
         name: name,
         note: note,
         drills: drills,
         warmups: warmups,
         mitts: mitts,
         updated: "",
         added: new Date().toISOString(),
      };

      let response = await fetch(`/api/workouts/add`, {
         method: "POST",
         body: JSON.stringify(newWorkout),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);

         setTimeout(function () {
            router.push(`/workouts/${data.id}`);
         }, 600);
      } else {
         return setError(data.message);
      }
   };

   return (
      <form className="form-container">
         <div className="form-container-inputs">
            <label htmlFor="date">Date</label>
            <DatePicker onChange={setDate} />
         </div>

         <div className="form-container-inputs">
            <label htmlFor="name">Name</label>
            <input
               autoFocus
               type="text"
               placeholder="name"
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

         <div className={classnames(styles.addButton, "form-buttons")}>
            <ButtonSubmit
               onClick={saveWorkout}
               text={"Save workout"}
               color={"green"}
            />
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

export async function getServerSideProps() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/drills`);

   const data = await response.json();
   console.log(response);

   return {
      props: {
         drillsData: data["response"],
      },
   };
}

export default AddWorkout;
