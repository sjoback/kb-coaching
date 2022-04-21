import { useEffect, useState } from "react";
import ListItem from "../../ListItem/ListItem";
import styles from "./Styles.module.scss";

function ModalAddDrill({ drills, add }) {
   const [open, toggleOpen] = useState(false);
   // const [drills, setDrills] = useState([]);

   useEffect(() => {
      // toggleOpen(false);
      // setDrills();
      // fetchDrills();
      // add();
   }, []);

   // const fetchDrills = async () => {
   // const response = await fetch(`/api/drills`, {
   //    method: "GET",
   //    headers: { "Content-Type": "application/json" },
   // });
   // const data = await response.json();
   // console.log(data);
   // // setDrills(data);
   // };

   return (
      <div>
         {open && (
            <div className={styles.modal}>
               <button
                  onClick={() => toggleOpen(false)}
                  className={styles.closeModal}
               >
                  X
               </button>
               <ul>
                  {drills &&
                     drills.length > 0 &&
                     drills.map((item) => (
                        <li key={item.id}>
                           <button onClick={() => add(item)}>{item}</button>
                        </li>
                     ))}
               </ul>
            </div>
         )}
         <button onClick={() => toggleOpen(true)}>Add drill +</button>
         {/* 
         <div className={styles.modalContainer}>

            <ul>
               {drills &&
                  drills.length > 0 &&
                  drills.map((id) => (
                     <ListItem type="drills" id={id} key={id} />
                  ))}
            </ul>
         </div> */}
      </div>
   );
}

export default ModalAddDrill;

// export async function getStaticProps({ params }) {
//    const response = await fetch(`${process.env.API_URL}/drills`);

//    const data = await response.json();
//    console.log(response);

//    return {
//       props: {
//          drills: data,
//       },
//    };
// }
