import classnames from "classnames";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

function ListFilterDate({ onChange }) {
   const [showCalendar, toggleCalendar] = useState(false);
   const [date, setDate] = useState("");

   function formatDateString(date) {
      const utcDate = new Date(
         Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const parsed = JSON.parse(JSON.stringify(utcDate));
      return parsed;
   }

   function handleFromCalendarChange(value) {
      setDate(formatDateString(value));
      toggleCalendar(false);
      onChange(formatDateString(value));
   }

   function handleFromToggle() {
      if (date) {
         setDate("");
         onChange("");
      } else toggleCalendar(true);
   }

   // Enable ESC for closing modal
   useEffect(() => {
      const close = (e) => {
         if (e.keyCode === 27) {
            toggleCalendar(false);
         }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
   }, []);

   return (
      <div>
         <button
            type="button"
            className={classnames("btn-xs", "btn-blue")}
            onClick={handleFromToggle}
         >
            {date ? (
               <span>{date.split("T")[0]}</span>
            ) : (
               <span>filter by date</span>
            )}
         </button>

         {showCalendar && (
            <div className="modal">
               <div className="modal-open">
                  <div
                     onClick={() => toggleCalendar(false)}
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
   );
}

export default ListFilterDate;
