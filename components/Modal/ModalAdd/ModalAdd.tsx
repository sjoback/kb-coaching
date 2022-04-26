import React, { useEffect, useState } from "react";
import styles from "./ModalAdd.module.scss";
import Button from "components/Button/Button";

function ModalAdd({ onClick, data }) {
   const [state, setState] = useState("add");
   const [drillToAdd, setDrillToAdd] = useState({});

   const [rounds, setRounds] = useState("");
   const [roundTime, setRoundTime] = useState("");
   // const [note, setNote] = useState("");

   function handleOnClick() {
      const formattedDrill = {
         ...drillToAdd,
         rounds: rounds,
         round_time: roundTime,
      };
      console.log(formattedDrill);

      onClick(formattedDrill);
      setState("add");
   }

   // Enable ENTER for handleOnClick
   // useEffect(() => {
   //    const click = (e) => {
   //       if (e.keyCode === 13 && state == "add") {
   //          handleOnClick();
   //       }
   //    };
   //    window.addEventListener("keydown", click);
   //    return () => window.removeEventListener("keydown", click);
   // }, []);

   return (
      <div>
         {state == "add" ? (
            <ul>
               {data &&
                  data.length > 0 &&
                  data.map((item) => (
                     <li key={item._id + item.id}>
                        <Button
                           onClick={() => {
                              setState("rounds"), setDrillToAdd(item);
                           }}
                           text={item.name}
                           size={"sm"}
                           color="default"
                           component="default"
                           link={false}
                        />
                     </li>
                  ))}
            </ul>
         ) : (
            <div className={styles.container}>
               <div className={styles.containerInner}>
                  <div> Set rounds</div>
                  <input
                     name="rounds"
                     type="text"
                     autoFocus
                     value={rounds}
                     onChange={(e) => setRounds(e.target.value)}
                  />
               </div>

               <div className={styles.containerInner}>
                  <div>Set round time</div>
                  <input
                     name="round time"
                     type="text"
                     value={roundTime}
                     onChange={(e) => setRoundTime(e.target.value)}
                  />
               </div>

               <Button
                  onClick={handleOnClick}
                  text="Add drill"
                  color="green"
                  size={"sm"}
                  component="default"
                  link={false}
               />
            </div>
         )}
      </div>
   );
}

export default ModalAdd;
