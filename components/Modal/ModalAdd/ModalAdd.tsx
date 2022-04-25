import React from "react";

import Button from "components/Button/Button";

function ModalAdd({ onClick, data }) {
   return (
      <ul>
         {data &&
            data.length > 0 &&
            data.map((item) => (
               <li key={item._id + item.id}>
                  <Button
                     onClick={() => onClick(item)}
                     text={item.name}
                     size={"sm"}
                  />
               </li>
            ))}
      </ul>
   );
}

export default ModalAdd;
