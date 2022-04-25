import { useRouter } from "next/router";
// import GoBackButton from "components/GoBackButton";
// import styles from "./Style.module.scss";
import { useState } from "react";
import ModalAdd from "components/Modal/ModalAdd/ModalAdd";
import form from "components/Form/Form.module.scss";

function AddWorkout() {
   const [name, setName] = useState("");
   // const [content, setContent] = useState('');
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

   const handleWorkout = async (e) => {
      e.preventDefault();

      // reset error and message
      setError("");
      // setMessage('');

      // fields check
      if (!name) return setError("All fields are required");

      // post structure
      let post = {
         name: name,
         published: false,
         createdAt: new Date().toISOString(),
      };
      // save the post
      let response = await fetch("/api/workouts", {
         method: "POST",
         body: JSON.stringify(post),
      });

      // get the data
      let data = await response.json();

      if (data.success) {
         // reset the fields
         setName("");

         // set the message
         return setMessage(data.message);
      } else {
         // set the error
         return setError(data.message);
      }
   };
   // const saveWorkout = async () => {
   //    const response = await fetch("/api/workouts", {
   //       method: "POST",
   //       body: JSON.stringify({
   //          name: name,
   //          comment: comment,
   //          drills: [],
   //          warmup: [],
   //          mitts: [],
   //       }),
   //       headers: {
   //          "Content-Type": "application/json",
   //       },
   //    });

   //    const data = await response.json();
   // };

   return (
      <div className={styles.wrapper}>
         <GoBackButton />

         <form onSubmit={handleWorkout} className={form.container}>
            <h1>new workout</h1>

            <div className={form.inputs}>
               <label htmlFor="name">Name</label>
               <input
                  placeholder="E.g: Dutch slip 'n rip"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>

            {/* <div className={form.inputs}>
               <label htmlFor="comment">Comment</label>
               <textarea
                  name="comment"
                  placeholder="E.g: This is a good for etc etc.."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
               />
            </div> */}

            <div className={form.inputs}>
               {/* <ModalAdd data={drills} add={handleAddDrill} /> */}
            </div>

            <div>
               <button type="submit">Save workout</button>
            </div>
         </form>
      </div>
   );
}

export default AddWorkout;
