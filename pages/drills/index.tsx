import LinkButton from "components/LinkButton";
import Link from "next/link";

function DrillsPage({ data }) {
   return (
      <div>
         <h1>Drills</h1>
         {data ? (
            <ul>
               {data.map((drill) => {
                  return (
                     <li key={drill.id}>
                        <Link href={`/drills/${drill.id}`}>{drill.name}</Link>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <div>No workouts added</div>
         )}

         <LinkButton link={"/drills/new"} text={"Add new drill"} />
      </div>
   );
}

export default DrillsPage;

export async function getStaticProps() {
   const response = await fetch(`${process.env.API_URL}/drills`);

   const data = await response.json();
   console.log(data);

   return {
      props: { data },
   };
}
