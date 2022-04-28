import React from "react";
import { useEffect, useState } from "react";

import Button from "components/Button/Button";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ButtonDelete from "components/Button/ButtonDelete/ButtonDelete";

function Drill({ drill }) {
   const [name, setName] = useState(drill.name);
   const [note, setNote] = useState(drill.note);
   const [images, setImages] = useState(drill.images);
   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   const updateDrill = async (e) => {
      e.preventDefault();

      setSaving(true);
      setMessage("Saving..");

      let updatedDrill = {
         name: name,
         note: note,
         images: images,
      };

      let response = await fetch(`/api/drills/${router.query.id}`, {
         method: "PUT",
         body: JSON.stringify(updatedDrill),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);
         setTimeout(function () {
            router.push("/drills");
            // setSaving(false);
         }, 1200);
      } else {
         return setError(data.message);
      }
   };

   const deleteDrill = async (drillId) => {
      setDeleting(true);

      try {
         await fetch(`/api/drills/${router.query.id}`, {
            // await fetch("/api/drills", {
            method: "DELETE",
            // body: drillId,
         });

         setDeleting(false);

         return router.push("/drills");
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
               onClick={updateDrill}
               text={"Save drill"}
               color={"green"}
            />

            <ButtonDelete
               onClick={() => deleteDrill(drill.id)}
               text={"Delete drill"}
               color={"red"}
            />
         </div>

         <div className="form-meta">
            <span>
               <b>Added:</b> {drill.added}
            </span>
            <span>
               <b>Updated:</b> {drill.updated}
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
      `${dev ? DEV_URL : PROD_URL}/api/drills/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         drill: data["response"][0],
      },
   };
}

export default Drill;
