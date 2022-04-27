import Button from "components/Button/Button";
import List from "components/List/List";

function Warmups({ data }) {
   return (
      <div>
         <h1>Warmups</h1>

         <List linkType="warmups" items={data} />

         <div className="link-list-button">
            <Button
               color="green"
               text="Add new warmup"
               component="link"
               link="/warmups/add"
               onClick={false}
               size={false}
            />
         </div>
      </div>
   );
}

export async function getServerSideProps() {
   let dev = process.env.NODE_ENV == "development";
   let { DEV_URL, PROD_URL } = process.env;
   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/warmups`);
   let data = await response.json();

   return {
      props: {
         data: data["response"],
      },
   };
}

export default Warmups;
