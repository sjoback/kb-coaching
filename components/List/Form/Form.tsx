import ApiOverlay from "components/ApiOverlay/ApiOverlay";
import ButtonDelete from "components/Button/ButtonDelete/ButtonDelete";
import ButtonSubmit from "components/Button/ButtonSubmit/ButtonSubmit";
import { useSession } from "next-auth/react";

function Form({
   showOverlay,
   onSubmit,
   message,
   onDelete,
   children,
   title,
   preset,
}) {
   const { data: session } = useSession();

   if (!session) return <div>Sign in to use the app.</div>;

   return (
      <form onSubmit={(e) => e.preventDefault()} className="form-container">
         <h1>{title}</h1>
         {children}
         <div className="form-buttons">
            <ButtonSubmit
               onClick={onSubmit}
               text={"Save drill"}
               color={"green"}
            />

            <ButtonDelete
               onClick={onDelete}
               text={"Delete drill"}
               color={"red"}
            />
         </div>

         {preset && (
            <div className="form-meta">
               <span>
                  <b>Added:</b> {preset.added}
               </span>
               <span>
                  <b>Updated:</b> {preset.updated}
               </span>
            </div>
         )}

         {showOverlay && <ApiOverlay message={message} />}
      </form>
   );
}

export default Form;
