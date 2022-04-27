function Home() {
   return <div>home</div>;
}

// export async function getServerSideProps() {
//    let dev = process.env.NODE_ENV !== "production";
//    let { DEV_URL, PROD_URL } = process.env;

//    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workouts`);
//    let data = await response.json();

//    return {
//       props: {
//          data: data["response"],
//       },
//    };
// }

export default Home;
