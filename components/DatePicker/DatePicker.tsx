import styles from "./DatePicker.module.scss";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Button from "components/Button/Button";
import classnames from "classnames";

function DatePicker({ onChange }) {
   const [open, toggleOpen] = useState(false);
   const [date, setDate] = useState(new Date());

   function handleChange(date) {
      setDate(date);
      onChange(date);
      toggleOpen(false);
   }

   function dateString() {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getUTCFullYear();

      return `${year}-${month}-${day}`;
   }

   // Enable ESC for closing modal
   useEffect(() => {
      const close = (e) => {
         if (e.keyCode === 27) {
            toggleOpen(false);
         }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
   }, []);

   return (
      <div className={styles.container}>
         <div className={styles.input}>{dateString()}</div>
         <Button
            text="set date"
            onClick={() => toggleOpen(true)}
            size="xs"
            color="blue"
            component="default"
            link={false}
         />

         {open && (
            <div className={classnames(styles.modalContainer)}>
               <div className="modal-open">
                  <div
                     onClick={() => toggleOpen(false)}
                     className="modal-open-overlay"
                  />

                  <div
                     className={classnames(
                        "modal-open-content",
                        styles.modalContent
                     )}
                  >
                     <Calendar onChange={(value) => handleChange(value)} />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default DatePicker;
