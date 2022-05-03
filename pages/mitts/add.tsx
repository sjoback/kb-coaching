import { useState } from "react";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";

function AddMitt() {
   const [name, setName] = useState("");
   const [note, setNote] = useState("");
   const [images, setImages] = useState([]);
   const [message, setMessage] = useState("");
   const [error, setError] = useState(false);
   const [saving, setSaving] = useState(false);

   const [requestState, setRequestState] = useState(false);

   const addMitt = async (e) => {
      e.preventDefault();

      if (!name) return;

      setSaving(true);
      setMessage("Adding..");

      let mitt = {
         name: name,
         note: note,
         images: images,
         added: new Date().toISOString(),
         updated: "",
      };

      let response = await fetch("/api/mitts/add", {
         method: "POST",
         body: JSON.stringify(mitt),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);
         setTimeout(function () {
            // reset inputs
            setSaving(false);
            setName("");
            setNote("");
            setImages([]);
         }, 1200);
      }
   };

   return (
      <form onSubmit={(e) => e.preventDefault()} className="form-container">
         <h1>Add mitt</h1>
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
            <label htmlFor="name">Note</label>
            <textarea
               placeholder="Note"
               name="note"
               value={note}
               onChange={(e) => setNote(e.target.value)}
            />
         </div>

         <ButtonSubmit onClick={addMitt} text={"Add mitt"} color={"green"} />

         {saving && <ApiOverlay message={message} />}
      </form>
   );
}

export default AddMitt;