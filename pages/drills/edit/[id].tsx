import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ButtonDelete from "components/Button/ButtonDelete/ButtonDelete";
import Form from "components/List/Form/Form";
import FormInput from "components/List/Form/FormInput/FormInput";
import FormTextarea from "components/List/Form/FormTextarea/FormTextarea";
import { useSession } from "next-auth/react";
import ProtectedRoute from "components/Layout/ProtectedRoute";

function Drill({ drill }) {
   const [name, setName] = useState(drill.name);
   const [note, setNote] = useState(drill.note);
   const [images, setImages] = useState(drill.images);
   const [saving, setSaving] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();
   const { data: session } = useSession();

   // useEffect(() => {
   if (!session) {
      console.log("no session");
   }
   // }, []);

   const updateDrill = async (e) => {
      e.preventDefault();

      setSaving(true);
      setMessage("Saving..");

      let updatedDrill = {
         name: name,
         note: note,
         images: images,
         updated: new Date().toISOString(),
      };

      let response = await fetch(`/api/drills/${router.query.id}`, {
         method: "PUT",
         body: JSON.stringify(updatedDrill),
      });

      let data = await response.json();

      if (data.success) {
         setMessage(data.message);
         setTimeout(function () {
            // setSaving(false);
            router.reload();
         }, 1200);
      } else {
         return setError(data.message);
      }
   };

   const deleteDrill = async () => {
      setDeleting(true);

      try {
         await fetch(`/api/drills/${router.query.id}`, {
            method: "DELETE",
         });

         setDeleting(false);

         return router.push("/drills");
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
                  onClick={updateDrill}
                  text={"Save drill"}
                  color={"green"}
               />

               <ButtonDelete
                  onClick={() => deleteDrill()}
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
      </ProtectedRoute>
   );
}

export async function getStaticProps({ params }) {
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

export async function getStaticPaths() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;

   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/drills`);
   const drills = await response.json();

   const paths = drills["response"].map((drill) => ({
      params: { id: drill.id },
   }));

   return {
      paths,
      fallback: false,
   };
}

export default Drill;
