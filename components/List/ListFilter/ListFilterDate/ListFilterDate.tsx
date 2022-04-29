import classnames from "classnames";
import styles from "./ListFilterDate.module.scss";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

function ListFilterDate({ onChange }) {
   const [showFromCalendar, toggleFromCalendar] = useState(false);
   const [showToCalendar, toggleToCalendar] = useState(false);
   const [dateFrom, setDateFrom] = useState("");
   const [dateTo, setDateTo] = useState("");

   function formatDateString(date) {
      const utcDate = new Date(
         Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const parsed = JSON.parse(JSON.stringify(utcDate));
      return parsed;
   }

   function handleFromCalendarChange(value) {
      setDateFrom(formatDateString(value));
      toggleFromCalendar(false);
   }

   function handleToCalendarChange(value) {
      setDateTo(formatDateString(value));
      toggleToCalendar(false);
   }

   function handleFromToggle() {
      if (dateFrom) return setDateFrom("");
      //   tell parent to remove filter
      toggleFromCalendar(true);
   }

   function handleToToggle() {
      if (dateTo) return setDateTo("");
      //   tell parent to remove filter
      toggleToCalendar(true);
   }

   // Enable ESC for closing modal
   useEffect(() => {
      const close = (e) => {
         if (e.keyCode === 27) {
            toggleFromCalendar(false);
            toggleToCalendar(false);
         }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
   }, []);

   return (
      <div className={styles.container}>
         <div className={styles.containerInner}>
            <button
               type="button"
               className={classnames("btn-xs", "btn-blue")}
               onClick={handleFromToggle}
            >
               {dateFrom ? (
                  <span>{dateFrom.split("T")[0]}</span>
               ) : (
                  <span>filter by date</span>
               )}
            </button>

            {showFromCalendar && (
               <div className="modal">
                  <div className="modal-open">
                     <div
                        onClick={() => toggleFromCalendar(false)}
                        className="modal-open-overlay"
                     />

                     <div className="modal-open-content">
                        <Calendar
                           onChange={(value) => handleFromCalendarChange(value)}
                        />
                     </div>
                  </div>
               </div>
            )}
         </div>

         {dateFrom && (
            <div className={styles.containerInner}>
               <div className={styles.containerInner}>
                  <button
                     type="button"
                     className={classnames("btn-xs", "btn-blue")}
                     onClick={handleToToggle}
                  >
                     {dateTo ? (
                        <span>{dateTo.split("T")[0]}</span>
                     ) : (
                        <span>add date interval</span>
                     )}
                  </button>

                  {showToCalendar && (
                     <div className="modal">
                        <div className="modal-open">
                           <div
                              onClick={() => toggleToCalendar(false)}
                              className="modal-open-overlay"
                           />

                           <div className="modal-open-content">
                              <Calendar
                                 onChange={(value) =>
                                    handleToCalendarChange(value)
                                 }
                              />
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
}

export default ListFilterDate;
