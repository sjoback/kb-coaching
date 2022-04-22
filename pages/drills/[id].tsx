import EditActions from "components/EditActions";
import GoBackButton from "components/GoBackButton";

import { useEffect, useState } from "react";
import styles from "./Style.module.scss";
import table from "styles/Table.module.scss";
import form from "components/form/Form.module.scss";
import ListItem from "components/ListItem/ListItem";

function DrillPage({ item }) {
   const [drillIds, storeDrills] = useState([]);
   const [warmupArray, storeWarmup] = useState([]);
   const [name, setName] = useState(String);
   const [comment, setComment] = useState(String);

   useEffect(() => {
      storeDrills(item.drills);
      setName(item.name);
      setComment(item.comment);
   }, []);

   function handleAddDrill(drill) {
      // NOTE: make alert modal
      console.log(drillIds);

      if (!drillIds.includes(drill)) {
         const formattedDrill = {
            id: drill.id,
            name: drill.name,
            rounds: drill.rounds,
            round_time: drill.round_time,
         };
         const newDrillIds = [...drillIds, formattedDrill];
         storeDrills(newDrillIds);
      } else {
         window.alert("item exists");
      }
   }

   const saveItem = async () => {
      const response = await fetch(`/api/drills/${item.id}`, {
         method: "PUT",
         body: JSON.stringify({
            name: name,
            comment: comment,
            warmup: warmupArray,
            drills: drillIds,
            mitts: item.mitts,
         }),
         headers: { "Content-Type": "application/json" },
      });

      console.log(response);
   };

   const deleteItem = async () => {
      const response = await fetch(`/api/edit/drills/${item.id}`, {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
      });

      // Router.push("/");
   };

   function updateDrill(drill, index, type) {
      drillIds[index][type] = drill;
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.inner}>
            <form className={form.container}>
               <div className={form.inputs}>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     name="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>

               <div className={form.inputs}>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                     name="comment"
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                  />
               </div>

               {/* <div className={form.inputs}>
                  <label htmlFor="warmup">Warmup</label>
                  <ul>
                     {item.warmup &&
                        item.warmup.length > 0 &&
                        item.warmup.map((id) => (
                           <ListItem items={items} type="warmup" id={id} key={id} />
                        ))}
                  </ul>
               </div> */}

               <div className={form.buttons}>
                  <button onClick={() => saveItem()}>Save drill</button>
                  <button onClick={() => deleteItem()}>Delete drill</button>
               </div>

               <span className={form.timestamp}>Edited: {item.added}</span>
            </form>
            {/* <GoBackButton /> */}
            {/* <EditActions /> */}
         </div>
      </div>
   );
}

export default DrillPage;

export async function getStaticProps({ params }) {
   const response = await fetch(`${process.env.API_URL}/drills/${params.id}`);
   // const drillsResponse = await fetch(`${process.env.API_URL}/drills`);

   const data = await response.json();
   // const drills = await drillsResponse.json();

   return {
      props: {
         item: data,
         // drills: drills,
      },
   };
}

export async function getStaticPaths() {
   const response = await fetch(`${process.env.API_URL}/drills`);

   const drills = await response.json();

   return {
      paths: drills.map((drill: any) => {
         return {
            params: {
               id: drill.id,
            },
         };
      }),
      fallback: false,
   };
}
