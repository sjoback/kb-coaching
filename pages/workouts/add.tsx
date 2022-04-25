import router, { useRouter } from "next/router";
import GoBackButton from "components/GoBackButton";
import styles from "./Style.module.scss";
import { useState } from "react";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";

function AddWorkout() {
   const [name, setName] = useState("");
   const [note, setNote] = useState("");

   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

   const handleWorkout = async (e) => {
      e.preventDefault();

      // reset error and message
      setError("");
      // setMessage('');

      if (!name) return setError("All fields are required");

      let workout = {
         name: name,
         note: note,
         published: false,
         createdAt: new Date().toISOString(),
      };

      let response = await fetch("/api/workouts", {
         method: "POST",
         body: JSON.stringify(workout),
      });

      let data = await response.json();
      console.log(data);

      if (data.success) {
         return router.push(router.asPath.replace("/add", ""));
      } else {
         return setError(data.message);
      }
   };

   return (
      <form onSubmit={handleWorkout} className="form-container">
         <h1>Add workout</h1>

         <div className="form-container-inputs">
            <label htmlFor="name">Name</label>
            <input
               autoFocus
               placeholder="E.g: Dutch slip 'n rip"
               name="name"
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div>

         <div className="form-container-inputs">
            <label htmlFor="name">Note</label>
            <textarea
               placeholder="Note"
               name="note"
               value={note}
               onChange={(e) => setNote(e.target.value)}
            />
         </div>

         <div className="form-container-inputs">
            {/* <ModalAdd data={drills} add={handleAddDrill} /> */}
         </div>

         <ButtonSubmit text={"Add workout"} color={"green"} />
      </form>
   );
}

export default AddWorkout;
