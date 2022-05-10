import { useState } from "react";

function FormInput({ label, placeholder = "Placeholder", onChange }) {
   const [value, setValue] = useState("");

   function handleChange(value) {
      onChange(value);
      setValue(value);
   }

   return (
      <div className="form-container-inputs">
         <label htmlFor="name">{label}</label>
         <input
            autoFocus
            placeholder={placeholder}
            name={label}
            type="text"
            required
            value={value}
            onChange={(e) => handleChange(e.target.value)}
         />
      </div>
   );
}

export default FormInput;
