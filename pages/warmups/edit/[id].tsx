import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ButtonDelete from "components/Button/ButtonDelete/ButtonDelete";
import ProtectedRoute from "components/Layout/ProtectedRoute";

function Warmup({ warmup }) {
   const [name, setName] = useState(warmup.name);
   const [note, setNote] = useState(warmup.note);
   const [images, setImages] = useState(warmup.images);
   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   const updateWarmup = async (e) => {
      e.preventDefault();

      setSaving(true);
      setMessage("Saving..");

      let updatedWarmup = {
         name: name,
         note: note,
         images: images,
         updated: new Date().toISOString(),
      };

      let response = await fetch(`/api/warmups/${router.query.id}`, {
         method: "PUT",
         body: JSON.stringify(updatedWarmup),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);
         setTimeout(function () {
            router.reload();
            // setSaving(false);
         }, 1200);
      } else {
         return setError(data.message);
      }
   };

   const deleteWarmup = async () => {
      setDeleting(true);

      try {
         await fetch(`/api/warmups/${router.query.id}`, {
            method: "DELETE",
         });

         setDeleting(false);

         return router.push("/warmups");
      } catch (error) {
         return setDeleting(false);
      }
   };

   return (
      <ProtectedRoute>
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
                  onClick={updateWarmup}
                  text={"Save warmup"}
                  color={"green"}
               />

               <ButtonDelete
                  onClick={() => deleteWarmup()}
                  text={"Delete warmup"}
                  color={"red"}
               />
            </div>

            <div className="form-meta">
               <span>
                  <b>Added:</b> {warmup.added.split("T")[0]}
               </span>
               <span>
                  <b>Updated:</b> {warmup.updated.split("T")[0]}
               </span>
            </div>

            {saving && <ApiOverlay message={message} />}
         </form>
      </ProtectedRoute>
   );
}

export async function getStaticProps({ params }) {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(
      `${dev ? DEV_URL : PROD_URL}/api/warmups/${params.id}`
   );

   const data = await response.json();

   return {
      props: {
         warmup: data["response"][0],
      },
   };
}

export async function getStaticPaths() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/warmups`);
   const warmups = await response.json();

   const paths = warmups["response"].map((warmup) => ({
      params: { id: warmup.id },
   }));

   return {
      paths,
      fallback: false,
   };
}

export default Warmup;
