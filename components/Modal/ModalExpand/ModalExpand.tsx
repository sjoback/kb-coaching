import { useEffect, useState } from "react";

function ModalExpand({ onChange, data }) {
   const [notes, setNotes] = useState(data);

   function handleNotes(newNotes) {
      setNotes(newNotes);
      onChange(notes);
   }

   return (
      <div>
         <textarea
            autoFocus
            name=""
            value={notes}
            onChange={(e) => handleNotes(e.target.value)}
         />
      </div>
   );
}

export default ModalExpand;
