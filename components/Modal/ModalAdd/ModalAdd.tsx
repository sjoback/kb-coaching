import Button from "components/Button/Button";

function ModalAdd({ onClick, data }) {
   function handleOnClick(drill) {
      onClick(drill);
   }

   return (
      <div>
         <ul>
            {data &&
               data.length > 0 &&
               data.map((item) => (
                  <li key={item._id + item.id}>
                     <Button
                        onClick={() => handleOnClick(item)}
                        text={item.name}
                        size={"sm"}
                        color="default"
                        component="default"
                        link={false}
                     />
                  </li>
               ))}
         </ul>
      </div>
   );
}

export default ModalAdd;
