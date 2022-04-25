import LinkButton from "components/LinkButton";
import Link from "next/link";

function Drills({ data }) {
   return (
      <div>
         <h1>Drills</h1>
         {data ? (
            <ul>
               {data.map((drill) => {
                  return (
                     <li key={`name + ${drill._id}`}>
                        <Link href={`/drills/${drill.id}`}>{drill.name}</Link>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <div>No drills added</div>
         )}

         <LinkButton link={"/drills/add"} text={"Add new drill"} />
      </div>
   );
}

export async function getServerSideProps() {
   // get the current environment

   let dev = process.env.NODE_ENV !== "production";
   let { DEV_URL, PROD_URL } = process.env;

   // request posts from api
   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/drills`);

   // extract the data
   let data = await response.json();

   return {
      props: {
         data: data["message"],
      },
   };
}

export default Drills;
