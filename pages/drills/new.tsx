import GoBackButton from "components/GoBackButton";
import styles from "./Style.module.scss";
import { useState } from "react";
import form from "styles/Form.module.scss";

function AddDrill() {
   const [name, setName] = useState(String);
   const [information, setInformation] = useState(String);
   const [images, setImages] = useState([]);

   const saveDrill = async () => {
      const response = await fetch("/api/drills", {
         method: "POST",
         body: JSON.stringify({
            name: name,
            information: information,
            images: images,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      });

      const data = await response.json();
   };

   return (
      <div className={styles.wrapper}>
         <GoBackButton />

         <form className={form.container}>
            <h1>New drill</h1>

            <div className={form.inputs}>
               <label htmlFor="name">Name</label>
               <input
                  placeholder="E.g: Square"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>

            <div className={form.inputs}>
               <label htmlFor="name">Information</label>
               <input
                  placeholder=""
                  name="name"
                  type="text"
                  value={information}
                  onChange={(e) => setInformation(e.target.value)}
               />
            </div>

            <div className={styles.formContainer}>
               {/* <ModalAdd data={drills} add={handleAddDrill} /> */}
            </div>

            <div>
               <button onClick={saveDrill}>Save drill</button>
            </div>
         </form>
      </div>
   );
}

export default AddDrill;
