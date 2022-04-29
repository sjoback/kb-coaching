import React from "react";
import { useState } from "react";
import styles from "./Style.module.scss";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import classnames from "classnames";
import DatePicker from "components/DatePicker/DatePicker";

function AddWorkout({ drillsData }) {
   const [date, setDate] = useState("");
   const [name, setName] = useState("");

   const [saving, setSaving] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();
   const saveWorkout = async (e) => {
      e.preventDefault();

      setSaving(true);
      setMessage("Saving workout..");

      if (!name) return setError("All fields are required");

      let newWorkout = {
         date: date,
         name: name,
         note: "",
         drills: [],
         warmups: [],
         mitts: [],
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
         <h1>Add workout</h1>
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

         <div className={classnames(styles.addButton, "form-buttons")}>
            <ButtonSubmit
               onClick={saveWorkout}
               text={"Save workout"}
               color={"green"}
            />
         </div>

         {saving && <ApiOverlay message={message} />}
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
