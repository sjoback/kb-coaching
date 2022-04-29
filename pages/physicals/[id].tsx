import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ButtonDelete from "components/Button/ButtonDelete/ButtonDelete";

function Physical({ physical }) {
   const [name, setName] = useState(physical.name);
   const [note, setNote] = useState(physical.note);
   const [images, setImages] = useState(physical.images);
   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   const updatePhysical = async (e) => {
      e.preventDefault();

      setSaving(true);
      setMessage("Saving..");

      let updatedMitt = {
         name: name,
         note: note,
         images: images,
      };

      let response = await fetch(`/api/physicals/${router.query.id}`, {
         method: "PUT",
         body: JSON.stringify(updatedMitt),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);
         setTimeout(function () {
            router.push("/physicals");
            // setSaving(false);
         }, 1200);
      } else {
         return setError(data.message);
      }
   };

   const deletePhysical = async () => {
      setDeleting(true);

      try {
         await fetch(`/api/physicals/${router.query.id}`, {
            method: "DELETE",
         });

         setDeleting(false);

         return router.push("/physicals");
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
               placeholder="Note"
               value={note}
               onChange={(e) => setNote(e.target.value)}
            />
         </div>

         <div className="form-buttons">
            <ButtonSubmit
               onClick={updatePhysical}
               text={"Save physical"}
               color={"green"}
            />

            <ButtonDelete
               onClick={() => deletePhysical()}
               text={"Delete physical"}
               color={"red"}
            />
         </div>

         <div className="form-meta">
            <span>
               <b>Added:</b> {physical.added}
            </span>
            <span>
               <b>Updated:</b> {physical.updated}
            </span>
         </div>

         {saving && <ApiOverlay message={message} />}
      </form>
   );
}

export async function getServerSideProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/physicals/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         physical: data["response"][0],
      },
   };
}

export default Physical;
