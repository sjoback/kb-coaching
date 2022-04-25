import { useState } from "react";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";

function AddDrill() {
   const [name, setName] = useState("");
   const [note, setNote] = useState("");
   const [images, setImages] = useState("");
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

   const handleDrill = async (e) => {
      e.preventDefault();

      setError("");
      setMessage("");

      if (!name) return setError("Name field is required");

      let drill = {
         name: name,
         note: note,
         images: images,
         added: new Date().toISOString(),
         updated: "",
      };

      let response = await fetch("/api/drills", {
         method: "POST",
         body: JSON.stringify(drill),
      });
      console.log(response);

      let data = await response.json();

      if (data.success) {
         return setMessage(data.message);
      } else {
         return setError(data.message);
      }
   };

   return (
      <form onSubmit={handleDrill} className="form-container">
         <div className="form-container-inputs">
            <label htmlFor="name">Name*</label>
            <input
               autoFocus
               placeholder="E.g: Dutch slip 'n rip"
               name="name"
               type="text"
               required
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div>

         <div className="form-container-inputs">
            <label htmlFor="name">Notexx</label>
            <textarea
               placeholder="Note"
               name="note"
               value={note}
               onChange={(e) => setNote(e.target.value)}
            />
         </div>

         <ButtonSubmit text={"Add drill"} color={"green"} />
      </form>
   );
}

export default AddDrill;
