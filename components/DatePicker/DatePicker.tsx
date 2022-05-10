import styles from "./DatePicker.module.scss";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Button from "components/Button/Button";
import classnames from "classnames";
import { useSession } from "next-auth/react";

function DatePicker({
   showInput = true,
   buttonText = "set date",
   onChange,
   datePreset = "",
}) {
   const [parsedDate, setParsedDate] = useState("");
   const { data: session } = useSession();

   const [open, toggleOpen] = useState(false);
   const [date, setDate] = useState(
      datePreset.length > 0 ? datePreset : new Date()
   );

   function handleChange(date) {
      const utcDate = new Date(
         Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const parsed = JSON.parse(JSON.stringify(utcDate));
      setDate(parsed);
      setParsedDate(parsed);
      onChange(parsed);
      toggleOpen(false);
   }

   // Enable ESC for closing modal
   useEffect(() => {
      if (datePreset.length > 0) setParsedDate(datePreset);
      else handleChange(new Date());

      const close = (e) => {
         if (e.keyCode === 27) {
            toggleOpen(false);
         }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
   }, []);

   return (
      <div
         className={classnames(
            styles.container,
            showInput ? styles.showInput : ""
         )}
      >
         {showInput && (
            <div className={styles.input}>{parsedDate.split("T")[0]}</div>
         )}

         {session && (
            <Button
               text={buttonText}
               onClick={() => toggleOpen(true)}
               size="xs"
               color="blue"
               component="default"
               link={false}
            />
         )}

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
