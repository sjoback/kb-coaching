import Button from "components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./ModalPopUp.module.scss";

function ModalPopUp(props) {
   const [open, toggleOpen] = useState(false);

   return (
      <div className={styles.container}>
         <Button
            text={props.buttonText ? props.buttonText : "click me"}
            onClick={() => toggleOpen(true)}
            size={props.size ? props.size : "md"}
            color={props.color ? props.color : "blue"}
            component="default"
            link={false}
         />

         <AnimatePresence>
            {open && (
               <motion.div
                  className={styles.containerOpen}
                  initial={{
                     opacity: 0,
                     x: "-100px",
                  }}
                  animate={{
                     opacity: 1,
                     x: "0px",
                  }}
                  transition={{
                     duration: 0.3,
                     ease: "easeOut",
                  }}
                  exit={{
                     opacity: 0,
                     transition: { duration: 0.3 },
                  }}
               >
                  {props.children}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

export default ModalPopUp;
