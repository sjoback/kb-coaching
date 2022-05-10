import styles from "../Form.module.scss";
import { useSession } from "next-auth/react";
import Button from "components/Button/Button";

function FormRead(props) {
   const { data: session } = useSession();
   return (
      <div className={styles.container}>
         {props.children}

         {session && (
            <div className={styles.buttons}>
               <Button
                  text={"Edit"}
                  onClick={false}
                  size={"md"}
                  color={"green"}
                  component={"link"}
                  link={props.editLink}
               />
            </div>
         )}
      </div>
   );
}

export default FormRead;
