import { useState } from "react";

function FormTextarea({ label, placeholder = "Placeholder", onChange }) {
   const [value, setValue] = useState("");

   return (
      <div className="form-container-inputs">
         <label htmlFor="name">{label}</label>
         <textarea
            placeholder={placeholder}
            name={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
         />
      </div>
   );
}

export default FormTextarea;
