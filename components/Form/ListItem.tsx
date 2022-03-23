import { useEffect, useState } from "react";

function ListItem({ id, type }) {
   useEffect(() => {
      getItem();
   }, []);
   const [item, setItem] = useState({});
   const getItem = async () => {
      const response = await fetch(`/api/edit/${type}/${id}`, {
         method: "GET",
      });

      const item = await response.json();
      setItem(item);
   };

   return <li>{item.name}</li>;
}

export default ListItem;

// export async function getStaticProps({ id, type }) {
//    const response = await fetch(`${process.env.API_URL}/edit/${type}/${id}`);
//    const data = await response.json();
//    console.log(response);

//    return {
//       props: {
//          item: data,
//       },
//    };
// }
