import React from "react";
import { useEffect, useState } from "react";

import Button from "components/Button/Button";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";

function Drill({ drill }) {
   const [name, setName] = useState("");
   const [note, setNote] = useState("");
   const [images, setImages] = useState("");
   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   useEffect(() => {
      setName(drill.name);
      setNote(drill.comment);
      setImages(drill.images);
   }, []);

   const updateDrill = async (e) => {
      e.preventDefault();

      setSaving(true);
      setMessage("");

      if (!name) return setError("All fields are required");

      let updatedDrill = {
         name: name,
         note: note,
         images: images,
         updated: new Date().toISOString(),
      };

      let response = await fetch(`/api/workouts/${router.query.id}`, {
         method: "PUT",
         body: JSON.stringify(updatedDrill),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);

         setTimeout(function () {
            setSaving(false);
         }, 600);
      } else {
         return setError(data.message);
      }
   };

   const deleteDrill = async (drillId) => {
      setDeleting(true);

      try {
         await fetch("/api/drills", {
            method: "DELETE",
            body: drillId,
         });

         setDeleting(false);

         return router.push(router.asPath);
      } catch (error) {
         return setDeleting(false);
      }
   };

   return (
      <form onSubmit={updateDrill} className="form-container">
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
            <ButtonSubmit text={"Save drill"} color={"green"} />

            <Button
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

export async function getServerSideProps({ params }) {
   let dev = process.env.NODE_ENV !== "production";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/drills/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         drill: data["message"],
      },
   };
}

export default Drill;
